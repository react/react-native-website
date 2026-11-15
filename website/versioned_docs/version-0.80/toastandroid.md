---
id: toastandroid
title: ToastAndroid
---

React Native's ToastAndroid API exposes the Android platform's ToastAndroid module as a JS module. It provides the method `show(message, duration)` which takes the following parameters:

- _message_ A string with the text to toast
- _duration_ The duration of the toast—either `ToastAndroid.SHORT` or `ToastAndroid.LONG`

You can alternatively use `showWithGravity(message, duration, gravity)` to specify where the toast appears in the screen's layout. May be `ToastAndroid.TOP`, `ToastAndroid.BOTTOM` or `ToastAndroid.CENTER`.

The `showWithGravityAndOffset(message, duration, gravity, xOffset, yOffset)` method adds the ability to specify an offset with in pixels.

> Starting with Android 11 (API level 30), setting the gravity has no effect on text toasts. Read about the changes [here](https://developer.android.com/about/versions/11/behavior-changes-11#text-toast-api-changes).

```SnackPlayer name=Toast%20Android%20API%20Example&supportedPlatforms=android
import {StyleSheet, ToastAndroid, Button, StatusBar} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const showToast = () => {
    ToastAndroid.show('A pikachu appeared nearby !', ToastAndroid.SHORT);
  };

  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      'All Your Base Are Belong To Us',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  const showToastWithGravityAndOffset = () => {
    ToastAndroid.showWithGravityAndOffset(
      'A wild toast appeared!',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Button title="Toggle Toast" onPress={() => showToast()} />
        <Button
          title="Toggle Toast With Gravity"
          onPress={() => showToastWithGravity()}
        />
        <Button
          title="Toggle Toast With Gravity & Offset"
          onPress={() => showToastWithGravityAndOffset()}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#888888',
    padding: 8,
  },
});

export default App;
```

---

# Reference

## Methods

### `show()`

```tsx
static show(message: string, duration: number);
```

---

### `showWithGravity()`

This property will only work on Android API 29 and below. For similar functionality on higher Android APIs, consider using snackbar or notification.

```tsx
static showWithGravity(message: string, duration: number, gravity: number);
```

---

### `showWithGravityAndOffset()`

This property will only work on Android API 29 and below. For similar functionality on higher Android APIs, consider using snackbar or notification.

```tsx
static showWithGravityAndOffset(
  message: string,
  duration: number,
  gravity: number,
  xOffset: number,
  yOffset: number,
);
```

## Properties

### `SHORT`

Indicates the duration on the screen.

```tsx
static SHORT: number;
```

---

### `LONG`

Indicates the duration on the screen.

```tsx
static LONG: number;
```

---

### `TOP`

Indicates the position on the screen.

```tsx
static TOP: number;
```

---

### `BOTTOM`

Indicates the position on the screen.

```tsx
static BOTTOM: number;
```

---

### `CENTER`

Indicates the position on the screen.

```tsx
static CENTER: number;
```
