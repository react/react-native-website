---
id: shadow-props
title: Shadow Props
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=Shadow%20Props&supportedPlatforms=ios&ext=js&dependencies=@react-native-community/slider
import {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';

const ShadowPropSlider = ({label, value, ...props}) => {
  return (
    <>
      <Text>
        {label} ({value.toFixed(2)})
      </Text>
      <Slider step={1} value={value} {...props} />
    </>
  );
};

const App = () => {
  const [shadowOffsetWidth, setShadowOffsetWidth] = useState(0);
  const [shadowOffsetHeight, setShadowOffsetHeight] = useState(0);
  const [shadowRadius, setShadowRadius] = useState(0);
  const [shadowOpacity, setShadowOpacity] = useState(0.1);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View
          style={[
            styles.square,
            {
              shadowOffset: {
                width: shadowOffsetWidth,
                height: -shadowOffsetHeight,
              },
              shadowOpacity,
              shadowRadius,
            },
          ]}
        />
        <View style={styles.controls}>
          <ShadowPropSlider
            label="shadowOffset - X"
            minimumValue={-50}
            maximumValue={50}
            value={shadowOffsetWidth}
            onValueChange={setShadowOffsetWidth}
          />
          <ShadowPropSlider
            label="shadowOffset - Y"
            minimumValue={-50}
            maximumValue={50}
            value={shadowOffsetHeight}
            onValueChange={setShadowOffsetHeight}
          />
          <ShadowPropSlider
            label="shadowRadius"
            minimumValue={0}
            maximumValue={100}
            value={shadowRadius}
            onValueChange={setShadowRadius}
          />
          <ShadowPropSlider
            label="shadowOpacity"
            minimumValue={0}
            maximumValue={1}
            step={0.05}
            value={shadowOpacity}
            onValueChange={val => setShadowOpacity(val)}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  square: {
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 4,
    height: 150,
    shadowColor: 'black',
    width: 150,
  },
  controls: {
    paddingHorizontal: 12,
  },
});

export default App;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=Shadow%20Props&supportedPlatforms=ios&ext=tsx&dependencies=@react-native-community/slider
import {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Slider, {SliderProps} from '@react-native-community/slider';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

type ShadowPropSliderProps = SliderProps & {
  label: string;
};

const ShadowPropSlider = ({label, value, ...props}: ShadowPropSliderProps) => {
  return (
    <>
      <Text>
        {label} ({value?.toFixed(2)})
      </Text>
      <Slider step={1} value={value} {...props} />
    </>
  );
};

const App = () => {
  const [shadowOffsetWidth, setShadowOffsetWidth] = useState(0);
  const [shadowOffsetHeight, setShadowOffsetHeight] = useState(0);
  const [shadowRadius, setShadowRadius] = useState(0);
  const [shadowOpacity, setShadowOpacity] = useState(0.1);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View
          style={[
            styles.square,
            {
              shadowOffset: {
                width: shadowOffsetWidth,
                height: -shadowOffsetHeight,
              },
              shadowOpacity,
              shadowRadius,
            },
          ]}
        />
        <View style={styles.controls}>
          <ShadowPropSlider
            label="shadowOffset - X"
            minimumValue={-50}
            maximumValue={50}
            value={shadowOffsetWidth}
            onValueChange={setShadowOffsetWidth}
          />
          <ShadowPropSlider
            label="shadowOffset - Y"
            minimumValue={-50}
            maximumValue={50}
            value={shadowOffsetHeight}
            onValueChange={setShadowOffsetHeight}
          />
          <ShadowPropSlider
            label="shadowRadius"
            minimumValue={0}
            maximumValue={100}
            value={shadowRadius}
            onValueChange={setShadowRadius}
          />
          <ShadowPropSlider
            label="shadowOpacity"
            minimumValue={0}
            maximumValue={1}
            step={0.05}
            value={shadowOpacity}
            onValueChange={val => setShadowOpacity(val)}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  square: {
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 4,
    height: 150,
    shadowColor: 'black',
    width: 150,
  },
  controls: {
    paddingHorizontal: 12,
  },
});

export default App;
```

</TabItem>
</Tabs>

---

# Reference

There are 3 sets of shadow APIs in React Native:

- `boxShadow`: A View style prop and a spec-compliant implementation of the [web style prop of the same name](https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow).
- `dropShadow`: A specific filter function available as part of the [`filter`](./view-style-props#filter) View style prop.
- Various `shadow` props (`shadowColor`, `shadowOffset`, `shadowOpacity`, `shadowRadius`): These map directly to their native counterparts exposed by the platform-level APIs.

The difference between `dropShadow` and `boxShadow` are as follows:

- `dropShadow` exists as part of `filter`, whereas `boxShadow` is a standalone style prop.
- `dropShadow` is an alpha mask, so only pixels with a positive alpha value will "cast" a shadow. `boxShadow` will cast around the border box of the element no matter it's contents (unless it is inset).
- `dropShadow` is only available on Android, `boxShadow` is available on iOS and Android.
- `dropShadow` cannot be inset like `boxShadow`.
- `dropShadow` does not have the `spreadDistance` argument like `boxShadow`.

Both `boxShadow` and `dropShadow` are generally more capable than the `shadow` props. The `shadow` props, however, map to native platform-level APIs, so if you only need a straightforward shadow these props are recommended. Note that only `shadowColor` works on both Android and iOS, all other `shadow` props only work on iOS.

## Props

### `boxShadow`

See [View Style Props](./view-style-props#boxshadow) for documentation.

### `dropShadow` <div className="label android">Android</div>

See [View Style Props](./view-style-props#filter) for documentation.

### `shadowColor`

Sets the drop shadow color.

This property will only work on Android API 28 and above. For similar functionality on lower Android APIs, use the [`elevation` property](view-style-props#elevation-android).

| Type               |
| ------------------ |
| [color](colors.md) |

---

### `shadowOffset` <div className="label ios">iOS</div>

Sets the drop shadow offset.

| Type                                     |
| ---------------------------------------- |
| object: `{width: number,height: number}` |

---

### `shadowOpacity` <div className="label ios">iOS</div>

Sets the drop shadow opacity (multiplied by the color's alpha component).

| Type   |
| ------ |
| number |

---

### `shadowRadius` <div className="label ios">iOS</div>

Sets the drop shadow blur radius.

| Type   |
| ------ |
| number |
