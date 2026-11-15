---
id: settings
title: Settings
---

`Settings` serves as a wrapper for [`NSUserDefaults`](https://developer.apple.com/documentation/foundation/nsuserdefaults), a persistent key-value store available only on iOS.

## Example

```SnackPlayer name=Settings%20Example&supportedPlatforms=ios
import {useState} from 'react';
import {Button, Settings, StyleSheet, Text} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const [data, setData] = useState(() => Settings.get('data'));

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text>Stored value:</Text>
        <Text style={styles.value}>{data}</Text>
        <Button
          onPress={() => {
            Settings.set({data: 'React'});
            setData(Settings.get('data'));
          }}
          title="Store 'React'"
        />
        <Button
          onPress={() => {
            Settings.set({data: 'Native'});
            setData(Settings.get('data'));
          }}
          title="Store 'Native'"
        />
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
  value: {
    fontSize: 24,
    marginVertical: 12,
  },
});

export default App;
```

---

# Reference

## Methods

### `clearWatch()`

```tsx
static clearWatch(watchId: number);
```

`watchId` is the number returned by `watchKeys()` when the subscription was originally configured.

---

### `get()`

```tsx
static get(key: string): any;
```

Get the current value for a given `key` in `NSUserDefaults`.

---

### `set()`

```tsx
static set(settings: Record<string, any>);
```

Set one or more values in `NSUserDefaults`.

---

### `watchKeys()`

```tsx
static watchKeys(keys: string | array<string>, callback: () => void): number;
```

Subscribe to be notified when the value for any of the keys specified by the `keys` parameter has been changed in `NSUserDefaults`. Returns a `watchId` number that may be used with `clearWatch()` to unsubscribe.

:::note
`watchKeys()` by design ignores internal `set()` calls and fires callback only on changes preformed outside of React Native code.
:::
