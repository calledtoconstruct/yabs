import { Environment } from './environment';

export const environment = <Environment>{
  production: true,
  firebase: {
    apiKey: 'AIzaSyD-7tyiZqLlFmpbQITjahcXxT4gI1-dmQw',
    authDomain: 'ember-yabs.firebaseapp.com',
    projectId: 'ember-yabs',
    storageBucket: 'ember-yabs.appspot.com',
    messagingSenderId: '466420288246',
    appId: '1:466420288246:web:00a3c21c5010c9b0f73ad7',
    measurementId: 'G-6R94VLTW81'
  },
  modules: [
    'check',
    'document',
    'edit',
    'read',
    'write'
  ]
};
