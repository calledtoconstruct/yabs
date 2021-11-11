import { Environment } from './environment';

export const environment = <Environment>{
  production: false,
  firebase: {
    apiKey: 'AIzaSyDIsRy6F4ojb9T0bE4Ap4W3cgQVSvbTIdg',
    authDomain: 'yet-another-blog-site.firebaseapp.com',
    projectId: 'yet-another-blog-site',
    storageBucket: 'yet-another-blog-site.appspot.com',
    messagingSenderId: '853276277319',
    appId: '1:853276277319:web:f91b4f282c0d8962dd4f62',
    measurementId: 'G-9YK25K8X10'
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
