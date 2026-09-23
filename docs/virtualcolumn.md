---
id: virtualcolumn
title: VirtualColumn 🧪
---

import ExperimentalAPIWarning from './\_experimental-api-warning.mdx';

<ExperimentalAPIWarning />

`VirtualColumn` is a column layout component that lazily mounts and virtualizes items.

```tsx
<ScrollView>
  <VirtualColumn
    items={new VirtualArray(items)}>
    {(item, key) => <Text>{item.value}</Text>}
  </VirtualColumn>
</ScrollView>
```

A `ScrollView` ancestor is required for virtualized and scrollable items. If there is no ancestor `ScrollView`, the items will always be rendered as though they are within the viewport.

<center><img src="/docs/assets/virtual_column.svg" width="300" alt="Diagram of VirtualColumn." /></center>

### Item Rendering

`VirtualColumn` expects an immutable `VirtualCollection` of items and an `itemsToKey` function.

When `VirtualColumn` renders an item, it calls the `children` render function once and memoizes the result. If an item changes, a new item should be provided with the same key. Items with identical keys, as returned by `itemsToKey`, will update the same React element.

During rendering, `VirtualColumn` wraps each item in a `VirtualView` for virtualization.

### Lazy Mounting

`VirtualColumn` will lazily render list items to fill the viewport and prerender regions of the VirtualView. It will lazily mount items at the bottom of the list.

### Composability

`VirtualColumn` supports nesting of multiple `VirtualColumn` components and other `VirtualCollectionView` lists.

<center><img src="/docs/assets/virtual_column_nested.svg" width="300" alt="Diagram of two composed VirtualColumns." /></center>

## Props

### `children`

| Type   |
| ------ |
| `md ({item: object, key: string}) => [React Node](react-node)`|

A render function that maps an item to a React element. The return value is memoized so the function should be deterministic.

The function is called with the `item` to be mounted and the `key` as returned from `itemToKey`.

### `items`

| Type                                               |
| -------------------------------------------------- |
| `md [VirtualCollection](#virtualcollection)<object>` |

The collection of items to render. Each item should be treated as immutable. If an updated item should be rendered, a new item object should be supplied.

If you have an array of items and need to create a `VirtualCollection`, you can use `VirtualArray`.

### `itemToKey`

| Type                                               |
| -------------------------------------------------- |
| `md (item: object) => string` |

A function that maps an item to a unique key. If not supplied, the default function returns `item.key`.

## Type Definitions

### VirtualCollection

An interface for a collection of items to allow for lazy random access.

| Type                                               |
| -------------------------------------------------- |
| `interface` |

**Properties:**
| Name          | Type                            | Description                 |
| ------------- | --------------------------------| --------------------
| size          | `number`                     | Number of items in collection               |
| at            | `(index: number) => object`  | Returns the item object at specified `index`|


### VirtualArray

Implements `VirtualCollection` interface for an eagerly initialized array.


| Type                                               |
| -------------------------------------------------- |
| `object` |

**Properties:**
| Name          | Type                                | Description                 |
| ------------- | ------------------------------------| --------------------
| constructor   | `(input: Array<object>) => object`  | Create an instance of `VirtualArray` with an array |
| size          | `number`                            | Number of items in collection               |
| at            | `(index: number) => object`         | Returns the item object at specified `index`|

## FAQ

### How do we keep props memoized?

With [React Compiler](https://react.dev/learn/react-compiler/introduction) enabled, props will be memoized for you. Code samples above assume auto-memoization from the compiler.

If you are not using React Compiler, then you'll want to manually memoize inputs to avoid re-renders.

```tsx
const virtualCollection = useMemo(() => new VirtualArray(items), [items]);

const itemToKey = useCallback(item => item.key, []);
const renderItem = useCallback((item, key) => <Text>{item.value}</Text>, []);

<ScrollView>
  <VirtualColumn items={virtualCollection} itemToKey={itemToKey}>
    {renderItem}
  </VirtualColumn>
</ScrollView>;
```
We highly recommend [enabling the compiler](https://react.dev/learn/react-compiler/installation) for your project.
