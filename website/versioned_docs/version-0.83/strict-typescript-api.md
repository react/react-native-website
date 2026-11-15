---
id: strict-typescript-api
title: Strict TypeScript API (opt in)
---

import RNRepoLink from '@site/core/RNRepoLink';

The Strict TypeScript API is a preview of our future, stable JavaScript API for React Native.

Specifically, this is a new set of TypeScript types for the `react-native` npm package, available from 0.80 onwards. These provide stronger and more futureproof type accuracy, and will allow us to confidently evolve React Native's API into a stable shape. Opting in to the Strict TypeScript API brings some structural type differences, and is therefore a one-time breaking change.

The new types are:

1. **Generated directly from our source code** — improving coverage and correctness, so you can expect stronger compatibility guarantees.
2. **Restricted to `react-native`'s index file** — more tightly defining our public API, and meaning we won't break the API when making internal file changes.

When the community is ready, the Strict TypeScript API will become our default API in future — synchronized with deep imports removal.

## Opting in

We're shipping these new types alongside our existing types, meaning you can choose to migrate when ready. We encourage early adopters and newly created apps to opt in via your `tsconfig.json` file.

Opting in is a **breaking change**, since some of our new types have updated names and shapes, although many apps won't be affected. You can learn about each breaking change in the next section.

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

The Strict TypeScript API follows our [RFC](https://github.com/react-native-community/discussions-and-proposals/pull/894) to remove deep imports from React Native. Therefore, some APIs are no longer exported at root. This is intentional, in order to reduce the overall surface area of React Native's API.

:::tip[API feedback]

**Sending feedback**: We will be working with the community to finalize which APIs we export over (at least) the next two React Native releases. Please share your feedback in our [feedback thread](https://github.com/react-native-community/discussions-and-proposals/discussions/893).

See also our [announcement blog post](/blog/2025/06/12/moving-towards-a-stable-javascript-api) for more info on our motivation and timelines.

:::

## Migration guide

### Codegen types should now be imported from the `react-native` package

Types used for codegen, like `Int32`, `Double`, `WithDefault` etc. are now available under a single `CodegenTypes` namespace. Similarly, `codegenNativeComponent` and `codegenNativeCommands` are now available to import from the react-native package instead of using the deep import.

Namespaced `CodegenTypes` as well as `codegenNativeCommands` and `codegenNativeComponent` are also available from `react-native` package when the Strict API is not enabled to make the adoption easier for third-party libraries.

**Before**

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

**After**

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

### Removal of `*Static` types

**Before**

```tsx title=""
import {Linking, LinkingStatic} from 'react-native';

function foo(linking: LinkingStatic) {}
foo(Linking);
```

**After**

```tsx title=""
import {Linking} from 'react-native';

function foo(linking: Linking) {}
foo(Linking);
```

The following APIs were previously named as `*Static` plus a variable declaration of said type. In most cases there was an alias so that value and the type were exported under the same identifier, but some were missing.

(For example there was an `AlertStatic` type, `Alert` variable of type `AlertStatic` and type `Alert` which was an alias for `AlertStatic`. But in the case of `PixelRatio` there was a `PixelRatioStatic` type and a `PixelRatio` variable of that type without additional type aliases.)

**Affected APIs**

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

### Some core components are now function components instead of class components

- `View`
- `Image`
- `TextInput`
- `Modal`
- `Text`
- `TouchableWithoutFeedback`
- `Switch`
- `ActivityIndicator`
- `ProgressBarAndroid`
- `InputAccessoryView`
- `Button`
- `SafeAreaView`

Due to this change, accessing ref types of these views requires using `React.ComponentRef<typeof View>` pattern which works as expected for both class and function components, e.g.:

```ts title=""
const ref = useRef<React.ComponentRef<typeof View>>(null);
```

## Other breaking changes

### Changes to Animated types

Animated nodes were previously generic types based on their interpolation output. Now, they are non-generic types with a generic `interpolate` method.

`Animated.LegacyRef` is no longer available.

### Unified types for optional props

In the new types, every optional prop will be typed as `type | undefined`.

### Removal of some deprecated types

All types listed in <RNRepoLink href="/packages/react-native/types/public/DeprecatedPropertiesAlias.d.ts">`DeprecatedPropertiesAlias.d.ts`</RNRepoLink> are inaccessible under the Strict API.

### Removal of leftover component props

Some properties that were defined in type definitions but were not used by the component or were lacking a definition were removed (for example: `lineBreakMode` on `Text`, `scrollWithoutAnimationTo` on `ScrollView`, transform styles defined outside of transform array).

### Previously accessible private type helpers may now be removed

Due to the configuration of the previous type definitions, every defined type was accessible from the `react-native` package. This included types that were not explicitly exported and helper types that were only supposed to be used internally.

Notable examples of this are types related to StyleSheet (like `RecursiveArray`, `RegisteredStyle` and `Falsy`) and Animated (like `WithAnimatedArray` and `WithAnimatedObject`).
