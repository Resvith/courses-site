import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      isLoggedIn: false,
      userType: null,
    };
  },
  mutations: {
    setLoggedIn(state, status) {
      state.isLoggedIn = status;
    },
    setUserType(state, type) {
      state.userType = type;
    },
  },
  actions: {
    loginState({ commit }, userType) {
      commit('setLoggedIn', true);
      commit('setUserType', userType);
    },
    logoutState({ commit }) {
      commit('setLoggedIn', false);
      commit('setUserType', null);
    },
  }
});

export default store;