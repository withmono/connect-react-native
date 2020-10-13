import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MonoConnectButton, MonoProvider, useMonoConnect } from '@mono.co/connect-react-native';

const config = {
  publicKey: "",
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

export default function App() {
  return (
    <MonoProvider {...config}>
      <View style={styles.container}>
        <Text style={{textAlign: 'center'}}>
          To share you financial data with Mono Demo App, click the link or button below!
        </Text>

        <LinkAccount />
        
        <MonoConnectButton />
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
