var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import { SafeAreaView, Modal, View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { createUrl } from './utils';
const MonoConnect = (props) => {
    const { publicKey, onClose, onSuccess, openWidget } = props, otherConfig = __rest(props, ["publicKey", "onClose", "onSuccess", "openWidget"]);
    const connect_url = React.useMemo(() => {
        const qs = {
            key: publicKey,
            code: otherConfig.reauth_token,
            scope: otherConfig === null || otherConfig === void 0 ? void 0 : otherConfig.scope,
            data: otherConfig === null || otherConfig === void 0 ? void 0 : otherConfig.data,
        };
        return createUrl(qs);
    }, [otherConfig.reauth_token, publicKey]);
    function handleMessage(message) {
        const { setOpenWidget } = otherConfig;
        const response = JSON.parse(message);
        switch (response.type) {
            case "mono.connect.widget.account_linked":
                const data = response.data;
                onSuccess(Object.assign(Object.assign({}, data), { getAuthCode: () => data.code }));
                setOpenWidget(false);
                break;
            case "mono.connect.widget.closed":
                setOpenWidget(false);
                onClose();
                break;
        }
    }
    function RenderError({ name }) {
        const { setOpenWidget } = otherConfig;
        return (<View style={styles.errorScreen}>
        <Text style={styles.errorMessage}>
          {name}: Something went wrong. Try again.
        </Text>
        <View style={{ marginTop: 5 }}>
          <TouchableOpacity style={styles.btn} onPress={() => setOpenWidget(false)}>
              <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </View>);
    }
    const INJECTED_JAVASCRIPT = `window.MonoClientInterface = window.ReactNativeWebView;`;
    return (<Modal visible={openWidget} animationType="slide" transparent={false}>
      <SafeAreaView style={[{ flex: 1, backgroundColor: "rgba(0,0,0, 0.6)" }]}>
        <WebView style={{ flex: 1, borderTopLeftRadius: 10, borderTopRightRadius: 10 }} injectedJavaScript={INJECTED_JAVASCRIPT} source={{ uri: connect_url }} onMessage={(e) => handleMessage(e.nativeEvent.data)} startInLoadingState={true} renderLoading={() => <View style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "white", height: "100%" }}><ActivityIndicator size="small" color="#182CD1"/></View>} renderError={(e) => <RenderError name={e}/>}/>
      </SafeAreaView>
    </Modal>);
};
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
});
export default MonoConnect;
