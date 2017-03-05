// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    config: {
      apiKey: 'AIzaSyCNjUMHsV_64Qgh0LM5xUrHf1RMNJ97PGw',
      authDomain: 'hsr-fee16-projekt2.firebaseapp.com',
      databaseURL: 'https://hsr-fee16-projekt2.firebaseio.com',
      storageBucket: 'hsr-fee16-projekt2.appspot.com'
    }
  }
};
