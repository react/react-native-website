---
id: drawerlayoutandroid
title: DrawerLayoutAndroid
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

React component that wraps the platform `DrawerLayout` (Android only). The Drawer (typically used for navigation) is rendered with `renderNavigationView` and direct children are the main view (where your content goes). The navigation view is initially not visible on the screen, but can be pulled in from the side of the window specified by the `drawerPosition` prop and its width can be set by the `drawerWidth` prop.

## Example

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=DrawerLayoutAndroid%20Component%20Example&supportedPlatforms=android&ext=js
import {useRef, useState} from 'react';
import {Button, DrawerLayoutAndroid, Text, StyleSheet} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const drawer = useRef(null);
  const [drawerPosition, setDrawerPosition] = useState('left');
  const changeDrawerPosition = () => {
    if (drawerPosition === 'left') {
      setDrawerPosition('right');
    } else {
      setDrawerPosition('left');
    }
  };

  const navigationView = () => (
    <SafeAreaView style={[styles.container, styles.navigationContainer]}>
      <Text style={styles.paragraph}>I'm in the Drawer!</Text>
      <Button
        title="Close drawer"
        onPress={() => drawer.current.closeDrawer()}
      />
    </SafeAreaView>
  );

  return (
    <SafeAreaProvider>
      <DrawerLayoutAndroid
        ref={drawer}
        drawerWidth={300}
        drawerPosition={drawerPosition}
        renderNavigationView={navigationView}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.paragraph}>Drawer on the {drawerPosition}!</Text>
          <Button
            title="Change Drawer Position"
            onPress={() => changeDrawerPosition()}
          />
          <Text style={styles.paragraph}>
            Swipe from the side or press button below to see it!
          </Text>
          <Button
            title="Open drawer"
            onPress={() => drawer.current.openDrawer()}
          />
        </SafeAreaView>
      </DrawerLayoutAndroid>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  navigationContainer: {
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: 'center',
  },
});

export default App;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=DrawerLayoutAndroid%20Component%20Example&supportedPlatforms=android&ext=tsx
import {useRef, useState} from 'react';
import {
  Button,
  DrawerLayoutAndroid,
  Text,
  StyleSheet,
  View,
} from 'react-native';

const App = () => {
  const drawer = useRef<DrawerLayoutAndroid>(null);
  const [drawerPosition, setDrawerPosition] = useState<'left' | 'right'>(
    'left',
  );
  const changeDrawerPosition = () => {
    if (drawerPosition === 'left') {
      setDrawerPosition('right');
    } else {
      setDrawerPosition('left');
    }
  };

  const navigationView = () => (
    <View style={[styles.container, styles.navigationContainer]}>
      <Text style={styles.paragraph}>I'm in the Drawer!</Text>
      <Button
        title="Close drawer"
        onPress={() => drawer.current?.closeDrawer()}
      />
    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition={drawerPosition}
      renderNavigationView={navigationView}>
      <View style={styles.container}>
        <Text style={styles.paragraph}>Drawer on the {drawerPosition}!</Text>
        <Button
          title="Change Drawer Position"
          onPress={() => changeDrawerPosition()}
        />
        <Text style={styles.paragraph}>
          Swipe from the side or press button below to see it!
        </Text>
        <Button
          title="Open drawer"
          onPress={() => drawer.current?.openDrawer()}
        />
      </View>
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  navigationContainer: {
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: 'center',
  },
});

export default App;
```

</TabItem>
</Tabs>

---

# Reference

## Props

### [View Props](view.md#props)

Inherits [View Props](view.md#props).

---

### `drawerBackgroundColor`

Specifies the background color of the drawer. The default value is `white`. If you want to set the opacity of the drawer, use rgba. Example:

```tsx
return (
  <DrawerLayoutAndroid drawerBackgroundColor="rgba(0,0,0,0.5)" />
);
```

| Type               | Required |
| ------------------ | -------- |
| [color](colors.md) | No       |

---

### `drawerLockMode`

Specifies the lock mode of the drawer. The drawer can be locked in 3 states:

- unlocked (default), meaning that the drawer will respond (open/close) to touch gestures.
- locked-closed, meaning that the drawer will stay closed and not respond to gestures.
- locked-open, meaning that the drawer will stay opened and not respond to gestures. The drawer may still be opened and closed programmatically (`openDrawer`/`closeDrawer`).

| Type                                             | Required |
| ------------------------------------------------ | -------- |
| enum('unlocked', 'locked-closed', 'locked-open') | No       |

---

### `drawerPosition`

Specifies the side of the screen from which the drawer will slide in. By default it is set to `left`.

| Type                  | Required |
| --------------------- | -------- |
| enum('left', 'right') | No       |

---

### `drawerWidth`

Specifies the width of the drawer, more precisely the width of the view that be pulled in from the edge of the window.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `keyboardDismissMode`

Determines whether the keyboard gets dismissed in response to a drag.

- 'none' (the default), drags do not dismiss the keyboard.
- 'on-drag', the keyboard is dismissed when a drag begins.

| Type                    | Required |
| ----------------------- | -------- |
| enum('none', 'on-drag') | No       |

---

### `onDrawerClose`

Function called whenever the navigation view has been closed.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onDrawerOpen`

Function called whenever the navigation view has been opened.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onDrawerSlide`

Function called whenever there is an interaction with the navigation view.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onDrawerStateChanged`

Function called when the drawer state has changed. The drawer can be in 3 states:

- idle, meaning there is no interaction with the navigation view happening at the time
- dragging, meaning there is currently an interaction with the navigation view
- settling, meaning that there was an interaction with the navigation view, and the navigation view is now finishing its closing or opening animation

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `renderNavigationView`

The navigation view that will be rendered to the side of the screen and can be pulled in.

| Type     | Required |
| -------- | -------- |
| function | Yes      |

---

### `statusBarBackgroundColor`

Make the drawer take the entire screen and draw the background of the status bar to allow it to open over the status bar. It will only have an effect on API 21+.

| Type               | Required |
| ------------------ | -------- |
| [color](colors.md) | No       |

## Methods

### `closeDrawer()`

```tsx
closeDrawer();
```

Closes the drawer.

---

### `openDrawer()`

```tsx
openDrawer();
```

Opens the drawer.
