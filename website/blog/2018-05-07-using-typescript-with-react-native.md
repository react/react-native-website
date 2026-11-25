---
title: Using TypeScript with React Native
author: Ash Furrow
authorTitle: Software Engineer at Artsy
authorURL: 'https://github.com/ashfurrow'
authorImageURL: 'https://avatars2.githubusercontent.com/u/498212?s=460&v=4'
authorTwitter: ashfurrow
tags: [engineering]
---

JavaScript! We all love it. But some of us also love [types](https://en.wikipedia.org/wiki/Data_type). Luckily, options exist to add stronger types to JavaScript. My favourite is [TypeScript](https://www.typescriptlang.org), but React Native supports [Flow](https://flow.org) out of the box. Which you prefer is a matter of preference, they each have their own approach on how to add the magic of types to JavaScript. Today, we're going to look at how to use TypeScript in React Native apps.

This post uses Microsoft's [TypeScript-React-Native-Starter](https://github.com/Microsoft/TypeScript-React-Native-Starter) repo as a guide.

**Update**: Since this blog post was written, things have gotten even easier. You can replace all the set up described in this blog post by running just one command:

```sh
npx react-native init MyAwesomeProject --template react-native-template-typescript
```

However, there _are_ some limitations to Babel's TypeScript support, which the blog post above goes into in detail. The steps outlined in _this_ post still work, and Artsy is still using [react-native-typescript-transformer](https://github.com/ds300/react-native-typescript-transformer) in production, but the fastest way to get up and running with React Native and TypeScript is using the above command. You can always switch later if you have to.

In any case, have fun! The original blog post continues below.

## Prerequisites

Because you might be developing on one of several different platforms, targeting several different types of devices, basic setup can be involved. You should first ensure that you can run a plain React Native app without TypeScript. Follow [the instructions on the React Native website to get started](/docs/getting-started). When you've managed to deploy to a device or emulator, you'll be ready to start a TypeScript React Native app.

You will also need [Node.js](https://nodejs.org/en/), [npm](https://www.npmjs.com), and [Yarn](https://yarnpkg.com/lang/en).

## Initializing

Once you've tried scaffolding out an ordinary React Native project, you'll be ready to start adding TypeScript. Let's go ahead and do that.

```sh
react-native init MyAwesomeProject
cd MyAwesomeProject
```

## Adding TypeScript

The next step is to add TypeScript to your project. The following commands will:

- add TypeScript to your project
- add [React Native TypeScript Transformer](https://github.com/ds300/react-native-typescript-transformer) to your project
- initialize an empty TypeScript config file, which we'll configure next
- add an empty React Native TypeScript Transformer config file, which we'll configure next
- adds [typings](https://github.com/DefinitelyTyped/DefinitelyTyped) for React and React Native

Okay, let's go ahead and run these.

```sh
yarn add --dev typescript
yarn add --dev react-native-typescript-transformer
yarn tsc --init --pretty --jsx react
touch rn-cli.config.js
yarn add --dev @types/react @types/react-native
```

The `tsconfig.json` file contains all the settings for the TypeScript compiler. The defaults created by the command above are mostly fine, but open the file and uncomment the following line:

```js
{
  /* Search the config file for the following line and uncomment it. */
  // "allowSyntheticDefaultImports": true,  /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */
}
```

The `rn-cli.config.js` contains the settings for the React Native TypeScript Transformer. Open it and add the following:

```js
module.exports = {
  getTransformModulePath() {
    return require.resolve('react-native-typescript-transformer');
  },
  getSourceExts() {
    return ['ts', 'tsx'];
  },
};
```

## Migrating to TypeScript

Rename the generated `App.js` and `__tests_/App.js` files to `App.tsx`. `index.js` needs to use the `.js` extension. All new files should use the `.tsx` extension (or `.ts` if the file doesn't contain any JSX).

If you tried to run the app now, you'd get an error like `object prototype may only be an object or null`. This is caused by a failure to import the default export from React as well as a named export on the same line. Open `App.tsx` and modify the import at the top of the file:

```diff
-import React, { Component } from 'react';
+import React from 'react'
+import { Component } from 'react';
```

Some of this has to do with differences in how Babel and TypeScript interoperate with CommonJS modules. In the future, the two will stabilize on the same behaviour.

At this point, you should be able to run the React Native app.

## Adding TypeScript Testing Infrastructure

React Native ships with [Jest](https://github.com/jestjs/jest), so for testing a React Native app with TypeScript, we'll want to add [ts-jest](https://www.npmjs.com/package/ts-jest) to our `devDependencies`.

```sh
yarn add --dev ts-jest
```

Then, we'll open up our `package.json` and replace the `jest` field with the following:

```js
{
  "jest": {
    "preset": "react-native",
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "js"
    ],
    "transform": {
      "^.+\\.(js)$": "<rootDir>/node_modules/babel-jest",
      "\\.(ts|tsx)$": "<rootDir>/node_modules/ts-jest/preprocessor.js"
    },
    "testRegex": "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
    "testPathIgnorePatterns": [
      "\\.snap$",
      "<rootDir>/node_modules/"
    ],
    "cacheDirectory": ".jest/cache"
  }
}
```

This will configure Jest to run `.ts` and `.tsx` files with `ts-jest`.

## Installing Dependency Type Declarations

To get the best experience in TypeScript, we want the type-checker to understand the shape and API of our dependencies. Some libraries will publish their packages with `.d.ts` files (type declaration/type definition files), which can describe the shape of the underlying JavaScript. For other libraries, we'll need to explicitly install the appropriate package in the `@types/` npm scope.

For example, here we'll need types for Jest, React, and React Native, and React Test Renderer.

```ts
yarn add --dev @types/jest @types/react @types/react-native @types/react-test-renderer
```

We saved these declaration file packages to our _dev_ dependencies because this is a React Native _app_ that only uses these dependencies during development and not during runtime. If we were publishing a library to NPM, we might have to add some of these type dependencies as regular dependencies.

You can read more [here about getting `.d.ts` files](https://www.typescriptlang.org/docs/handbook/declaration-files/consumption.html).

## Ignoring More Files

For your source control, you'll want to start ignoring the `.jest` folder. If you're using git, we can just add entries to our `.gitignore` file.

```config
# Jest
#
.jest/
```

As a checkpoint, consider committing your files into version control.

```sh
git init
git add .gitignore # import to do this first, to ignore our files
git add .
git commit -am "Initial commit."
```

## Adding a Component

Let's add a component to our app. Let's go ahead and create a `Hello.tsx` component. It's a pedagogical component, not something that you'd actually write in an app, but something nontrivial that shows off how to use TypeScript in React Native.

Create a `components` directory and add the following example.

```ts
// components/Hello.tsx
import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

export interface Props {
  name: string;
  enthusiasmLevel?: number;
}

interface State {
  enthusiasmLevel: number;
}

export class Hello extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    if ((props.enthusiasmLevel || 0) <= 0) {
      throw new Error(
        'You could be a little more enthusiastic. :D',
      );
    }

    this.state = {
      enthusiasmLevel: props.enthusiasmLevel || 1,
    };
  }

  onIncrement = () =>
    this.setState({
      enthusiasmLevel: this.state.enthusiasmLevel + 1,
    });
  onDecrement = () =>
    this.setState({
      enthusiasmLevel: this.state.enthusiasmLevel - 1,
    });
  getExclamationMarks = (numChars: number) =>
    Array(numChars + 1).join('!');

  render() {
    return (
      <View style={styles.root}>
        <Text style={styles.greeting}>
          Hello{' '}
          {this.props.name +
            this.getExclamationMarks(this.state.enthusiasmLevel)}
        </Text>

        <View style={styles.buttons}>
          <View style={styles.button}>
            <Button
              title="-"
              onPress={this.onDecrement}
              accessibilityLabel="decrement"
              color="red"
            />
          </View>

          <View style={styles.button}>
            <Button
              title="+"
              onPress={this.onIncrement}
              accessibilityLabel="increment"
              color="blue"
            />
          </View>
        </View>
      </View>
    );
  }
}

// styles
const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttons: {
    flexDirection: 'row',
    minHeight: 70,
    alignItems: 'stretch',
    alignSelf: 'center',
    borderWidth: 5,
  },
  button: {
    flex: 1,
    paddingVertical: 0,
  },
  greeting: {
    color: '#999',
    fontWeight: 'bold',
  },
});
```

Whoa! That's a lot, but let's break it down:

- Instead of rendering HTML elements like `div`, `span`, `h1`, etc., we're rendering components like `View` and `Button`. These are native components that work across different platforms.
- Styling is specified using the `StyleSheet.create` function that React Native gives us. React's stylesheets allow us to control our layout using Flexbox, and style using other constructs similar to those in CSS.

## Adding a Component Test

Now that we've got a component, let's try testing it.

We already have Jest installed as a test runner. We're going to write snapshot tests for our components, let's add the required add-on for snapshot tests:

```sh
yarn add --dev react-addons-test-utils
```

Now let's create a `__tests__` folder in the `components` directory and add a test for `Hello.tsx`:

```ts
// components/__tests__/Hello.tsx
import React from 'react';
import renderer from 'react-test-renderer';

import {Hello} from '../Hello';

it('renders correctly with defaults', () => {
  const button = renderer
    .create(<Hello name="World" enthusiasmLevel={1} />)
    .toJSON();
  expect(button).toMatchSnapshot();
});
```

The first time the test is run, it will create a snapshot of the rendered component and store it in the `components/__tests__/__snapshots__/Hello.tsx.snap` file. When you modify your component, you'll need to update the snapshots and review the update for inadvertent changes. You can read more about testing React Native components [here](https://jestjs.io/docs/tutorial-react-native).

## Next Steps

Check out the official [React tutorial](https://reactjs.org/tutorial/tutorial.html) and state-management library [Redux](https://redux.js.org). These resources can be helpful when writing React Native apps. Additionally, you may want to look at [ReactXP](https://microsoft.github.io/reactxp/), a component library written entirely in TypeScript that supports both React on the web as well as React Native.

Have fun in a more type-safe React Native development environment!
