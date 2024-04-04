// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  //production: false,
  production: true,
  //apiUrl: 'http://10.102.1.87/Cimat.Api/',
  //apiUrl: 'https://localhost:4040/',
  apiUrl: 'https://localhost:44353/', //Your API's Port in development
  adminRole: 1,
  // Your web app's Firebase configuration
  firebaseConfig: {
    apiKey: "AIzaSyC5QoImPcbMFxNreS6RoT1fr-Es-kFUPIQ",
    authDomain: "system402-e5e24.firebaseapp.com",
    databaseURL: "https://system402-e5e24.firebaseio.com",
    projectId: "system402-e5e24",
    storageBucket: "system402-e5e24.appspot.com",
    messagingSenderId: "207829724281",
    appId: "1:207829724281:web:9d5f4e28da14aafd8a38a8"
  },
  rowsOfPage: 5,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
