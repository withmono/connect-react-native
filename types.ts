import { ReactNode } from "react";

type Nullable<T> = T | null;

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
  onEvent?: (eventName: string, data: MonoEventData) => void;
  reference?: string;
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

interface DataDetails {
    customer?: any;
    payment_id?: any;
}

interface DataConfig {
  scope?: string;
  data?: PaymentScopeData | DataDetails | null | undefined;
}

interface MonoEventData {
  code?: string,
  reference?: string,
  errorType?: string,
  errorMessage?: string,
  mfaType?: string,
  prevAuthMethod?: string,
  authMethod?: string,
  pageName?: string,
  selectedAccountsCount?: number,
  institution?: {
    id?: string,
    name?: string
  },
  timestamp?: number
}

interface MonoConnectProps extends DataConfig {
  publicKey: string;
  onClose: () => void;
  onSuccess: (data: {id: string}) => void;
  live?: boolean; // default is true
  reauth_token?: string;
  setOpenWidget: (v: boolean) => void;
  openWidget: boolean;
  onEvent?: (eventName: string, data: MonoEventData) => void;
  reference?: string;
  children?: any
}

export {
  WebviewMessage,
  MonoConnectProps,
  MonoConnectRefObj,
  MonoConnectButtonProps,
  MonoProviderProps,
  DataConfig,
  MonoEventData
}
