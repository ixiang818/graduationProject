<template>
  <f7-page @page:afterin="onPageAfterIn">
    <f7-navbar title="媒体库" back-link="Back"></f7-navbar>
    <f7-card v-for="(item, index) in imgList" :key="index">
      <f7-card-header valign="bottom">{{item.date}}</f7-card-header>
      <f7-card-content>
        <img
          :src="item.ImageCode"
          width="100%"
      /></f7-card-content>
    </f7-card>
  </f7-page>
</template>

<script>
export default {
  data() {
    return {
      imgList: [],
    };
  },
  methods:{
    async onPageAfterIn(){
      var self = this;
      //取照片
      const res = await self.$get(`/getPhotos`);
      console.log(res);
      self.imgList = res.data;
    }
  },
};
</script>

<style>
.swiper-slide {
  background: #fff;
  text-align: center;
  font-size: 18px;
  line-height: 200px;
  box-sizing: border-box;
  border: 1px solid #ccc;
}
</style>

