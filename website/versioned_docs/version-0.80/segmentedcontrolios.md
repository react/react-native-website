---
id: segmentedcontrolios
title: '❌ SegmentedControlIOS'
---

> **Removed from React Native.** Use one of the [community packages](https://reactnative.directory/?search=segmentedcontrol) instead.

Uses `SegmentedControlIOS` to render a UISegmentedControl iOS.

#### Programmatically changing selected index

The selected index can be changed on the fly by assigning the selectedIndex prop to a state variable, then changing that variable. Note that the state variable would need to be updated as the user selects a value and changes the index, as shown in the example below.

## Example

```SnackPlayer name=SegmentedControlIOS%20Example&supportedPlatforms=ios&ext=js
import {useState} from 'react';
import {SegmentedControlIOS, StyleSheet, Text, View} from 'react-native';

const App = () => {
  const [index, setIndex] = useState(0);
  return (
    <View style={styles.container}>
      <SegmentedControlIOS
        values={['One', 'Two']}
        selectedIndex={index}
        onChange={event => {
          setIndex(event.nativeEvent.selectedSegmentIndex);
        }}
      />
      <Text style={styles.text}>Selected index: {index}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  text: {
    marginTop: 24,
  },
});

export default App;
```

---

# Reference

## Props

Inherits [View Props](view.md#props).

### `enabled`

If false the user won't be able to interact with the control. Default value is true.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `momentary`

If true, then selecting a segment won't persist visually. The `onValueChange` callback will still work as expected.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `onChange`

Callback that is called when the user taps a segment; passes the event as an argument

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onValueChange`

Callback that is called when the user taps a segment; passes the segment's value as an argument

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `selectedIndex`

The index in `props.values` of the segment to be (pre)selected.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `tintColor`

> **Note:** `tintColor` is not supported on the iOS 13+.

Accent color of the control.

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### `values`

The labels for the control's segment buttons, in order.

| Type            | Required |
| --------------- | -------- |
| array of string | No       |
