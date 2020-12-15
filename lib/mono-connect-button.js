import React from 'react';
import { Platform, View, TouchableOpacity, TouchableNativeFeedback, StyleSheet, Text, Image } from 'react-native';
import useMonoConnect from './use-mono-connect';
var MonoConnectButton = function (props) {
    var reauth_token = props.reauth_token;
    var _a = useMonoConnect(), init = _a.init, reauthorise = _a.reauthorise;
    var Btn;
    function onPress() {
        if (reauth_token)
            return reauthorise(reauth_token);
        init();
    }
    if (Platform.OS === "ios") {
        Btn = TouchableOpacity;
    }
    else {
        Btn = TouchableNativeFeedback;
    }
    return (<Btn {...{ onPress: onPress, style: { width: '100%' } }}>
          <View style={styles.button}>
              <Image source={require('./logo.png')} width={5} height={5} style={styles.buttonIcon}/>
              <Text style={styles.label}>Authenticate with Mono</Text>
          </View>
      </Btn>);
};
export default MonoConnectButton;
var styles = StyleSheet.create({
    button: {
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 16,
        padding: 8,
        borderRadius: 5,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.18,
        shadowRadius: 2,
        backgroundColor: "#182CD1",
        opacity: 1,
    },
    buttonIcon: {
        marginRight: 8,
        width: 20,
        height: 20
    },
    label: {
        fontSize: 17,
        lineHeight: 22,
        color: "white",
        textAlign: "center"
    }
});
