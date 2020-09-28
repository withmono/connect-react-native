export function GetHtmlSource(params) {
    var publicKey = params.publicKey;
    if (!publicKey) {
        console.log(publicKey);
        throw new Error('MONO_PUBLIC_KEY IS REQUIRED');
    }
    var htmlSource = "   \n    <!DOCTYPE html>\n      <html lang=\"en\">\n        <head>\n          <meta charset=\"UTF-8\">\n          <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\n          <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n          <title>Mono Connect</title>\n        </head>\n        <body onload=\"setupMonoConnect()\" style=\"background-color:#fff;height:100vh \">\n          <script src=\"https://connect.withmono.com/connect.js\"></script>\n          <script type=\"text/javascript\">\n            window.onload = setupMonoConnect;\n            function setupMonoConnect() {\n              const options = {\n                onSuccess: function(data) {\n                  const response = {event: 'done', data: {...data}}\n                  window.ReactNativeWebView.postMessage(JSON.stringify(response))\n                },\n\n                onClose: function() {\n                  const response = {event: 'closed', data: null}\n                  window.ReactNativeWebView.postMessage(JSON.stringify(response))\n                }\n              };\n\n              const MonoConnect = new Connect('" + publicKey + "', options);\n              MonoConnect.setup();\n              MonoConnect.open()\n            }\n          </script> \n        </body>\n      </html> \n  ";
    return htmlSource;
}
