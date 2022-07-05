import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: false,
  },
  getters: {
    getLoggedIn: (state) => {
      return state.loggedIn;
    }
  },
  mutations: {
    SET_LOGIN(state, loggedin) {
      state.loggedIn = loggedin;
    }
  },
  actions: {
  },
  modules: {
  }
})
