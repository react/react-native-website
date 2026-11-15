---
title: How to Contribute Code
---

Thank you for your interest in contributing to React Native! From commenting on and triaging issues, to reviewing and sending PRs, [all contributions are welcome](/contributing/overview). In this document, we'll cover the steps to contributing code to React Native.

If you are eager to start contributing code right away, we have a list of [`Good first issues`](https://github.com/react/react-native/labels/good%20first%20issue) that contain bugs which have a relatively limited scope.
Issues labeled [`Help wanted`](https://github.com/react/react-native/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+label%3A%22help+wanted+%3Aoctocat%3A%22+sort%3Aupdated-desc+) are good issues to submit a PR for.

## Prerequisites

:::info
Please refer to the [Environment Setup](/docs/environment-setup) guide to setup required tools and the development environment based on the platform us use and platform which you want to develop for.
:::

## Development Workflow

After cloning React Native, open the directory and run `yarn` to install its dependencies.

Now you are set up to run several commands:

- `yarn start` starts the Metro packager server.
- `yarn lint` checks the code style.
- `yarn format` automatically formats your code.
- `yarn test` runs the Jest-based JavaScript test suite.
  - `yarn test --watch` runs an interactive JavaScript test watcher.
  - `yarn test <pattern>` runs JavaScript tests with matching filenames.
- `yarn flow` runs the [Flow](https://flowtype.org/) typechecks.
  - `yarn flow-check-android` does a full Flow check over `*.android.js` files.
  - `yarn flow-check-ios` does a full Flow check over `*.ios.js` files.
- `yarn test-typescript` runs the [TypeScript](https://www.typescriptlang.org/) typechecks.
- `yarn test-ios` runs the iOS test suite (macOS required).
- `yarn build` builds all configured packages — in general, this command only needs to be run by CI ahead of publishing.
  - Packages which require a build are configured in [scripts/build/config.js](https://github.com/react/react-native/blob/main/scripts/build/config.js).
- `yarn build-types` generates TypeScript types for the public API and updates the snapshot.

## Testing your Changes

Tests help us prevent regressions from being introduced to the codebase. We recommend running `yarn test` or the platform-specific scripts above to make sure you don't introduce any regressions as you work on your change.

The GitHub repository is [continuously tested](/contributing/how-to-run-and-write-tests#continuous-testing) using CircleCI, the results of which are available through the Checks functionality on [commits](https://github.com/react/react-native/commits/main) and pull requests.

You can learn more about running and writing tests on the [How to Run and Write Tests](/contributing/how-to-run-and-write-tests) page.

## Coding Style

We use Prettier to format our JavaScript code. This saves you time and energy as you can let Prettier fix up any formatting issues automatically through its editor integrations, or by manually running `yarn run prettier`. We also use a linter to catch styling issues that may exist in your code. You can check the status of your code styling by running `yarn run lint`.

However, there are still some styles that the linter cannot pick up, notably in Java or Objective-C code.

### Objective-C

- Space after `@property` declarations
- Brackets on _every_ `if`, on the _same_ line
- `- method`, `@interface`, and `@implementation` brackets on the following line
- _Try_ to keep it around 80 characters line length (sometimes it's not possible...)
- `*` operator goes with the variable name (e.g. `NSObject *variableName;`)

### Java

- If a method call spans multiple lines closing bracket is on the same line as the last argument.
- If a method header doesn't fit on one line each argument goes on a separate line.
- 100 character line length

## Sending a Pull Request

Code-level contributions to React Native generally come in the form of [a pull request](https://help.github.com/en/articles/about-pull-requests). The process of proposing a change to React Native can be summarized as follows:

1. Fork the React Native repository and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes, either locally or on CI once you opened a pull request.
5. Make sure your code lints (for example via `yarn lint --fix`).
6. Verify if your code modifies the JS public API with `yarn build-types --validate`. If so, regenerate the snapshot using `yarn build-types`.
7. Push the changes to your fork.
8. Create a pull request to the React Native repository.
9. Review and address comments on your pull request.
10. A bot may comment with suggestions. Generally we ask you to resolve these first before a maintainer will review your code.
11. If you haven't already, submit the [Contributor License Agreement ("CLA")](#contributor-license-agreement).

If all goes well, your pull request will be merged. If it is not merged, maintainers will do their best to explain their reasoning.

If this is your first time sending a pull request, we have created a [step-by-step guide to help you get started](/contributing/how-to-open-a-pull-request). For more detailed information on how pull requests are handled, see the [Managing Pull Requests page](managing-pull-requests).

### Contributor License Agreement

In order to accept your pull request, we need you to submit a [Contributor License Agreement (CLA)](/contributing/contribution-license-agreement). You only need to do this once to work on any of Meta's open source projects. It only takes a minute, so you can do it while you wait for your dependencies to install.

## License

By contributing to React Native, you agree that your contributions will be licensed under the [LICENSE](https://github.com/react/react-native/blob/main/LICENSE) file in the root directory of the React Native repository.
