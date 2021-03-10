<template>
  <f7-page class="home-page" @page:beforeout="onPageBeforeOut" @page:afterin="onPageAfterIn">
    <f7-navbar title="Home"></f7-navbar>
    <f7-button @click="takePicture">相机</f7-button>
    <div>hello world</div>
    <img id="myImage">
  </f7-page>
</template>

<script>
import {cameraTakePicture} from '../utils/cordovaPlugin.js'
export default {
  data(){
    return{
      
    }
  },
  mounted() {
 },
  methods:{
    onPageBeforeOut() {
      
    },
    onPageAfterIn() {
     console.log('g')
    },
    takePicture() {
      cameraTakePicture()
    }
  
  }
}
</script>

<style lang="scss" scoped>
</style>
