---
id: progressbarandroid
title: '🗑️ ProgressBarAndroid'
---

:::warning[Deprecated]
Use one of the [community packages](https://reactnative.directory/?search=progressbar) instead.
:::

Android-only React component used to indicate that the app is loading or there is some activity in the app.

### Example

```SnackPlayer name=ProgressBarAndroid&supportedPlatforms=android
import {View, StyleSheet, ProgressBarAndroid, Text} from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.example}>
        <Text>Circle Progress Indicator</Text>
        <ProgressBarAndroid />
      </View>
      <View style={styles.example}>
        <Text>Horizontal Progress Indicator</Text>
        <ProgressBarAndroid styleAttr="Horizontal" />
      </View>
      <View style={styles.example}>
        <Text>Colored Progress Indicator</Text>
        <ProgressBarAndroid styleAttr="Horizontal" color="#2196F3" />
      </View>
      <View style={styles.example}>
        <Text>Fixed Progress Value</Text>
        <ProgressBarAndroid
          styleAttr="Horizontal"
          indeterminate={false}
          progress={0.5}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  example: {
    marginVertical: 24,
  },
});

export default App;
```

---

# Reference

## Props

Inherits [View Props](view.md#props).

### `animating`

Whether to show the ProgressBar (true, the default) or hide it (false).

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `color`

Color of the progress bar.

| Type               | Required |
| ------------------ | -------- |
| [color](colors.md) | No       |

---

### `indeterminate`

If the progress bar will show indeterminate progress. Note that this can only be false if styleAttr is Horizontal, and requires a `progress` value.

| Type              | Required |
| ----------------- | -------- |
| indeterminateType | No       |

---

### `progress`

The progress value (between 0 and 1).

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `styleAttr`

Style of the ProgressBar. One of:

- Horizontal
- Normal (default)
- Small
- Large
- Inverse
- SmallInverse
- LargeInverse

| Type                                                                                      | Required |
| ----------------------------------------------------------------------------------------- | -------- |
| enum('Horizontal', 'Normal', 'Small', 'Large', 'Inverse', 'SmallInverse', 'LargeInverse') | No       |

---

### `testID`

Used to locate this view in end-to-end tests.

| Type   | Required |
| ------ | -------- |
| string | No       |
