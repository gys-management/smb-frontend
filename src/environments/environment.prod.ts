import { LogLevel } from 'src/app/models/log-level';

export const environment = {
  production: true,
  logLevel: LogLevel.DEBUG,
  restAPI: 'https://stockmanagementbilling.herokuapp.com/api/v2',
  // restAPI: 'https://stockmanagementbillingbackup.herokuapp.com/api/v2', // backup server
  ngxLogger: {
    serverLoggingUrl: 'https://stockmangementbilling.free.beeceptor.com/api/logs',
    // serverLoggingUrl: 'http://localhost:8100/api/logs',
    // logs: NgxLoggerLevel.DEBUG,
    // level: NgxLoggerLevel.TRACE,
    // serverLogLevel: NgxLoggerLevel.ERROR,
    // disableConsoleLogging: false
  },
  firebaseConfig: {
    apiKey: 'AIzaSyBgX5yN5UMbDy_bVx2EWNdZNkbZmx5iN8A',
    authDomain: 'stockmanagementbilling-adb46.firebaseapp.com',
    databaseURL: 'https://stockmanagementbilling-adb46.firebaseio.com',
    projectId: 'stockmanagementbilling-adb46',
    storageBucket: 'stockmanagementbilling-adb46.appspot.com',
    messagingSenderId: '474930478053',
    appId: '1:474930478053:web:ad55f21b2659687cf14d0c',
    measurementId: 'G-538L18J4VK'
  },
  googlWebClientId: '474930478053-1a6l6k1rql128dghpce38o7r8agmc97a.apps.googleusercontent.com'
};
