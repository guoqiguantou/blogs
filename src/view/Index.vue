<template>
  <div class="banenr">
    <Carousel v-model="value1" loop>
      <CarouselItem>
        <img src="../assets/img/banner1.jpg" alt class="bannerimg">
      </CarouselItem>
      <CarouselItem>
        <img src="../assets/img/banner2.jpg" alt class="bannerimg">
      </CarouselItem>
      <CarouselItem>
        <img src="../assets/img/banner3.jpg" alt class="bannerimg">
      </CarouselItem>
      <CarouselItem>
        <img src="../assets/img/banner4.jpg" alt class="bannerimg">
      </CarouselItem>
    </Carousel>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value1: 0
    };
  }
};
</script>
<style  scoped lang="less">
.banenr {
  padding: 25px 0;
  border-top: 1px solid #e8e3d9;
  border-bottom: 1px solid #e8e3d9;
  .bannerimg {
    width: 100%;
    height: 500px;
  }
}
</style>
