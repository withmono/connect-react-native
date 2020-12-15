var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React from 'react';
import MonoConnect from './mono-connect';
export var MonoContext = React.createContext({
    init: function () { return null; },
    reauthorise: function () { return null; },
});
function MonoProvider(props) {
    var _a = React.useState(false), openWidget = _a[0], setOpenWidget = _a[1];
    var _b = React.useState(null), reauthToken = _b[0], setReauthToken = _b[1];
    function init() {
        setReauthToken(null);
        setOpenWidget(true);
    }
    function reauthorise(reauth_token) {
        setReauthToken(reauth_token);
        setOpenWidget(true);
    }
    return (<MonoContext.Provider value={{ init: init, reauthorise: reauthorise }}>
      <MonoConnect {...__assign({ openWidget: openWidget,
        setOpenWidget: setOpenWidget, reauth_token: reauthToken }, props)}/>
        {props.children}
    </MonoContext.Provider>);
}
export default MonoProvider;
