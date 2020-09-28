import React, { useImperativeHandle } from 'react'
import {SafeAreaView, Modal, View, ActivityIndicator} from 'react-native'
import { WebView } from 'react-native-webview'
import { GetHtmlSource } from './html';
import { MonoConnectProps, MonoConnectRefObj, WebviewMessage } from './types';

const MonoConnect: React.ForwardRefRenderFunction<MonoConnectRefObj, MonoConnectProps> = (props, ref) => {
  const { publicKey, onClose, onSuccess } = props;
  const [openWidget, setOpenWidget] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);

  useImperativeHandle(ref, () => ({
    openWidget: () => setOpenWidget(true)
  }))

  function handleMessage(message: string) {
    const response: WebviewMessage = JSON.parse(message);

    switch (response.event) {
      case "done":
        setOpenWidget(false);
        const data = response.data;

        onSuccess({...data});
        break;

      case "closed":
        setOpenWidget(false);
        onClose();
        break;

      default:
        throw new Error('INVALID EVENT TYPE')
    }
  }

  return (
    <SafeAreaView style={[{ flex: 1 }]}>
      <Modal
        visible={openWidget}
        animationType="slide"
        transparent={false}
      >
        <SafeAreaView style={[{ flex: 1 }]}>
          {loading ? (
            <View>
              <ActivityIndicator size="large" color="#182CD1" />
            </View>
          ) : null}

          <WebView
            style={[{ flex: 1 }]}
            source={{ html: GetHtmlSource({ publicKey }) }}
            onMessage={(e: any) => handleMessage(e.nativeEvent.data)}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
          />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

export default React.forwardRef(MonoConnect);