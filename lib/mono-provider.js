import React from 'react';
import MonoConnect from './mono-connect';
export const MonoContext = React.createContext({
    init: () => null,
    reauthorise: () => null,
});
function MonoProvider(props) {
    const [openWidget, setOpenWidget] = React.useState(false);
    const [reauthToken, setReauthToken] = React.useState(null);
    function init() {
        setReauthToken(null);
        setOpenWidget(true);
    }
    function reauthorise(reauth_token) {
        setReauthToken(reauth_token);
        setOpenWidget(true);
    }
    return (<MonoContext.Provider value={{ init, reauthorise, scope: props === null || props === void 0 ? void 0 : props.scope }}>
      <MonoConnect {...Object.assign({ openWidget,
        setOpenWidget, reauth_token: reauthToken }, props)}/>
        {props.children}
    </MonoContext.Provider>);
}
export default MonoProvider;
