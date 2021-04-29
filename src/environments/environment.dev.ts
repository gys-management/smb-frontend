// import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
  production: true,
  firebaseAPIKey: 'AIzaSyA5bnoN_9WIvKgjsd3nM-kZCWkrTiYUb3w',
  restAPI: 'https://dev-smb.herokuapp.com/api', // enable when API is from Heroku test eve
  ngxLogger: {
    serverLoggingUrl: 'https://stockmangementbilling.free.beeceptor.com/api/logs',
    // serverLoggingUrl: 'http://localhost:8100/api/logs',
    // logs: NgxLoggerLevel.DEBUG,
    // level: NgxLoggerLevel.TRACE,
    // serverLogLevel: NgxLoggerLevel.ERROR,
    // disableConsoleLogging: false
  },
  firebaseConfig: {
    apiKey: 'AIzaSyA5bnoN_9WIvKgjsd3nM-kZCWkrTiYUb3w',
    authDomain: 'ionic-angular-61cb7.firebaseapp.com',
    databaseURL: 'https://ionic-angular-61cb7.firebaseio.com',
    projectId: 'ionic-angular-61cb7',
    storageBucket: 'ionic-angular-61cb7.appspot.com',
    messagingSenderId: '607815266559',
    appId: '1:607815266559:web:d1412e1466127f8a8b1cca',
    measurementId: 'G-X6PC3K1VH7'
  },
  googlWebClientId: '607815266559-2lb41llblut4qa6a7ool5273m4j5f1kf.apps.googleusercontent.com'
};
