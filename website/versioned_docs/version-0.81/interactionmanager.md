---
id: interactionmanager
title: 🗑️ InteractionManager
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

:::warning[Deprecated]
Avoid long-running work and use `requestIdleCallback` instead.
:::

InteractionManager allows long-running work to be scheduled after any interactions/animations have completed. In particular, this allows JavaScript animations to run smoothly.

Applications can schedule tasks to run after interactions with the following:

```tsx
InteractionManager.runAfterInteractions(() => {
  // ...long-running synchronous task...
});
```

Compare this to other scheduling alternatives:

- `requestAnimationFrame()` for code that animates a view over time.
- `setImmediate/setTimeout()` run code later, note this may delay animations.
- `runAfterInteractions()` run code later, without delaying active animations.

The touch handling system considers one or more active touches to be an 'interaction' and will delay `runAfterInteractions()` callbacks until all touches have ended or been cancelled.

InteractionManager also allows applications to register animations by creating an interaction 'handle' on animation start, and clearing it upon completion:

```tsx
const handle = InteractionManager.createInteractionHandle();
// run animation... (`runAfterInteractions` tasks are queued)
// later, on animation completion:
InteractionManager.clearInteractionHandle(handle);
// queued tasks run if all handles were cleared
```

`runAfterInteractions` takes either a plain callback function, or a `PromiseTask` object with a `gen` method that returns a `Promise`. If a `PromiseTask` is supplied, then it is fully resolved (including asynchronous dependencies that also schedule more tasks via `runAfterInteractions`) before starting on the next task that might have been queued up synchronously earlier.

By default, queued tasks are executed together in a loop in one `setImmediate` batch. If `setDeadline` is called with a positive number, then tasks will only be executed until the deadline (in terms of js event loop run time) approaches, at which point execution will yield via setTimeout, allowing events such as touches to start interactions and block queued tasks from executing, making apps more responsive.

---

## Example

### Basic

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=InteractionManager%20Function%20Component%20Basic%20Example&supportedPlatforms=ios,android&ext=js
import {useEffect} from 'react';
import {
  Alert,
  Animated,
  InteractionManager,
  Platform,
  StyleSheet,
  Text,
  useAnimatedValue,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const useFadeIn = (duration = 5000) => {
  const opacity = useAnimatedValue(0);

  // Running the animation when the component is mounted
  useEffect(() => {
    // Animated.timing() create a interaction handle by default, if you want to disabled that
    // behaviour you can set isInteraction to false to disabled that.
    Animated.timing(opacity, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    }).start();
  }, [duration, opacity]);

  return opacity;
};

const Ball = ({onShown}) => {
  const opacity = useFadeIn();

  // Running a method after the animation
  useEffect(() => {
    const interactionPromise = InteractionManager.runAfterInteractions(() =>
      onShown(),
    );
    return () => interactionPromise.cancel();
  }, [onShown]);

  return <Animated.View style={[styles.ball, {opacity}]} />;
};

const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text>{instructions}</Text>
        <Ball onShown={() => Alert.alert('Animation is done')} />
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
  ball: {
    width: 100,
    height: 100,
    backgroundColor: 'salmon',
    borderRadius: 100,
  },
});

export default App;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=InteractionManager%20Function%20Component%20Basic%20Example&supportedPlatforms=ios,android&ext=tsx
import {useEffect} from 'react';
import {
  Alert,
  Animated,
  InteractionManager,
  Platform,
  StyleSheet,
  Text,
  useAnimatedValue,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const useFadeIn = (duration = 5000) => {
  const opacity = useAnimatedValue(0);

  // Running the animation when the component is mounted
  useEffect(() => {
    // Animated.timing() create a interaction handle by default, if you want to disabled that
    // behaviour you can set isInteraction to false to disabled that.
    Animated.timing(opacity, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    }).start();
  }, [duration, opacity]);

  return opacity;
};

type BallProps = {
  onShown: () => void;
};

const Ball = ({onShown}: BallProps) => {
  const opacity = useFadeIn();

  // Running a method after the animation
  useEffect(() => {
    const interactionPromise = InteractionManager.runAfterInteractions(() =>
      onShown(),
    );
    return () => interactionPromise.cancel();
  }, [onShown]);

  return <Animated.View style={[styles.ball, {opacity}]} />;
};

const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text>{instructions}</Text>
        <Ball onShown={() => Alert.alert('Animation is done')} />
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
  ball: {
    width: 100,
    height: 100,
    backgroundColor: 'salmon',
    borderRadius: 100,
  },
});

export default App;
```

</TabItem>
</Tabs>

### Advanced

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=InteractionManager%20Function%20Component%20Advanced%20Example&supportedPlatforms=ios,android&ext=js
import {useEffect} from 'react';
import {
  Alert,
  Animated,
  InteractionManager,
  Platform,
  StyleSheet,
  Text,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

// You can create a custom interaction/animation and add
// support for InteractionManager
const useCustomInteraction = (timeLocked = 2000) => {
  useEffect(() => {
    const handle = InteractionManager.createInteractionHandle();

    setTimeout(
      () => InteractionManager.clearInteractionHandle(handle),
      timeLocked,
    );

    return () => InteractionManager.clearInteractionHandle(handle);
  }, [timeLocked]);
};

const Ball = ({onInteractionIsDone}) => {
  useCustomInteraction();

  // Running a method after the interaction
  useEffect(() => {
    InteractionManager.runAfterInteractions(() => onInteractionIsDone());
  }, [onInteractionIsDone]);

  return <Animated.View style={[styles.ball]} />;
};

const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text>{instructions}</Text>
        <Ball onInteractionIsDone={() => Alert.alert('Interaction is done')} />
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
  ball: {
    width: 100,
    height: 100,
    backgroundColor: 'salmon',
    borderRadius: 100,
  },
});

export default App;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=InteractionManager%20Function%20Component%20Advanced%20Example&supportedPlatforms=ios,android&ext=tsx
import {useEffect} from 'react';
import {
  Alert,
  Animated,
  InteractionManager,
  Platform,
  StyleSheet,
  Text,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

// You can create a custom interaction/animation and add
// support for InteractionManager
const useCustomInteraction = (timeLocked = 2000) => {
  useEffect(() => {
    const handle = InteractionManager.createInteractionHandle();

    setTimeout(
      () => InteractionManager.clearInteractionHandle(handle),
      timeLocked,
    );

    return () => InteractionManager.clearInteractionHandle(handle);
  }, [timeLocked]);
};

type BallProps = {
  onInteractionIsDone: () => void;
};

const Ball = ({onInteractionIsDone}: BallProps) => {
  useCustomInteraction();

  // Running a method after the interaction
  useEffect(() => {
    InteractionManager.runAfterInteractions(() => onInteractionIsDone());
  }, [onInteractionIsDone]);

  return <Animated.View style={[styles.ball]} />;
};

const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text>{instructions}</Text>
        <Ball onInteractionIsDone={() => Alert.alert('Interaction is done')} />
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
  ball: {
    width: 100,
    height: 100,
    backgroundColor: 'salmon',
    borderRadius: 100,
  },
});

export default App;
```

</TabItem>
</Tabs>

# Reference

## Methods

### `runAfterInteractions()`

```tsx
static runAfterInteractions(task?: (() => any) | SimpleTask | PromiseTask);
```

Schedule a function to run after all interactions have completed. Returns a cancellable "promise".

---

### `createInteractionHandle()`

```tsx
static createInteractionHandle(): Handle;
```

Notify manager that an interaction has started.

---

### `clearInteractionHandle()`

```tsx
static clearInteractionHandle(handle: Handle);
```

Notify manager that an interaction has completed.

---

### `setDeadline()`

```tsx
static setDeadline(deadline: number);
```

A positive number will use setTimeout to schedule any tasks after the eventLoopRunningTime hits the deadline value, otherwise all tasks will be executed in one setImmediate batch (default).
