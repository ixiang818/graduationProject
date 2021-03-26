<template>
  <f7-page>
    <f7-block>
      <f7-block-title medium>{{ userName }}</f7-block-title>
      <f7-list>
        <f7-list-item title="图片库" link="/medialibrary/"></f7-list-item>
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
          <p>这是一个小树洞，倾听你的一切美好与烦恼~</p>
          <hr />
          <p>【日历】在日历上可以看到本月自己的心路历程</p>
          <p>【搜索】支持输入模糊的日记内容搜索是哪一天发生</p>
          <p>【文字记录】记录每日天气心情，写下想说的话</p>
          <p>【图片记录】拍照/选图，定格美好瞬间</p>
          <p>【照片墙】收集日记本里的照片，将照片逐一展示</p>
        </f7-block>
      </f7-page-content>
    </f7-sheet>
  </f7-page>
</template>


<script>
export default {
  data() {
    return {
      userName: "",
    };
  },
  mounted() {
    this.userName = this.$store.state.userName;
  },
  methods: {
    openSheet() {
      this.$f7.sheet.open(".demo-sheet-swipe-to-close");
    },
    logout() {
      this.$store.commit("removeUserToken");
      console.log(this.$store.state.userToken);
      this.$store.commit("removeUserName");
      this.$f7router.navigate("/login/");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
