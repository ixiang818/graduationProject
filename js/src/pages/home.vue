<template>
  <f7-page class="home-page" @page:beforeout="onPageBeforeOut" @page:afterin="onPageAfterIn">
    <f7-navbar title="Home"></f7-navbar>
    <div>hello world</div>
  </f7-page>
</template>
<script>

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
  
  }
}
</script>

<style lang="scss" scoped>
</style>
