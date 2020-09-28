import React from 'react';
import MonoConnect from './mono-connect';
import { MonoConnectProps, MonoConnectRefObj } from './types';

export interface MonoContextType {
  init: () => void
}

export const MonoContext = React.createContext<MonoContextType>({
  init: () => null
})

function MonoProvider(props: any): JSX.Element {
  const ref = React.createRef<MonoConnectRefObj>()

  function init() {
    ref.current?.openWidget()
  }

  return (
    <MonoContext.Provider value={{init}}>
      <MonoConnect {...props} ref={ref}  />
      {props.children}
    </MonoContext.Provider>
  )
}

export default MonoProvider