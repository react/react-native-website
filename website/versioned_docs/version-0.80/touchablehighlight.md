---
id: touchablehighlight
title: TouchableHighlight
---

> If you're looking for a more extensive and future-proof way to handle touch-based input, check out the [Pressable](pressable.md) API.

A wrapper for making views respond properly to touches. On press down, the opacity of the wrapped view is decreased, which allows the underlay color to show through, darkening or tinting the view.

The underlay comes from wrapping the child in a new View, which can affect layout, and sometimes cause unwanted visual artifacts if not used correctly, for example if the backgroundColor of the wrapped view isn't explicitly set to an opaque color.

TouchableHighlight must have one child (not zero or more than one). If you wish to have several child components, wrap them in a View.

```tsx
function MyComponent(props: MyComponentProps) {
  return (
    <View {...props} style={{flex: 1, backgroundColor: '#fff'}}>
      <Text>My Component</Text>
    </View>
  );
}

<TouchableHighlight
  activeOpacity={0.6}
  underlayColor="#DDDDDD"
  onPress={() => alert('Pressed!')}>
  <MyComponent />
</TouchableHighlight>;
```

## Example

```SnackPlayer name=TouchableHighlight%20Example
import {useState} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const TouchableHighlightExample = () => {
  const [count, setCount] = useState(0);
  const onPress = () => setCount(count + 1);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <TouchableHighlight onPress={onPress}>
          <View style={styles.button}>
            <Text>Touch Here</Text>
          </View>
        </TouchableHighlight>
        <View style={styles.countContainer}>
          <Text style={styles.countText}>{count || null}</Text>
        </View>
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
  countText: {
    color: '#FF00FF',
  },
});

export default TouchableHighlightExample;
```

---

# Reference

## Props

### [TouchableWithoutFeedback Props](touchablewithoutfeedback.md#props)

Inherits [TouchableWithoutFeedback Props](touchablewithoutfeedback.md#props).

---

### `activeOpacity`

Determines what the opacity of the wrapped view should be when touch is active. The value should be between 0 and 1. Defaults to 0.85. Requires `underlayColor` to be set.

| Type   |
| ------ |
| number |

---

### `onHideUnderlay`

Called immediately after the underlay is hidden.

| Type     |
| -------- |
| function |

---

### `onShowUnderlay`

Called immediately after the underlay is shown.

| Type     |
| -------- |
| function |

---

### `style`

| Type       |
| ---------- |
| View.style |

---

### `underlayColor`

The color of the underlay that will show through when the touch is active.

| Type               |
| ------------------ |
| [color](colors.md) |

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

---

### `testOnly_pressed`

Handy for snapshot tests.

| Type |
| ---- |
| bool |
