<template>
  <f7-page no-toolbar no-navbar no-swipeback login-screen>
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
    };
  },
  methods: {
    signIn() {
     this.$f7router.navigate('/')
    },
  },
};
</script>