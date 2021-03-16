import React from 'react';
import { MonoContext } from './mono-provider';
function useMonoConnect() {
    const context = React.useContext(MonoContext);
    if (context === undefined) {
        throw new Error(`useMonoConnect must be used within a MonoProvider`);
    }
    return context;
}
export default useMonoConnect;
