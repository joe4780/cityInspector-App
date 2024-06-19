import { getAuth, onAuthStateChanged } from 'firebase/auth';

const state = {
  user: null,
};

const getters = {
  userRole: state => state.user ? state.user.role : null,
};

const mutations = {
  setUser(state, user) {
    state.user = user;
  },
};

const actions = {
  initAuth({ commit }) {
    const auth = getAuth();
    onAuthStateChanged(auth, user => {
      if (user) {
        // User is signed in.
        commit('setUser', user);
      } else {
        // User is signed out.
        commit('setUser', null);
      }
    });
  },
  async login({ commit }, { email, password }) {
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      commit('setUser', user);
    } catch (error) {
      console.error('Error logging in:', error.message);
      throw error;
    }
  },
  async logout({ commit }) {
    try {
      const auth = getAuth();
      await signOut(auth);
      commit('setUser', null);
    } catch (error) {
      console.error('Error logging out:', error.message);
      throw error;
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
