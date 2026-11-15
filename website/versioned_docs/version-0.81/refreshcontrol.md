---
id: refreshcontrol
title: RefreshControl
---

This component is used inside a ScrollView or ListView to add pull to refresh functionality. When the ScrollView is at `scrollY: 0`, swiping down triggers an `onRefresh` event.

## Example

```SnackPlayer name=RefreshControl&supportedPlatforms=ios,android
import {useCallback, useState} from 'react';
import {RefreshControl, ScrollView, StyleSheet, Text} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <Text>Pull down to see RefreshControl indicator</Text>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
```

> Note: `refreshing` is a controlled prop, this is why it needs to be set to `true` in the `onRefresh` function otherwise the refresh indicator will stop immediately.

---

# Reference

## Props

### [View Props](view.md#props)

Inherits [View Props](view.md#props).

---

### <div className="label required basic">Required</div>**`refreshing`**

Whether the view should be indicating an active refresh.

| Type    |
| ------- |
| boolean |

---

### `colors` <div className="label android">Android</div>

The colors (at least one) that will be used to draw the refresh indicator.

| Type                         |
| ---------------------------- |
| array of [colors](colors.md) |

---

### `enabled` <div className="label android">Android</div>

Whether the pull to refresh functionality is enabled.

| Type    | Default |
| ------- | ------- |
| boolean | `true`  |

---

### `onRefresh`

Called when the view starts refreshing.

| Type     |
| -------- |
| function |

---

### `progressBackgroundColor` <div className="label android">Android</div>

The background color of the refresh indicator.

| Type               |
| ------------------ |
| [color](colors.md) |

---

### `progressViewOffset`

Progress view top offset.

| Type   | Default |
| ------ | ------- |
| number | `0`     |

---

### `size` <div className="label android">Android</div>

Size of the refresh indicator.

| Type                         | Default     |
| ---------------------------- | ----------- |
| enum(`'default'`, `'large'`) | `'default'` |

---

### `tintColor` <div className="label ios">iOS</div>

The color of the refresh indicator.

| Type               |
| ------------------ |
| [color](colors.md) |

---

### `title` <div className="label ios">iOS</div>

The title displayed under the refresh indicator.

| Type   |
| ------ |
| string |

---

### `titleColor` <div className="label ios">iOS</div>

The color of the refresh indicator title.

| Type               |
| ------------------ |
| [color](colors.md) |
