<template>
  <f7-page
    no-toolbar
    no-navbar
    no-swipeback
    login-screen
    @page:afterin="onPageAfterIn"
  >
    <p align="center" v-if="!successFlag">登录失败，请重新登录</p>
    <f7-login-screen-title>Multimedia Diary</f7-login-screen-title>
    <f7-list form>
      <f7-list-input
        label="Username"
        type="text"
        placeholder="Your username"
        :value="username"
        @input="username = $event.target.value"
      ></f7-list-input>
      <f7-list-input
        label="Password"
        type="password"
        placeholder="Your password"
        :value="password"
        @input="password = $event.target.value"
      ></f7-list-input>
    </f7-list>
    <f7-list>
      <f7-list-button @click="signIn">Sign In</f7-list-button>
      <f7-block-footer>--记录点滴生活--</f7-block-footer>
    </f7-list>
  </f7-page>
</template>


<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      successFlag: true,
    };
  },
  methods: {
    onPageAfterIn() {
      if (this.$store.state.userToken !== null) {
        this.$f7router.navigate("/");
      }
    },
    async signIn() {
      try {
        const res = await this.$post(
          `/login`,{
            username:this.username,
            password:this.password
          }
        );
        console.log(res);
        if (res.success == true) {
          //保存token
          this.$store.commit("initUserToken", res.data.userToken);
          console.log(this.$store.state.userToken);
          //保存name
          this.$store.commit("initUserName", this.username);
          //导航到home
          this.$f7router.navigate("/");
        } else {
          this.successFlag = false;
        }
      } catch (_e) {
        this.successFlag = false;
      }
    },
  },
};
</script>