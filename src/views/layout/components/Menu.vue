<template>
<div class="menu-comtainer" >
    <a-menu
      :default-selected-keys="[$router.currentRoute.matched[1]?$router.currentRoute.matched[1].name:'']"
      :default-open-keys="[$router.currentRoute.matched[0].name]"
      mode="inline"
      theme="dark"
      :inline-collapsed="$store.state.collapsed"
      :class="{ fold: $store.state.collapsed }"
    >
     <template v-for="list in $store.state.menuRoutes"> 
      <a-sub-menu   :key="list.name" v-if="list.meta.display">
        <span slot="title"
          ><a-icon :type="list.meta.icon" /><span>{{ list.meta.title }}</span></span
        >
        <template v-for="children in list.children">
            <a-menu-item :key="children.name" v-if="children.meta.display"> 
          <router-link :to="{
            name: children.name
          }"><a-icon :type="children.meta.icon" /><span>{{ children.meta.title }}</span> </router-link> 
         </a-menu-item>
        </template>
      
        
      </a-sub-menu>
      </template>
    </a-menu>
    </div>
</template>

<script>
export default {
 
}
</script>

<style lang="less" scoped>
  .ant-menu{
    position:fixed;
    top:0;
    left: 0;
    height: 100%;
    width: 180px;
    &.fold{
        width: 70px;
    }
  }
</style>