<template>
  <f7-page>
    <f7-navbar title="相片日记" back-link="Back"></f7-navbar>
    <f7-block strong>
      <f7-row tag="p">
        <f7-col tag="span">
          <f7-button large raised @click="takePicture">打开相机</f7-button>
        </f7-col>
        <f7-col tag="span">
          <f7-button large raised fill @click="getPicture"
            >从相册中选取</f7-button
          >
        </f7-col>
      </f7-row>
    </f7-block>

    <f7-block strong inset>
      <img id="myImage" :src="myImageCode" style="width: 200px" />
      <f7-button raised fill @click="createPhoto">保存</f7-button>
    </f7-block>
  </f7-page>
</template>

<script>
import { cameraTakePicture, albumGetPicture } from "../utils/cordovaPlugin.js";
export default {
  data() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return {
      year: year,
      month: month,
      day: day,
      myImageCode: ``,
    };
  },
  methods: {
    takePicture() {
      var self = this;
      cameraTakePicture(self.takePictureSuccess);
    },
    takePictureSuccess(imageData) {
      var self = this;
      self.myImageCode = "data:image/jpeg;base64," + imageData;
    },
    getPicture() {
      var self = this;
      albumGetPicture(self.getPictureSuccess);
    },
    getPictureSuccess(imageData){
      var self = this;
      self.myImageCode = "data:image/jpeg;base64," + imageData;
    },
    async createPhoto() {
      if (this.myImageCode != ``) {
        const res = await this.$post(`/createPhotos`, {
          date: this.year + "." + this.month + "." + this.day,
          ImageCode: this.myImageCode,
        });
        if (res.success == true) {
          this.$f7.toast
            .create({
              text: "添加成功",
              position: "center",
              closeTimeout: 2000,
            })
            .open();
          this.$f7router.navigate("/");
        }
      } else {
        this.$f7.toast
          .create({
            text: "请拍照/选择照片后再添加",
            position: "center",
            closeTimeout: 2000,
          })
          .open();
      }
    },
  },
};
</script>