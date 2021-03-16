import React from 'react';
import {SafeAreaView, Modal, View, Text, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import { WebView } from 'react-native-webview';
import { MonoConnectProps, WebviewMessage } from './types';
import { createUrl } from './utils';

const MonoConnect: React.FC<MonoConnectProps> = (props) => {
  const { publicKey, onClose, onSuccess, openWidget, ...otherConfig } = props;
  const connect_url = React.useMemo(() => {
    const qs: any = {
      key: publicKey, 
      code: otherConfig.reauth_token,
      scope: otherConfig?.scope,
      data: otherConfig?.data,
    };

    return createUrl(qs);
  }, [otherConfig.reauth_token, publicKey])

  function handleMessage(message: string) {
    const { setOpenWidget } = otherConfig;
    const response: WebviewMessage = JSON.parse(message);

    switch (response.type) {
      case "mono.connect.widget.account_linked":
        const data = response.data;

        onSuccess({...data, getAuthCode: () => data.code});
        setOpenWidget(false);
        break;

      case "mono.connect.widget.closed":
        setOpenWidget(false);
        onClose();
        break;
    }
  }

  function RenderError({ name }: any) {
    const { setOpenWidget } = otherConfig;

    return (
      <View style={styles.errorScreen}>
        <Text style={styles.errorMessage}>
          {name}: Something went wrong. Try again.
        </Text>
        <View style={{marginTop: 5}}>
          <TouchableOpacity 
            style={styles.btn} 
            onPress={() => setOpenWidget(false)}>
              <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const INJECTED_JAVASCRIPT = `window.MonoClientInterface = window.ReactNativeWebView;`;

  return (
    <Modal
      visible={openWidget}
      animationType="slide"
      transparent={false}
    >
      <SafeAreaView style={[{ flex: 1, backgroundColor: "rgba(0,0,0, 0.6)" }]}>
        <WebView
          style={{ flex: 1, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
          injectedJavaScript={INJECTED_JAVASCRIPT}
          source={{ uri: connect_url }}
          onMessage={(e: any) => handleMessage(e.nativeEvent.data)}
          startInLoadingState={true}
          renderLoading={() => <View style={{display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "white", height: "100%"}}><ActivityIndicator size="small" color="#182CD1"/></View>}
          renderError={(e) => <RenderError name={e} />}
        />
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: '100%', 
    borderRadius: 5, 
    backgroundColor: "#E4E7EB", 
    padding: 10, 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginBottom: 10
  },
  errorScreen: {
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: "100%",
    backgroundColor: "white"
  },
  errorMessage: {
    color: 'red', 
    fontSize: 16, 
    textAlign: "center", 
    paddingHorizontal: 20
  }
})

export default MonoConnect;