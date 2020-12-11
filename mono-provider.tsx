import React from 'react';
import MonoConnect from './mono-connect';
import { MonoConnectProps, MonoConnectRefObj } from './types';

export interface MonoContextType {
  init: () => void
  reauthorise: (reauth_code: string) => void;
}

export const MonoContext = React.createContext<MonoContextType>({
  init: () => null,
  reauthorise: () => null,
})

function MonoProvider(props: any): JSX.Element {
  const ref = React.createRef<MonoConnectRefObj>()

  function init() {
    ref.current?.openWidget();
  }

  function reauthorise(reauth_code: string) {
    ref.current?.reauthorise(reauth_code);
  }

  return (
    <MonoContext.Provider value={{init, reauthorise}}>
      <MonoConnect {...props} ref={ref}  />
      {props.children}
    </MonoContext.Provider>
  )
}

export default MonoProvider