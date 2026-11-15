import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

# Advanced: Custom C++ Types

:::note
This guide assumes that you are familiar with the [**Pure C++ Turbo Native Modules**](pure-cxx-modules.md) guide. This will build on top of that guide.
:::

C++ Turbo Native Modules support [bridging functionality](https://github.com/facebook/react-native/tree/main/packages/react-native/ReactCommon/react/bridging) for most `std::` standard types. You can use most of those types in your modules without any additional code required.

If you want to add support for new and custom types in your app or library, you need to provide the necessary `bridging` header file.

## Adding a New Custom: Int64

C++ Turbo Native Modules don't support `int64_t` numbers yet - because JavaScript doesn't support numbers greater 2^53. To represent numbers greater than 2^53, we can use a `string` type in JS and automatically convert it to `int64_t` in C++.

### 1. Create the Bridging Header file

The first step to support a new custom type is to define the bridging header that takes care of converting the type **from** the JS representation to the C++ representation, and from the C++ representation **to** the JS one.

1. In the `shared` folder, add a new file called `Int64.h`
2. Add the following code to that file:

```cpp title="Int64.h"
#pragma once

#include <react/bridging/Bridging.h>

namespace facebook::react {

template <>
struct Bridging<int64_t> {
  // Converts from the JS representation to the C++ representation
  static int64_t fromJs(jsi::Runtime &rt, const jsi::String &value) {
    try {
      size_t pos;
      auto str = value.utf8(rt);
      auto num = std::stoll(str, &pos);
      if (pos != str.size()) {
        throw std::invalid_argument("Invalid number"); // don't support alphanumeric strings
      }
      return num;
    } catch (const std::logic_error &e) {
      throw jsi::JSError(rt, e.what());
    }
  }

  // Converts from the C++ representation to the JS representation
  static jsi::String toJs(jsi::Runtime &rt, int64_t value) {
    return bridging::toJs(rt, std::to_string(value));
  }
};

}
```

The key components for your custom bridging header are:

- Explicit specialization of the `Bridging` struct for your custom type. In this case, the template specify the `int64_t` type.
- A `fromJs` function to convert from the JS representation to the C++ representation
- A `toJs` function to convert from the C++ representation to the JS representation

:::note
On iOS, remember to add the `Int64.h` file to the Xcode project.
:::

### 2. Modify the JS Spec

Now, we can modify the JS spec to add a method that uses the new type. As usual, we can use either Flow or TypeScript for our specs.

1. Open the `specs/NativeSampleTurbomodule`
2. Modify the spec as follows:

<Tabs groupId="custom-int64" queryString defaultValue={constants.defaultJavaScriptSpecLanguages} values={constants.javaScriptSpecLanguages}>
<TabItem value="typescript">

```diff title="NativeSampleModule.ts"
import {TurboModule, TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  readonly reverseString: (input: string) => string;
+  readonly cubicRoot: (input: string) => number;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'NativeSampleModule',
);
```

</TabItem>
<TabItem value="flow">

```diff title="NativeSampleModule.js"
// @flow
import type {TurboModule} from 'react-native';
import { TurboModuleRegistry } from "react-native";

export interface Spec extends TurboModule {
  +reverseString: (input: string) => string;
+  +cubicRoot: (input: string) => number;
}

export default (TurboModuleRegistry.getEnforcing<Spec>(
  "NativeSampleModule"
): Spec);
```

</TabItem>
</Tabs>

In this files, we are defining the function that needs to be implemented in C++.

### 3. Implement the Native Code

Now, we need to implement the function that we declared in the JS specification.

1. Open the `specs/NativeSampleModule.h` file and apply the following changes:

```diff title="NativeSampleModule.h"
#pragma once

#include <AppSpecsJSI.h>
#include <memory>
#include <string>

+ #include "Int64.h"

namespace facebook::react {

class NativeSampleModule : public NativeSampleModuleCxxSpec<NativeSampleModule> {
public:
  NativeSampleModule(std::shared_ptr<CallInvoker> jsInvoker);

  std::string reverseString(jsi::Runtime& rt, std::string input);
+ int32_t cubicRoot(jsi::Runtime& rt, int64_t input);
};

} // namespace facebook::react

```

2. Open the `specs/NativeSampleModule.cpp` file and apply the implement the new function:

```diff title="NativeSampleModule.cpp"
#include "NativeSampleModule.h"
+ #include <cmath>

namespace facebook::react {

NativeSampleModule::NativeSampleModule(std::shared_ptr<CallInvoker> jsInvoker)
    : NativeSampleModuleCxxSpec(std::move(jsInvoker)) {}

std::string NativeSampleModule::reverseString(jsi::Runtime& rt, std::string input) {
  return std::string(input.rbegin(), input.rend());
}

+int32_t NativeSampleModule::cubicRoot(jsi::Runtime& rt, int64_t input) {
+    return std::cbrt(input);
+}

} // namespace facebook::react
```

The implementation imports the `<cmath>` C++ library to perform mathematical operations, then it implements the `cubicRoot` function using the `cbrt` primitive from the `<cmath>` module.

### 4. Test your code in Your App

Now, we can test the code in our app.

First, we need to update the `App.tsx` file to use the new method from the TurboModule. Then, we can build our apps in Android and iOS.

1. Open the `App.tsx` code apply the following changes:

```diff title="App.tsx"
// ...
+ const [cubicSource, setCubicSource] = React.useState('')
+ const [cubicRoot, setCubicRoot] = React.useState(0)
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>
          Welcome to C++ Turbo Native Module Example
        </Text>
        <Text>Write down here the text you want to revert</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Write your text here"
          onChangeText={setValue}
          value={value}
        />
        <Button title="Reverse" onPress={onPress} />
        <Text>Reversed text: {reversedValue}</Text>
+        <Text>For which number do you want to compute the Cubic Root?</Text>
+        <TextInput
+          style={styles.textInput}
+          placeholder="Write your text here"
+          onChangeText={setCubicSource}
+          value={cubicSource}
+        />
+        <Button title="Get Cubic Root" onPress={() => setCubicRoot(SampleTurboModule.cubicRoot(cubicSource))} />
+        <Text>The cubic root is: {cubicRoot}</Text>
      </View>
    </SafeAreaView>
  );
}
//...
```

2. To test the app on Android, run `yarn android` from the root folder of your project.
3. To test the app on iOS, run `yarn ios` from the root folder of your project.

## Adding a New Structured Custom Type: Address

The approach above can be generalized to any kind of type. For structured types, React Native provides some helper functions that make it easier to bridge them from JS to C++ and vice versa.

Let's assume that we want to bridge a custom `Address` type with the following properties:

```ts
interface Address {
  street: string;
  num: number;
  isInUS: boolean;
}
```

### 1. Define the type in the specs

For the first step, let's define the new custom type in the JS specs, so that Codegen can output all the supporting code. In this way, we don't have to manually write the code.

1. Open the `specs/NativeSampleModule` file and add the following changes.

<Tabs groupId="custom-int64" queryString defaultValue={constants.defaultJavaScriptSpecLanguages} values={constants.javaScriptSpecLanguages}>
<TabItem value="typescript">

```diff title="NativeSampleModule (Add Address type and validateAddress function)"
import {TurboModule, TurboModuleRegistry} from 'react-native';

+export type Address = {
+  street: string,
+  num: number,
+  isInUS: boolean,
+};

export interface Spec extends TurboModule {
  readonly reverseString: (input: string) => string;
+ readonly validateAddress: (input: Address) => boolean;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'NativeSampleModule',
);
```

</TabItem>
<TabItem value="flow">

```diff title="NativeSampleModule (Add Address type and validateAddress function)"

// @flow
import type {TurboModule} from 'react-native';
import { TurboModuleRegistry } from "react-native";

+export type Address = {
+  street: string,
+  num: number,
+  isInUS: boolean,
+};


export interface Spec extends TurboModule {
  +reverseString: (input: string) => string;
+ +validateAddress: (input: Address) => boolean;
}

export default (TurboModuleRegistry.getEnforcing<Spec>(
  "NativeSampleModule"
): Spec);
```

</TabItem>
</Tabs>

This code defines the new `Address` type and defines a new `validateAddress` function for the Turbo Native Module. Notice that the `validateFunction` requires an `Address` object as parameter.

It is also possible to have functions that return custom types.

### 2. Define the bridging code

From the `Address` type defined in the specs, Codegen will generate two helper types: `NativeSampleModuleAddress` and `NativeSampleModuleAddressBridging`.

The first type is the definition of the `Address`. The second type contains all the infrastructure to bridge the custom type from JS to C++ and vice versa. The only extra step we need to add is to define the `Bridging` structure that extends the `NativeSampleModuleAddressBridging` type.

1. Open the `shared/NativeSampleModule.h` file
2. Add the following code in the file:

```diff title="NativeSampleModule.h (Bridging the Address type)"
#include "Int64.h"
#include <memory>
#include <string>

namespace facebook::react {
+  using Address = NativeSampleModuleAddress<std::string, int32_t, bool>;

+  template <>
+  struct Bridging<Address>
+      : NativeSampleModuleAddressBridging<Address> {};
  // ...
}
```

This code defines an `Address` typealias for the generic type `NativeSampleModuleAddress`. **The order of the generics matters**: the first template argument refers to the first data type of the struct, the second refers to the second, and so forth.

Then, the code adds the `Bridging` specialization for the new `Address` type, by extending `NativeSampleModuleAddressBridging` that is generated by Codegen.

:::note
There is a convention that is followed to generate this types:

- The first part of the name is always the type of the module. `NativeSampleModule`, in this example.
- The second part of the name is always the name of the JS type defined in the specs. `Address`, in this example.
  :::

### 3. Implement the Native Code

Now, we need to implement the `validateAddress` function in C++. First, we need to add the function declaration into the `.h` file, and then we can implement it in the `.cpp` file.

1. Open the `shared/NativeSampleModule.h` file and add the function definition

```diff title="NativeSampleModule.h (validateAddress function prototype)"
  std::string reverseString(jsi::Runtime& rt, std::string input);

+  bool validateAddress(jsi::Runtime &rt, jsi::Object input);
};

} // namespace facebook::react
```

2. Open the `shared/NativeSampleModule.cpp` file and add the function implementation

```cpp title="NativeSampleModule.cpp (validateAddress implementation)"
bool NativeSampleModule::validateAddress(jsi::Runtime &rt, jsi::Object input) {
  std::string street = input.getProperty(rt, "street").asString(rt).utf8(rt);
  int32_t number = input.getProperty(rt, "num").asNumber();

  return !street.empty() && number > 0;
}
```

In the implementation, the object that represents the `Address` is a `jsi::Object`. To extract the values from this object, we need to use the accessors provided by `JSI`:

- `getProperty()` retrieves the property from and object by name.
- `asString()` converts the property to `jsi::String`.
- `utf8()` converts the `jsi::String` to a `std::string`.
- `asNumber()` converts the property to a `double`.

Once we manually parsed the object, we can implement the logic that we need.

:::note
If you want to learn more about `JSI` and how it works, have a look at this [great talk](https://youtu.be/oLmGInjKU2U?feature=shared) from App.JS 2024
:::

### 4. Testing the code in the app

To test the code in the app, we have to modify the `App.tsx` file.

1. Open the `App.tsx` file. Remove the content of the `App()` function.
2. Replace the body of the `App()` function with the following code:

```ts title="App.tsx (App function body replacement)"
const [street, setStreet] = React.useState('');
const [num, setNum] = React.useState('');
const [isValidAddress, setIsValidAddress] = React.useState<
  boolean | null
>(null);

const onPress = () => {
  let houseNum = parseInt(num, 10);
  if (isNaN(houseNum)) {
    houseNum = -1;
  }
  const address = {
    street,
    num: houseNum,
    isInUS: false,
  };
  const result = SampleTurboModule.validateAddress(address);
  setIsValidAddress(result);
};

return (
  <SafeAreaView style={styles.container}>
    <View>
      <Text style={styles.title}>
        Welcome to C Turbo Native Module Example
      </Text>
      <Text>Address:</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Write your address here"
        onChangeText={setStreet}
        value={street}
      />
      <Text>Number:</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Write your address here"
        onChangeText={setNum}
        value={num}
      />
      <Button title="Validate" onPress={onPress} />
      {isValidAddress != null && (
        <Text>
          Your address is {isValidAddress ? 'valid' : 'not valid'}
        </Text>
      )}
    </View>
  </SafeAreaView>
);
```

Congratulation! 🎉

You bridged your first types from JS to C++.
