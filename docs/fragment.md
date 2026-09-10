---
id: fragment
title: Fragment
---

import CanaryChannelAPIWarning from './\_canary-channel-api-warning.mdx';

`<Fragment>`, often used via `<>...</>` syntax, lets you group elements without a wrapper node.

```jsx
<>
  <View />
  <Text>Hello</Text>
</>
```

For full documentation on `Fragment` usage including grouping elements, assigning to variables, and rendering lists with keys, see the [Fragment documentation on react.dev](https://react.dev/reference/react/Fragment).

## Fragment Refs in React Native

<CanaryChannelAPIWarning />

Fragment refs let you attach a `ref` to a `<Fragment>` and interact with its host children without adding wrapper views. To use a Fragment ref, you must use the explicit `<Fragment>` syntax:

```jsx
import {Fragment, useRef} from 'react';

function MyComponent() {
  const fragmentRef = useRef(null);
  return (
    <Fragment ref={fragmentRef}>
      <View />
      <Text>Hello</Text>
    </Fragment>
  );
}
```

When you pass a `ref` to a Fragment, React provides a `FragmentInstance` object. The React Native `FragmentInstance` implements a subset of the methods available on Web. For the full `FragmentInstance` API including Web-only methods, see the [FragmentInstance documentation on react.dev](https://react.dev/reference/react/Fragment#fragmentinstance).

---

# Reference

## `FragmentInstance`

The `FragmentInstance` provided by Fragment refs in React Native supports the following methods:

### `observeUsing(observer)` {#observeusing}

Starts observing all first-level host children of the Fragment with the provided observer.

```jsx
const observer = new IntersectionObserver(callback, options);
fragmentRef.current.observeUsing(observer);
```

#### Parameters

- `observer`: An [`IntersectionObserver`](global-intersectionobserver) instance.

#### Returns

`undefined`.

:::note
Unlike the Web implementation, React Native only supports `IntersectionObserver` with `observeUsing`. `ResizeObserver` is not supported.
:::

---

### `unobserveUsing(observer)` {#unobserveusing}

Stops observing the Fragment's host children with the specified observer.

```jsx
fragmentRef.current.unobserveUsing(observer);
```

#### Parameters

- `observer`: The same `IntersectionObserver` instance previously passed to [`observeUsing`](#observeusing).

#### Returns

`undefined`.

---

### `getClientRects()` {#getclientrects}

Returns an array of bounding rectangles for all first-level host children of the Fragment.

```jsx
const rects = fragmentRef.current.getClientRects();
```

#### Returns

An `Array<DOMRect>` containing the bounding rectangles of all first-level host children. In React Native, each rectangle is obtained via `getBoundingClientRect()` on the underlying host instance.

---

### `getRootNode(options?)` {#getrootnode}

Returns the root node containing the Fragment's parent host node.

```jsx
const root = fragmentRef.current.getRootNode();
```

#### Parameters

- **optional** `options`: An object with a `composed` boolean property, matching the [DOM `getRootNode` API](https://developer.mozilla.org/en-US/docs/Web/API/Node/getRootNode#options).

#### Returns

A `Node` or the `FragmentInstance` itself if there is no parent host node.

---

### `compareDocumentPosition(otherNode)` {#comparedocumentposition}

Compares the position of the Fragment with another node, returning a bitmask matching the behavior of [`Node.compareDocumentPosition()`](https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition).

```jsx
const position =
  fragmentRef.current.compareDocumentPosition(otherElement);
```

#### Parameters

- `otherNode`: A host instance to compare against.

#### Returns

A bitmask of [position flags](https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition#return_value). Empty Fragments return `Node.DOCUMENT_POSITION_DISCONNECTED`.

---

### `reactFragments` property {#reactfragments}

Each first-level host child of a Fragment with a `ref` gets a `reactFragments` property — a `Set<FragmentInstance>` containing all Fragment instances that own the element.

---

## Methods Not Available in React Native

The following `FragmentInstance` methods are available on Web but are **not supported** in React Native:

| Method                | Description                                                   |
| --------------------- | ------------------------------------------------------------- |
| `addEventListener`    | Adds an event listener to all first-level host children.      |
| `removeEventListener` | Removes an event listener from all first-level host children. |
| `dispatchEvent`       | Dispatches an event on the Fragment.                          |
| `focus`               | Focuses the first focusable node depth-first.                 |
| `focusLast`           | Focuses the last focusable node depth-first.                  |
| `blur`                | Removes focus from the active element if within the Fragment. |
| `scrollIntoView`      | Scrolls the Fragment's children into view.                    |

See the [react.dev FragmentInstance documentation](https://react.dev/reference/react/Fragment#fragmentinstance) for details on these methods.

## Caveats

- Methods that target children (such as `observeUsing` and `getClientRects`) operate on **first-level host children** of the Fragment. They do not target children nested inside another host element.
- `observeUsing` does not work on text nodes.
- You cannot use the `<>...</>` shorthand syntax when passing `ref` or `key` to a Fragment. You must explicitly import `Fragment` from `'react'`.
