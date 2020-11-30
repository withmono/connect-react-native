interface MonoConnectProps {
  publicKey: string;
  onClose: () => void;
  onSuccess: (data: {id: string}) => void;
  live?: boolean; // default is true
}

interface WebviewMessage {
  type: string;
  data: any;
}

interface MonoConnectRefObj {
  openWidget: () => void;
}

export {
  WebviewMessage,
  MonoConnectProps,
  MonoConnectRefObj
}