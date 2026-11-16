---
id: appstate
title: AppState
---

`AppState` can tell you if the app is in the foreground or background, and notify you when the state changes.

AppState is frequently used to determine the intent and proper behavior when handling push notifications.

### App States

- `active` - The app is running in the foreground.
- `background` - The app is running in the background. The user is either:
  - in another app
  - on the home screen
  - <div className="label android">Android</div> on another `Activity`, including temporary system activities such
    as autofill credential pickers (even if launched by your app or the system)
- <div className="label ios">iOS</div> `inactive` - This is a state that occurs when transitioning between foreground/background, and during periods of inactivity such as entering the multitasking view, opening the Notification Center or in the event of an incoming call.
- <div className="label ios">iOS</div> `extension` - The app is running in an extension context.
- <div className="label ios">iOS</div> `unknown` - The current app state is not yet available.

For more information, see [Apple documentation](https://developer.apple.com/documentation/uikit/managing-your-app-s-life-cycle) and [Android documentation](https://developer.android.com/guide/components/activities/activity-lifecycle).

## Usage

To see the current state, you can check `AppState.currentState`, which will be kept up-to-date.

:::info
If you are using the legacy architecture, `currentState` will be `null` at launch until it is retrieved asynchronously from the native side.
:::

```SnackPlayer name=AppState%20Example
import {useRef, useState, useEffect} from 'react';
import {AppState, StyleSheet, Text} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const AppStateExample = () => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current?.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text>Current state is: {appStateVisible}</Text>
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
});

export default AppStateExample;
```

This example will only ever appear to say "Current state is: active" because the app is only visible to the user when in the `active` state. If you want to experiment with the code we recommend to use your own device instead of embedded preview.

### Hook

The `useAppState` hook returns the current app state and subscribes to state changes. When the state changes, the component that calls this hook re-renders.

```tsx title="useAppState Hook Example"
import {useAppState, Text} from 'react-native';

const AppStateHookExample = () => {
  const appState = useAppState();
  return <Text>Current state is: {appState}</Text>;
};

export default AppStateHookExample;
```

The hook returns one of the [app state values](#app-states). It returns `unknown` until `AppState` reports a recognized state.

---

# Reference

## Events

### `change`

This event is received when the app state has changed. The listener is called with one of [the current app state values](appstate#app-states).

### `memoryWarning` <div className="label ios">iOS</div>

Fires when the app receives a memory warning from the operating system.

### `focus` <div className="label android">Android</div>

Received when the app gains focus (the user is interacting with the app).

### `blur` <div className="label android">Android</div>

Received when the user is not actively interacting with the app. Useful in situations when the user pulls down the [notification drawer](https://developer.android.com/guide/topics/ui/notifiers/notifications#bar-and-drawer). `AppState` won't change but the `blur` event will get fired.

## Methods

### `addEventListener()`

```tsx
static addEventListener(
  type: AppStateEvent,
  listener: (state: AppStateStatus) => void,
): EventSubscription;
```

Sets up a function that will be called whenever the specified event type on AppState occurs. Valid values for `eventType` are
[listed above](#events). Returns the `EventSubscription`.

## Properties

### `currentState`

```tsx
static currentState: AppStateStatus;
```

### `isAvailable`

```tsx
static isAvailable: boolean;
```
