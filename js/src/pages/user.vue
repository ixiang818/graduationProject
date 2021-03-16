<template>
  <f7-page>
    <f7-block>
      <f7-block-title medium>{{userName}}</f7-block-title>
      <f7-list>
        <f7-list-item title="媒体库" link="/medialibrary/"></f7-list-item>
        <f7-list-item title="关于" link="#" @click="openSheet"> </f7-list-item>
      </f7-list>
      <f7-button raised fill color="red" @click="logout">退出登錄</f7-button>
    </f7-block>

    <f7-sheet
      class="demo-sheet-swipe-to-close"
      style="height: auto; --f7-sheet-bg-color: #fff"
      swipe-to-close
      backdrop
    >
      <f7-page-content>
        <f7-block-title large>关于</f7-block-title>
        <f7-block>
          <p>
            Eaque maiores ducimus, impedit unde culpa qui, explicabo accusamus,
            non vero corporis voluptatibus similique odit ab. Quaerat quasi
            consectetur quidem libero? Repudiandae adipisci vel voluptatum,
            autem libero minus dignissimos repellat.
          </p>
        </f7-block>
      </f7-page-content>
    </f7-sheet>
  </f7-page>
</template>


<script>
export default {
  data() {
    return {
      userName:'Ao'
    };
  },
  methods: {
    openSheet(){
      this.$f7.sheet.open('.demo-sheet-swipe-to-close')
    },
    logout(){
      this.$store.commit('removeUserToken')
      console.log(this.$store.state.userToken)
      this.$f7router.navigate("/login/");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
