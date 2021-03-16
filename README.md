# @mono.co/connect-react-native

This package make it easy to use the Mono connect widget in a react native project.

Request access [here](https://app.withmono.com/register) to get your API keys

## Installation
using NPM.

```bash
npm install @mono.co/connect-react-native
```

using yarn.

```bash
yarn add @mono.co/connect-react-native
```
also install ```react-native-webview``` because it's a peer dependency for this package.

## Usage

### Hooks
```js
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MonoProvider, useMonoConnect } from '@mono.co/connect-react-native';

const config = {
  publicKey: "YOUR_MONO_PUBLIC_KEY_HERE",
  onClose: () => alert('Widget closed'),
  onSuccess: (data) => {
    const code = data.getAuthCode()
    console.log("Access code", code)
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
      type: "one-time-debit", // "one-time-debit" | "recurring-debit"
      amount: 250000, // amount in kobo
      description: "Wallet funding",
      plan: "plan-234", // only for recurring payment
      currency: "NGN", // (optional) default to NGN
      period: "monthly", // only for recurring payment
      reference: "mono_r27bn0he820e", // optional 
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
```

### Components

```js
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MonoConnectButton, MonoProvider } from '@mono.co/connect-react-native';

const config = {
  publicKey: "YOUR_MONO_PUBLIC_KEY",
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

Check more examples [here](/examples)

NOTE.

Only public key is required, Check the types folder for all prop types.

## Bugs and suggestions

Please file an issue for bugs or suggestions, both are welcomed.



