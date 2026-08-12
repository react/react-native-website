---
id: layout-props
title: Layout Props
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

:::info
More detailed examples about those properties can be found on the [Layout with Flexbox](flexbox) page.
:::

### Example

The following example shows how different properties can affect or shape a React Native layout. You can try for example to add or remove squares from the UI while changing the values of the property `flexWrap`.

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=LayoutProps%20Example&ext=js
import {useState} from 'react';
import {Button, ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const [flexDirection, setFlexDirection] = useState(0);
  const [justifyContent, setJustifyContent] = useState(0);
  const [alignItems, setAlignItems] = useState(0);
  const [direction, setDirection] = useState(0);
  const [wrap, setWrap] = useState(0);

  const [squares, setSquares] = useState([<Square />, <Square />, <Square />]);

  const hookedStyles = {
    flexDirection: flexDirections[flexDirection],
    justifyContent: justifyContents[justifyContent],
    alignItems: alignItemsArr[alignItems],
    direction: directions[direction],
    flexWrap: wraps[wrap],
  };

  const changeSetting = (value, options, setterFunction) => {
    if (value === options.length - 1) {
      setterFunction(0);
      return;
    }
    setterFunction(value + 1);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={[styles.container, styles.playingSpace, hookedStyles]}>
          {squares.map(elem => elem)}
        </View>
        <ScrollView style={styles.layoutContainer}>
          <View style={styles.controlSpace}>
            <View style={styles.buttonView}>
              <Button
                title="Change Flex Direction"
                onPress={() =>
                  changeSetting(flexDirection, flexDirections, setFlexDirection)
                }
              />
              <Text style={styles.text}>{flexDirections[flexDirection]}</Text>
            </View>
            <View style={styles.buttonView}>
              <Button
                title="Change Justify Content"
                onPress={() =>
                  changeSetting(
                    justifyContent,
                    justifyContents,
                    setJustifyContent,
                  )
                }
              />
              <Text style={styles.text}>{justifyContents[justifyContent]}</Text>
            </View>
            <View style={styles.buttonView}>
              <Button
                title="Change Align Items"
                onPress={() =>
                  changeSetting(alignItems, alignItemsArr, setAlignItems)
                }
              />
              <Text style={styles.text}>{alignItemsArr[alignItems]}</Text>
            </View>
            <View style={styles.buttonView}>
              <Button
                title="Change Direction"
                onPress={() =>
                  changeSetting(direction, directions, setDirection)
                }
              />
              <Text style={styles.text}>{directions[direction]}</Text>
            </View>
            <View style={styles.buttonView}>
              <Button
                title="Change Flex Wrap"
                onPress={() => changeSetting(wrap, wraps, setWrap)}
              />
              <Text style={styles.text}>{wraps[wrap]}</Text>
            </View>
            <View style={styles.buttonView}>
              <Button
                title="Add Square"
                onPress={() => setSquares([...squares, <Square />])}
              />
            </View>
            <View style={styles.buttonView}>
              <Button
                title="Delete Square"
                onPress={() =>
                  setSquares(squares.filter((v, i) => i !== squares.length - 1))
                }
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const flexDirections = ['row', 'row-reverse', 'column', 'column-reverse'];
const justifyContents = [
  'flex-start',
  'flex-end',
  'center',
  'space-between',
  'space-around',
  'space-evenly',
];
const alignItemsArr = [
  'flex-start',
  'flex-end',
  'center',
  'stretch',
  'baseline',
];
const wraps = ['nowrap', 'wrap', 'wrap-reverse'];
const directions = ['inherit', 'ltr', 'rtl'];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  layoutContainer: {
    flex: 0.5,
  },
  playingSpace: {
    backgroundColor: 'white',
    borderColor: 'blue',
    borderWidth: 3,
    overflow: 'hidden',
  },
  controlSpace: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  buttonView: {
    width: '50%',
    padding: 10,
  },
  text: {
    textAlign: 'center',
  },
});

const Square = () => (
  <View
    style={{
      width: 50,
      height: 50,
      backgroundColor: randomHexColor(),
    }}
  />
);

const randomHexColor = () => {
  return '#000000'.replace(/0/g, () => {
    return Math.round(Math.random() * 14).toString(16);
  });
};

export default App;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=LayoutProps%20Example&ext=tsx
import {useState} from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlexAlignType,
  FlexStyle,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const [flexDirection, setFlexDirection] = useState(0);
  const [justifyContent, setJustifyContent] = useState(0);
  const [alignItems, setAlignItems] = useState(0);
  const [direction, setDirection] = useState(0);
  const [wrap, setWrap] = useState(0);

  const [squares, setSquares] = useState([<Square />, <Square />, <Square />]);

  const hookedStyles = {
    flexDirection: flexDirections[flexDirection],
    justifyContent: justifyContents[justifyContent],
    alignItems: alignItemsArr[alignItems],
    direction: directions[direction],
    flexWrap: wraps[wrap],
  } as FlexStyle;

  const changeSetting = (
    value: number,
    options: any[],
    setterFunction: (index: number) => void,
  ) => {
    if (value === options.length - 1) {
      setterFunction(0);
      return;
    }
    setterFunction(value + 1);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={[styles.container, styles.playingSpace, hookedStyles]}>
          {squares.map(elem => elem)}
        </View>
        <ScrollView style={styles.layoutContainer}>
          <View style={styles.controlSpace}>
            <View style={styles.buttonView}>
              <Button
                title="Change Flex Direction"
                onPress={() =>
                  changeSetting(flexDirection, flexDirections, setFlexDirection)
                }
              />
              <Text style={styles.text}>{flexDirections[flexDirection]}</Text>
            </View>
            <View style={styles.buttonView}>
              <Button
                title="Change Justify Content"
                onPress={() =>
                  changeSetting(
                    justifyContent,
                    justifyContents,
                    setJustifyContent,
                  )
                }
              />
              <Text style={styles.text}>{justifyContents[justifyContent]}</Text>
            </View>
            <View style={styles.buttonView}>
              <Button
                title="Change Align Items"
                onPress={() =>
                  changeSetting(alignItems, alignItemsArr, setAlignItems)
                }
              />
              <Text style={styles.text}>{alignItemsArr[alignItems]}</Text>
            </View>
            <View style={styles.buttonView}>
              <Button
                title="Change Direction"
                onPress={() =>
                  changeSetting(direction, directions, setDirection)
                }
              />
              <Text style={styles.text}>{directions[direction]}</Text>
            </View>
            <View style={styles.buttonView}>
              <Button
                title="Change Flex Wrap"
                onPress={() => changeSetting(wrap, wraps, setWrap)}
              />
              <Text style={styles.text}>{wraps[wrap]}</Text>
            </View>
            <View style={styles.buttonView}>
              <Button
                title="Add Square"
                onPress={() => setSquares([...squares, <Square />])}
              />
            </View>
            <View style={styles.buttonView}>
              <Button
                title="Delete Square"
                onPress={() =>
                  setSquares(squares.filter((v, i) => i !== squares.length - 1))
                }
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const flexDirections = [
  'row',
  'row-reverse',
  'column',
  'column-reverse',
] as FlexStyle['flexDirection'][];
const justifyContents = [
  'flex-start',
  'flex-end',
  'center',
  'space-between',
  'space-around',
  'space-evenly',
] as FlexStyle['justifyContent'][];
const alignItemsArr = [
  'flex-start',
  'flex-end',
  'center',
  'stretch',
  'baseline',
] as FlexAlignType[];
const wraps = ['nowrap', 'wrap', 'wrap-reverse'];
const directions = ['inherit', 'ltr', 'rtl'];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  layoutContainer: {
    flex: 0.5,
  },
  playingSpace: {
    backgroundColor: 'white',
    borderColor: 'blue',
    borderWidth: 3,
    overflow: 'hidden',
  },
  controlSpace: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  buttonView: {
    width: '50%',
    padding: 10,
  },
  text: {
    textAlign: 'center',
  },
});

const Square = () => (
  <View
    style={{
      width: 50,
      height: 50,
      backgroundColor: randomHexColor(),
    }}
  />
);

const randomHexColor = () => {
  return '#000000'.replace(/0/g, () => {
    return Math.round(Math.random() * 14).toString(16);
  });
};

export default App;
```

</TabItem>
</Tabs>

---

# Reference

## Props

### `alignContent`

`alignContent` controls how rows align in the cross direction, overriding the `alignContent` of the parent.

See [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/align-content) for more details.

| Type                                                                                                 | Required |
| ---------------------------------------------------------------------------------------------------- | -------- |
| enum('flex-start', 'flex-end', 'center', 'stretch', 'space-between', 'space-around', 'space-evenly') | No       |

---

### `alignItems`

`alignItems` aligns children in the cross direction. For example, if children are flowing vertically, `alignItems` controls how they align horizontally. It works like `align-items` in CSS (default: stretch).

See [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items) for more details.

| Type                                                            | Required |
| --------------------------------------------------------------- | -------- |
| enum('flex-start', 'flex-end', 'center', 'stretch', 'baseline') | No       |

---

### `alignSelf`

`alignSelf` controls how a child aligns in the cross direction, overriding the `alignItems` of the parent. It works like `align-self` in CSS (default: auto).

See [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/align-self) for more details.

| Type                                                                    | Required |
| ----------------------------------------------------------------------- | -------- |
| enum('auto', 'flex-start', 'flex-end', 'center', 'stretch', 'baseline') | No       |

---

### `aspectRatio`

Aspect ratio controls the size of the undefined dimension of a node.

- On a node with a set width/height, aspect ratio controls the size of the unset dimension
- On a node with a set flex basis, aspect ratio controls the size of the node in the cross axis if unset
- On a node with a measure function, aspect ratio works as though the measure function measures the flex basis
- On a node with flex grow/shrink, aspect ratio controls the size of the node in the cross axis if unset
- Aspect ratio takes min/max dimensions into account

See [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio) for more details.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `borderBottomWidth`

`borderBottomWidth` works like `border-bottom-width` in CSS.

See [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom-width) for more details.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `borderEndWidth`

When direction is `ltr`, `borderEndWidth` is equivalent to `borderRightWidth`. When direction is `rtl`, `borderEndWidth` is equivalent to `borderLeftWidth`.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `borderLeftWidth`

`borderLeftWidth` works like `border-left-width` in CSS.

See [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/border-left-width) for more details.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `borderRightWidth`

`borderRightWidth` works like `border-right-width` in CSS.

See [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/border-right-width) for more details.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `borderStartWidth`

When direction is `ltr`, `borderStartWidth` is equivalent to `borderLeftWidth`. When direction is `rtl`, `borderStartWidth` is equivalent to `borderRightWidth`.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `borderTopWidth`

`borderTopWidth` works like `border-top-width` in CSS.

See [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/border-top-width) for more details.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `borderWidth`

`borderWidth` works like `border-width` in CSS.

See [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/border-width) for more details.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `bottom`

`bottom` is the number of logical pixels to offset the bottom edge of this component.

It works similarly to `bottom` in CSS, but in React Native you must use points or percentages. Ems and other units are not supported.

See [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/bottom) for more details of how `bottom` affects layout.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `boxSizing`

`boxSizing` defines how the element's various sizing props (`width`, `height`, `minWidth`, `minHeight`, etc.) are computed. If `boxSizing` is `border-box`, these sizes apply to the border box of the element. If it is `content-box`, they apply to the content box of the element. The default value is `border-box`. The [web documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing) is a good source of information if you wish to learn more about how this prop works.

| Type                              | Required |
| --------------------------------- | -------- |
| enum('border-box', 'content-box') | No       |

---

### `columnGap`

`columnGap` works like `column-gap` in CSS. Only pixel units are supported in React Native.

See [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/column-gap) for more details.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `direction`

`direction` specifies the directional flow of the user interface. The default is `inherit`, except for root node which will have value based on the current locale.

See [MDN CSS Reference](https://www.yogalayout.dev/docs/styling/layout-direction) for more details.

| Type                          | Required |
| ----------------------------- | -------- |
| enum('inherit', 'ltr', 'rtl') | No       |

---

### `display`

`display` sets the display type of this component.

It works similarly to `display` in CSS but only supports the values 'flex', 'none', and 'contents'. The default is `flex`.

| Type                             | Required |
| -------------------------------- | -------- |
| enum('none', 'flex', 'contents') | No       |

---

### `end`

When the direction is `ltr`, `end` is equivalent to `right`. When the direction is `rtl`, `end` is equivalent to `left`.

This style takes precedence over the `left` and `right` styles.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `flex`

In React Native `flex` does not work the same way that it does in CSS. `flex` is a number rather than a string, and it works according to the [Yoga](https://github.com/facebook/yoga) layout engine.

When `flex` is a positive number, it makes the component flexible, and it will be sized proportional to its flex value. So a component with `flex` set to `2` will take twice the space as a component with `flex` set to 1. `flex: <positive number>` equates to `flexGrow: <positive number>, flexShrink: 1, flexBasis: 0`.

When `flex` is `0`, the component is sized according to `width` and `height`, and it is inflexible.

When `flex` is `-1`, the component is normally sized according to `width` and `height`. However, if there's not enough space, the component will shrink to its `minWidth` and `minHeight`.

`flexGrow`, `flexShrink`, and `flexBasis` work the same as in CSS.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `flexBasis`

`flexBasis` is an axis-independent way of providing the default size of an item along the main axis. Setting the `flexBasis` of a child is similar to setting the `width` of that child if its parent is a container with `flexDirection: row` or setting the `height` of a child if its parent is a container with `flexDirection: column`. The `flexBasis` of an item is the default size of that item, the size of the item before any `flexGrow` and `flexShrink` calculations are performed.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `flexDirection`

`flexDirection` controls which directions children of a container go. `row` goes left to right, `column` goes top to bottom, and you may be able to guess what the other two do. It works like `flex-direction` in CSS, except the default is `column`.

See [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction) for more details.

| Type                                                   | Required |
| ------------------------------------------------------ | -------- |
| enum('row', 'row-reverse', 'column', 'column-reverse') | No       |

---

### `flexGrow`

`flexGrow` describes how any space within a container should be distributed among its children along the main axis. After laying out its children, a container will distribute any remaining space according to the flex grow values specified by its children.

`flexGrow` accepts any floating point value >= 0, with 0 being the default value. A container will distribute any remaining space among its children weighted by the children’s `flexGrow` values.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `flexShrink`

[`flexShrink`](layout-props#flexshrink) describes how to shrink children along the main axis in the case in which the total size of the children overflows the size of the container on the main axis. `flexShrink` is very similar to `flexGrow` and can be thought of in the same way if any overflowing size is considered to be negative remaining space. These two properties also work well together by allowing children to grow and shrink as needed.

`flexShrink` accepts any floating point value >= 0, with 0 being the default value. A container will shrink its children weighted by the children’s `flexShrink` values.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `flexWrap`

`flexWrap` controls whether children can wrap around after they hit the end of a flex container. It works like `flex-wrap` in CSS (default: nowrap).

Note it does not work anymore with `alignItems: stretch` (the default), so you may want to use `alignItems: flex-start` for example (breaking change details: https://github.com/facebook/react-native/releases/tag/v0.28.0).

See [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap) for more details.

| Type                                   | Required |
| -------------------------------------- | -------- |
| enum('wrap', 'nowrap', 'wrap-reverse') | No       |

---

### `gap`

`gap` works like `gap` in CSS. Only pixel units are supported in React Native.

See [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/gap) for more details.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `height`

`height` sets the height of this component.

It works similarly to `height` in CSS, but in React Native you must use points or percentages. Ems and other units are not supported.

See [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/height) for more details.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `inset`

:::note
`inset` is only available on the [New Architecture](/architecture/landing-page)
:::

Setting `inset` has the same effect as setting each of `top`, `bottom`, `right` and `left` props.

See [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/inset) for more details.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `insetBlock`

:::note
`insetBlock` is only available on the [New Architecture](/architecture/landing-page)
:::

Equivalent to [`top`](layout-props#top) and [`bottom`](layout-props#bottom).

See [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/inset-block) for more details.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `insetBlockEnd`

:::note
`insetBlockEnd` is only available on the [New Architecture](/architecture/landing-page)
:::

Equivalent to [`bottom`](layout-props#bottom).

See [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/inset-block-end) for more details.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `insetBlockStart`

:::note
`insetBlockStart` is only available on the [New Architecture](/architecture/landing-page)
:::

Equivalent to [`top`](layout-props#top).

See [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/inset-block-start) for more details.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `insetInline`

:::note
`insetInline` is only available on the [New Architecture](/architecture/landing-page)
:::

Equivalent to [`right`](layout-props#right) and [`left`](layout-props#left).

See [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/inset-inline) for more details.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `insetInlineEnd`

:::note
`insetInlineEnd` is only available on the [New Architecture](/architecture/landing-page)
:::

When direction is `ltr`, `insetInlineEnd` is equivalent to [`right`](layout-props#right). When direction is `rtl`, `insetInlineEnd` is equivalent to [`left`](layout-props#left).

See [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/inset-inline-end) for more details.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `insetInlineStart`

:::note
`insetInlineStart` is only available on the [New Architecture](/architecture/landing-page)
:::

When direction is `ltr`, `insetInlineStart` is equivalent to [`left`](layout-props#left). When direction is `rtl`, `insetInlineStart` is equivalent to [`right`](layout-props#right).

See [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/inset-inline-start) for more details.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `isolation`

:::note
`isolation` is only available on the [New Architecture](/architecture/landing-page)
:::

`isolation` lets you form a [stacking context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_positioned_layout/Stacking_context).

There are two values:

- `auto` (default): Does nothing.
- `isolate`: Forms a stacking context.

| Type                    | Required |
| ----------------------- | -------- |
| enum('auto', 'isolate') | No       |

---

### `justifyContent`

`justifyContent` aligns children in the main direction. For example, if children are flowing vertically, `justifyContent` controls how they align vertically. It works like `justify-content` in CSS (default: flex-start).

See [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content) for more details.

| Type                                                                                      | Required |
| ----------------------------------------------------------------------------------------- | -------- |
| enum('flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly') | No       |

---

### `left`

`left` is the number of logical pixels to offset the left edge of this component.

It works similarly to `left` in CSS, but in React Native you must use points or percentages. Ems and other units are not supported.

See [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/left) for more details of how `left` affects layout.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `margin`

Setting `margin` has the same effect as setting each of `marginTop`, `marginLeft`, `marginBottom`, and `marginRight`.

See [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/margin) for more details.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `marginBottom`

`marginBottom` works like `margin-bottom` in CSS. See [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-bottom) for more details.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `marginBlock`

Equivalent to [`marginVertical`](layout-props#marginvertical).

See [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/margin-block) for more details.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `marginBlockEnd`

Equivalent to [`marginBottom`](layout-props#marginbottom).

See [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/margin-block-end) for more details.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `marginBlockStart`

Equivalent to [`marginTop`](layout-props#margintop).

See [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/margin-block-start) for more details.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `marginEnd`

When direction is `ltr`, `marginEnd` is equivalent to `marginRight`. When direction is `rtl`, `marginEnd` is equivalent to `marginLeft`.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `marginHorizontal`

Setting `marginHorizontal` has the same effect as setting both `marginLeft` and `marginRight`.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `marginInline`

Equivalent to [`marginHorizontal`](layout-props#marginhorizontal).

See [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/margin-inline) for more details.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `marginInlineEnd`

When direction is `ltr`, `marginInlineEnd` is equivalent to [`marginEnd`](layout-props#marginend) (i.e. `marginRight`). When direction is `rtl`, `marginInlineEnd` is equivalent to [`marginEnd`](layout-props#marginend) (i.e. `marginLeft`).

See [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/margin-inline-end) for more details.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `marginInlineStart`

When direction is `ltr`, `marginInlineStart` is equivalent to [`marginStart`](layout-props#marginstart) (i.e. `marginLeft`). When direction is `rtl`, `marginInlineStart` is equivalent to [`marginStart`](layout-props#marginstart) (i.e. `marginRight`).

See [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/margin-inline-start) for more details.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `marginLeft`

`marginLeft` works like `margin-left` in CSS. See [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-left) for more details.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `marginRight`

`marginRight` works like `margin-right` in CSS.

See [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-right) for more details.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `marginStart`

When direction is `ltr`, `marginStart` is equivalent to `marginLeft`. When direction is `rtl`, `marginStart` is equivalent to `marginRight`.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `marginTop`

`marginTop` works like `margin-top` in CSS.

See [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-top) for more details.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `marginVertical`

Setting `marginVertical` has the same effect as setting both `marginTop` and `marginBottom`.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `maxHeight`

`maxHeight` is the maximum height for this component, in logical pixels.

It works similarly to `max-height` in CSS, but in React Native you must use points or percentages. Ems and other units are not supported.

See [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/max-height) for more details.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `maxWidth`

`maxWidth` is the maximum width for this component, in logical pixels.

It works similarly to `max-width` in CSS, but in React Native you must use points or percentages. Ems and other units are not supported.

See [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/max-width) for more details.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `minHeight`

`minHeight` is the minimum height for this component, in logical pixels.

It works similarly to `min-height` in CSS, but in React Native you must use points or percentages. Ems and other units are not supported.

See [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/min-height) for more details.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `minWidth`

`minWidth` is the minimum width for this component, in logical pixels.

It works similarly to `min-width` in CSS, but in React Native you must use points or percentages. Ems and other units are not supported.

See [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/min-width) for more details.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `overflow`

`overflow` controls how children are measured and displayed. `overflow: hidden` causes views to be clipped while `overflow: scroll` causes views to be measured independently of their parents' main axis. It works like `overflow` in CSS (default: visible).

See [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow) for more details.

| Type                                | Required |
| ----------------------------------- | -------- |
| enum('visible', 'hidden', 'scroll') | No       |

---

### `padding`

Setting `padding` has the same effect as setting each of `paddingTop`, `paddingBottom`, `paddingLeft`, and `paddingRight`.

See [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/padding) for more details.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `paddingBottom`

`paddingBottom` works like `padding-bottom` in CSS.

See [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-bottom) for more details.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `paddingBlock`

Equivalent to [`paddingVertical`](layout-props#paddingvertical).

See [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/padding-block) for more details.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `paddingBlockEnd`

Equivalent to [`paddingBottom`](layout-props#paddingbottom).

See [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/padding-block-end) for more details.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `paddingBlockStart`

Equivalent to [`paddingTop`](layout-props#paddingtop).

See [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/padding-block-start) for more details.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `paddingEnd`

When direction is `ltr`, `paddingEnd` is equivalent to `paddingRight`. When direction is `rtl`, `paddingEnd` is equivalent to `paddingLeft`.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `paddingHorizontal`

Setting `paddingHorizontal` is like setting both of `paddingLeft` and `paddingRight`.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `paddingInline`

Equivalent to [`paddingHorizontal`](layout-props#paddinghorizontal).

See [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/padding-inline) for more details.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `paddingInlineEnd`

When direction is `ltr`, `paddingInlineEnd` is equivalent to [`paddingEnd`](layout-props#paddingend) (i.e. `paddingRight`). When direction is `rtl`, `paddingInlineEnd` is equivalent to [`paddingEnd`](layout-props#paddingend) (i.e. `paddingLeft`).

See [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/padding-inline-end) for more details.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `paddingInlineStart`

When direction is `ltr`, `paddingInlineStart` is equivalent to [`paddingStart`](layout-props#paddingstart) (i.e. `paddingLeft`). When direction is `rtl`, `paddingInlineStart` is equivalent to [`paddingStart`](layout-props#paddingstart) (i.e. `paddingRight`).

See [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/padding-inline-start) for more details.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `paddingLeft`

`paddingLeft` works like `padding-left` in CSS.

See [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-left) for more details.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `paddingRight`

`paddingRight` works like `padding-right` in CSS.

See [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-right) for more details.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `paddingStart`

When direction is `ltr`, `paddingStart` is equivalent to `paddingLeft`. When direction is `rtl`, `paddingStart` is equivalent to `paddingRight`.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `paddingTop`

`paddingTop` works like `padding-top` in CSS.

See [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-top) for more details.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `paddingVertical`

Setting `paddingVertical` is like setting both of `paddingTop` and `paddingBottom`.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `position`

`position` in React Native is similar to [regular CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/position), but everything is set to `relative` by default.

`relative` will position an element according to the normal flow of the layout. Insets (`top`, `bottom`, `left`, `right`) will offset relative to this layout.

`absolute` takes the element out of the normal flow of the layout. Insets will offset relative to its [containing block](./flexbox.md#the-containing-block).

`static` will position an element according to the normal flow of the layout. Insets will have no effect.
`static` elements do not form a containing block for absolute descendants.

For more information, see the [Layout with Flexbox docs](./flexbox.md#position). Also, [the Yoga documentation](https://www.yogalayout.dev/docs/styling/position) has more details on how `position` differs between React Native and CSS.

| Type                                   | Required |
| -------------------------------------- | -------- |
| enum('absolute', 'relative', 'static') | No       |

---

### `right`

`right` is the number of logical pixels to offset the right edge of this component.

It works similarly to `right` in CSS, but in React Native you must use points or percentages. Ems and other units are not supported.

See [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/right) for more details of how `right` affects layout.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `rowGap`

`rowGap` works like `row-gap` in CSS. Only pixel units are supported in React Native.

See [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/row-gap) for more details.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `start`

When the direction is `ltr`, `start` is equivalent to `left`. When the direction is `rtl`, `start` is equivalent to `right`.

This style takes precedence over the `left`, `right`, and `end` styles.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `top`

`top` is the number of logical pixels to offset the top edge of this component.

It works similarly to `top` in CSS, but in React Native you must use points or percentages. Ems and other units are not supported.

See [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/top) for more details of how `top` affects layout.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `width`

`width` sets the width of this component.

It works similarly to `width` in CSS, but in React Native you must use points or percentages. Ems and other units are not supported.

See [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/width) for more details.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `zIndex`

`zIndex` controls which components display on top of others. Normally, you don't use `zIndex`. Components render according to their order in the document tree, so later components draw over earlier ones. `zIndex` may be useful if you have animations or custom modal interfaces where you don't want this behavior.

It works like the CSS `z-index` property - components with a larger `zIndex` will render on top. Think of the z-direction like it's pointing from the phone into your eyeball.

On iOS, `zIndex` may require `View`s to be siblings of each other for it to work as expected.

See [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/z-index) for more details.

| Type   | Required |
| ------ | -------- |
| number | No       |
