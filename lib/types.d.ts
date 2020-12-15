import { ReactNode } from "react";
interface MonoConnectProps {
    publicKey: string;
    onClose: () => void;
    onSuccess: (data: {
        id: string;
    }) => void;
    live?: boolean;
    reauth_token?: string;
    setOpenWidget: (v: boolean) => void;
    openWidget: boolean;
}
interface WebviewMessage {
    type: string;
    data: any;
}
interface MonoConnectRefObj {
    openWidget: () => void;
    reauthorise: (reauth_code: string) => void;
}
interface MonoConnectButtonProps {
    reauth_token?: string;
}
interface MonoProviderProps {
    children: ReactNode;
    publicKey: string;
    onClose: () => void;
    onSuccess: (data: {
        id: string;
    }) => void;
    reauth_token?: string;
}
export { WebviewMessage, MonoConnectProps, MonoConnectRefObj, MonoConnectButtonProps, MonoProviderProps };
