<template>
  <a-form layout="inline" @submit="handleSubmit" @submit.native.prevent>
    <a-form-item label="商品名">
      <a-input placeholder="请输入搜索的商品" v-model="searchForm.searchWord"> </a-input>
    </a-form-item>
    <a-form-item label="商品类目">
      <a-select show-search  allowClear style="width: 150px" placeholder="请选择商品类目" @change="handleChange">
        <a-select-option v-for="list in categoryList" :key="list.id" :value="list.id" > {{ list.name }} </a-select-option>
        
      </a-select>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit"> 搜索 </a-button>
    </a-form-item>
  </a-form>
</template>




<script>
export default {
  props: ['categoryList'],
  data() {
    return {
       searchForm: {
        searchWord: '',
        category: '',
      },
    }
  },
  methods: {
    //提交表单触发
    handleSubmit() {
        this.$emit('handleSearch',this.searchForm)
    },
    //当商品类目切换触发
    handleChange(val) {
      this.searchForm.category = val;
    },
  },
  created() {
  }
};
</script>

<style scoped>
.ant-form{
    padding: 10px 40px;
}
</style>
