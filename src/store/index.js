import Vue from 'vue'
import Vuex from 'vuex'
import {setCookie,getUserCookie,removeUserCookie} from '@/utils/userCookies';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    collapsed: true,
    user: getUserCookie(),
    menuRouter: [],
  },
  mutations: {
    changeCollapsed(state){
      state.collapsed = !state.collapsed;
    },
    setUserName(state,newUser){
      state.user = newUser;
      setCookie(newUser);
    },
    logout(state){
      state.user = {
        username: '',
        email: '',
        appkey: '',
        role: '',
      }
    },
    changeMenuRoutes(state,routes) {
      state.menuRoutes = routes;
    }
  },
  actions: {
    changeCollapsed({commit}) {
      commit('changeCollapsed');
    },
    setUserName({commit},newUser) {
      commit('setUserName',newUser);
    },
    logout({commit}) {
      commit('logout');
      removeUserCookie();
    },
    changeMenuRoutes({commit},routes) {
      commit('changeMenuRoutes',routes);
    }
  },
  modules: {
  }
})
