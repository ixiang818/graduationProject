<template>
  <f7-page
    class="home-page"
    @page:beforeout="onPageBeforeOut"
    @page:afterin="onPageAfterIn"
  >
    <f7-toolbar tabbar bottom>
      <f7-link tab-link="#tab-1" tab-link-active>日历</f7-link>
      <f7-link tab-link="#tab-2">我的</f7-link>
    </f7-toolbar>
    <f7-tabs animated>
      <f7-tab id="tab-1" class="page-content" tab-active>
        <f7-view main url="/display/"></f7-view>
      </f7-tab>
      <f7-tab id="tab-2" class="page-content">
        <tab2></tab2>
      </f7-tab>
    </f7-tabs>


    <f7-fab position="center-bottom" color="blue" text="Create" v-show="!this.$store.state.isUpdatingDiary">
      <f7-icon ios="f7:plus" aurora="f7:plus" md="material:add"></f7-icon>
      <f7-icon ios="f7:xmark" aurora="f7:xmark" md="material:close"></f7-icon>
      <f7-fab-buttons position="top">
        <f7-fab-button
          ><f7-link href="/createWord/">文字</f7-link></f7-fab-button
        >
        <f7-fab-button
          ><f7-link href="/createPhoto/">相片</f7-link></f7-fab-button
        >
      </f7-fab-buttons>
    </f7-fab>
  </f7-page>
</template>


<script>
import Tab2 from './user'

export default {
  components: {Tab2,},
  data() {
    return {};
  },
  mounted() {},
  methods: {
    onPageBeforeOut() {},
    onPageAfterIn() {
      console.log("g");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
