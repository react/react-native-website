---
id: other-debugging-methods
title: Other Debugging Methods
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

This page covers how to use legacy JavaScript debugging methods. If you are getting started with a new React Native or Expo app, we recommend using [React Native DevTools](./react-native-devtools).

## Safari Developer Tools (direct JSC debugging)

You can use Safari to debug the iOS version of your app when using [JavaScriptCore](https://trac.webkit.org/wiki/JavaScriptCore) (JSC) as your app's runtime.

1. **Physical devices only**: Open the Settings app, and navigate to Safari > Advanced, and make sure "Web Inspector" is turned on.
2. On your Mac, open Safari and enable the Develop menu. This can be found under Safari > Settings..., then the Advanced tab, then selecting "Show features for web developers".
3. Find your device under the Develop menu, and select the "JSContext" item from the submenu. This will open Safari's Web Inspector, which includes Console and Sources panels similar to Chrome DevTools.

![Opening Safari Web Inspector](/docs/assets/debugging-safari-developer-tools.jpg)

:::tip
While source maps may not be enabled by default, you can follow [this guide](https://blog.nparashuram.com/2019/10/debugging-react-native-ios-apps-with.html) or [video](https://www.youtube.com/watch?v=GrGqIIz51k4) to enable them and set break points at the right places in the source code.
:::

:::tip
Every time the app is reloaded, a new JSContext is created. Choosing "Automatically Show Web Inspectors for JSContexts" saves you from having to select the latest JSContext manually.
:::

## Remote JavaScript Debugging (removed)

:::warning[Important]
Remote JavaScript Debugging has been removed as of React Native 0.79. See the original [deprecation announcement](https://github.com/react-native-community/discussions-and-proposals/discussions/734).

If you are on an older version of React Native, please go to the docs [for your version](/versions).
:::

![The remote debugger window in Chrome](/docs/assets/debugging-chrome-remote-debugger.jpg)
