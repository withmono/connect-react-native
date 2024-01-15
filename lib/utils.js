function createUrl(qs) {
    let base = "https://connect.mono.co/?";
    const valid = validate(qs);
    if (valid) {
        Object.keys(qs).map(function (k) {
            if (qs[k]) {
                const value = k === "data" ? JSON.stringify(qs[k]) : qs[k];
                base = base.concat(`${k}=${value}&`);
            }
        });
        return base.slice(0, -1);
    }
    throw new Error("Invalid config object");
}
function validate(config) {
    switch (config.scope) {
        case "payments":
            return validatePaymentsData(config.data);
        default:
            return true;
    }
}
function validatePaymentsData(data) {
    data = Object.assign({ amount: undefined, type: undefined }, data);
    const requiredFields = ["amount", "type"];
    for (let param in data) {
        if (requiredFields.includes(param)) {
            checkRequiredParam(param, data[param]);
        }
    }
    return true;
}
function checkRequiredParam(name, value) {
    if (!value) {
        throw new Error(`${name} is required!`);
    }
}
export { createUrl };
