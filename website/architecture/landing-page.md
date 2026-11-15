---
id: landing-page
title: About the New Architecture
---

Since 2018, the React Native team has been redesigning the core internals of React Native to enable developers to create higher-quality experiences. As of 2024, this version of React Native has been proven at scale and powers production apps by Meta.

The term _New Architecture_ refers to both the new framework architecture and the work to bring it to open source.

The New Architecture has been available for experimental opt-in as of [React Native 0.68](/blog/2022/03/30/version-068#opting-in-to-the-new-architecture) with continued improvements in every subsequent release. The team is now working to make this the default experience for the React Native open source ecosystem.

## Why a New Architecture?

After many years of building with React Native, the team identified a set of limitations that prevented developers from crafting certain experiences with a high polish. These limitations were fundamental to the existing design of the framework, so the New Architecture started as an investment in the future of React Native.

The New Architecture unlocks capabilities and improvements that were impossible in the legacy architecture.

### Synchronous Layout and Effects

Building adaptive UI experiences often requires measuring the size and position of your views and adjusting layout.

Today, you would use the [`onLayout`](/docs/view#onlayout) event to get the layout information of a view and make any adjustments. However, state updates within the `onLayout` callback may apply after painting the previous render. This means that users may see intermediate states or visual jumps between rendering the initial layout and responding to layout measurements.

With the New Architecture, we can avoid this issue entirely with synchronous access to layout information and properly scheduled updates such that no intermediate state is visible to users.

<details>
<summary>Example: Rendering a Tooltip</summary>

Measuring and placing a tooltip above a view allows us to showcase what synchronous rendering unlocks. The tooltip needs to know the position of its target view to determine where it should render.

In the current architecture, we use `onLayout` to get the measurements of the view and then update the positioning of the tooltip based on where the view is.

```jsx
function ViewWithTooltip() {
  // ...

  // We get the layout information and pass to Tooltip to position itself
  const onLayout = React.useCallback(event => {
    targetRef.current?.measureInWindow((x, y, width, height) => {
      // This state update is not guaranteed to run in the same commit
      // This results in a visual "jump" as the Tooltip repositions itself
      setTargetRect({x, y, width, height});
    });
  }, []);

  return (
    <>
      <View ref={targetRef} onLayout={onLayout}>
        <Text>Some content that renders a tooltip above</Text>
      </View>
      <Tooltip targetRect={targetRect} />
    </>
  );
}
```

With the New Architecture, we can use [`useLayoutEffect`](https://react.dev/reference/react/useLayoutEffect) to synchronously measure and apply layout updates in a single commit, avoiding the visual "jump".

```jsx
function ViewWithTooltip() {
  // ...

  useLayoutEffect(() => {
    // The measurement and state update for `targetRect` happens in a single commit
    // allowing Tooltip to position itself without intermediate paints
    targetRef.current?.measureInWindow((x, y, width, height) => {
      setTargetRect({x, y, width, height});
    });
  }, [setTargetRect]);

  return (
    <>
      <View ref={targetRef}>
        <Text>Some content that renders a tooltip above</Text>
      </View>
      <Tooltip targetRect={targetRect} />
    </>
  );
}
```

<div className="TwoColumns TwoFigures">
 <figure>
  <img src="/img/new-architecture/async-on-layout.gif" alt="A view that is moving to the corners of the viewport and center with a tooltip rendered either above or below it. The tooltip is rendered after a short delay after the view moves" />
  <figcaption>Asynchronous measurement and render of the Tooltip. [See code](https://gist.github.com/lunaleaps/eabd653d9864082ac1d3772dac217ab9).</figcaption>
</figure>
<figure>
  <img src="/img/new-architecture/sync-use-layout-effect.gif" alt="A view that is moving to the corners of the viewport and center with a tooltip rendered either above or below it. The view and tooltip move in unison." />
  <figcaption>Synchronous measurement and render of the Tooltip. [See code](https://gist.github.com/lunaleaps/148756563999c83220887757f2e549a3).</figcaption>
</figure>
</div>

</details>

### Support for Concurrent Renderer and Features

The New Architecture supports concurrent rendering and features that have shipped in [React 18](https://react.dev/blog/2022/03/29/react-v18) and beyond. You can now use features like Suspense for data-fetching, Transitions, and other new React APIs in your React Native code, further conforming codebases and concepts between web and native React development.

The concurrent renderer also brings out-of-the-box improvements like automatic batching, which reduces re-renders in React.

<details>
<summary>Example: Automatic Batching</summary>

With the New Architecture, you'll get automatic batching with the React 18 renderer.

In this example, a slider specifies how many tiles to render. Dragging the slider from 0 to 1000 will fire off a quick succession of state updates and re-renders.

In comparing the renderers for the [same code](https://gist.github.com/lunaleaps/79bb6f263404b12ba57db78e5f6f28b2), you can visually notice the renderer provides a smoother UI, with less intermediate UI updates. State updates from native event handlers, like this native Slider component, are now batched.

<div className="TwoColumns TwoFigures">
 <figure>
  <img src="/img/new-architecture/legacy-renderer.gif" alt="A video demonstrating an app rendering many views according to a slider input. The slider value is adjusted from 0 to 1000 and the UI slowly catches up to rendering 1000 views." />
  <figcaption>Rendering frequent state updates with legacy renderer.</figcaption>
</figure>
<figure>
  <img src="/img/new-architecture/react18-renderer.gif" alt="A video demonstrating an app rendering many views according to a slider input. The slider value is adjusted from 0 to 1000 and the UI resolves to 1000 views faster than the previous example, without as many intermediate states." />
  <figcaption>Rendering frequent state updates with React 18 renderer.</figcaption>
</figure>
</div>
</details>

New concurrent features, like [Transitions](https://react.dev/reference/react/useTransition), give you the power to express the priority of UI updates. Marking an update as lower priority tells React it can "interrupt" rendering the update to handle higher priority updates to ensure a responsive user experience where it matters.

<details>
<summary>Example: Using `startTransition`</summary>

We can build on the previous example to showcase how transitions can interrupt in-progress rendering to handle a newer state update.

We wrap the tile number state update with `startTransition` to indicate that rendering the tiles can be interrupted. `startTransition` also provides a `isPending` flag to tell us when the transition is complete.

```jsx
function TileSlider({value, onValueChange}) {
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <View>
        <Text>
          Render {value} Tiles
        </Text>
        <ActivityIndicator animating={isPending} />
      </View>
      <Slider
        value={1}
        minimumValue={1}
        maximumValue={1000}
        step={1}
        onValueChange={newValue => {
          startTransition(() => {
            onValueChange(newValue);
          });
        }}
      />
    </>
  );
}

function ManyTiles() {
  const [value, setValue] = useState(1);
  const tiles = generateTileViews(value);
  return (
      <TileSlider onValueChange={setValue} value={value} />
      <View>
        {tiles}
      </View>
  )
}
```

You'll notice that with the frequent updates in a transition, React renders fewer intermediate states because it bails out of rendering the state as soon as it becomes stale. In comparison, without transitions, more intermediate states are rendered. Both examples still use automatic batching. Still, transitions give even more power to developers to batch in-progress renders.

<div className="TwoColumns TwoFigures">
<figure>
  <img src="/img/new-architecture/with-transitions.gif" alt="A video demonstrating an app rendering many views (tiles) according to a slider input. The views are rendered in batches as the slider is quickly adjusted from 0 to 1000. There are less batch renders in comparison to the next video." />
  <figcaption>Rendering tiles with transitions to interrupt in-progress renders of stale state. [See code](https://gist.github.com/lunaleaps/eac391bf3fe4c85953cefeb74031bab0/revisions).</figcaption>
</figure>
<figure>
  <img src="/img/new-architecture/without-transitions.gif" alt="A video demonstrating an app rendering many views (tiles) according to a slider input. The views are rendered in batches as the slider is quickly adjusted from 0 to 1000." />
  <figcaption>Rendering tiles without marking it as a transition. [See code](https://gist.github.com/lunaleaps/eac391bf3fe4c85953cefeb74031bab0/revisions).</figcaption>
</figure>
</div>
</details>

### Fast JavaScript/Native Interfacing

The New Architecture removes the [asynchronous bridge](https://reactnative.dev/blog/2018/06/14/state-of-react-native-2018#architecture) between JavaScript and native and replaces it with JavaScript Interface (JSI). JSI is an interface that allows JavaScript to hold a reference to a C++ object and vice-versa. With a memory reference, you can directly invoke methods without serialization costs.

JSI enables [VisionCamera](https://github.com/mrousavy/react-native-vision-camera), a popular camera library for React Native, to process frames in real time. Typical frame buffers are ~30 MB, which amounts to roughly 2 GB of data per second, depending on the frame rate. In comparison with the serialization costs of the bridge, JSI handles that amount of interfacing data with ease. JSI can expose other complex instance-based types such as databases, images, audio samples, etc.

JSI adoption in the New Architecture removes this class of serialization work from all native-JavaScript interop. This includes initializing and re-rendering native core components like `View` and `Text`. You can read more about our [investigation in rendering performance](https://github.com/reactwg/react-native-new-architecture/discussions/123) in the New Architecture and the improved benchmarks we measured.

## What can I expect from enabling the New Architecture?

While the New Architecture enables these features and improvements, enabling the New Architecture for your app or library may not immediately improve the performance or user experience.

For example, your code may need refactoring to leverage new capabilities like synchronous layout effects or concurrent features. Although JSI will minimize the overhead between JavaScript and native memory, data serialization may not have been a bottleneck for your app's performance.

Enabling the New Architecture in your app or library is opting into the future of React Native.

The team is actively researching and developing new capabilities the New Architecture unlocks. For example, web alignment is an active area of exploration at Meta that will ship to the React Native open source ecosystem.

- [Updates to the event loop model](https://github.com/react-native-community/discussions-and-proposals/blob/main/proposals/0744-well-defined-event-loop.md)
- [Node and layout APIs](https://github.com/react-native-community/discussions-and-proposals/blob/main/proposals/0607-dom-traversal-and-layout-apis.md)
- [Styling and layout conformance](https://github.com/facebook/yoga/releases/tag/v2.0.0)

You can follow along and contribute in our dedicated [discussions & proposals](https://github.com/react-native-community/discussions-and-proposals/discussions/651) repository.

## Should I use the New Architecture today?

With 0.76, The New Architecture is enabled by default in all the React Native projects.

If you find anything that is not working well, please open an issue using [this template](https://github.com/react/react-native/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2CType%3A+New+Architecture&projects=&template=new_architecture_bug_report.yml).

If, for any reasons, you can't use the New Architecture, you can still opt-out from it:

### Android

1. Open the `android/gradle.properties` file
2. Toggle the `newArchEnabled` flag from `true` to `false`

```diff title="gradle.properties"
# Use this property to enable support to the new architecture.
# This will allow you to use TurboModules and the Fabric render in
# your application. You should enable this flag either if you want
# to write custom TurboModules/Fabric components OR use libraries that
# are providing them.
-newArchEnabled=true
+newArchEnabled=false
```

### iOS

1. Open the `ios/Podfile` file
2. Add `ENV['RCT_NEW_ARCH_ENABLED'] = '0'` in the main scope of the Podfile ([reference Podfile](https://github.com/react-native-community/template/blob/0.76-stable/template/ios/Podfile) in the template)

```diff
+ ENV['RCT_NEW_ARCH_ENABLED'] = '0'
# Resolve react_native_pods.rb with node to allow for hoisting
require Pod::Executable.execute_command('node', ['-p',
  'require.resolve(
```

3. Install your CocoaPods dependencies with the command:

```shell
bundle exec pod install
```
