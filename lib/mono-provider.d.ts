import React from 'react';
import { MonoProviderProps } from './types';
export interface MonoContextType {
    init: () => void;
    reauthorise: (reauth_code: string) => void;
    scope?: string;
}
export declare const MonoContext: React.Context<MonoContextType>;
declare function MonoProvider(props: MonoProviderProps): JSX.Element;
export default MonoProvider;
