import type { ReactNode } from 'react';

interface WebviewMessage {
  type: string;
  data: any;
}

interface MonoConnectButtonProps {
  accountId?: string;
}

interface MonoProviderProps extends DataConfig {
  children: ReactNode;
  publicKey: string;
  onClose: () => void;
  onSuccess: (data: { id: string }) => void;
  accountId?: string;
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
  code?: string;
  reference?: string;
  errorType?: string;
  errorMessage?: string;
  mfaType?: string;
  prevAuthMethod?: string;
  authMethod?: string;
  pageName?: string;
  selectedAccountsCount?: number;
  institution?: {
    id?: string;
    name?: string;
  };
  timestamp?: number;
}

interface InstitutionObject {
  id?: string;
  auth_method?: string;
  account_number?: string;
}

interface MonoConnectProps extends DataConfig {
  publicKey: string;
  onClose: () => void;
  onSuccess: (data: { id: string }) => void;
  live?: boolean; // default is true
  accountId?: string;
  setOpenWidget: (v: boolean) => void;
  openWidget: boolean;
  onEvent?: (eventName: string, data: MonoEventData) => void;
  selectedInstitution?: InstitutionObject;
  reference?: string;
  checkAccountMatch?: boolean;
  children?: any;
}

interface ErrorProps {
  name: string | undefined;
  setOpenWidget: (v: boolean) => void;
}

export type {
  WebviewMessage,
  MonoConnectProps,
  MonoConnectButtonProps,
  MonoProviderProps,
  DataConfig,
  MonoEventData,
  ErrorProps,
};
