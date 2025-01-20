import React from 'react';
import MonoConnect from './mono-connect';
import { MonoProviderProps } from './types';

const REAUTH_SCOPE = 'reauth';

export interface MonoContextType {
  init: () => void
  reauthorise: (accountId: string) => void;
  scope?: string;
}

export const MonoContext = React.createContext<MonoContextType>({
  init: () => null,
  reauthorise: () => null,
});

function MonoProvider(props: MonoProviderProps) {
  const [openWidget, setOpenWidget] = React.useState<boolean>(false);
  const [accountId, setAccountId] = React.useState<string | null>(null);

  function init() {
    setAccountId(null);
    setOpenWidget(true);
  }

  function reauthorise(accountId: string) {
    setAccountId(accountId);
    setOpenWidget(true);
  }

  const payload = {
    openWidget,
    setOpenWidget,
    ...props
  };

  if (accountId) {
    payload['accountId'] = accountId;
  }

  return (
    <MonoContext.Provider value={{init, reauthorise, scope: accountId ? REAUTH_SCOPE : props?.scope}}>
      <MonoConnect {...payload} />
      {props.children}
    </MonoContext.Provider>
  )
}

export default MonoProvider;
