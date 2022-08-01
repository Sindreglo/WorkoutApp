import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: false,
    loggedInUser: null,
    loggedInDisplayName: "",
  },
  getters: {
    getDisplayName: (state) => {
      return state.loggedInDisplayName;
    },
  },
  mutations: {
    ADD_USERNAME(state, username) {
      state.loggedInDisplayName = username;
    },
  },
  actions: {
    UPDATE_USERNAME({ commit }, username) {
      commit("ADD_USERNAME", username);
    },
  },
  modules: {},
})
