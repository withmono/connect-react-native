interface MonoConnectProps {
    publicKey: string;
    onClose: () => void;
    onSuccess: (data: {
        id: string;
    }) => void;
    live?: boolean;
}
interface WebviewMessage {
    type: string;
    data: any;
}
interface MonoConnectRefObj {
    openWidget: () => void;
}
export { WebviewMessage, MonoConnectProps, MonoConnectRefObj };
