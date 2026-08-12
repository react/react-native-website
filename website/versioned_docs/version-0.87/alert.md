---
id: alert
title: Alert
---

Launches an alert dialog with the specified title and message.

Optionally provide a list of buttons. Tapping any button will fire the respective onPress callback and dismiss the alert. By default, the only button will be an 'OK' button.

This is an API that works both on Android and iOS and can show static alerts. Alert that prompts the user to enter some information is available on iOS only.

## Example

```SnackPlayer name=Alert%20Example&supportedPlatforms=ios,android
import {StyleSheet, Button, Alert} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const createTwoButtonAlert = () =>
    Alert.alert('Alert Title', 'My Alert Msg', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);

  const createThreeButtonAlert = () =>
    Alert.alert('Alert Title', 'My Alert Msg', [
      {
        text: 'Ask me later',
        onPress: () => console.log('Ask me later pressed'),
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Button title={'2-Button Alert'} onPress={createTwoButtonAlert} />
        <Button title={'3-Button Alert'} onPress={createThreeButtonAlert} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default App;
```

## iOS

On iOS you can specify any number of buttons. Each button can optionally specify a style or be emphasized, available options are represented by the [AlertButtonStyle](#alertbuttonstyle-ios) enum and the `isPreferred` field on [AlertButton](alert#alertbutton).

## Android

On Android at most three buttons can be specified. Android has a concept of a neutral, negative and a positive button:

- If you specify one button, it will be the 'positive' one (such as 'OK')
- Two buttons mean 'negative', 'positive' (such as 'Cancel', 'OK')
- Three buttons mean 'neutral', 'negative', 'positive' (such as 'Later', 'Cancel', 'OK')

Alerts on Android can be dismissed by tapping outside of the alert box. It is disabled by default and can be enabled by providing an optional [AlertOptions](alert#alertoptions) parameter with the cancelable property set to `true` i.e.<br/>`{cancelable: true}`.

The cancel event can be handled by providing an `onDismiss` callback property inside the `options` parameter.

### Example <div className="label android">Android</div>

```SnackPlayer name=Alert%20Android%20Dissmissable%20Example&supportedPlatforms=android
import {StyleSheet, Button, Alert} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const showAlert = () =>
  Alert.alert(
    'Alert Title',
    'My Alert Msg',
    [
      {
        text: 'Cancel',
        onPress: () => Alert.alert('Cancel Pressed'),
        style: 'cancel',
      },
    ],
    {
      cancelable: true,
      onDismiss: () =>
        Alert.alert(
          'This alert was dismissed by tapping outside of the alert dialog.',
        ),
    },
  );

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <Button title="Show alert" onPress={showAlert} />
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
```

---

# Reference

## Methods

### `alert()`

```tsx
static alert (
  title: string,
  message?: string,
  buttons?: AlertButton[],
  options?: AlertOptions,
);
```

**Parameters:**

| Name                                                       | Type                               | Description                                                             |
| ---------------------------------------------------------- | ---------------------------------- | ----------------------------------------------------------------------- |
| title <div className="label basic required">Required</div> | string                             | The dialog's title. Passing `null` or empty string will hide the title. |
| message                                                    | string                             | An optional message that appears below the dialog's title.              |
| buttons                                                    | [AlertButton](alert#alertbutton)[] | An optional array containing buttons configuration.                     |
| options                                                    | [AlertOptions](alert#alertoptions) | An optional Alert configuration.                                        |

---

### `prompt()` <div className="label ios">iOS</div>

```tsx
static prompt: (
  title: string,
  message?: string,
  callbackOrButtons?: ((text: string) => void) | AlertButton[],
  type?: AlertType,
  defaultValue?: string,
  keyboardType?: string,
);
```

Create and display a prompt to enter some text in form of Alert.

**Parameters:**

| Name                                                       | Type                                            | Description                                                                                                                                                                                           |
| ---------------------------------------------------------- | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| title <div className="label basic required">Required</div> | string                                          | The dialog's title.                                                                                                                                                                                   |
| message                                                    | string                                          | An optional message that appears above the text input.                                                                                                                                                |
| callbackOrButtons                                          | function<hr/>[AlertButton](alert#alertButton)[] | If passed a function, it will be called with the prompt's value<br/>`(text: string) => void`, when the user taps 'OK'.<hr/>If passed an array, buttons will be configured based on the array content. |
| type                                                       | [AlertType](alert#alerttype-ios)                | This configures the text input.                                                                                                                                                                       |
| defaultValue                                               | string                                          | The default text in text input.                                                                                                                                                                       |
| keyboardType                                               | string                                          | The keyboard type of first text field (if exists). One of TextInput [keyboardTypes](textinput#keyboardtype).                                                                                          |
| options                                                    | [AlertOptions](alert#alertoptions)              | An optional Alert configuration.                                                                                                                                                                      |

---

## Type Definitions

### AlertButtonStyle <div className="label ios">iOS</div>

An iOS Alert button style.

| Type |
| ---- |
| enum |

**Constants:**

| Value           | Description               |
| --------------- | ------------------------- |
| `'default'`     | Default button style.     |
| `'cancel'`      | Cancel button style.      |
| `'destructive'` | Destructive button style. |

---

### AlertType <div className="label ios">iOS</div>

An iOS Alert type.

| Type |
| ---- |
| enum |

**Constants:**

| Value              | Description                  |
| ------------------ | ---------------------------- |
| `'default'`        | Default alert with no inputs |
| `'plain-text'`     | Plain text input alert       |
| `'secure-text'`    | Secure text input alert      |
| `'login-password'` | Login and password alert     |

---

### AlertButton

An object describing the configuration of a button in the alert.

| Type             |
| ---------------- |
| array of objects |

**Objects properties:**

| Name                                             | Type                                           | Description                                                                    |
| ------------------------------------------------ | ---------------------------------------------- | ------------------------------------------------------------------------------ |
| text                                             | string                                         | Button label.                                                                  |
| onPress                                          | function                                       | Callback function when button is pressed.                                      |
| style <div className="label ios">iOS</div>       | [AlertButtonStyle](alert#alertbuttonstyle-ios) | Button style, on Android this property will be ignored.                        |
| isPreferred <div className="label ios">iOS</div> | boolean                                        | Whether button should be emphasized, on Android this property will be ignored. |

---

### AlertOptions

| Type   |
| ------ |
| object |

**Properties:**

| Name                                                    | Type     | Description                                                                                                               |
| ------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------- |
| cancelable <div className="label android">Android</div> | boolean  | Defines if alert can be dismissed by tapping outside of the alert box.                                                    |
| userInterfaceStyle <div className="label ios">iOS</div> | string   | The interface style used for the alert, can be set to `light` or `dark`, otherwise the default system style will be used. |
| onDismiss <div className="label android">Android</div>  | function | Callback function fired when alert has been dismissed.                                                                    |
