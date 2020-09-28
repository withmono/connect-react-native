interface HtmlSourceParams {
  publicKey: string;
}

export function GetHtmlSource(params: HtmlSourceParams): string {
  const { publicKey } = params;

  if (!publicKey) {
    console.log(publicKey)
    throw new Error('MONO_PUBLIC_KEY IS REQUIRED');
  }

  const htmlSource = `   
    <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Mono Connect</title>
        </head>
        <body onload="setupMonoConnect()" style="background-color:#fff;height:100vh ">
          <script src="https://connect.withmono.com/connect.js"></script>
          <script type="text/javascript">
            window.onload = setupMonoConnect;
            function setupMonoConnect() {
              const options = {
                onSuccess: function(data) {
                  const response = {event: 'done', data: {...data}}
                  window.ReactNativeWebView.postMessage(JSON.stringify(response))
                },

                onClose: function() {
                  const response = {event: 'closed', data: null}
                  window.ReactNativeWebView.postMessage(JSON.stringify(response))
                }
              };

              const MonoConnect = new Connect('${publicKey}', options);
              MonoConnect.setup();
              MonoConnect.open()
            }
          </script> 
        </body>
      </html> 
  `;

  return htmlSource;
}