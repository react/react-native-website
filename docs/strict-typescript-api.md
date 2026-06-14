---
id: strict-typescript-api
title: Strict TypeScript API (opt in)
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RNRepoLink from '@site/core/RNRepoLink';

<p><div className="label primary">Since 0.80</div></p>

The Strict TypeScript API is a new set of TypeScript types for the `react-native` package, providing a refined single package entry point and stronger type accuracy.

The Strict API is currently in preview as we iterate towards a stable JavaScript API for React Native.

## Opting in

We're shipping these new types alongside our existing types, meaning you can choose to migrate when ready, via your `tsconfig.json` config.

Opting in brings some structural type differences, including updated type names and shapes. Therefore migrating your codebase to the Strict API is a **one-time breaking change**.

```json title="tsconfig.json"
{
  "extends": "@react-native/typescript-config",
  "compilerOptions": {
    ...
    "customConditions": ["react-native-strict-api"]
  }
}
```

:::note[Under the hood]

This will instruct TypeScript to resolve `react-native` types from our new [`types_generated/`](https://www.npmjs.com/package/react-native?activeTab=code) dir, instead of the previous [`types/`](https://www.npmjs.com/package/react-native?activeTab=code) dir (manually maintained). No restart of TypeScript or your editor is required.

:::

### Key changes (breaking)

1. **No deep imports.** The API is restricted to `react-native`'s index file. This is a tighter and more intentional public API contract. It also ensures that internal file path changes in React Native's source code won't be breaking.
2. **Generated directly from source.** Previously, React Native used separately maintained manual types. Generating from source now means we improve coverage, correctness, and compatibility guarantees.

---

:::tip[Preview feedback]

We're working with the community and partners to finalize the shape of the Strict API. Share API feedback in our [discussion thread](https://github.com/react-native-community/discussions-and-proposals/discussions/893), or see the [announcement blog post](/blog/2025/06/12/moving-towards-a-stable-javascript-api) for more context.

:::

## Migration guide

### Codegen types → `CodegenTypes` namespace

Types used for codegen, like `Int32`, `Double`, `WithDefault` etc. are now available under a single `CodegenTypes` namespace. Similarly, `codegenNativeComponent` and `codegenNativeCommands` are now available to import from the react-native package instead of using the deep import.

Namespaced `CodegenTypes` as well as `codegenNativeCommands` and `codegenNativeComponent` are also available from `react-native` package when the Strict API is not enabled to make the adoption easier for third-party libraries.

#### Migration

<Tabs defaultValue="after">
<TabItem value="before" label="Before">

```ts title=""
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type {
  Int32,
  WithDefault,
} from 'react-native/Libraries/Types/CodegenTypes';

interface NativeProps extends ViewProps {
  enabled?: WithDefault<boolean, true>;
  size?: Int32;
}

export default codegenNativeComponent<NativeProps>(
  'RNCustomComponent',
);
```

</TabItem>
<TabItem value="after" label="After">

```ts title=""
import {CodegenTypes, codegenNativeComponent} from 'react-native';

interface NativeProps extends ViewProps {
  enabled?: CodegenTypes.WithDefault<boolean, true>;
  size?: CodegenTypes.Int32;
}

export default codegenNativeComponent<NativeProps>(
  'RNCustomComponent',
);
```

</TabItem>
</Tabs>

### Refs now use `*Instance` types

Each built-in component now has a dedicated `*Instance` type for use with refs — for example, `ViewInstance`, `TextInputInstance`, `ScrollViewInstance`. These are the **recommended way to type refs** under the Strict TypeScript API.

Previously, `useRef<View>` worked because `View` and other components were typed as a class. Under the Strict API, built-in components are typed as functions, so `View` refers to the function itself — **component type names no longer work as ref types**.

<Tabs defaultValue="after">
<TabItem value="before" label="Before">

```tsx title=""
import {useRef} from 'react';
import {View, TextInput} from 'react-native';

function MyComponent() {
  const viewRef = useRef<View>(null);
  const inputRef = useRef<TextInput>(null);

  return (
    <>
      <View ref={viewRef} />
      <TextInput ref={inputRef} />
    </>
  );
}
```

</TabItem>
<TabItem value="after" label="After">

```tsx title=""
import {useRef} from 'react';
import type {ViewInstance, TextInputInstance} from 'react-native';

function MyComponent() {
  const viewRef = useRef<ViewInstance>(null);
  const inputRef = useRef<TextInputInstance>(null);

  return (
    <>
      <View ref={viewRef} />
      <TextInput ref={inputRef} />
    </>
  );
}
```

</TabItem>
</Tabs>

`*Instance` types also work transparently with `Animated` variants — no separate type is needed:

```tsx title=""
const viewRef = useRef<ViewInstance>(null);

<View ref={viewRef} />
<Animated.View ref={viewRef} />
```

This also replaces the removed `Animated.LegacyRef` type. Code using `ref={ref as React.Ref<Animated.LegacyRef<View>>}` can be simplified to `ref={ref}` with a `ViewInstance`-typed ref.

<details>
<summary>**🗒️ Available instance types**</summary>

| Component                 | Instance type                     |
| ------------------------- | --------------------------------- |
| `ActivityIndicator`       | `ActivityIndicatorInstance`       |
| `Button`                  | `ButtonInstance`                  |
| `DrawerLayoutAndroid`     | `DrawerLayoutAndroidInstance`     |
| `FlatList`                | `FlatListInstance`                |
| `Image`                   | `ImageInstance`                   |
| `ImageBackground`         | `ImageBackgroundInstance`         |
| `KeyboardAvoidingView`    | `KeyboardAvoidingViewInstance`    |
| `Modal`                   | `ModalInstance`                   |
| `Pressable`               | `PressableInstance`               |
| `ProgressBarAndroid`      | `ProgressBarAndroidInstance`      |
| `RefreshControl`          | `RefreshControlInstance`          |
| `SafeAreaView`            | `SafeAreaViewInstance`            |
| `ScrollView`              | `ScrollViewInstance`              |
| `SectionList`             | `SectionListInstance`             |
| `StatusBar`               | `StatusBarInstance`               |
| `Switch`                  | `SwitchInstance`                  |
| `Text`                    | `TextInstance`                    |
| `TextInput`               | `TextInputInstance`               |
| `TouchableHighlight`      | `TouchableHighlightInstance`      |
| `TouchableNativeFeedback` | `TouchableNativeFeedbackInstance` |
| `TouchableOpacity`        | `TouchableOpacityInstance`        |
| `View`                    | `ViewInstance`                    |
| `VirtualizedList`         | `VirtualizedListInstance`         |
| `VirtualizedSectionList`  | `VirtualizedSectionListInstance`  |

Components without ref support (`InputAccessoryView`, `TouchableWithoutFeedback`, `experimental_LayoutConformance`) do not have instance types.

</details>

**Migration**

| Before                                                  | After                        |
| ------------------------------------------------------- | ---------------------------- |
| `useRef<View>(null)`                                    | `useRef<ViewInstance>(null)` |
| `useRef<React.ComponentRef<typeof View>>(null)`         | `useRef<ViewInstance>(null)` |
| `useRef<HostInstance>(null)` (for a specific component) | `useRef<ViewInstance>(null)` |
| `Ref<Animated.LegacyRef<View>>`                         | `Ref<ViewInstance>`          |

:::note

`React.ComponentRef<typeof View>` remains valid and produces the same type as `ViewInstance`. The `*Instance` types are convenient aliases — both approaches work.

:::

### Removal of `*Static` types

#### Migration

<Tabs defaultValue="after">
<TabItem value="before" label="Before">

```tsx title=""
import {Linking, LinkingStatic} from 'react-native';

function foo(linking: LinkingStatic) {}
foo(Linking);
```

</TabItem>
<TabItem value="after" label="After">

```tsx title=""
import {Linking} from 'react-native';

function foo(linking: Linking) {}
foo(Linking);
```

</TabItem>
</Tabs>

The following APIs were previously named as `*Static` plus a variable declaration of said type. In most cases there was an alias so that value and the type were exported under the same identifier, but some were missing.

<details>
<summary>**🗒️ Affected APIs**</summary>

- `AlertStatic`
- `ActionSheetIOSStatic`
- `ToastAndroidStatic`
- `InteractionManagerStatic` (In this case there was no relevant `InteractionManager` type alias)
- `UIManagerStatic`
- `PlatformStatic`
- `SectionListStatic`
- `PixelRatioStatic` (In this case there was no relevant `PixelRatio` type alias)
- `AppStateStatic`
- `AccessibilityInfoStatic`
- `ImageResizeModeStatic`
- `BackHandlerStatic`
- `DevMenuStatic` (In this case there was no relevant `DevMenu` type alias)
- `ClipboardStatic`
- `PermissionsAndroidStatic`
- `ShareStatic`
- `DeviceEventEmitterStatic`
- `LayoutAnimationStatic`
- `KeyboardStatic` (In this case there was no relevant `Keyboard` type alias)
- `DevSettingsStatic` (In this case there was no relevant `DevSettings` type alias)
- `I18nManagerStatic`
- `EasingStatic`
- `PanResponderStatic`
- `NativeModulesStatic` (In this case there was no relevant `NativeModules` type alias)
- `LogBoxStatic`
- `PushNotificationIOSStatic`
- `SettingsStatic`
- `VibrationStatic`

</details>

## Other breaking changes

### Changes to Animated types

Animated nodes were previously generic types based on their interpolation output. Now, they are non-generic types with a generic `interpolate` method.

`Animated.LegacyRef` is no longer available. Use the appropriate `*Instance` type instead (e.g. `ViewInstance` for `Animated.View`).

### Unified types for optional props

In the new types, every optional prop will be typed as `type | undefined`.

### Removal of some deprecated types

All types listed in <RNRepoLink href="/packages/react-native/types/public/DeprecatedPropertiesAlias.d.ts">`DeprecatedPropertiesAlias.d.ts`</RNRepoLink> are inaccessible under the Strict API.

### Removal of leftover component props

Some properties that were defined in type definitions but were not used by the component or were lacking a definition were removed (for example: `lineBreakMode` on `Text`, `scrollWithoutAnimationTo` on `ScrollView`, transform styles defined outside of transform array).

### Previously accessible private type helpers may now be removed

Due to the configuration of the previous type definitions, every defined type was accessible from the `react-native` package. This included types that were not explicitly exported and helper types that were only supposed to be used internally.

Notable examples of this are types related to StyleSheet (like `RecursiveArray`, `RegisteredStyle` and `Falsy`) and Animated (like `WithAnimatedArray` and `WithAnimatedObject`).
