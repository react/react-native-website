# The Codegen CLI

Calling Gradle or manually calling a script might be hard to remember and it requires a lot of ceremony.

To simplify it, we created a CLI tool that can help you running those tasks: the **Codegen** cli. This command runs [@react-native/codegen](https://www.npmjs.com/package/@react-native/codegen) for your project. The following options are available:

```sh
npx @react-native-community/cli codegen --help
Usage: rnc-cli codegen [options]

Options:
  --verbose            Increase logging verbosity
  --path <path>        Path to the React Native project root. (default: "/Users/MyUsername/projects/my-app")
  --platform <string>  Target platform. Supported values: "android", "ios", "all". (default: "all")
  --outputPath <path>  Path where generated artifacts will be output to.
  -h, --help           display help for command
```

## Examples

- Read `package.json` from the current working directory, generate code based on its codegenConfig.

```shell
npx @react-native-community/cli codegen
```

- Read `package.json` from the current working directory, generate iOS code in the location defined in the codegenConfig.

```shell
npx @react-native-community/cli codegen --platform ios
```

- Read `package.json` from `third-party/some-library`, generate Android code in `third-party/some-library/android/generated`.

```shell
npx @react-native-community/cli codegen \
    --path third-party/some-library \
    --platform android \
    --outputPath third-party/some-library/android/generated
```

## Including Generated Code into Libraries

The Codegen CLI is a great tool for library developers. It can be used to take a sneak-peek at the generated code to see which interfaces you need to implement.

Normally the generated code is not included in the library, and the app that uses the library is responsible for running the Codegen at build time.
This is a good setup for most cases, but Codegen also offers a mechanism to include the generated code in the library itself via the `includesGeneratedCode` property.

It's important to understand what are the implications of using `includesGeneratedCode = true`. Including the generated code comes with several benefits such as:

- No need to rely on the app to run **Codegen** for you, the generated code is always there.
- The implementation files are always consistent with the generated interfaces (this makes your library code more resilient against API changes in codegen).
- No need to include two sets of files to support both architectures on Android. You can only keep the New Architecture one, and it is guaranteed to be backwards compatible.
- Since all native code is there, it is possible to ship the native part of the library as a prebuild.

On the other hand, you also need to be aware of one drawback:

- The generated code will use the React Native version defined inside your library. So if your library is shipping with React Native 0.76, the generated code will be based on that version. This could mean that the generated code is not compatible with apps using **previous** React Native version used by the app (e.g. an App running on React Native 0.75).

## Enabling `includesGeneratedCode`

To enable this setup:

- Add the `includesGeneratedCode` property into your library's `codegenConfig` field in the `package.json` file. Set its value to `true`.
- Run **Codegen** locally with the codegen CLI.
- Update your `package.json` to include the generated code.
- Update your `podspec` to include the generated code.
- Update your `build.Gradle` file to include the generated code.
- Update `cmakeListsPath` in `react-native.config.js` so that Gradle doesn't look for CMakeLists file in the build directory but instead in your outputDir.
