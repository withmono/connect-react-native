import { SDK_VERSION } from './sdk-version';

function createUrl(qs: any) {
  let base = "https://connect.mono.co/?";

  const valid = validate(qs);

  if(valid) {
    const params = { ...qs, sdk_version: SDK_VERSION };
    for (const k in params) {
      const value = typeof(params[k]) === "object" ? JSON.stringify(params[k]) : params[k];
      base = base.concat(`${k}=${value}&`);
    }

    return base.slice(0, -1);
  }

  throw new Error("Invalid config object");
}

function validate(config: any) {
  switch(config.scope) {
    case "payments":
      return validatePaymentsData(config.data);
    default:
      return true;
  }
}

function validatePaymentsData(data: any) {
  data = {payment_id: undefined, ...data};
  const requiredFields = ["payment_id"];
  for(let param in data) {
    if(requiredFields.includes(param)) {
      checkRequiredParam(param, data[param]);
    }
  }

  return true;
}

function checkRequiredParam(name: string, value: any) {
  if(!value) {
    throw new Error(`${name} is required!`);
  }
}

export {
  createUrl
}
