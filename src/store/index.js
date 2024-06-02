import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      isLoggedIn: false,
    };
  },
  mutations: {
    setLoggedIn(state, status) {
      state.isLoggedIn = status;
    },
  },
  actions: {
    loginState({ commit }) {
      // Perform login logic here, then set the state
      commit('setLoggedIn', true);
      console.log("Login state: true");
    },
    logoutState({ commit }) {
      // Perform logout logic here, then unset the state
      commit('setLoggedIn', false);
        console.log("Login state: false");
    },
  }
});

export default store;