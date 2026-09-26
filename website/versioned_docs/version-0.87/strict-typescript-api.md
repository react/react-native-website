---
id: strict-typescript-api
title: Strict TypeScript API
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RNRepoLink from '@site/core/RNRepoLink';

:::info[New in 0.87]

**The Strict API is now enabled by default** (previously an opt-in from 0.80+). This is a **breaking change**, detailed in the guide below.

:::

The Strict TypeScript API is React Native's modern TypeScript API, replacing the previous hand-maintained TypeScript definitions from earlier versions.

### Key changes (breaking)

1. **No deep imports.** The API is restricted to `react-native`'s index file. This is a tighter and more intentional public API contract. It also ensures that internal file path changes in React Native's source code won't be breaking.
2. **Generated directly from source.** Previously, React Native used separately maintained manual types. Generating from source now means we improve coverage, correctness, and compatibility guarantees.

### Opting out <div className="label primary">Since 0.87</div>

The Strict API is a **breaking change**, and not all apps and libraries may be able to migrate immediately.

We continue to ship our previous manual types, which can be reverted to via your `tsconfig.json` config. Please note that in a future release we will remove this opt out.

```diff title="tsconfig.json"
  {
    "extends": "@react-native/typescript-config",
    "compilerOptions": {
      ...
+     "customConditions": ["react-native", "react-native-legacy-deep-imports"]
    }
  }
```

:::info[Issues / Feedback?]

The 0.87 rollout of the Strict API by default is an ecosystem-wide change, and one we need to make in order to have stable API guarantees for React Native in future.

Design choices about which APIs are exported at root, and intentional updates to type names/shapes have been worked on with the community and partners since the original 0.80 preview.

We believe we've ironed out all rough edges, but there may still be edge cases. If you're choosing to opt out of the Strict API in 0.87 or later, we'd love to know why: [**discussion thread**](https://github.com/react-native-community/discussions-and-proposals/discussions/1015).

:::

---

## Migration guide

:::tip

Use the [**/migrate-to-strict-api**](https://www.skills.sh/react-native-community/skills/migrate-to-strict-api) skill to migrate your codebase via an agent.

```sh
npx skills add react-native-community/skills --skill migrate-to-strict-api
```

:::

### Before you start

Enabling the Strict API — by upgrading to 0.87, or by opting in on an earlier release — affects TypeScript analysis of your own project only, scoped by its `tsconfig.json`.

In most cases, codebases can migrate independently — app developers don't need to wait for specific dependencies to opt in, and library authors don't need to wait for their users.

#### Keep `skipLibCheck` enabled

The above depends on `skipLibCheck`, which `@react-native/typescript-config` enables by default. This keeps errors originating inside third-party `.d.ts` files out of your results. If your project overrides it, turn it back on before you start — otherwise you will see errors in dependencies that you can't fix.

#### Update your dependencies

Occasionally, your dependencies can have rough edges under the Strict API. Whenever type errors involve a library, check for and update to a fixed release first.

One specific rough edge: Some libraries ship raw TypeScript source that your project imports, e.g. Jest setup files. These are typechecked as part of your project. Popular libraries have already repackaged these entry points:

- `@expensify/react-native-live-markdown` — fixed in [0.1.335](https://github.com/Expensify/react-native-live-markdown/pull/771)
- `react-native-safe-area-context` — fixed in [5.8.1](https://github.com/AppAndFlow/react-native-safe-area-context/pull/745)

<details>
<summary>**Advanced: Excluding an incompatible library**</summary>

If an incompatible library is producing errors under `node_modules` (typically `TS2307: Cannot find module 'react-native/Libraries/...'`), you can exclude it from TypeScript analysis as a local fix, by redirecting the imported subpath to an untyped stub:

```json title="tsconfig.json"
{
  "compilerOptions": {
    "paths": {
      "some-library/jest/mock": ["./untyped-module.d.ts"]
    }
  }
}
```

```ts title="untyped-module.d.ts"
declare const anyExport: unknown;
export default anyExport;
```

Please also report the incompatibility to the library — the fixes linked above are a good template.

</details>

### New `CodegenTypes` namespace

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

### Refs now use `*Instance` types <div className="label primary">Since 0.87</div>

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
import type {
  TextInput,
  TextInputInstance,
  View,
  ViewInstance,
} from 'react-native';

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
<summary>**Available instance types**</summary>

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
<summary>**Affected APIs**</summary>

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

### Updating test mocks

In most projects, no changes are needed here. Existing `jest.mock()` calls against `react-native/*` paths keep working — the Strict API doesn't change how module paths resolve in Jest or Metro, and a `jest.mock()` path string isn't type-checked.

If a test file imports a deep path as a module (for example, to wrap the real implementation from `jest.requireActual()`), TypeScript will report the import as untyped. Where no root export covers the use case, you can keep the import and quiet the error:

```ts
// @ts-expect-error - React Native internal, untyped under the Strict API
import NativeAppState from 'react-native/Libraries/AppState/NativeAppState';
```

Separately, if your Jest setup imports `react-native/Libraries/Core/InitializeCore`, update it — see [`InitializeCore` is now `react-native/setup-env`](#initializecore-is-now-react-nativesetup-env-since-087).

## Other breaking changes

### `InitializeCore` is now `react-native/setup-env` <div className="label primary">Since 0.87</div>

Unlike other deep imports, this module is a side-effect entry point with no root `react-native` equivalent. `InitializeCore` is deprecated since 0.87.

```diff title=""
- import 'react-native/Libraries/Core/InitializeCore';
+ import 'react-native/setup-env';
```

Most apps never import this directly — it's typically found in Jest setup files and custom entry points.

### Changes to Animated types

Animated nodes were previously generic types based on their interpolation output. Now, they are non-generic types with a generic `interpolate` method.

`Animated.LegacyRef` is no longer available. Use the appropriate `*Instance` type instead (e.g. `ViewInstance` for `Animated.View`).

### Unified types for optional props

In the new types, every optional prop will be typed as `type | undefined`.

### Removal of some deprecated types

The long-deprecated `*Properties` aliases are inaccessible under the Strict API. These date from an early rename of the props types to their modern `*Props` names, and each alias has a direct replacement: `ViewProperties` becomes `ViewProps`, `TextInputProperties` becomes `TextInputProps`, and so on (plus `ImagePropertiesSourceOptions`, which becomes `ImageSourcePropType`).

For the full list of aliases, see <RNRepoLink href="/packages/react-native/types/public/DeprecatedPropertiesAlias.d.ts">`DeprecatedPropertiesAlias.d.ts`</RNRepoLink>.

### Removal of leftover component props

Some properties that were defined in type definitions but were not used by the component or were lacking a definition were removed (for example: `lineBreakMode` on `Text`, `scrollWithoutAnimationTo` on `ScrollView`, transform styles defined outside of transform array).

### Removal of internal-only helper types

Due to the configuration of the previous type definitions, every defined type was accessible from the `react-native` package. This included types that were not explicitly exported and helper types that were only supposed to be used internally.

Notable examples of this are types related to StyleSheet (like `RecursiveArray`, `RegisteredStyle` and `Falsy`) and Animated (like `WithAnimatedArray` and `WithAnimatedObject`).

## FAQs

<details>
<summary>**Does this change anything at runtime?**</summary>

No. The Strict API changes which type definitions TypeScript resolves — both modes resolve the same JavaScript, and your bundle is unaffected.

Note that 0.87 separately removes `react-native/src/private/*` from the package's exports, which does affect runtime. That change is independent of the Strict API.

</details>

<details>
<summary>**I maintain a library. Do I need to migrate before my users can upgrade?**</summary>

No — libraries and apps should be able to migrate independently. The Strict API is enabled per project, through each project's own `tsconfig.json`: an app adopting it doesn't affect your library, and your library adopting it doesn't affect your users. Consumers only ever see the type definitions your package ships.

Two caveats: any raw TypeScript source you ship for consumers to import (such as a Jest mock entry point) is typechecked inside their projects, so it must not rely on deep imports — ship compiled output with `.d.ts` files instead (see [Update your dependencies](#update-your-dependencies)). And you should still plan to migrate your own source: the legacy types opt-out is temporary.

</details>

<details>
<summary>**An API I use isn't exported from `react-native`. Is that a bug?**</summary>

In most cases this is intentional rather than an oversight. Our [RFC](https://github.com/react-native-community/discussions-and-proposals/pull/894) scoped the public API to what `react-native`'s index file exports, so some previously reachable internals are now private.

If you depend on something with no root equivalent, please tell us in the [discussion thread](https://github.com/react-native-community/discussions-and-proposals/discussions/1015). Where justified, we may promote APIs to the index export.

</details>

<details>
<summary>**Why were React Native's manual types replaced?**</summary>

React Native is authored in [Flow](https://flow.org/), not TypeScript. Its TypeScript types were previously community-contributed and hand-maintained (originating from `@types/react-native` on DefinitelyTyped), leaving correctness gaps — generating them from our source code ensures the types always match the implementation.

See [Moving Towards a Stable JavaScript API](/blog/2025/06/12/moving-towards-a-stable-javascript-api) for the full rationale.

</details>

:::note[Learn more]

<div style={{display: 'flex', alignItems: 'center', gap: 40}}>
  <div style={{flex: 1, gap: 8}}>
    <strong style={{display: 'block', marginBottom: 8}}>
      Watch the talk!
    </strong>
    <span>
      We shared a deep dive into our motivations and the work
      behind the Strict TypeScript API at{' '}
      <strong>App.js 2025</strong>.
    </span>
    <a
      href="https://www.youtube.com/live/UTaJlqhTk2g?si=SDRmj80kss7hXuGG&t=6520"
      target="_blank">
      <strong>View on YouTube</strong>
    </a>
  </div>
  <img
    src="/blog/assets/0.80-js-stable-api-appjs.jpg"
    style={{
      flexShrink: 0,
      maxWidth: '200px',
      aspectRatio: '16/9',
      borderRadius: 10,
    }}
    alt="App.js 2025 Talk"
  />
</div>

:::
