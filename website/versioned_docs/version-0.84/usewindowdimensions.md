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
import {StyleSheet, Text, useWindowDimensions} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const {height, width, scale, fontScale} = useWindowDimensions();
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Window Dimension Data</Text>
        <Text>Height: {height}</Text>
        <Text>Width: {width}</Text>
        <Text>Font scale: {fontScale}</Text>
        <Text>Pixel ratio: {scale}</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    marginBottom: 12,
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
