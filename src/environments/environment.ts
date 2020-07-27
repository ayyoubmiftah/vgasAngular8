// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

const server = 'http://192.168.100.15:8092/vgas-api';
/*
const server = 'http://212.83.140.195:8092/vgas-api';
*/

export const environment = {
  appName: 'VGAS Project',
  appLogo: './assets/images/logo.jpg',
  production: false,
  envName: 'prod',
  buildVersion: '0.0.1-SNAPSHOT',
  buildTimestamp: new Date().toISOString(),
  defaultLanguage: 'fr',
  defaultDateFormat: 'DD-MM-YYYY HH:mm',
  defaultDateFormatNoTime: 'DD-MM-YYYY',
  defaultAvatar: './assets/images/profile.png',
  emailPattern: '^([a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)$',
  apiConfig: {
    apiEnv: 'prod',
    timeExpired: 1200,
    credentials: {
      clientId: 'root',
      clientSecret: 'admin'
    },
    apiUrls: [
      {id: 'About_SERVICE_URL', url: server + '/', requireAuthBefore: false},
      {id: 'OAUTH_SERVICE_URL', url: server + '/auth', requireAuthBefore: false},
    ],
    apiUrl: server
  }
};
