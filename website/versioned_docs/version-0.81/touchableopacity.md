---
id: touchableopacity
title: TouchableOpacity
---

> If you're looking for a more extensive and future-proof way to handle touch-based input, check out the [Pressable](pressable.md) API.

A wrapper for making views respond properly to touches. On press down, the opacity of the wrapped view is decreased, dimming it.

Opacity is controlled by wrapping the children in an `Animated.View`, which is added to the view hierarchy. Be aware that this can affect layout.

## Example

```SnackPlayer name=TouchableOpacity%20Example
import {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const [count, setCount] = useState(0);
  const onPress = () => setCount(prevCount => prevCount + 1);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.countContainer}>
          <Text>Count: {count}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text>Press Here</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  countContainer: {
    alignItems: 'center',
    padding: 10,
  },
});

export default App;
```

---

# Reference

## Props

### [TouchableWithoutFeedback Props](touchablewithoutfeedback.md#props)

Inherits [TouchableWithoutFeedback Props](touchablewithoutfeedback.md#props).

---

### `style`

| Type                           |
| ------------------------------ |
| [View.style](view-style-props) |

---

### `activeOpacity`

Determines what the opacity of the wrapped view should be when touch is active. Defaults to `0.2`.

| Type   |
| ------ |
| number |

---

### `hasTVPreferredFocus` <div className="label ios">iOS</div>

_(Apple TV only)_ TV preferred focus (see documentation for the View component).

| Type |
| ---- |
| bool |

---

### `nextFocusDown` <div className="label android">Android</div>

TV next focus down (see documentation for the View component).

| Type   |
| ------ |
| number |

---

### `nextFocusForward` <div className="label android">Android</div>

TV next focus forward (see documentation for the View component).

| Type   |
| ------ |
| number |

---

### `nextFocusLeft` <div className="label android">Android</div>

TV next focus left (see documentation for the View component).

| Type   |
| ------ |
| number |

---

### `nextFocusRight` <div className="label android">Android</div>

TV next focus right (see documentation for the View component).

| Type   |
| ------ |
| number |

---

### `nextFocusUp` <div className="label android">Android</div>

TV next focus up (see documentation for the View component).

| Type   |
| ------ |
| number |
