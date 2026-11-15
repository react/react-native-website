---
id: reactnativeversion
title: ReactNativeVersion
---

```tsx
import {ReactNativeVersion} from 'react-native';
```

The `ReactNativeVersion` API exposes the version of the resolved `react-native` package on JS side. Apps and libraries can use it to check compatibility or enable version-specific behavior.

:::note

Also, we have [`Platform.constants.reactNativeVersion`](platform#constants) in our public API already. **However**, this is the per-platform _**native-reported**_ React Native version.

:::

## Example

```tsx
import {ReactNativeVersion} from 'react-native';

const version = ReactNativeVersion.getVersionString(); // 0.82.1
const {major, minor, patch, prerelease} = ReactNativeVersion;
major; // 0
minor; // 82
patch; // 1
prerelease; // null
```

---

# Reference

## Properties

### `major`

```tsx
static major: number;
```

The major version number of the resolved `react-native` package.

---

### `minor`

```tsx
static minor: number;
```

The minor version number of the resolved `react-native` package.

---

### `patch`

```tsx
static patch: number;
```

The patch version number of the resolved `react-native` package.

---

### `prerelease`

```tsx
static prerelease: string | null;
```

The prerelease tag for the resolved `react-native` package, or `null` for stable releases.

## Methods

### `getVersionString()`

```tsx
static getVersionString(): string;
```

Returns the full version string in the format `major.minor.patch` or `major.minor.patch-prerelease`.
