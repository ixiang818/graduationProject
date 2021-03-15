<template>
<f7-page>
  <f7-navbar title="媒体库" back-link="Back"></f7-navbar>
  <f7-block-title>相片墙</f7-block-title>
  <f7-swiper navigation :speed="500" :slidesPerView="3" :spaceBetween="20">
    <f7-swiper-slide>Slide 1</f7-swiper-slide>
    <f7-swiper-slide>Slide 2</f7-swiper-slide>
    <f7-swiper-slide>Slide 3</f7-swiper-slide>
    <f7-swiper-slide>Slide 4</f7-swiper-slide>
    <f7-swiper-slide>Slide 5</f7-swiper-slide>
    <f7-swiper-slide>Slide 6</f7-swiper-slide>
  </f7-swiper>
  <f7-block></f7-block>
</f7-page>
</template>

<script>
export default {
  data() {
    return {};
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

