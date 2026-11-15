---
id: pressable
title: Pressable
---

Pressable is a Core Component wrapper that can detect various stages of press interactions on any of its defined children.

```tsx
<Pressable onPress={onPressFunction}>
  <Text>I'm pressable!</Text>
</Pressable>
```

## How it works

On an element wrapped by `Pressable`:

- [`onPressIn`](#onpressin) is called when a press is activated.
- [`onPressOut`](#onpressout) is called when the press gesture is deactivated.

After pressing [`onPressIn`](#onpressin), one of two things will happen:

1. The person will remove their finger, triggering [`onPressOut`](#onpressout) followed by [`onPress`](#onpress).
2. If the person leaves their finger longer than 500 milliseconds before removing it, [`onLongPress`](#onlongpress) is triggered. ([`onPressOut`](#onpressout) will still fire when they remove their finger.)

<img src="/docs/assets/d_pressable_pressing.svg" width="1000" alt="Diagram of the onPress events in sequence." />

Fingers are not the most precise instruments, and it is common for users to accidentally activate the wrong element or miss the activation area. To help, `Pressable` has an optional `HitRect` you can use to define how far a touch can register away from the wrapped element. Presses can start anywhere within a `HitRect`.

`PressRect` allows presses to move beyond the element and its `HitRect` while maintaining activation and being eligible for a "press"—think of sliding your finger slowly away from a button you're pressing down on.

> The touch area never extends past the parent view bounds and the Z-index of sibling views always takes precedence if a touch hits two overlapping views.

<figure>
  <img src="/docs/assets/d_pressable_anatomy.svg" width="1000" alt="Diagram of HitRect and PressRect and how they work." />
  <figcaption>
    You can set <code>HitRect</code> with <code>hitSlop</code> and set <code>PressRect</code> with <code>pressRetentionOffset</code>.
  </figcaption>
</figure>

> `Pressable` uses React Native's `Pressability` API. For more information around the state machine flow of Pressability and how it works, check out the implementation for [Pressability](https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/Pressability/Pressability.js#L350).

## Example

```SnackPlayer name=Pressable
import {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const [timesPressed, setTimesPressed] = useState(0);

  let textLog = '';
  if (timesPressed > 1) {
    textLog = timesPressed + 'x onPress';
  } else if (timesPressed > 0) {
    textLog = 'onPress';
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Pressable
          onPress={() => {
            setTimesPressed(current => current + 1);
          }}
          style={({pressed}) => [
            {
              backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
            },
            styles.wrapperCustom,
          ]}>
          {({pressed}) => (
            <Text style={styles.text}>{pressed ? 'Pressed!' : 'Press Me'}</Text>
          )}
        </Pressable>
        <View style={styles.logBox}>
          <Text testID="pressable_press_console">{textLog}</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 6,
  },
  logBox: {
    padding: 20,
    margin: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#f0f0f0',
    backgroundColor: '#f9f9f9',
  },
});

export default App;
```

## Props

### `android_disableSound` <div className="label android">Android</div>

If true, doesn't play Android system sound on press.

| Type    | Default |
| ------- | ------- |
| boolean | `false` |

### `android_ripple` <div className="label android">Android</div>

Enables the Android ripple effect and configures its properties.

| Type                                   |
| -------------------------------------- |
| [RippleConfig](pressable#rippleconfig) |

### `children`

Either children or a function that receives a boolean reflecting whether the component is currently pressed.

| Type                     |
| ------------------------ |
| [React Node](react-node) |

### `unstable_pressDelay`

Duration (in milliseconds) to wait after press down before calling `onPressIn`.

| Type   |
| ------ |
| number |

### `delayLongPress`

Duration (in milliseconds) from `onPressIn` before `onLongPress` is called.

| Type   | Default |
| ------ | ------- |
| number | `500`   |

### `disabled`

Whether the press behavior is disabled.

| Type    | Default |
| ------- | ------- |
| boolean | `false` |

### `hitSlop`

Sets additional distance outside of element in which a press can be detected.

| Type                   |
| ---------------------- |
| [Rect](rect) or number |

### `onHoverIn`

Called when the hover is activated to provide visual feedback.

| Type                                                                                                      |
| --------------------------------------------------------------------------------------------------------- |
| `md ({ nativeEvent: [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) }) => void` |

### `onHoverOut`

Called when the hover is deactivated to undo visual feedback.

| Type                                                                                                      |
| --------------------------------------------------------------------------------------------------------- |
| `md ({ nativeEvent: [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) }) => void` |

### `onLongPress`

Called if the time after `onPressIn` lasts longer than 500 milliseconds. This time period can be customized with [`delayLongPress`](#delaylongpress).

| Type                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

### `onPress`

Called after `onPressOut`.

| Type                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

### `onPressIn`

Called immediately when a touch is engaged, before `onPressOut` and `onPress`.

| Type                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

### `onPressMove`

Called when the press location moves.

| Type                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

### `onPressOut`

Called when a touch is released.

| Type                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

### `pressRetentionOffset`

Additional distance outside of this view in which a touch is considered a press before `onPressOut` is triggered.

| Type                   | Default                                      |
| ---------------------- | -------------------------------------------- |
| [Rect](rect) or number | `{bottom: 30, left: 20, right: 20, top: 20}` |

### `style`

Either view styles or a function that receives a boolean reflecting whether the component is currently pressed and returns view styles.

| Type                                                                                            |
| ----------------------------------------------------------------------------------------------- |
| [View Style](view-style-props) or `md ({ pressed: boolean }) => [View Style](view-style-props)` |

### `testOnly_pressed`

Used only for documentation or testing (e.g. snapshot testing).

| Type    | Default |
| ------- | ------- |
| boolean | `false` |

## Type Definitions

### RippleConfig

Ripple effect configuration for the `android_ripple` property.

| Type   |
| ------ |
| object |

**Properties:**

| Name       | Type            | Required | Description                                                                                                                                                                                                                                                  |
| ---------- | --------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| color      | [color](colors) | No       | Defines the color of the ripple effect.                                                                                                                                                                                                                      |
| borderless | boolean         | No       | Defines if ripple effect should not include border.                                                                                                                                                                                                          |
| radius     | number          | No       | Defines the radius of the ripple effect.                                                                                                                                                                                                                     |
| foreground | boolean         | No       | Set to true to add the ripple effect to the foreground of the view, instead of the background. This is useful if one of your child views has a background of its own, or you're e.g. displaying images, and you don't want the ripple to be covered by them. |
