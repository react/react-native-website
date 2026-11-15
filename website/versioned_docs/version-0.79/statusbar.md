---
id: statusbar
title: StatusBar
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

Component to control the app's status bar. The status bar is the zone, typically at the top of the screen, that displays the current time, Wi-Fi and cellular network information, battery level and/or other status icons.

### Usage with Navigator

It is possible to have multiple `StatusBar` components mounted at the same time. The props will be merged in the order the `StatusBar` components were mounted.

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=StatusBar%20Component%20Example&supportedPlatforms=android,ios&ext=js
import React, {useState} from 'react';
import {
  Button,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const STYLES = ['default', 'dark-content', 'light-content'];
const TRANSITIONS = ['fade', 'slide', 'none'];

const App = () => {
  const [hidden, setHidden] = useState(false);
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[0]);
  const [statusBarTransition, setStatusBarTransition] = useState(
    TRANSITIONS[0],
  );

  const changeStatusBarVisibility = () => setHidden(!hidden);

  const changeStatusBarStyle = () => {
    const styleId = STYLES.indexOf(statusBarStyle) + 1;
    if (styleId === STYLES.length) {
      setStatusBarStyle(STYLES[0]);
    } else {
      setStatusBarStyle(STYLES[styleId]);
    }
  };

  const changeStatusBarTransition = () => {
    const transition = TRANSITIONS.indexOf(statusBarTransition) + 1;
    if (transition === TRANSITIONS.length) {
      setStatusBarTransition(TRANSITIONS[0]);
    } else {
      setStatusBarTransition(TRANSITIONS[transition]);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor="#61dafb"
          barStyle={statusBarStyle}
          showHideTransition={statusBarTransition}
          hidden={hidden}
        />
        <Text style={styles.textStyle}>
          StatusBar Visibility:{'\n'}
          {hidden ? 'Hidden' : 'Visible'}
        </Text>
        <Text style={styles.textStyle}>
          StatusBar Style:{'\n'}
          {statusBarStyle}
        </Text>
        {Platform.OS === 'ios' ? (
          <Text style={styles.textStyle}>
            StatusBar Transition:{'\n'}
            {statusBarTransition}
          </Text>
        ) : null}
        <View style={styles.buttonsContainer}>
          <Button
            title="Toggle StatusBar"
            onPress={changeStatusBarVisibility}
          />
          <Button
            title="Change StatusBar Style"
            onPress={changeStatusBarStyle}
          />
          {Platform.OS === 'ios' ? (
            <Button
              title="Change StatusBar Transition"
              onPress={changeStatusBarTransition}
            />
          ) : null}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ECF0F1',
  },
  buttonsContainer: {
    padding: 10,
  },
  textStyle: {
    textAlign: 'center',
    marginBottom: 8,
  },
});

export default App;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=StatusBar%20Component%20Example&supportedPlatforms=android,ios&ext=tsx
import React, {useState} from 'react';
import {
  Button,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  StatusBarStyle,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const STYLES = ['default', 'dark-content', 'light-content'] as const;
const TRANSITIONS = ['fade', 'slide', 'none'] as const;

const App = () => {
  const [hidden, setHidden] = useState(false);
  const [statusBarStyle, setStatusBarStyle] = useState<StatusBarStyle>(
    STYLES[0],
  );
  const [statusBarTransition, setStatusBarTransition] = useState<
    'fade' | 'slide' | 'none'
  >(TRANSITIONS[0]);

  const changeStatusBarVisibility = () => setHidden(!hidden);

  const changeStatusBarStyle = () => {
    const styleId = STYLES.indexOf(statusBarStyle) + 1;
    if (styleId === STYLES.length) {
      setStatusBarStyle(STYLES[0]);
    } else {
      setStatusBarStyle(STYLES[styleId]);
    }
  };

  const changeStatusBarTransition = () => {
    const transition = TRANSITIONS.indexOf(statusBarTransition) + 1;
    if (transition === TRANSITIONS.length) {
      setStatusBarTransition(TRANSITIONS[0]);
    } else {
      setStatusBarTransition(TRANSITIONS[transition]);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor="#61dafb"
          barStyle={statusBarStyle}
          showHideTransition={statusBarTransition}
          hidden={hidden}
        />
        <Text style={styles.textStyle}>
          StatusBar Visibility:{'\n'}
          {hidden ? 'Hidden' : 'Visible'}
        </Text>
        <Text style={styles.textStyle}>
          StatusBar Style:{'\n'}
          {statusBarStyle}
        </Text>
        {Platform.OS === 'ios' ? (
          <Text style={styles.textStyle}>
            StatusBar Transition:{'\n'}
            {statusBarTransition}
          </Text>
        ) : null}
        <View style={styles.buttonsContainer}>
          <Button
            title="Toggle StatusBar"
            onPress={changeStatusBarVisibility}
          />
          <Button
            title="Change StatusBar Style"
            onPress={changeStatusBarStyle}
          />
          {Platform.OS === 'ios' ? (
            <Button
              title="Change StatusBar Transition"
              onPress={changeStatusBarTransition}
            />
          ) : null}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ECF0F1',
  },
  buttonsContainer: {
    padding: 10,
  },
  textStyle: {
    textAlign: 'center',
    marginBottom: 8,
  },
});

export default App;
```

</TabItem>
</Tabs>

### Imperative API

For cases where using a component is not ideal, there is also an imperative API exposed as static functions on the component. It is however not recommended to use the static API and the component for the same prop because any value set by the static API will get overridden by the one set by the component in the next render.

---

# Reference

## Constants

### `currentHeight` <div className="label android">Android</div>

The height of the status bar, which includes the notch height, if present.

---

## Props

### `animated`

If the transition between status bar property changes should be animated. Supported for `backgroundColor`, `barStyle` and `hidden` properties.

| Type    | Required | Default |
| ------- | -------- | ------- |
| boolean | No       | `false` |

---

### `backgroundColor` <div className="label android">Android</div>

The background color of the status bar.

:::warning
Due to edge-to-edge enforcement introduced in Android 15, setting background color of the status bar is deprecated in API level 35 and setting it will have no effect. You can read more about our [edge-to-edge recommendations here](https://github.com/react-native-community/discussions-and-proposals/discussions/827).
:::

| Type            | Required | Default                                                                |
| --------------- | -------- | ---------------------------------------------------------------------- |
| [color](colors) | No       | default system StatusBar background color, or `'black'` if not defined |

---

### `barStyle`

Sets the color of the status bar text.

On Android, this will only have an impact on API versions 23 and above.

| Type                                       | Required | Default     |
| ------------------------------------------ | -------- | ----------- |
| [StatusBarStyle](statusbar#statusbarstyle) | No       | `'default'` |

---

### `hidden`

If the status bar is hidden.

| Type    | Required | Default |
| ------- | -------- | ------- |
| boolean | No       | `false` |

---

### `networkActivityIndicatorVisible` <div className="label ios">iOS</div>

If the network activity indicator should be visible.

| Type    | Default |
| ------- | ------- |
| boolean | `false` |

---

### `showHideTransition` <div className="label ios">iOS</div>

The transition effect when showing and hiding the status bar using the `hidden` prop.

| Type                                               | Default  |
| -------------------------------------------------- | -------- |
| [StatusBarAnimation](statusbar#statusbaranimation) | `'fade'` |

---

### `translucent` <div className="label android">Android</div>

If the status bar is translucent. When translucent is set to `true`, the app will draw under the status bar. This is useful when using a semi transparent status bar color.

:::warning
Due to edge-to-edge enforcement introduced in Android 15, setting the status bar as translucent is deprecated in API level 35 and setting it will have no effect. You can read more about our [edge-to-edge recommendations here](https://github.com/react-native-community/discussions-and-proposals/discussions/827).
:::

| Type    | Default |
| ------- | ------- |
| boolean | `false` |

## Methods

### `popStackEntry()`

```tsx
static popStackEntry(entry: StatusBarProps);
```

Get and remove the last StatusBar entry from the stack.

**Parameters:**

| Name                                                       | Type | Description                           |
| ---------------------------------------------------------- | ---- | ------------------------------------- |
| entry <div className="label basic required">Required</div> | any  | Entry returned from `pushStackEntry`. |

---

### `pushStackEntry()`

```tsx
static pushStackEntry(props: StatusBarProps): StatusBarProps;
```

Push a StatusBar entry onto the stack. The return value should be passed to `popStackEntry` when complete.

**Parameters:**

| Name                                                       | Type | Description                                                      |
| ---------------------------------------------------------- | ---- | ---------------------------------------------------------------- |
| props <div className="label basic required">Required</div> | any  | Object containing the StatusBar props to use in the stack entry. |

---

### `replaceStackEntry()`

```tsx
static replaceStackEntry(
  entry: StatusBarProps,
  props: StatusBarProps
): StatusBarProps;
```

Replace an existing StatusBar stack entry with new props.

**Parameters:**

| Name                                                       | Type | Description                                                                  |
| ---------------------------------------------------------- | ---- | ---------------------------------------------------------------------------- |
| entry <div className="label basic required">Required</div> | any  | Entry returned from `pushStackEntry` to replace.                             |
| props <div className="label basic required">Required</div> | any  | Object containing the StatusBar props to use in the replacement stack entry. |

---

### `setBackgroundColor()` <div className="label android">Android</div>

```tsx
static setBackgroundColor(color: ColorValue, animated?: boolean);
```

Set the background color for the status bar.

:::warning
Due to edge-to-edge enforcement introduced in Android 15, setting background color of the status bar is deprecated in API level 35 and setting it will have no effect. You can read more about our [edge-to-edge recommendations here](https://github.com/react-native-community/discussions-and-proposals/discussions/827).
:::

**Parameters:**

| Name                                                       | Type    | Description               |
| ---------------------------------------------------------- | ------- | ------------------------- |
| color <div className="label basic required">Required</div> | string  | Background color.         |
| animated                                                   | boolean | Animate the style change. |

---

### `setBarStyle()`

```tsx
static setBarStyle(style: StatusBarStyle, animated?: boolean);
```

Set the status bar style.

**Parameters:**

| Name                                                       | Type                                       | Description               |
| ---------------------------------------------------------- | ------------------------------------------ | ------------------------- |
| style <div className="label basic required">Required</div> | [StatusBarStyle](statusbar#statusbarstyle) | Status bar style to set.  |
| animated                                                   | boolean                                    | Animate the style change. |

---

### `setHidden()`

```tsx
static setHidden(hidden: boolean, animation?: StatusBarAnimation);
```

Show or hide the status bar.

**Parameters:**

| Name                                                        | Type                                               | Description                                             |
| ----------------------------------------------------------- | -------------------------------------------------- | ------------------------------------------------------- |
| hidden <div className="label basic required">Required</div> | boolean                                            | Hide the status bar.                                    |
| animation <div className="label ios">iOS</div>              | [StatusBarAnimation](statusbar#statusbaranimation) | Animation when changing the status bar hidden property. |

---

### 🗑️ `setNetworkActivityIndicatorVisible()` <div className="label ios">iOS</div>

:::warning[Deprecated]
The status bar network activity indicator is not supported in iOS 13 and later. This will be removed in a future release.
:::

```tsx
static setNetworkActivityIndicatorVisible(visible: boolean);
```

Control the visibility of the network activity indicator.

**Parameters:**

| Name                                                         | Type    | Description         |
| ------------------------------------------------------------ | ------- | ------------------- |
| visible <div className="label basic required">Required</div> | boolean | Show the indicator. |

---

### `setTranslucent()` <div className="label android">Android</div>

```tsx
static setTranslucent(translucent: boolean);
```

Control the translucency of the status bar.

:::warning
Due to edge-to-edge enforcement introduced in Android 15, setting the status bar as translucent is deprecated in API level 35 and setting it will have no effect. You can read more about our [edge-to-edge recommendations here](https://github.com/react-native-community/discussions-and-proposals/discussions/827).
:::

**Parameters:**

| Name                                                             | Type    | Description         |
| ---------------------------------------------------------------- | ------- | ------------------- |
| translucent <div className="label basic required">Required</div> | boolean | Set as translucent. |

## Type Definitions

### StatusBarAnimation

Status bar animation type for transitions on the iOS.

| Type |
| ---- |
| enum |

**Constants:**

| Value     | Type   | Description     |
| --------- | ------ | --------------- |
| `'fade'`  | string | Fade animation  |
| `'slide'` | string | Slide animation |
| `'none'`  | string | No animation    |

---

### StatusBarStyle

Status bar style type.

| Type |
| ---- |
| enum |

**Constants:**

| Value             | Type   | Description                                                |
| ----------------- | ------ | ---------------------------------------------------------- |
| `'default'`       | string | Default status bar style (dark for iOS, light for Android) |
| `'light-content'` | string | White texts and icons                                      |
| `'dark-content'`  | string | Dark texts and icons (requires API>=23 on Android)         |
