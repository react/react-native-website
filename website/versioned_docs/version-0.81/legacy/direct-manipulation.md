---
id: direct-manipulation
title: Direct Manipulation
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

It is sometimes necessary to make changes directly to a component without using state/props to trigger a re-render of the entire subtree. When using React in the browser for example, you sometimes need to directly modify a DOM node, and the same is true for views in mobile apps. `setNativeProps` is the React Native equivalent to setting properties directly on a DOM node.

:::caution
Use `setNativeProps` when frequent re-rendering creates a performance bottleneck!

Direct manipulation will not be a tool that you reach for frequently. You will typically only be using it for creating continuous animations to avoid the overhead of rendering the component hierarchy and reconciling many views.
`setNativeProps` is imperative and stores state in the native layer (DOM, UIView, etc.) and not within your React components, which makes your code more difficult to reason about.

Before you use it, try to solve your problem with `setState` and [`shouldComponentUpdate`](https://react.dev/reference/react/Component#shouldcomponentupdate).
:::

## setNativeProps with TouchableOpacity

[TouchableOpacity](https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/Components/Touchable/TouchableOpacity.js) uses `setNativeProps` internally to update the opacity of its child component:

```tsx
const viewRef = useRef<View>();
const setOpacityTo = useCallback(value => {
  // Redacted: animation related code
  viewRef.current.setNativeProps({
    opacity: value,
  });
}, []);
```

This allows us to write the following code and know that the child will have its opacity updated in response to taps, without the child having any knowledge of that fact or requiring any changes to its implementation:

```tsx
<TouchableOpacity onPress={handlePress}>
  <View>
    <Text>Press me!</Text>
  </View>
</TouchableOpacity>
```

Let's imagine that `setNativeProps` was not available. One way that we might implement it with that constraint is to store the opacity value in the state, then update that value whenever `onPress` is fired:

```tsx
const [buttonOpacity, setButtonOpacity] = useState(1);
return (
  <TouchableOpacity
    onPressIn={() => setButtonOpacity(0.5)}
    onPressOut={() => setButtonOpacity(1)}>
    <View style={{opacity: buttonOpacity}}>
      <Text>Press me!</Text>
    </View>
  </TouchableOpacity>
);
```

This is computationally intensive compared to the original example - React needs to re-render the component hierarchy each time the opacity changes, even though other properties of the view and its children haven't changed. Usually this overhead isn't a concern but when performing continuous animations and responding to gestures, judiciously optimizing your components can improve your animations' fidelity.

If you look at the implementation of `setNativeProps` in [NativeMethodsMixin](https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/Renderer/implementations/ReactNativeRenderer-prod.js) you will notice that it is a wrapper around `RCTUIManager.updateView` - this is the exact same function call that results from re-rendering - see [receiveComponent in ReactNativeBaseComponent](https://github.com/facebook/react-native/blob/fb2ec1ea47c53c2e7b873acb1cb46192ac74274e/Libraries/Renderer/oss/ReactNativeRenderer-prod.js#L5793-L5813).

## Composite components and setNativeProps

Composite components are not backed by a native view, so you cannot call `setNativeProps` on them. Consider this example:

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=setNativeProps%20with%20Composite%20Components&ext=js
import {Text, TouchableOpacity, View} from 'react-native';

const MyButton = props => (
  <View style={{marginTop: 50}}>
    <Text>{props.label}</Text>
  </View>
);

const App = () => (
  <TouchableOpacity>
    <MyButton label="Press me!" />
  </TouchableOpacity>
);

export default App;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=setNativeProps%20with%20Composite%20Components&ext=tsx
import {Text, TouchableOpacity, View} from 'react-native';

const MyButton = (props: {label: string}) => (
  <View style={{marginTop: 50}}>
    <Text>{props.label}</Text>
  </View>
);

const App = () => (
  <TouchableOpacity>
    <MyButton label="Press me!" />
  </TouchableOpacity>
);

export default App;
```

</TabItem>
</Tabs>

If you run this you will immediately see this error: `Touchable child must either be native or forward setNativeProps to a native component`. This occurs because `MyButton` isn't directly backed by a native view whose opacity should be set. You can think about it like this: if you define a component with `createReactClass` you would not expect to be able to set a style prop on it and have that work - you would need to pass the style prop down to a child, unless you are wrapping a native component. Similarly, we are going to forward `setNativeProps` to a native-backed child component.

#### Forward setNativeProps to a child

Since the `setNativeProps` method exists on any ref to a `View` component, it is enough to forward a ref on your custom component to one of the `<View />` components that it renders. This means that a call to `setNativeProps` on the custom component will have the same effect as if you called `setNativeProps` on the wrapped `View` component itself.

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=Forwarding%20setNativeProps&ext=js
import {forwardRef} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

const MyButton = forwardRef((props, ref) => (
  <View {...props} ref={ref} style={{marginTop: 50}}>
    <Text>{props.label}</Text>
  </View>
));

const App = () => (
  <TouchableOpacity>
    <MyButton label="Press me!" />
  </TouchableOpacity>
);

export default App;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=Forwarding%20setNativeProps&ext=tsx
import {forwardRef} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

const MyButton = forwardRef<View, {label: string}>((props, ref) => (
  <View {...props} ref={ref} style={{marginTop: 50}}>
    <Text>{props.label}</Text>
  </View>
));

const App = () => (
  <TouchableOpacity>
    <MyButton label="Press me!" />
  </TouchableOpacity>
);

export default App;
```

</TabItem>
</Tabs>

You can now use `MyButton` inside of `TouchableOpacity`!

You may have noticed that we passed all of the props down to the child view using `{...props}`. The reason for this is that `TouchableOpacity` is actually a composite component, and so in addition to depending on `setNativeProps` on its child, it also requires that the child perform touch handling. To do this, it passes on [various props](view.md#onmoveshouldsetresponder) that call back to the `TouchableOpacity` component. `TouchableHighlight`, in contrast, is backed by a native view and only requires that we implement `setNativeProps`.

## setNativeProps to edit TextInput value

Another very common use case of `setNativeProps` is to edit the value of the TextInput. The `controlled` prop of TextInput can sometimes drop characters when the `bufferDelay` is low and the user types very quickly. Some developers prefer to skip this prop entirely and instead use `setNativeProps` to directly manipulate the TextInput value when necessary. For example, the following code demonstrates editing the input when you tap a button:

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=Clear%20text&ext=js
import {useCallback, useRef} from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const App = () => {
  const inputRef = useRef(null);
  const editText = useCallback(() => {
    inputRef.current.setNativeProps({text: 'Edited Text'});
  }, []);

  return (
    <View style={styles.container}>
      <TextInput ref={inputRef} style={styles.input} />
      <TouchableOpacity onPress={editText}>
        <Text>Edit text</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 50,
    width: 200,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default App;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=Clear%20text&ext=tsx
import {useCallback, useRef} from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const App = () => {
  const inputRef = useRef<TextInput>(null);
  const editText = useCallback(() => {
    inputRef.current?.setNativeProps({text: 'Edited Text'});
  }, []);

  return (
    <View style={styles.container}>
      <TextInput ref={inputRef} style={styles.input} />
      <TouchableOpacity onPress={editText}>
        <Text>Edit text</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 50,
    width: 200,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default App;
```

</TabItem>
</Tabs>

You can use the [`clear`](../textinput#clear) method to clear the `TextInput` which clears the current input text using the same approach.

## Avoiding conflicts with the render function

If you update a property that is also managed by the render function, you might end up with some unpredictable and confusing bugs because anytime the component re-renders and that property changes, whatever value was previously set from `setNativeProps` will be completely ignored and overridden.

## setNativeProps & shouldComponentUpdate

By [intelligently applying `shouldComponentUpdate`](https://react.dev/reference/react/Component#shouldcomponentupdate) you can avoid the unnecessary overhead involved in reconciling unchanged component subtrees, to the point where it may be performant enough to use `setState` instead of `setNativeProps`.

## Other native methods

The methods described here are available on most of the default components provided by React Native. Note, however, that they are _not_ available on composite components that aren't directly backed by a native view. This will generally include most components that you define in your own app.

### measure(callback)

Determines the location on screen, width, and height in the viewport of the given view and returns the values via an async callback. If successful, the callback will be called with the following arguments:

- x
- y
- width
- height
- pageX
- pageY

Note that these measurements are not available until after the rendering has been completed in native. If you need the measurements as soon as possible and you don't need `pageX` and `pageY`, consider using the [`onLayout`](view.md#onlayout) property instead.

Also the width and height returned by `measure()` are the width and height of the component in the viewport. If you need the actual size of the component, consider using the [`onLayout`](view.md#onlayout) property instead.

### measureInWindow(callback)

Determines the location of the given view in the window and returns the values via an async callback. If the React root view is embedded in another native view, this will give you the absolute coordinates. If successful, the callback will be called with the following arguments:

- x
- y
- width
- height

### measureLayout(relativeToNativeComponentRef, onSuccess, onFail)

Like `measure()`, but measures the view relative to an ancestor, specified with `relativeToNativeComponentRef` reference. This means that the returned coordinates are relative to the origin `x`, `y` of the ancestor view.

:::note
This method can also be called with a `relativeToNativeNode` handler (instead of reference), but this variant is obsolete with the new architecture.
:::

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=measureLayout%20example&supportedPlatforms=android,ios&ext=js
import {useEffect, useRef, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';

const App = () => {
  const textContainerRef = useRef(null);
  const textRef = useRef(null);
  const [measure, setMeasure] = useState(null);

  useEffect(() => {
    if (textRef.current && textContainerRef.current) {
      textRef.current.measureLayout(
        textContainerRef.current,
        (left, top, width, height) => {
          setMeasure({left, top, width, height});
        },
      );
    }
  }, [measure]);

  return (
    <View style={styles.container}>
      <View ref={textContainerRef} style={styles.textContainer}>
        <Text ref={textRef}>Where am I? (relative to the text container)</Text>
      </View>
      <Text style={styles.measure}>{JSON.stringify(measure)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  textContainer: {
    backgroundColor: '#61dafb',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  measure: {
    textAlign: 'center',
    padding: 12,
  },
});

export default App;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=measureLayout%20example&ext=tsx
import {useEffect, useRef, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';

type Measurements = {
  left: number;
  top: number;
  width: number;
  height: number;
};

const App = () => {
  const textContainerRef = useRef<View>(null);
  const textRef = useRef<Text>(null);
  const [measure, setMeasure] = useState<Measurements | null>(null);

  useEffect(() => {
    if (textRef.current && textContainerRef.current) {
      textRef.current?.measureLayout(
        textContainerRef.current,
        (left, top, width, height) => {
          setMeasure({left, top, width, height});
        },
        () => {
          console.error('measurement failed');
        },
      );
    }
  }, [measure]);

  return (
    <View style={styles.container}>
      <View ref={textContainerRef} style={styles.textContainer}>
        <Text ref={textRef}>Where am I? (relative to the text container)</Text>
      </View>
      <Text style={styles.measure}>{JSON.stringify(measure)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  textContainer: {
    backgroundColor: '#61dafb',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  measure: {
    textAlign: 'center',
    padding: 12,
  },
});

export default App;
```

</TabItem>
</Tabs>

### focus()

Requests focus for the given input or view. The exact behavior triggered will depend on the platform and type of view.

### blur()

Removes focus from an input or view. This is the opposite of `focus()`.
