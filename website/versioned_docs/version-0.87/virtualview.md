---
id: virtualview
title: VirtualView 🧪
---

import ExperimentalAPIWarning from './\_experimental-api-warning.mdx';

<ExperimentalAPIWarning />

`VirtualView` is a core component that behaves similar to [`View`](view).

When it is the descendent of a [`ScrollView`](scrollview), it gains additional virtualization capabilities to reduce its memory footprint when obscured by the scroll viewport.

```tsx
<ScrollView>
  <VirtualView>
    <Text>Hello world!</Text>
  </VirtualView>
</ScrollView>
```

A `VirtualView` without an ancestor[`ScrollView`](scrollview) does not have any virtualization capabilities.

## Virtualization

When a `VirtualView` leaves the visible region of a [`ScrollView`](scrollview), it becomes hidden. When hidden, a `VirtualView` will cache its most recent layout and may unmount its children — a process called virtualization.

When a `VirtualView` returns to the visible region of a [`ScrollView`](scrollview), it becomes visible. When visible, its children are _guaranteed_ to be rendered. This guarantee is maintained by blocking the main thread from rendering the next frame that would reveal the `VirtualView` until its children can be rendered.

<img src="/docs/assets/d_virtualview_modes.svg" width="700" alt="Diagram of VirtualView modes and thresholds." />

:::note
In future developments, a hidden `VirtualView` may instead render its children in an [`<Activity mode="hidden">`](https://react.dev/reference/react/Activity) to preserve state for as long as possible while balancing memory overhead.
:::

### Blocking the Main Thread

This is the first time in React Native’s feature set where rendering a React component can block the main thread. This is a new capability enabled by the [New Architecture](/architecture/landing-page)!

Blocking the main thread can provide a better user experience by preventing flashes of blank frames that sometimes occur when using components like [`FlatList`](flatlist). It can also enable better performance by using main thread priority, which is also typically run on higher performance cores.

However, blocking the main thread also comes with tradeoffs. If an update operation, such as mounting the children of a `VirtualView`, takes too long to finish, it can now drop frames. Dropping more than a couple frames can lead to a worse user experience by making the app feel sluggish and non-responsive. Dropping too many frames may cause the operating system to display a modal indicating the app is not responsive, or it may even terminate your app!

:::warning
DevTools does not currently support debugging JavaScript on the main thread. This means if you are using breakpoints to debug code called from `onModeChange`, that is executed on the main thread, your debugger may freeze.

Debugging all other parts of your JavaScript code should work as expected. We are working on closing this gap before releasing `VirtualView` to stable channels of React Native.
:::

### Prerendering

`VirtualView` enables you to benefit from main thread rendering while mitigating the disadvantages of dropped frames by rendering earlier before it is needed. This is called “prerendering”.

By default, each `VirtualView` will prerender its children when it approaches the visible region of a [`ScrollView`](scrollview). When this happens, its children will be rendered on a background thread at a lower priority (using a [transition](https://react.dev/reference/react/startTransition)). This ensures that the main thread and React are available to handle other critical user interactions at a higher priority.

:::note
`VirtualView`'s prerender logic is not currently configurable. The algorithm for determining this is undergoing active design iteration and is likely to change in a future release.
:::

---

## Props

### `children`

Content to render inside this `VirtualView`.

| Type                     |
| ------------------------ |
| [React Node](react-node) |

---

### `onModeChange`

Invoked when the `VirtualView` changes how it renders its children.

If a callback is supplied, it may be invoked from different threads and priorities depending on the internal state change. This can be detected by checking the `mode` property on the event:

- If `mode` is [`VirtualViewMode.Visible`](#virtualviewmode), the callback is being invoked from the main thread with immediate priority.
- If `mode` is [`VirtualViewMode.Prerender`](#virtualviewmode) or [`VirtualViewMode.Hidden`](#virtualviewmode), the callback is being invoked from a background thread with transition priority.

The callback will never be invoked consecutively with the same `mode` value. However, there are few guarantees about sequencing of events. Also, the callback may never be invoked with [`VirtualViewMode.Visible`](#virtualviewmode) even if it becomes visible, if the children were successfully prerendered.

| Type                                               |
| -------------------------------------------------- |
| `md ([ModeChangeEvent](#modechangeevent)) => void` |

---

### `nativeID`

An identifier for locating this view from native classes.

| Type   |
| ------ |
| string |

---

### `style`

| Type                           |
| ------------------------------ |
| [View Style](view-style-props) |

---

## Type Definitions

### `ModeChangeEvent`

Argument supplied to [`onModeChange`](#onmodechange).

| Type   |
| ------ |
| object |

**Properties:**

| Name          | Type                                | Description                                                                                       |
| ------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------- |
| mode          | [VirtualViewMode](#virtualviewmode) | New mode of the `VirtualView`.                                                                    |
| target        | element                             | `VirtualView` emitting this event.                                                                |
| targetRect    | [Rect](rect)                        | Layout of `target` relative to the nearest ancestor `ScrollView`.                                 |
| thresholdRect | [Rect](rect)                        | Layout of the threshold that triggered this event, relative to the nearest ancestor `ScrollView`. |

:::note
For example, if a `VirtualView` enters the visible region of a [`ScrollView`](scrollview)...

- `mode` would be [`VirtualViewMode.Visible`](#virtualviewmode)
- `thresholdRect` would describe the visible viewport of the nearest ancestor [`ScrollView`](scrollview)
- `targetRect` would be the layout of `target` that overlaps with `thresholdRect` (i.e. it is within the visible region of the [`ScrollView`](scrollview))

:::

### `VirtualViewMode`

Possible modes of a `VirtualView`.

| Name      | Value | Description                                    |
| --------- | ----- | ---------------------------------------------- |
| Visible   | `0`   | Target view is visible.                        |
| Prerender | `1`   | Target view is hidden, but can be prerendered. |
| Hidden    | `2`   | Target view is hidden.                         |

---

## Static Methods

### `createHiddenVirtualView()`

```tsx
static createHiddenVirtualView(height: number): typeof VirtualView;
```

`VirtualView` initially renders its children as visible, even if it is initially obscured by an ancestor [`ScrollView`](scrollview). This is because when a component is initially rendered, the presence of an ancestor [`ScrollView`](scrollview) — let alone its size and scroll position — are unknown.

For advanced use cases, `createHiddenVirtualView()` creates a component that renders an initially hidden `VirtualView` with the supplied estimated layout.

```tsx
const HiddenVirtualView = createHiddenVirtualView(100);

<ScrollView>
  <HiddenVirtualView>
    <Text>Hello world!</Text>
  </HiddenVirtualView>
</ScrollView>;
```

**Parameters:**

| Name                                                        | Type   | Description                                            |
| ----------------------------------------------------------- | ------ | ------------------------------------------------------ |
| height <div className="label basic required">Required</div> | number | Estimated height of initially rendering `VirtualView`. |
