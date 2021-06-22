<template>
  <div class="right-container" :class="{ buttonLeft: $store.state.collapsed }">
    <div class="header-container">
      <!-- 菜单栏按钮 -->
      <a-button
        type="primary"
        style="margin-bottom: 16px"
        @click="toggleCollapsed"
      >
        <a-icon :type="$store.state.collapsed ? 'menu-unfold' : 'menu-fold'" />
      </a-button>
      <!-- 面包屑 -->
      <a-breadcrumb>
        <a-breadcrumb-item>商品</a-breadcrumb-item>
        <a-breadcrumb-item><a href="">商品列表</a></a-breadcrumb-item>
      </a-breadcrumb>
      <ul class="user">
        <li>{{ $store.state.user.username }}<a-icon type="down" /></li>
        <li @click="handleExit">退出</li>
      </ul>
    </div>
   <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      collapsed: false,
    };
  },
  methods: {
    toggleCollapsed() {
      this.$store.dispatch('changeCollapsed');
    },
    handleExit() {
      this.$store.dispatch('logout');
      this.$router.push({
        name: 'Login',
      })
    }
  },
  
};
</script>

<style scoped lang='less'>
.right-container {
  margin-left: 180px;
  transition: all 0.3s;
  &.buttonLeft {
    margin-left: 70px;
  }
  .header-container {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ccc;
    .ant-btn {
      margin-left: 10px;
    }
    .ant-breadcrumb {
      display: inline-block;
      margin-left: 20px;
    }
    .user {
      position: absolute;
      right: 0;
      top: 0;
      li {
        margin-right: 20px;
        text-align: center;
        height: 50px;
        cursor: pointer;
      }
      li:not(:first-child) {
        display: none;
        &:hover {
          background-color: #ccc;
        }
      }
      &:hover {
        li {
          display: block;
        }
      }
    }
  }
}
</style>