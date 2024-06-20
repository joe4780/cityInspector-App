import { createStore } from 'vuex';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import router from '../router'; // Ensure correct path to your router instance

const firebaseConfig = {
  apiKey: "AIzaSyAw9iY2-mUnAYXAn6dwXrH_KN99s8UNQIg",
  authDomain: "cityinspector-53f84.firebaseapp.com",
  projectId: "cityinspector-53f84",
  storageBucket: "cityinspector-53f84.appspot.com",
  messagingSenderId: "778892971027",
  appId: "1:778892971027:web:deec6ed68a3085999783e6",
  measurementId: "G-QTR6EXB3NS"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

const store = createStore({
  state: {
    user: null,
    role: null, // Add role to state
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setRole(state, role) {
      state.role = role;
    },
    clearUser(state) {
      state.user = null;
      state.role = null; // Clear role on logout
    },
  },
  actions: {
    async fetchUserRole({ commit }, userId) {
      try {
        const userDoc = await getDoc(doc(db, "users", userId));
        if (userDoc.exists()) {
          const role = userDoc.data().role;
          commit('setRole', role);
        } else {
          console.error('No such document!');
        }
      } catch (error) {
        console.error('Error fetching user role:', error.message);
      }
    },
    async login({ commit, dispatch }, { email, password }) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        commit('setUser', user);
        await dispatch('fetchUserRole', user.uid);

        // Redirect based on user role
        const userRole = store.getters.userRole; // Ensure role is part of user data
        switch (userRole) {
          case 'Admin':
            router.push('/Admin/AdminDashboard');
            break;
          case 'CoordinatorHospital':
            router.push('/CoordinatorHospital/CoordinatorDashboard');
            break;
          case 'OfficerPolicestation':
            router.push('/OfficerPolicestation/OfficerDashboard');
            break;
          case 'Driver':
            router.push('/Driver/DriverDashboard');
            break;
          case 'TrafficPolice':
            router.push('/TrafficPolice/TrafficDashboard');
            break;
          default:
            router.push('/');
            break;
        }

        return user;
      } catch (error) {
        console.error('Error signing in:', error.message);
        throw error; // Propagate error to handle in component
      }
    },
    async logout({ commit }) {
      try {
        await signOut(auth);
        commit('clearUser');
        router.push('/'); // Redirect to home page after logout
      } catch (error) {
        console.error('Error signing out:', error.message);
        throw error; // Propagate error to handle in component
      }
    },
  },
  getters: {
    isAuthenticated(state) {
      return !!state.user;
    },
    userRole(state) {
      return state.role; // Return role from state
    },
  },
});

// Initialize Firebase auth state observer
onAuthStateChanged(auth, async (user) => {
  if (user) {
    store.commit('setUser', user);
    await store.dispatch('fetchUserRole', user.uid);
  } else {
    store.commit('clearUser');
  }
});

export default store;
