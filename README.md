# Mono Connect React Native SDK

The Mono Connect SDK is a quick and secure way to link bank accounts to Mono from within your React Native app. Mono Connect is a drop-in framework that handles connecting a financial institution to your app (credential validation, multi-factor authentication, error handling, etc).

For accessing customer accounts and interacting with Mono's API (Identity, Transactions, Income, TransferPay) use the server-side [Mono API](https://docs.mono.co/docs/intro-to-mono-api).

## Version 2 Public Beta
<b>Important</b>: Version 2 is currently in the public beta phase. This means it's available for testing and feedback from the community. Please be aware that there may be bugs, and some features might undergo changes before the stable release.

## Documentation

For complete information about Mono Connect, head to the [docs](https://docs.mono.co/docs/intro-to-mono-connect-widget).


## Getting Started

1. Register on the [Mono](https://app.withmono.com/dashboard) website and get your public and secret keys.
2. Setup a server to [exchange tokens](https://docs.mono.co/reference/authentication-endpoint) to access user financial data with your Mono secret key.

## Installation
Using NPM

```bash
npm install @mono.co/connect-react-native
```

Using yarn

```bash
yarn add @mono.co/connect-react-native
```
Also install ```react-native-webview``` because it's a peer dependency for this package.

## Usage

Before you can open Mono Connect, you need to first create a `publicKey`. Your `publicKey` can be found in the [Mono Dashboard](https://app.withmono.com/apps).


### Hooks
```js
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MonoProvider, useMonoConnect } from '@mono.co/connect-react-native';

const config = {
  publicKey: "YOUR_MONO_PUBLIC_KEY_HERE",
  scope: 'auth',
  data: {
    customer: {id: "mono_customer_id"}
  },
  onClose: () => alert('Widget closed'),
  onSuccess: (data) => {
    const code = data.getAuthCode()
    console.log("Access code", code)
  },
  reference: "random_string", // optional
  onEvent: (eventName, data) => { // optional
    console.log(eventName)
    console.log(data)
  }
}

function LinkAccount() {
  const { init } = useMonoConnect()

  return (
    <View style={{marginBottom: 10}}>
      <TouchableOpacity onPress={() => init()}>
        <Text style={{color: 'blue'}}>Link your bank account</Text>
      </TouchableOpacity>
    </View>
  )
}

function ReauthoriseUserAccount({reauth_token}) {
  const { reauthorise } = useMonoConnect()

  return (
    <View style={{marginBottom: 10}}>
      <TouchableOpacity onPress={() => reauthorise(reauth_token)}>
        <Text style={{color: 'blue'}}>Reauthorise user account</Text>
      </TouchableOpacity>
    </View>
  )
}

function InitiateDirectDebit() {
  const { init } = useMonoConnect();

  return (
    <View style={{marginBottom: 10}}>
      <TouchableOpacity onPress={() => init()}>
        <Text style={{color: 'blue'}}>Initiate Mono Direct debit</Text>
      </TouchableOpacity>
    </View>
  )
}

export default function App() {
  const reauth_token = "code_xyz";
  const payConfig = {
    scope: "payments",
    data: {
      payment_id: "txreq_HeqMWnpWVvzdpMXiB4I123456" // The `id` property returned from the Initiate Payments API response object.
    }
  }

  return (
    <MonoProvider {...config}>
      <View style={styles.container}>
        <LinkAccount />

        <MonoProvider {...{...config, ...payConfig}}>
          <InitiateDirectDebit />
        </MonoProvider>

        <ReauthoriseUserAccount reauth_token={reauth_token} />
      </View>
    </MonoProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20
  },
});
```

### Components

```js
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MonoConnectButton, MonoProvider } from '@mono.co/connect-react-native';

const config = {
  publicKey: "YOUR_MONO_PUBLIC_KEY",
  scope: "auth",
  customer: {id: "mono_customer_id"},
  onClose: () => alert('Widget closed'),
  onSuccess: (data) => console.log(data)
}

export default function App() {
  return (
    <MonoProvider {...config}>
      <View style={styles.container}>        
        <MonoConnectButton />
        <MonoConnectButton reauth_token="code_xyz" /> // for reauthorisation with MonoConnectButton
      </View>
    </MonoProvider>
  );
}
```

## Configuration Options

- [`publicKey`](#publicKey)
- [`scope`](#scope)
- [`customer`](#customer)
- [`onSuccess`](#onSuccess)
- [`onClose`](#onClose)
- [`onEvent`](#onEvent)
- [`reference`](#reference)
- [`reauthCode`](#reauthCode)


### <a name="publicKey"></a> `publicKey`
**String: Required**

This is your Mono public API key from the [Mono dashboard](https://app.withmono.com/apps).

### <a name="scope"></a> `scope`
**String: Required**

This is the scope the widget will launch with. This can either be `auth` or `payments`

### <a name="customer"></a> `Customer`

**Required**  

```js
// For an existing customer, their customer ID can be passed directly
const customer = { id: '611aa53041247f2801efb222' } // mono customer id

// If you don't have an existing customer, you can create one by providing their details.
// The customer will be created after the account connection is successful.
const customer = {
  name: 'Samuel Olumide',
  email: 'samuel.olumide@gmail.com',
  identity: {
    type: 'bvn',
    number: '2323233239'
  },
}

const config = { 
  key: 'mono_public_key',
  scope: 'auth',
  data: { customer },
};
```

### <a name="onSuccess"></a> `onSuccess`
**(data) => { Void }: Required**

The closure is called when a user has successfully onboarded their account. It should take a single String argument containing the code that can be [exchanged for an account id](https://docs.mono.co/reference/authentication-endpoint).

```js
const config = {
  publicKey: "YOUR_MONO_PUBLIC_KEY_HERE",
  scope: 'auth',
  data: {
    customer: {id: "mono_customer_id"}
  },
  onSuccess: (data) => {
    const code = data.getAuthCode()
    console.log("Access code", code)
  }
}
```


### <a name="onClose"></a> `onClose`
**() => { Void }: Optional**

The optional closure is called when a user has specifically exited the Mono Connect flow. It does not take any arguments.

```js
const config = {
  publicKey: "YOUR_MONO_PUBLIC_KEY_HERE",
  scope: 'auth',
  data: {
    customer: {id: "mono_customer_id"}
  },
  onSuccess: (data) => {
    const code = data.getAuthCode()
    console.log("Access code", code)
  },
  onClose: () => alert('Widget closed')
}
```

### <a name="onEvent"></a> `onEvent`
**(eventName, data) => { Void }: Optional**

This optional closure is called when certain events in the Mono Connect flow have occurred, for example, when the user selected an institution. This enables your application to gain further insight into what is going on as the user goes through the Mono Connect flow.

See the [event details](#connectEvent) below.

```js
const config = {
  publicKey: "YOUR_MONO_PUBLIC_KEY_HERE",
  scope: 'auth',
  data: {
    customer: {id: "mono_customer_id"}
  },
  onSuccess: (data) => {
    const code = data.getAuthCode()
    console.log("Access code", code)
  },
  onEvent: (eventName, data) => {
    console.log(eventName)
    console.log(data)
  }
}
```

### <a name="reference"></a> `reference`
**String: Optional**

When passing a reference to the configuration it will be passed back on all onEvent calls.

```js
const config = {
  publicKey: "YOUR_MONO_PUBLIC_KEY_HERE",
  scope: 'auth',
  data: {
    customer: {id: "mono_customer_id"}
  },
  onSuccess: (data) => {
    const code = data.getAuthCode()
    console.log("Access code", code)
  },
  reference: "random_string"
}
```


### <a name="connectEvent"></a> Event Details

#### <a name="eventName"></a> `eventName: String`

Event names corespond to the type of event that occurred. Possible options are in the table below.

| Event Name | Description |
| ----------- | ----------- |
| OPENED | Triggered when the user opens the Connect Widget. |
| EXIT | Triggered when the user closes the Connect Widget. |
| SUCCESS | Triggered when the user successfully links their account and provides the code for autentication. |
| INSTITUTION_SELECTED | Triggered when the user selects an institution. |
| AUTH_METHOD_SWITCHED | Triggered when the user changes authentication method from internet to mobile banking, or vice versa. |
| SUBMIT_CREDENTIALS | Triggered when the user presses Log in. |
| ACCOUNT_LINKED | Triggered when the user successfully links their account. |
| ACCOUNT_SELECTED | Triggered when the user selects a new account. |
| ERROR | Triggered when the widget reports an error.|


#### <a name="dataObject"></a> `data: JSON`
The data JSON returned from the onEvent callback.

```js
reference: String // reference passed through the connect config
pageName: String // name of page the widget exited on
prevAuthMethod: String // auth method before it was last changed
authMethod: String // current auth method
mfaType: String // type of MFA the current user/bank requires
selectedAccountsCount: Number // number of accounts selected by the user
errorType: String // error thrown by widget
errorMessage: String // error message describing the error
institutionId: String // id of institution
institutionName: String // name of institution
timestamp: Number // unix timestamp of the event as a number
```

## Examples

See more examples [here](/examples).


## Support
If you're having general trouble with Mono Connect React Native SDK or your Mono integration, please reach out to us at <hi@mono.co> or come chat with us on Slack. We're proud of our level of service, and we're more than happy to help you out with your integration to Mono.

## Contributing
If you would like to contribute to the Mono Connect React Native SDK, please make sure to read our [contributor guidelines](https://github.com/withmono/connect-react-native/tree/develop/CONTRIBUTING.md).


## License

[MIT](https://github.com/withmono/connect-react-native/tree/develop/LICENSE) for more information.
