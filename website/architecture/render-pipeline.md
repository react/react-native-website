---
id: render-pipeline
title: Render, Commit, and Mount
---

import FabricWarning from './\_fabric-warning.mdx';

<FabricWarning />

The React Native renderer goes through a sequence of work to render React logic to a [host platform](architecture-glossary.md#host-platform). This sequence of work is called the render pipeline and occurs for initial renders and updates to the UI state. This document goes over the render pipeline and how it differs in those scenarios.

The render pipeline can be broken into three general phases:

1. **Render:** React executes product logic which creates a [React Element Trees](architecture-glossary.md#react-element-tree-and-react-element) in JavaScript. From this tree, the renderer creates a [React Shadow Tree](architecture-glossary.md#react-shadow-tree-and-react-shadow-node) in C++.
2. **Commit**: After a React Shadow Tree is fully created, the renderer triggers a commit. This **promotes** both the React Element Tree and the newly created React Shadow Tree as the “next tree” to be mounted. This also schedules calculation of its layout information.
3. **Mount:** The React Shadow Tree, now with the results of layout calculation, is transformed into a [Host View Tree](architecture-glossary.md#host-view-tree-and-host-view).

> The phases of the render pipeline may occur on different threads. Refer to the [Threading Model](threading-model) doc for more detail.

![React Native renderer Data flow](/docs/assets/Architecture/renderer-pipeline/data-flow.jpg)

---

## Initial Render

Imagine you want to render the following:

```jsx
function MyComponent() {
  return (
    <View>
      <Text>Hello, World</Text>
    </View>
  );
}

// <MyComponent />
```

In the example above, `<MyComponent />` is a [React Element](architecture-glossary.md#react-element-tree-and-react-element). React recursively reduces this _React Element_ to a terminal [React Host Component](architecture-glossary.md#react-host-components-or-host-components) by invoking it (or its `render` method if implemented with a JavaScript class) until every _React Element_ cannot be reduced any further. Now you have a _React Element Tree_ of [React Host Components](architecture-glossary.md#react-host-components-or-host-components).

### Phase 1. Render

![Phase one: render](/docs/assets/Architecture/renderer-pipeline/phase-one-render.png)

During this process of element reduction, as each _React Element_ is invoked, the renderer also synchronously creates a [React Shadow Node](architecture-glossary.md#react-shadow-tree-and-react-shadow-node). This happens only for _React Host Components_, not for [React Composite Components](architecture-glossary.md#react-composite-components). In the example above, the `<View>` leads to the creation of a `ViewShadowNode` object, and the
`<Text>` leads to the creation of a `TextShadowNode` object. Notably, there is never a _React Shadow Node_ that directly represents `<MyComponent>`.

Whenever React creates a parent-child relationship between two _React Element Nodes_, the renderer creates the same relationship between the corresponding _React Shadow Nodes_. This is how the _React Shadow Tree_ is assembled.

**Additional Details**

- The operations (creation of _React Shadow Node_, creation of parent-child relationship between two _React Shadow Nodes_) are synchronous and thread-safe operations that are executed from React (JavaScript) into the renderer (C++), usually on the JavaScript thread.
- The _React Element Tree_ (and its constituent _React Element Nodes_) do not exist indefinitely. It is a temporal representation materialized by “fibers” in React. Each “fiber” that represents a host component stores a C++ pointer to the _React Shadow Node_, made possible by JSI. [Learn more about “fibers” in this document.](https://github.com/acdlite/react-fiber-architecture#what-is-a-fiber)
- The _React Shadow Tree_ is immutable. In order to update any _React Shadow Node_, the renderer creates a new _React Shadow Tree_. However, the renderer provides cloning operations to make state updates more performant (see [React State Updates](render-pipeline#react-state-updates) for more details).

In the example above, the result of the render phase looks like this:

![Step one](/docs/assets/Architecture/renderer-pipeline/render-pipeline-1.png)

After the _React Shadow Tree_ is complete, the renderer triggers a commit of the _React Element Tree_.

### Phase 2. Commit

![Phase two: commit](/docs/assets/Architecture/renderer-pipeline/phase-two-commit.png)

The commit phase consists of two operations: _Layout Calculation_ and _Tree Promotion_.

- **Layout Calculation:** This operation calculates the position and size of each _React Shadow Node_. In React Native, this involves invoking Yoga to calculate the layout of each _React Shadow Node_. The actual calculation requires each _React Shadow Node_’s styles which originate from a _React Element_ in JavaScript. It also requires the layout constraints of the root of the _React Shadow Tree_, which determines the amount of available space that the resulting nodes can occupy.

![Step two](/docs/assets/Architecture/renderer-pipeline/render-pipeline-2.png)

- **Tree Promotion (New Tree → Next Tree):** This operation promotes the new _React Shadow Tree_ as the “next tree” to be mounted. This promotion indicates that the new _React Shadow Tree_ has all the information to be mounted and represents the latest state of the _React Element Tree_. The “next tree” mounts on the next “tick” of the UI Thread.

**Additional Details**

- These operations are asynchronously executed on a background thread.
- Majority of layout calculation executes entirely within C++. However, the layout calculation of some components depend on the _host platform_ (e.g. `Text`, `TextInput`, etc.). Size and position of text is specific to each _host platform_ and needs to be calculated on the _host platform_ layer. For this purpose, Yoga invokes a function defined in the _host platform_ to calculate the component’s layout.

### Phase 3. Mount

![Phase three: mount](/docs/assets/Architecture/renderer-pipeline/phase-three-mount.png)

The mount phase transforms the _React Shadow Tree_ (which now contains data from layout calculation) into a _Host_ _View Tree_ with rendered pixels on the screen. As a reminder, the _React Element Tree_ looks like this:

```jsx
<View>
  <Text>Hello, World</Text>
</View>
```

At a high level, React Native renderer creates a corresponding [Host View](architecture-glossary.md#host-view-tree-and-host-view) for each _React Shadow Node_ and mounts it on screen. In the example above, the renderer creates an instance of `android.view.ViewGroup` for the `<View>` and `android.widget.TextView` for `<Text>` and populates it with “Hello World”. Similarly for iOS a `UIView` is created and text is populated with a call to `NSLayoutManager`. Each host view is then configured to use props from its React Shadow Node, and its size and position is configured using the calculated layout information.

![Step two](/docs/assets/Architecture/renderer-pipeline/render-pipeline-3.png)

In more detail, the mounting phase consists of these three steps:

- **Tree Diffing:** This step computes the diff between the “previously rendered tree” and the “next tree” entirely in C++. The result is a list of atomic mutation operations to be performed on host views (e.g. `createView`, `updateView`, `removeView`, `deleteView`, etc). This step is also where the React Shadow Tree is flattened to avoid creating unnecessary host views. See [View Flattening](view-flattening) for details about this algorithm.
- **Tree Promotion (Next Tree → Rendered Tree)**: This step atomically promotes the “next tree” to “previously rendered tree” so that the next mount phase computes a diff against the proper tree.
- **View Mounting**: This step applies the atomic mutation operations onto corresponding host views. This step executes in the _host platform_ on UI thread.

**Additional Details**

- The operations are synchronously executed on UI thread. If the commit phase executes on background thread, the mounting phase is scheduled for the next “tick” of UI thread. On the other hand, if the commit phase executes on UI thread, mounting phase executes synchronously on the same thread.
- Scheduling, implementation, and execution of the mounting phase heavily depends on the _host platform_. For example, the renderer architecture of the mounting layer currently differs between Android and iOS.
- During the initial render, the “previously rendered tree” is empty. As such, the tree diffing step will result in a list of mutation operations that consists only of creating views, setting props, and adding views to each other. Tree diffing becomes more important for performance when processing [React State Updates](#react-state-updates).
- In current production tests, a _React Shadow Tree_ typically consists of about 600-1000 _React Shadow Nodes_ (before view flattening), the trees get reduced to ~200 nodes after view flattening. On iPad or desktop apps, this quantity may increase 10-fold.

---

## React State Updates

Let’s explore each phase of the render pipeline when the state of a _React Element Tree_ is updated. Let’s say, you’ve rendered the following component in an initial render:

```jsx
function MyComponent() {
  return (
    <View>
      <View
        style={{backgroundColor: 'red', height: 20, width: 20}}
      />
      <View
        style={{backgroundColor: 'blue', height: 20, width: 20}}
      />
    </View>
  );
}
```

Applying what was described in the [Initial Render](#initial-render) section, you would expect the following trees to be created:

![Render pipeline 4](/docs/assets/Architecture/renderer-pipeline/render-pipeline-4.png)

Notice that **Node 3** maps to a host view with a **red background**, and **Node 4** maps to a host view with a **blue background**. Assume that as the result of a state update in JavaScript product logic, the background of the first nested `<View>` changes from `'red'` to `'yellow'`. This is what the new _React Element Tree_ might look:

```jsx
<View>
  <View
    style={{backgroundColor: 'yellow', height: 20, width: 20}}
  />
  <View
    style={{backgroundColor: 'blue', height: 20, width: 20}}
  />
</View>
```

**How is this update processed by React Native?**

When a state update occurs, the renderer needs to conceptually update the _React Element Tree_ in order to update the host views that are already mounted. But in order to preserve thread safety, both the _React Element Tree_ as well as the _React Shadow Tree_ must be immutable. This means that instead of mutating the current _React Element Tree_ and _React Shadow Tree_, React must create a new copy of each tree which incorporates the new props, styles, and children.

Let’s explore each phase of the render pipeline during a state update.

### Phase 1. Render

![Phase one: render](/docs/assets/Architecture/renderer-pipeline/phase-one-render.png)

When React creates a new _React Element Tree_ that incorporates the new state, it must clone every _React Element_ and _React Shadow Node_ that is impacted by the change. After cloning, the new _React Shadow Tree_ is committed.

React Native renderer leverages structural sharing to minimize the overhead of immutability. When a _React Element_ is cloned to include the new state, every _React Element_ that is on the path up to the root is cloned. **React will only clone a React Element if it requires an update to its props, style, or children.** Any _React Elements_ that are unchanged by the state update are shared by the old and new trees.

In the above example, React creates the new tree using these operations:

1. CloneNode(**Node 3**, `{backgroundColor: 'yellow'}`) → **Node 3'**
2. CloneNode(**Node 2**) → **Node 2'**
3. AppendChild(**Node 2'**, **Node 3'**)
4. AppendChild(**Node 2'**, **Node 4**)
5. CloneNode(**Node 1**) → **Node 1'**
6. AppendChild(**Node 1'**, **Node 2'**)

After these operations, **Node 1'** represents the root of the new _React Element Tree_. Let's assign **T** to the “previously rendered tree” and **T'** to the “new tree”:

![Render pipeline 5](/docs/assets/Architecture/renderer-pipeline/render-pipeline-5.png)

Notice how **T** and **T'** both share **Node 4**. Structural sharing improves performance and reduces memory usage.

### Phase 2. Commit

![Phase two: commit](/docs/assets/Architecture/renderer-pipeline/phase-two-commit.png)

After React creates the new _React Element Tree_ and _React Shadow Tree_, it must commit them.

- **Layout Calculation:** Similar to Layout Calculation during [Initial Render](#initial-render). One important difference is that layout calculation may cause shared _React Shadow Nodes_ to be cloned. This can happen because if the parent of a shared _React Shadow Node_ incurs a layout change, the layout of the shared _React Shadow Node_ may also change.
- **Tree Promotion (New Tree → Next Tree):** Similar to Tree Promotion during [Initial Render](#initial-render).

### Phase 3. Mount

![Phase three: mount](/docs/assets/Architecture/renderer-pipeline/phase-three-mount.png)

- **Tree Promotion (Next Tree → Rendered Tree)**: This step atomically promotes the “next tree” to “previously rendered tree” so that the next mount phase computes a diff against the proper tree.
- **Tree Diffing:** This step computes the diff between the “previously rendered tree” (**T**) and the “next tree” (**T'**). The result is a list of atomic mutation operations to be performed on _host views_.
  - In the above example, the operations consist of: `UpdateView(**Node 3**, {backgroundColor: 'yellow'})`
  - The diff can be calculated for any currently mounted tree with any new tree. The renderer can skip some intermediate versions of the tree.
- **View Mounting**: This step applies the atomic mutation operations onto corresponding _host views_. In the above example, only the `backgroundColor` of **View 3** will be updated (to yellow).

![Render pipeline 6](/docs/assets/Architecture/renderer-pipeline/render-pipeline-6.png)

---

## React Native Renderer State Updates

For most information in the _Shadow Tree_, React is the single owner and single source of truth. All data originates from React and there is a single-direction flow of data.

However, there is one exception and important mechanism: components in C++ can contain state that is not directly exposed to JavaScript, and JavaScript is not the source of truth. C++ and _Host Platform_ control this _C++ State_. Generally, this is only relevant if you are developing a complicated _Host Component_ that needs _C++ State_. The vast majority of _Host Components_ do not need this functionality.

For example, `ScrollView` uses this mechanism to let the renderer know what the current offset is. The update is triggered from the _host platform_, specifically from the host view that represents the `ScrollView` component. The information about offset is used in an API like [measure](https://reactnative.dev/docs/legacy/direct-manipulation#measurecallback). Since this update stems from the host platform, and does not affect the React Element Tree, this state data is held by _C++ State_.

Conceptually, _C++ State_ updates are similar to the [React State Updates](render-pipeline#react-state-updates) described above.
With two important differences:

1. They skip the “render phase” since React is not involved.
2. The updates can originate and happen on any thread, including the main thread.

### Phase 2. Commit

![Phase two: commit](/docs/assets/Architecture/renderer-pipeline/phase-two-commit.png)

When performing a _C++ State_ update, a block of code requests an update of a `ShadowNode` (**N**) to set _C++ State_ to value **S**. React Native renderer will repeatedly attempt to get the latest committed version of **N**, clone it with a new state **S**, and commit **N’** to the tree. If React, or another _C++ State_ update, has performed another commit during this time, the _C++ State_ commit will fail and the renderer will retry the _C++ State_ update many times until a commit succeeds. This prevents source-of-truth collisions and races.

### Phase 3. Mount

![Phase three: mount](/docs/assets/Architecture/renderer-pipeline/phase-three-mount.png)

The _Mount Phase_ is practically identical to the [Mount Phase of React State Updates](#react-state-updates). The renderer still needs to recompute layout, perform a tree diff, etc. See the sections above for details.
