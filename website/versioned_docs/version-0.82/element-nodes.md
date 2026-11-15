---
id: element-nodes
title: Element nodes
---

Element nodes represent native components in the native view tree (similar to [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) nodes on Web).

They are provided by all native components, and by many built-in components, via refs:

```SnackPlayer ext=js&name=Element%20instances%20example
import {useEffect, useRef, useState} from 'react';
import {View, SafeAreaView, StyleSheet, Text} from 'react-native';

const ViewWithRefs = () => {
  const ref = useRef(null);
  const [viewInfo, setViewInfo] = useState('');

  useEffect(() => {
    // `element` is an object implementing the interface described here.
    const element = ref.current;
    const rect = JSON.stringify(element.getBoundingClientRect());
    setViewInfo(
      `Bounding rect is: ${rect}.\nText content is: ${element.textContent}`,
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View ref={ref} style={styles.content}>
        <Text>Hello world!</Text>
      </View>
      <Text>{viewInfo}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 10,
    backgroundColor: 'gray',
  },
});

export default ViewWithRefs;
```

:::info
Note that some built-in components are only a container for other components (including native components). For example, `ScrollView` internally renders a native scroll view and a native view, which are accessible through the ref it provides using methods like `getNativeScrollRef()` and `getInnerViewRef()`.
:::

---

## Reference

### Web-compatible API

From [`HTMLElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement):

- Properties
  - [`offsetHeight`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetHeight)
  - [`offsetLeft`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetLeft)
  - [`offsetParent`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent)
  - [`offsetTop`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetTop)
  - [`offsetWidth`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetWidth)
- Methods
  - [`blur()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/blur).
  - [`focus()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus).
    - ⚠️ The `options` parameter is not supported.

From [`Element`](https://developer.mozilla.org/en-US/docs/Web/API/Element):

- Properties
  - [`childElementCount`](https://developer.mozilla.org/en-US/docs/Web/API/Element/childElementCount)
  - [`children`](https://developer.mozilla.org/en-US/docs/Web/API/Element/children)
  - [`clientHeight`](https://developer.mozilla.org/en-US/docs/Web/API/Element/clientHeight)
  - [`clientLeft`](https://developer.mozilla.org/en-US/docs/Web/API/Element/clientLeft)
  - [`clientTop`](https://developer.mozilla.org/en-US/docs/Web/API/Element/clientTop)
  - [`clientWidth`](https://developer.mozilla.org/en-US/docs/Web/API/Element/clientWidth)
  - [`firstElementChild`](https://developer.mozilla.org/en-US/docs/Web/API/Element/firstElementChild)
  - [`id`](https://developer.mozilla.org/en-US/docs/Web/API/Element/id)
    - ℹ️ Returns the value of the `id` or `nativeID` props.
  - [`lastElementChild`](https://developer.mozilla.org/en-US/docs/Web/API/Element/lastElementChild)
  - [`nextElementSibling`](https://developer.mozilla.org/en-US/docs/Web/API/Element/nextElementSibling)
  - [`nodeName`](https://developer.mozilla.org/en-US/docs/Web/API/Element/nodeName)
  - [`nodeType`](https://developer.mozilla.org/en-US/docs/Web/API/Element/nodeType)
  - [`nodeValue`](https://developer.mozilla.org/en-US/docs/Web/API/Element/nodeValue)
  - [`previousElementSibling`](https://developer.mozilla.org/en-US/docs/Web/API/Element/previousElementSibling)
  - [`scrollHeight`](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight)
  - [`scrollLeft`](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollLeft)
    - ⚠️ For built-in components, only `ScrollView` instances can return a value other than zero.
  - [`scrollTop`](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTop)
    - ⚠️ For built-in components, only `ScrollView` instances can return a value other than zero.
  - [`scrollWidth`](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollWidth)
  - [`tagName`](https://developer.mozilla.org/en-US/docs/Web/API/Element/tagName)
    - ℹ️ Returns a normalized native component name prefixed with `RN:`, like `RN:View`.
  - [`textContent`](https://developer.mozilla.org/en-US/docs/Web/API/Element/textContent)
- Methods
  - [`getBoundingClientRect()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)
  - [`hasPointerCapture()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/hasPointerCapture)
  - [`setPointerCapture()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/setPointerCapture)
  - [`releasePointerCapture()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/releasePointerCapture)

From [`Node`](https://developer.mozilla.org/en-US/docs/Web/API/Node):

- Properties
  - [`childNodes`](https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes)
  - [`firstChild`](https://developer.mozilla.org/en-US/docs/Web/API/Node/firstChild)
  - [`isConnected`](https://developer.mozilla.org/en-US/docs/Web/API/Node/isConnected)
  - [`lastChild`](https://developer.mozilla.org/en-US/docs/Web/API/Node/lastChild)
  - [`nextSibling`](https://developer.mozilla.org/en-US/docs/Web/API/Node/nextSibling)
  - [`nodeName`](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeName)
  - [`nodeType`](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType)
  - [`nodeValue`](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeValue)
  - [`ownerDocument`](https://developer.mozilla.org/en-US/docs/Web/API/Node/ownerDocument)
    - ℹ️ Will return the [document node](/docs/next/document-nodes) where this component was rendered.
  - [`parentElement`](https://developer.mozilla.org/en-US/docs/Web/API/Node/parentElement)
  - [`parentNode`](https://developer.mozilla.org/en-US/docs/Web/API/Node/parentNode)
  - [`previousSibling`](https://developer.mozilla.org/en-US/docs/Web/API/Node/previousSibling)
  - [`textContent`](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent)
- Methods
  - [`compareDocumentPosition()`](https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition)
  - [`contains()`](https://developer.mozilla.org/en-US/docs/Web/API/Node/contains)
  - [`getRootNode()`](https://developer.mozilla.org/en-US/docs/Web/API/Node/getRootNode)
    - ℹ️ Will return a reference to itself if the component is not mounted.
  - [`hasChildNodes()`](https://developer.mozilla.org/en-US/docs/Web/API/Node/hasChildNodes)

### Legacy API

- [`measure()`](/docs/next/legacy/direct-manipulation#measurecallback)
- [`measureInWindow()`](/docs/next/legacy/direct-manipulation#measureinwindowcallback)
- [`measureLayout()`](/docs/next/legacy/direct-manipulation#measurelayoutrelativetonativecomponentref-onsuccess-onfail)
- [`setNativeProps()`](/docs/next/legacy/direct-manipulation#setnativeprops-with-touchableopacity)
