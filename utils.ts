function createUrl(qs: any) {
  let base = "https://connect.withmono.com/?";

  const valid = validate(qs);
  
  if(valid) {
    Object.keys(qs).map(function (k) {
      if (qs[k]) {
        const value = k === "data" ? encodeURIComponent(JSON.stringify(qs[k])) : qs[k];
        base = base.concat(`${k}=${value}&`);
      }
    });

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
  data = {amount: undefined, type: undefined, ...data};
  const requiredFields = ["amount", "type"];
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