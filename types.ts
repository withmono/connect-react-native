import { ReactNode } from "react";

interface MonoConnectProps extends DataConfig {
  publicKey: string;
  onClose: () => void;
  onSuccess: (data: {id: string}) => void;
  live?: boolean; // default is true
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

interface MonoProviderProps extends DataConfig {
  children: ReactNode;
  publicKey: string;
  onClose: () => void;
  onSuccess: (data: {id: string}) => void;
  reauth_token?: string;
}

interface PaymentScopeData {
  type: string; // "one-time-debit" | "recurring-debit"
  amount: number; // in kobo
  description: string;
  plan?: string;
  currency?: string;
  period?: string;
  reference?: string;
  [key: string]: any;
}

interface DataConfig {
  scope?: string;
  data?: PaymentScopeData | null | undefined;
}

export {
  WebviewMessage,
  MonoConnectProps,
  MonoConnectRefObj,
  MonoConnectButtonProps,
  MonoProviderProps,
  DataConfig
}