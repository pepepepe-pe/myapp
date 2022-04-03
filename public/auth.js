// Create the main myMSALObj instance
// configuration parameters are located at authConfig.js

const msalConfig = {
    auth: {
      clientId: "2fdd06f3-7b34-49a3-a78b-0cf1dd87878e", // This is the ONLY mandatory field; everything else is optional.
      authority: "https://fabrikamb2c.b2clogin.com/fabrikamb2c.onmicrosoft.com/B2C_1_susi_reset_v2", // Choose sign-up/sign-in user-flow as your default.
      knownAuthorities: ["fabrikamb2c.b2clogin.com"], // You must identify your tenant's domain as a known authority.
      redirectUri: "http://localhost:3000", // You must register this URI on Azure Portal/App Registration. Defaults to "window.location.href".
    },
    cache: {
      cacheLocation: "localStorage", // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
      storeAuthStateInCookie: true, // If you wish to store cache items in cookies as well as browser cache, set this to "true".
    },
    system: {
      loggerOptions: {
        loggerCallback: (level, message, containsPii) => {
          if (containsPii) {
            return;
          }
          switch (level) {
            case msal.LogLevel.Error:
              console.error(message);
              return;
            case msal.LogLevel.Info:
              console.info(message);
              return;
            case msal.LogLevel.Verbose:
              console.debug(message);
              return;
            case msal.LogLevel.Warning:
              console.warn(message);
              return;
          }
        }
      }
    }
  };

  const loginRequest = {
    scopes: ["openid"],
  };

  const myMSALObj = new msal.PublicClientApplication(msalConfig);

  let accountId = "";
let username = "";
let accessToken = null;

myMSALObj.handleRedirectPromise()
    .then(response => {
        if (response) {
            /**
             * For the purpose of setting an active account for UI update, we want to consider only the auth response resulting
             * from SUSI flow. "tfp" claim in the id token tells us the policy (NOTE: legacy policies may use "acr" instead of "tfp").
             * To learn more about B2C tokens, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/tokens-overview
             */
            if (response.idTokenClaims['tfp'].toUpperCase() === "B2C_1_susi_reset_v2".toUpperCase()) {
                handleResponse(response);
            }
        }
    })
    .catch(error => {
        console.log(error);
    });

function signIn() {

    /**
     * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
     */
    
    myMSALObj.loginRedirect(loginRequest);
}