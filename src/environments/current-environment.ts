import { Environment } from './environment';

export const environment = <Environment>{
  production: false,
  firebase: {
    apiKey: 'AIzaSyDVnaenqdTw7adMVPmqaZ0QxTMHmAqyJ7c',
    authDomain: 'yet-another-blog-site.firebaseapp.com',
    projectId: 'yet-another-blog-site',
    storageBucket: 'yet-another-blog-site.appspot.com',
    messagingSenderId: '853276277319',
    appId: '1:853276277319:web:1814ff0a0f04d9d4dd4f62',
    measurementId: 'G-D2X6XJTL0C'
  },
  modules: [
    'check',
    'document',
    'edit',
    'read',
    'write'
  ]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.