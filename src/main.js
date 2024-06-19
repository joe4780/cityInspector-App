import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

// Firebase configuration (replace with your own config)
const firebaseConfig = {
  apiKey: "AIzaSyAw9iY2-mUnAYXAn6dwXrH_KN99s8UNQIg",
  authDomain: "cityinspector-53f84.firebaseapp.com",
  projectId: "cityinspector-53f84",
  storageBucket: "cityinspector-53f84.appspot.com",
  messagingSenderId: "778892971027",
  appId: "1:778892971027:web:deec6ed68a3085999783e6",
  measurementId: "G-QTR6EXB3NS"
};

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp); // Initialize Firebase Auth

// Set Firebase Auth instance in Vuex store
store.$auth = auth;

// Toast options
const options = {
  position: POSITION.TOP_RIGHT,
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
  rtl: false
};

// Initialize Vue app
createApp(App)
  .use(store)
  .use(router)
  .use(Toast, options)
  .mount('#app');
