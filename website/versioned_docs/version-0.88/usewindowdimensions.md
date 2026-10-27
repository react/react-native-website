---
id: usewindowdimensions
title: useWindowDimensions
---

```tsx
import {useWindowDimensions} from 'react-native';
```

`useWindowDimensions` automatically updates all of its values when screen size or font scale changes. You can get your application window's width and height like so:

```tsx
const {height, width} = useWindowDimensions();
```

## Example

```SnackPlayer name=useWindowDimensions&supportedPlatforms=ios,android
import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const {height, width, scale, fontScale} = useWindowDimensions();
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Window Dimension Data</Text>
        <View>
          <Text>Height: {height}</Text>
          <Text>Width: {width}</Text>
          <Text>Font scale: {fontScale}</Text>
          <Text>Pixel ratio: {scale}</Text>
        </View>
        <View
          style={{
            width: 100 * fontScale,
            padding: 16 * fontScale,
            ...styles.box,
          }}>
          <Text style={{fontSize: 14 / fontScale}}>Dynamic Box</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  header: {
    fontSize: 20,
  },
  box: {
    minWidth: 100,
    backgroundColor: '#06bcee',
  },
});

export default App;
```

## Properties

### `fontScale`

```tsx
useWindowDimensions().fontScale;
```

The scale of the font currently used. Some operating systems allow users to scale their font sizes larger or smaller for reading comfort. This property will let you know what is in effect.

:::note
Changing the font size percentage can be leveraged to dynamically adjust the sizes of UI elements, such as padding, margins, and container heights, to ensure a consistent and accessible user experience. By using the fontScale property, developers can make their applications more adaptable to users' preferences for larger or smaller text, enhancing readability and usability.
:::

---

### `height`

```tsx
useWindowDimensions().height;
```

The height in pixels of the window or screen your app occupies.

---

### `scale`

```tsx
useWindowDimensions().scale;
```

The pixel ratio of the device your app is running on. The values can be:

- `1` which indicates that one point equals one pixel (usually PPI/DPI of 96, 76 on some platforms).
- `2` or `3` which indicates a Retina or high DPI display.

---

### `width`

```tsx
useWindowDimensions().width;
```

The width in pixels of the window or screen your app occupies.
