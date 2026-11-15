---
id: out-of-tree-platforms
title: Out-of-Tree Platforms
---

React Native is not only for Android and iOS devices - our partners and the community maintain projects that bring React Native to other platforms, such as:

**From Partners**

- [React Native macOS](https://github.com/microsoft/react-native-macos) - React Native for macOS and Cocoa.
- [React Native Windows](https://github.com/microsoft/react-native-windows) - React Native for Microsoft's Universal Windows Platform (UWP).
- [React Native visionOS](https://github.com/callstack/react-native-visionos) - React Native for Apple's visionOS.

**From Community**

- [React Native tvOS](https://github.com/react-native-tvos/react-native-tvos) - React Native for Apple TV and Android TV devices.
- [React Native Web](https://github.com/necolas/react-native-web) - React Native on the web using React DOM.
- [React Native Skia](https://github.com/react-native-skia/react-native-skia) - React Native using [Skia](https://skia.org/) as a renderer. Currently supports Linux and macOS.

## Creating your own React Native platform

The process of creating a React Native platform from scratch is still not very well documented - one of the goals of the New Architecture and [Fabric](/architecture/fabric-renderer) is to make maintaining a platform easier.

### Bundling

As of React Native 0.57 you can now register your React Native platform with React Native's JavaScript bundler, [Metro](https://metrobundler.dev/). This means you can pass `--platform example` to `npx react-native bundle`, and it will look for JavaScript files with the `.example.js` suffix.

To register your platform with RNPM, your module's name must match one of these patterns:

- `react-native-example` - It will search all top-level modules that start with `react-native-`
- `@org/react-native-example` - It will search for modules that start with `react-native-` under any scope
- `@react-native-example/module` - It will search in all modules under scopes with names starting with `@react-native-`

You must also have an entry in your `package.json` like this:

```json
{
  "rnpm": {
    "haste": {
      "providesModuleNodeModules": ["react-native-example"],
      "platforms": ["example"]
    }
  }
}
```

`"providesModuleNodeModules"` is an array of modules that will get added to the Haste module search path, and `"platforms"` is an array of platform suffixes that will be added as valid platforms.
