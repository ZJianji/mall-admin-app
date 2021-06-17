<template>
  <div calss="home-cantainer">
    <Menu />
    <Header />
  </div>
</template>

<script>
import Header from './components/Header'
import Menu from './components/Menu'
export default {
  components:{
    Header,
    Menu,
  },
};
</script>

<style scoped lang='less'>
@import "~@/assets/css/home.less";
</style>
