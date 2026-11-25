---
id: debugging
title: Debugging Basics
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

:::note
Debugging features, such as the Dev Menu, LogBox, and React Native DevTools are disabled in release (production) builds.
:::

## Opening the Dev Menu

React Native provides an in-app developer menu providing access to debugging features. You can access the Dev Menu by shaking your device or via keyboard shortcuts:

- iOS Simulator: <kbd>Ctrl</kbd> + <kbd>Cmd ⌘</kbd> + <kbd>Z</kbd> (or Device > Shake)
- Android emulators: <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS) or <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows and Linux)

Alternative (Android): `adb shell input keyevent 82`.

![The React Native Dev Menu](/docs/assets/debugging-dev-menu-076.jpg)

## Opening DevTools

[React Native DevTools](./react-native-devtools) is our built-in debugger for React Native. It allows you to inspect and understand how your JavaScript code is running, similar to a web browser.

To open DevTools, either:

- Select "Open DevTools" in the Dev Menu.
- Press <kbd>j</kbd> from the CLI (`npx react-native start`).

On first launch, DevTools will open to a welcome panel, along with an open console drawer where you can view logs and interact with the JavaScript runtime. From the top of the window, you can navigate to other panels, including the integrated React Components Inspector and Profiler.

![React Native DevTools opened to the "Welcome" pane](/docs/assets/debugging-rndt-welcome.jpg)

React Native DevTools is powered by a dedicated debugging architecture built into React Native and uses a customized build of the [Chrome DevTools](https://developer.chrome.com/docs/devtools) frontend. This enables us to offer familiar, browser-aligned debugging features that are deeply integrated and built for end-to-end reliability.

Learn more in our [React Native DevTools guide](./react-native-devtools).

:::note
React Native DevTools is only available with the Hermes engine, and requires either Google Chrome or Microsoft Edge installed.
:::

:::info

#### Flipper and alternative debugging tools

React Native DevTools replaces the previous Flipper, Experimental Debugger, and Hermes debugger (Chrome) frontends. If you are on an older version of React Native, please go to the docs [for your version](/versions).

We continue to offer legacy debugging methods such as Direct JSC Debugging and Remote JS Debugging (deprecated) (see [Other Debugging Methods](./other-debugging-methods)).

React Native DevTools is designed for debugging React app concerns, and not to replace native tools. If you want to inspect React Native’s underlying platform layers (for example, while developing a Native Module), please use the debugging tools available in Xcode and Android Studio (see [Debugging Native Code](/docs/next/debugging-native-code)).

Other useful links:

- <a href="https://shift.infinite.red/why-you-dont-need-flipper-in-your-react-native-app-and-how-to-get-by-without-it-3af461955109" target="_blank">Why you don’t need Flipper in your React Native app … and how to get by without&nbsp;it&nbsp;↗</a>

:::

## LogBox

LogBox is an in-app tool that displays when warnings or errors are logged by your app.

![A LogBox warning and an expanded LogBox syntax error](/docs/assets/debugging-logbox-076.jpg)

### Fatal Errors

When an unrecoverable error occurs, such as a JavaScript syntax error, LogBox will open with the location of the error. In this state, LogBox is not dismissable since your code cannot be executed. LogBox will automatically dismiss once the syntax error is fixed — either via Fast Refresh or after a manual reload.

### Console Errors and Warnings

Console errors and warnings are displayed as on-screen notifications with a red or yellow badge.

- **Errors** will display with a notification count. Tap the notification to see an expanded view and to paginate through other logs.
- **Warnings** will display a notification banner without details, prompting you to open React Native DevTools.

When React Native DevTools is open, all errors except fatal errors will be hidden to LogBox. We recommend using the Console panel within React Native DevTools as a source of truth, due to various LogBox options which can hide or adjust the level of certain logs.

<details>
<summary>**💡 Ignoring logs**</summary>

LogBox can be configured via the `LogBox` API.

```js
import {LogBox} from 'react-native';
```

#### Ignore all logs

LogBox notifications can be disabled using `LogBox.ignoreAllLogs()`. This can be useful in situations such as giving product demos.

```js
LogBox.ignoreAllLogs();
```

#### Ignore specific logs

Notifications can be disabled on a per-log basis via `LogBox.ignoreLogs()`. This can be useful for noisy warnings or those that cannot be fixed, e.g. in a third-party dependency.

```js
LogBox.ignoreLogs([
  // Exact message
  'Warning: componentWillReceiveProps has been renamed',

  // Substring or regex match
  /GraphQL error: .*/,
]);
```

:::note

LogBox will treat certain errors from React as warnings, which will mean they don't display as an in-app error notification. Advanced users can change this behaviour by customising LogBox's warning filter using [`LogBoxData.setWarningFilter()`](https://github.com/react/react-native/blob/d334f4d77eea538dff87fdcf2ebc090246cfdbb0/packages/react-native/Libraries/LogBox/Data/LogBoxData.js#L338).

:::

</details>

## Performance Monitor

On Android and iOS, an in-app performance overlay can be toggled during development by selecting **"Perf Monitor"** in the Dev Menu. Learn more about this feature [here](/docs/performance).

![The Performance Monitor overlay on iOS and Android](/docs/assets/debugging-performance-monitor.jpg)

:::info
The Performance Monitor runs in-app and is a guide. We recommend investigating the native tooling under Android Studio and Xcode for accurate performance measurements.
:::
