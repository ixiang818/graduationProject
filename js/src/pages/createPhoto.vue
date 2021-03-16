<template>
  <f7-page>
    <f7-navbar title="相片日记" back-link="Back"></f7-navbar>
    <f7-block strong>
      <f7-row tag="p">
        <f7-col tag="span">
          <f7-button large raised @click="takePicture">打开相机</f7-button>
        </f7-col>
        <f7-col tag="span">
          <f7-button large raised fill @click="getPicture">从相册中选取</f7-button>
        </f7-col>
      </f7-row>
    </f7-block>

    <f7-block strong inset>
      <img id="myImage" />
      <f7-button raised fill @click="createPhoto">保存</f7-button>
    </f7-block>
  </f7-page>
</template>

<script>
import { cameraTakePicture } from "../utils/cordovaPlugin.js";
export default {
  data() {
    return {};
  },
  methods: {
    takePicture() {
      cameraTakePicture();
    },
    getPicture(){
      albumGetPicture();
    },
    createPhoto(){
      //
      this.$f7router.back();
    },
  },
};
</script>