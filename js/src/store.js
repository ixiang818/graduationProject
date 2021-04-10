import Vuex from 'vuex';
import Vue from 'vue'

Vue.use(Vuex);
export default new Vuex.Store({
  state:{
    userToken:'',
    userName:'Aoxiangyun',
    updateDiary: '',
    isUpdatingDiary: false
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
    setUpdateDiary(state,value){
      state.updateDiary = value
    },
    setIsUpdatingDiary(state,value){
      state.isUpdatingDiary = value
    },
  }
})

