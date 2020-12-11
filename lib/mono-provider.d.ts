import React from 'react';
export interface MonoContextType {
    init: () => void;
    reauthorise: (reauth_code: string) => void;
}
export declare const MonoContext: React.Context<MonoContextType>;
declare function MonoProvider(props: any): JSX.Element;
export default MonoProvider;
