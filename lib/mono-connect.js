var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useImperativeHandle } from 'react';
import { SafeAreaView, Modal, View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { GetHtmlSource } from './html';
var MonoConnect = function (props, ref) {
    var publicKey = props.publicKey, onClose = props.onClose, onSuccess = props.onSuccess;
    var _a = React.useState(false), openWidget = _a[0], setOpenWidget = _a[1];
    var _b = React.useState(true), loading = _b[0], setLoading = _b[1];
    useImperativeHandle(ref, function () { return ({
        openWidget: function () { return setOpenWidget(true); }
    }); });
    function handleMessage(message) {
        var response = JSON.parse(message);
        switch (response.event) {
            case "done":
                setOpenWidget(false);
                var data = response.data;
                onSuccess(__assign({}, data));
                break;
            case "closed":
                setOpenWidget(false);
                onClose();
                break;
            default:
                throw new Error('INVALID EVENT TYPE');
        }
    }
    return (<SafeAreaView style={[{ flex: 1 }]}>
      <Modal visible={openWidget} animationType="slide" transparent={false}>
        <SafeAreaView style={[{ flex: 1 }]}>
          {loading ? (<View>
              <ActivityIndicator size="large" color="#182CD1"/>
            </View>) : null}

          <WebView style={[{ flex: 1 }]} source={{ html: GetHtmlSource({ publicKey: publicKey }) }} onMessage={function (e) { return handleMessage(e.nativeEvent.data); }} onLoadStart={function () { return setLoading(true); }} onLoadEnd={function () { return setLoading(false); }}/>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>);
};
export default React.forwardRef(MonoConnect);
