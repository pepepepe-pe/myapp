import { PublicClientApplication } from "../node_modules/@azure/msal-browser/dist/index";

const msalConfig = {
    auth: {
      clientId: "2fdd06f3-7b34-49a3-a78b-0cf1dd87878e", // This is the ONLY mandatory field; everything else is optional.
      authority: "https://fabrikamb2c.b2clogin.com/fabrikamb2c.onmicrosoft.com/B2C_1_susi_reset_v2", // Choose sign-up/sign-in user-flow as your default.
      knownAuthorities: ["fabrikamb2c.b2clogin.com"], // You must identify your tenant's domain as a known authority.
      redirectUri: "http://localhost:6420", // You must register this URI on Azure Portal/App Registration. Defaults to "window.location.href".
    },
    cache: {
      cacheLocation: "localStorage", // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
      storeAuthStateInCookie: true, // If you wish to store cache items in cookies as well as browser cache, set this to "true".
    },
  }
const myMSALObj = new PublicClientApplication(msalConfig);

function testalert(){
    alert("test")
}