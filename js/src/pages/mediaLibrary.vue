<template>
<f7-page>
  <f7-navbar title="媒体库" back-link="Back"></f7-navbar>
  <f7-block-title>相片墙</f7-block-title>
  <f7-swiper navigation :speed="500" pagination scrollbar>
    <f7-swiper-slide v-for="(item, index) in imgList" :key="index">
      <img :src="item.img" alt="" width="80%" height="80%">
      {{item.date}}
    </f7-swiper-slide>
  </f7-swiper>
  <f7-block></f7-block>
</f7-page>
</template>

<script>
export default {
  data() {
    return {
      imgList:[
        {img:require('@/assets/png/rabbit.jpg'),date:"3.16"},
        {img:require('@/assets/png/rabbit.jpg'),date:"3.16"},
        {img:require('@/assets/png/rabbit.jpg'),date:"3.16"}
      ]
    };
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

