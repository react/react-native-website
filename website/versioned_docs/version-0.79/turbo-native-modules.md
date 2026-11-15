---
id: turbo-native-modules-introduction
title: 'Native Modules: Introduction'
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';
import {TurboNativeModulesAndroid, TurboNativeModulesIOS} from './\_turbo-native-modules-components';

# Native Modules

Your React Native application code may need to interact with native platform APIs that aren't provided by React Native or an existing library. You can write the integration code yourself using a **Turbo Native Module**. This guide will show you how to write one.

The basic steps are:

1. **define a typed JavaScript specification** using one of the most popular JavaScript type annotation languages: Flow or TypeScript;
2. **configure your dependency management system to run Codegen**, which converts the specification into native language interfaces;
3. **write your application code** using your specification; and
4. **write your native platform code using the generated interfaces** to write and hook your native code into the React Native runtime environment.

Lets work through each of these steps by building an example Turbo Native Module. The rest of this guide assume that you have created your application running the command:

```shell
npx @react-native-community/cli@latest init TurboModuleExample --version 0.76.0
```

## Native Persistent Storage

This guide will show you how to write an implementation of the [Web Storage API](https://html.spec.whatwg.org/multipage/webstorage.html#dom-localstorage-dev): `localStorage`. The API is relatable to a React developer who might be writing application code on your project.

To make this work on mobile, we need to use Android and iOS APIs:

- Android: [SharedPreferences](https://developer.android.com/reference/android/content/SharedPreferences), and
- iOS: [NSUserDefaults](https://developer.apple.com/documentation/foundation/nsuserdefaults).

### 1. Declare Typed Specification

React Native provides a tool called [Codegen](/the-new-architecture/what-is-codegen.mdx), which takes a specification written in TypeScript or Flow and generates platform specific code for Android and iOS. The specification declares the methods and data types that will pass back and forth between your native code and the React Native JavaScript runtime. A Turbo Native Module is both your specification, the native code you write, and the Codegen interfaces generated from your specification.

To create a specs file:

1. Inside the root folder of your app, create a new folder called `specs`.
2. Create a new file called `NativeLocalStorage.ts`.

:::info
You can see all of the types you can use in your specification and the native types that are generated in the [Appendix](/appendix.md) documentation.
:::

:::info
If you want to change the name of your module and the related specs file, make sure to always use 'Native' as prefix (e.g. `NativeStorage` or `NativeUsersDefault`).
:::

Here is an implementation of the `localStorage` specification:

<Tabs groupId="language" queryString defaultValue={constants.defaultJavaScriptSpecLanguage} values={constants.javaScriptSpecLanguages}>
<TabItem value="typescript">

```typescript title="specs/NativeLocalStorage.ts"
import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  setItem(value: string, key: string): void;
  getItem(key: string): string | null;
  removeItem(key: string): void;
  clear(): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'NativeLocalStorage',
);
```

</TabItem>
<TabItem value="flow">

```flow title="NativeLocalStorage.js"
import type {TurboModule} from 'react-native';
import {TurboModule, TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  setItem(value: string, key: string): void;
  getItem(key: string): ?string;
  removeItem(key: string): void;
  clear(): void;
}
```

</TabItem>
</Tabs>

### 2. Configure Codegen to run

The specification is used by the React Native Codegen tools to generate platform specific interfaces and boilerplate for us. To do this, Codegen needs to know where to find our specification and what to do with it. Update your `package.json` to include:

```json title="package.json"
     "start": "react-native start",
     "test": "jest"
   },
   // highlight-add-start
   "codegenConfig": {
     "name": "NativeLocalStorageSpec",
     "type": "modules",
     "jsSrcsDir": "specs",
     "android": {
       "javaPackageName": "com.nativelocalstorage"
     }
   },
   // highlight-add-end
   "dependencies": {
```

With everything wired up for Codegen, we need to prepare our native code to hook into our generated code.

<Tabs groupId="platforms" queryString defaultValue={constants.defaultPlatform}>
<TabItem value="android" label="Android">
Codegen is executed through the `generateCodegenArtifactsFromSchema` Gradle task:

```bash
cd android
./gradlew generateCodegenArtifactsFromSchema

BUILD SUCCESSFUL in 837ms
14 actionable tasks: 3 executed, 11 up-to-date
```

This is automatically run when you build your Android application.
</TabItem>
<TabItem value="ios" label="iOS">
Codegen is run as part of the script phases that's automatically added to the project generated by CocoaPods.

```bash
cd ios
bundle install
bundle exec pod install
```

The output will look like this:

```shell
...
Framework build type is static library
[Codegen] Adding script_phases to ReactCodegen.
[Codegen] Generating ./build/generated/ios/ReactCodegen.podspec.json
[Codegen] Analyzing /Users/me/src/TurboModuleExample/package.json
[Codegen] Searching for codegen-enabled libraries in the app.
[Codegen] Found TurboModuleExample
[Codegen] Searching for codegen-enabled libraries in the project dependencies.
[Codegen] Found react-native
...
```

</TabItem>
</Tabs>

### 3. Write Application Code using the Turbo Native Module

Using `NativeLocalStorage`, here’s a modified `App.tsx` that includes some text we want persisted, an input field and some buttons to update this value.

The `TurboModuleRegistry` supports 2 modes of retrieving a Turbo Native Module:

- `get<T>(name: string): T | null` which will return `null` if the Turbo Native Module is unavailable.
- `getEnforcing<T>(name: string): T` which will throw an exception if the Turbo Native Module is unavailable. This assumes the module is always available.

```tsx title="App.tsx"
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Button,
} from 'react-native';

import NativeLocalStorage from './specs/NativeLocalStorage';

const EMPTY = '<empty>';

function App(): React.JSX.Element {
  const [value, setValue] = React.useState<string | null>(null);

  const [editingValue, setEditingValue] = React.useState<
    string | null
  >(null);

  React.useEffect(() => {
    const storedValue = NativeLocalStorage?.getItem('myKey');
    setValue(storedValue ?? '');
  }, []);

  function saveValue() {
    NativeLocalStorage?.setItem(editingValue ?? EMPTY, 'myKey');
    setValue(editingValue);
  }

  function clearAll() {
    NativeLocalStorage?.clear();
    setValue('');
  }

  function deleteValue() {
    NativeLocalStorage?.removeItem('myKey');
    setValue('');
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <Text style={styles.text}>
        Current stored value is: {value ?? 'No Value'}
      </Text>
      <TextInput
        placeholder="Enter the text you want to store"
        style={styles.textInput}
        onChangeText={setEditingValue}
      />
      <Button title="Save" onPress={saveValue} />
      <Button title="Delete" onPress={deleteValue} />
      <Button title="Clear" onPress={clearAll} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    margin: 10,
    fontSize: 20,
  },
  textInput: {
    margin: 10,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 5,
  },
});

export default App;
```

### 4. Write your Native Platform code

With everything prepared, we're going to start writing native platform code. We do this in 2 parts:

:::note
This guide shows you how to create a Turbo Native Module that only works with the New Architecture. If you need to support both the New Architecture and the Legacy Architecture, please refer to our [backwards compatibility guide](https://github.com/reactwg/react-native-new-architecture/blob/main/docs/backwards-compat.md).
:::

<Tabs groupId="platforms" queryString defaultValue={constants.defaultPlatform}>
    <TabItem value="android" label="Android">
        <TurboNativeModulesAndroid />
    </TabItem>
    <TabItem value="ios" label="iOS">
        <TurboNativeModulesIOS/>
    </TabItem>
</Tabs>
