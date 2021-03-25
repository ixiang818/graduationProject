import Vuex from 'vuex';
import Vue from 'vue'

Vue.use(Vuex);
export default new Vuex.Store({
  state:{
    userToken:'',
    userName:'Aoxiangyun'
  },
  mutations:{
    initUserToken(state,value){
      state.userToken = value
    },
    removeUserToken(state){
      state.userToken = null
    },
    initUserName(state,value){
      state.userName = value
    },
    removeUserName(state){
      state.userName = ''
    },

  }
})

