import React from 'react';
import MonoConnect from './mono-connect';
export var MonoContext = React.createContext({
    init: function () { return null; }
});
function MonoProvider(props) {
    var ref = React.createRef();
    function init() {
        var _a;
        (_a = ref.current) === null || _a === void 0 ? void 0 : _a.openWidget();
    }
    return (<MonoContext.Provider value={{ init: init }}>
      <MonoConnect {...props} ref={ref}/>
      {props.children}
    </MonoContext.Provider>);
}
export default MonoProvider;
