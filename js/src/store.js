import Vuex from 'vuex';
import Vue from 'vue'

Vue.use(Vuex);
export default new Vuex.Store({
  state:{
    userToken:null
  },
  mutations:{
    initUserToken(state,value){
      state.userToken = value
    },
    removeUserToken(state){
      state.userToken = null
    }
  }
})

