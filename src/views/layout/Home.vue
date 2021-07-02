<template>
  <div calss="home-cantainer">
    <Menu :key="key" />
    <div class="aside-container">
      <Header />
    </div>
  </div>
</template>

<script>
import Header from "./components/Header";
import Menu from "./components/Menu";
export default {
  components: {
    Header,
    Menu,
  },
  data() {
    return {
      key: new Date().getTime(),
    }
  },
  watch: {
    $route() {
      this.key = new Date().getTime();
    }
  }
};
</script>

<style scoped lang='less'>
@import "~@/assets/css/home.less";

</style>
