---
id: nodes
title: Nodes from refs
---

React Native apps render a native view tree that represents the UI, similar to how React DOM does on Web (the DOM tree). React Native provides imperative access to this tree via [refs](https://react.dev/learn/manipulating-the-dom-with-refs), which are returned by all native components (including those rendered by built-in components like [`View`](/docs/next/view)).

React Native provides 3 types of nodes:

- [Elements](/docs/next/element-nodes): element nodes represent native components in the native view tree (similar to [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) nodes on Web). They are provided by all native components via refs.
- [Text](/docs/next/text-nodes): text nodes represent raw text content on the tree (similar to [`Text`](https://developer.mozilla.org/en-US/docs/Web/API/Text) nodes on Web). They are not directly accessible via `refs`, but can be accessed using methods like [`childNodes`](https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes) on element refs.
- [Documents](/docs/next/document-nodes): document nodes represent a complete native view tree (similar to [`Document`](https://developer.mozilla.org/en-US/docs/Web/API/Document) nodes on Web). Like text nodes, they can only be accessed through other nodes, using properties like [`ownerDocument`](https://developer.mozilla.org/en-US/docs/Web/API/Node/ownerDocument).

As on Web, these nodes can be used to traverse the rendered UI tree, access layout information or execute imperative operations like `focus`.

:::info
**Unlike on Web, these nodes do not allow mutation** (e.g.: [`node.appendChild`](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild)), as the tree contents are fully managed by the React renderer.
:::
