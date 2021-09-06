/* eslint-disable no-console */
import { changeView } from './view-controler/router.js';
import { firebaseConfig } from './firebase/firebase-config.js';

const init = () => {
  firebase.initializeApp(firebaseConfig);
  changeView(window.location.hash);
  window.addEventListener('hashchange', () => changeView(window.location.hash));
};
window.addEventListener('load', init);
