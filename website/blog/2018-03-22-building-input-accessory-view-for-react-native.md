---
title: 'Building <InputAccessoryView> For React Native'
author: Peter Argany
authorTitle: Software Engineer at Facebook
authorURL: 'https://github.com/PeteTheHeat'
authorImageURL: 'https://avatars3.githubusercontent.com/u/6011080?s=400&u=028e28081107d0ab16a5cb22baca43c080f5fa50&v=4'
authorTwitter: peterargany
tags: [engineering]
---

## Motivation

Three years ago, a GitHub issue was opened to support input accessory view from React Native.

<img src="/blog/assets/input-accessory-1.png" />

In the ensuing years, there have been countless '+1s', various workarounds, and zero concrete changes to RN on this issue - until today. Starting with iOS, [we're exposing an API](/docs/inputaccessoryview) for accessing the native input accessory view and we are excited to share how we built it.

## Background

What exactly is an input accessory view? Reading [Apple's developer documentation](https://developer.apple.com/documentation/uikit/uiresponder/1621119-inputaccessoryview?language=objc), we learn that it's a custom view which can be anchored to the top of the system keyboard whenever a receiver becomes the first responder. Anything that inherits from `UIResponder` can redeclare the `.inputAccessoryView` property as read-write, and manage a custom view here. The responder infrastructure mounts the view, and keeps it in sync with the system keyboard. Gestures which dismiss the keyboard, like a drag or tap, are applied to the input accessory view at the framework level. This allows us to build content with interactive keyboard dismissal, an integral feature in top-tier messaging apps like iMessage and WhatsApp.

There are two common use cases for anchoring a view to the top of the keyboard. The first is creating a keyboard toolbar, like the Facebook composer background picker.

<img src="/blog/assets/input-accessory-2.gif" style={{float: 'left', paddingRight: 70, paddingTop: 20}} />

In this scenario, the keyboard is focused on a text input field, and the input accessory view is used to provide additional keyboard functionality. This functionality is contextual to the type of input field. In a mapping application it could be address suggestions, or in a text editor, it could be rich text formatting tools.

<hr style={{clear: 'both', marginBottom: 20}} />

The Objective-C UIResponder who owns the `<InputAccessoryView>` in this scenario should be clear. The `<TextInput>` has become first responder, and under the hood this becomes an instance of `UITextView` or `UITextField`.

The second common scenario is sticky text inputs:

<img src="/blog/assets/input-accessory-3.gif" style={{float: 'left', paddingRight: 70, paddingTop: 20}} />

Here, the text input is actually part of the input accessory view itself. This is commonly used in messaging applications, where a message can be composed while scrolling through a thread of previous messages.

<hr style={{clear: 'both', marginBottom: 20}} />

Who owns the `<InputAccessoryView>` in this example? Can it be the `UITextView` or `UITextField` again? The text input is _inside_ the input accessory view, this sounds like a circular dependency. Solving this issue alone is [another blog post](https://web.archive.org/web/20250524151907/https://www.derpturkey.com/uitextfield-docked-like-ios-messenger/) in itself. Spoilers: the owner is a generic `UIView` subclass who we manually tell to [becomeFirstResponder](https://developer.apple.com/documentation/uikit/uiresponder/1621113-becomefirstresponder?language=objc).

## API Design

We now know what an `<InputAccessoryView>` is, and how we want to use it. The next step is designing an API that makes sense for both use cases, and works well with existing React Native components like `<TextInput>`.

For keyboard toolbars, there are a few things we want to consider:

1. We want to be able to hoist any generic React Native view hierarchy into the `<InputAccessoryView>`.
2. We want this generic and detached view hierarchy to accept touches and be able to manipulate application state.
3. We want to link an `<InputAccessoryView>` to a particular `<TextInput>`.
4. We want to be able to share an `<InputAccessoryView>` across multiple text inputs, without duplicating any code.

We can achieve #1 using a concept similar to [React portals](https://reactjs.org/docs/portals.html). In this design, we portal React Native views to a `UIView` hierarchy managed by the responder infrastructure. Since React Native views render as UIViews, this is actually quite straightforward - we can just override:

`- (void)insertReactSubview:(UIView *)subview atIndex:(NSInteger)atIndex`

and pipe all the subviews to a new UIView hierarchy. For #2, we set up a new [RCTTouchHandler](https://github.com/facebook/react-native/blob/master/React/Base/RCTTouchHandler.h) for the `<InputAccessoryView>`. State updates are achieved by using regular event callbacks. For #3 and #4, we use the [nativeID](https://github.com/facebook/react-native/blob/master/React/Views/UIView%2BReact.h#L28) field to locate the accessory view UIView hierarchy in native code during the creation of a `<TextInput>` component. This function uses the `.inputAccessoryView` property of the underlying native text input. Doing this effectively links `<InputAccessoryView>` to `<TextInput>` in their ObjC implementations.

Supporting sticky text inputs (scenario 2) adds a few more constraints. For this design, the input accessory view has a text input as a child, so linking via nativeID is not an option. Instead, we set the `.inputAccessoryView` of a generic off-screen `UIView` to our native `<InputAccessoryView>` hierarchy. By manually telling this generic `UIView` to become first responder, the hierarchy is mounted by responder infrastructure. This concept is explained thoroughly in the aforementioned blog post.

## Pitfalls

Of course not everything was smooth sailing while building this API. Here are a few pitfalls we encountered, along with how we fixed them.

An initial idea for building this API involved listening to `NSNotificationCenter` for UIKeyboardWill(Show/Hide/ChangeFrame) events. This pattern is used in some open-sourced libraries, and internally in some parts of the Facebook app. Unfortunately, `UIKeyboardDidChangeFrame` events were not being called in time to update the `<InputAccessoryView>` frame on swipes. Also, changes in keyboard height are not captured by these events. This creates a class of bugs that manifest like this:

<img src="/blog/assets/input-accessory-4.gif" style={{float: 'left', paddingRight: 70, paddingTop: 20}} />

On iPhone X, text and emoji keyboard are different heights. Most applications using keyboard events to manipulate text input frames had to fix the above bug. Our solution was to commit to using the `.inputAccessoryView` property, which meant that the responder infrastructure handles frame updates like this.

<hr style={{clear: 'both', marginBottom: 20}} />

Another tricky bug we encountered was avoiding the home pill on iPhone X. You may be thinking, “Apple developed [safeAreaLayoutGuide](https://developer.apple.com/documentation/uikit/uiview/2891102-safearealayoutguide?language=objc) for this very reason, this is trivial!”. We were just as naive. The first issue is that the native `<InputAccessoryView>` implementation has no window to anchor to until the moment it is about to appear. That's alright, we can override `-(BOOL)becomeFirstResponder` and enforce layout constraints there. Adhering to these constraints bumps the accessory view up, but another bug arises: <img src="/blog/assets/input-accessory-5.gif" style={{float: 'left', paddingRight: 70, paddingTop: 20}} />

The input accessory view successfully avoids the home pill, but now content behind the unsafe area is visible. The solution lies in this [radar](https://www.openradar.me/34411433). I wrapped the native `<InputAccessoryView>` hierarchy in a container which doesn't conform to the `safeAreaLayoutGuide` constraints. The native container covers the content in the unsafe area, while the `<InputAccessoryView>` stays within the safe area boundaries.

<hr style={{clear: 'both', marginBottom: 20}} />

## Example Usage

Here's an example which builds a keyboard toolbar button to reset `<TextInput>` state.

```jsx
class TextInputAccessoryViewExample extends React.Component<
  {},
  *,
> {
  constructor(props) {
    super(props);
    this.state = {text: 'Placeholder Text'};
  }

  render() {
    const inputAccessoryViewID = 'inputAccessoryView1';
    return (
      <View>
        <TextInput
          style={styles.default}
          inputAccessoryViewID={inputAccessoryViewID}
          onChangeText={text => this.setState({text})}
          value={this.state.text}
        />
        <InputAccessoryView nativeID={inputAccessoryViewID}>
          <View style={{backgroundColor: 'white'}}>
            <Button
              onPress={() =>
                this.setState({text: 'Placeholder Text'})
              }
              title="Reset Text"
            />
          </View>
        </InputAccessoryView>
      </View>
    );
  }
}
```

Another example for [Sticky Text Inputs can be found in the repository](https://github.com/facebook/react-native/blob/84ef7bc372ad870127b3e1fb8c13399fe09ecd4d/RNTester/js/InputAccessoryViewExample.js).

## When will I be able to use this?

The full commit for this feature implementation is [here](https://github.com/facebook/react-native/commit/38197c8230657d567170cdaf8ff4bbb4aee732b8). [`<InputAccessoryView>`](/docs/next/inputaccessoryview) will be available in the upcoming v0.55.0 release.

Happy keyboarding :)
