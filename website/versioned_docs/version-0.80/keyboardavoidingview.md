---
id: keyboardavoidingview
title: KeyboardAvoidingView
---

This component will automatically adjust its height, position, or bottom padding based on the keyboard height to remain visible while the virtual keyboard is displayed.

## Example

```SnackPlayer name=KeyboardAvoidingView&supportedPlatforms=android,ios
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
} from 'react-native';

const KeyboardAvoidingComponent = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Text style={styles.header}>Header</Text>
          <TextInput placeholder="Username" style={styles.textInput} />
          <View style={styles.btnContainer}>
            <Button title="Submit" onPress={() => null} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-around',
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },
});

export default KeyboardAvoidingComponent;
```

---

# Reference

## Props

### [View Props](view.md#props)

Inherits [View Props](view.md#props).

---

### `behavior`

Specify how to react to the presence of the keyboard.

> Android and iOS both interact with this prop differently. On both iOS and Android, setting `behavior` is recommended.

| Type                                        |
| ------------------------------------------- |
| enum(`'height'`, `'position'`, `'padding'`) |

---

### `contentContainerStyle`

The style of the content container (View) when behavior is `'position'`.

| Type                              |
| --------------------------------- |
| [View Style](view-style-props.md) |

---

### `enabled`

Enabled or disabled KeyboardAvoidingView.

| Type    | Default |
| ------- | ------- |
| boolean | `true`  |

---

### `keyboardVerticalOffset`

This is the distance between the top of the user screen and the react native view, may be non-zero in some use cases.

| Type   | Default |
| ------ | ------- |
| number | `0`     |
