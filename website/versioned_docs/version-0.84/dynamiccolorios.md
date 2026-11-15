---
id: dynamiccolorios
title: DynamicColorIOS
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

The `DynamicColorIOS` function is a platform color type specific to iOS.

```tsx
DynamicColorIOS({
  light: color,
  dark: color,
  highContrastLight: color, // (optional) will fallback to "light" if not provided
  highContrastDark: color, // (optional) will fallback to "dark" if not provided
});
```

`DynamicColorIOS` takes a single argument as an object with two mandatory keys: `dark` and `light`, and two optional keys `highContrastLight` and `highContrastDark`. These correspond to the colors you want to use for "light mode" and "dark mode" on iOS, and when high contrast accessibility mode is enabled, high contrast version of them.

At runtime, the system will choose which of the colors to display depending on the current system appearance and accessibility settings. Dynamic colors are useful for branding colors or other app specific colors that still respond automatically to system setting changes.

#### Developer notes

<Tabs groupId="guide" queryString defaultValue="web" values={constants.getDevNotesTabs(["ios", "web"])}>

<TabItem value="web">

:::info
If you’re familiar with `@media (prefers-color-scheme: dark)` in CSS, this is similar! Only instead of defining all the colors in a media query, you define which color to use under what circumstances right there where you're using it. Neat!
:::

</TabItem>
<TabItem value="ios">

:::info
The `DynamicColorIOS` function is similar to the iOS native methods [`UIColor colorWithDynamicProvider:`](https://developer.apple.com/documentation/uikit/uicolor/3238040-colorwithdynamicprovider).
:::

</TabItem>
</Tabs>

## Example

```tsx
import {DynamicColorIOS} from 'react-native';

const customDynamicTextColor = DynamicColorIOS({
  dark: 'lightskyblue',
  light: 'midnightblue',
});

const customContrastDynamicTextColor = DynamicColorIOS({
  dark: 'darkgray',
  light: 'lightgray',
  highContrastDark: 'black',
  highContrastLight: 'white',
});
```
