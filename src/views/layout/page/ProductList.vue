<template>
  <div class="productList-container">
      <Search @handleSearch="handleCommodity" :categoryList="categoryList" />
       <router-link :to="{name: 'ProductAdd'}" class="addProduct">
        <a-button>新增商品</a-button> 
        </router-link>
      <Table 
      :data="tableList" 
      :page="page"
      @change="changePage"
      @editProduct="handleEdit"
      @deldeteProduct="handleDelete"
      />
  </div>
</template>

<script>
import Search from '@/components/search';
import Table from '@/components/table';
import api from '@/api/product.js';
import searchApi from '@/api/search';
import deleteProduct from '@/api/delete';
export default {
  components:{
    Search,
    Table,
  },
  data() {
    return {
      tableList: [], //表格的数据
      page: {  //分页用到的参数
      current: 1,
      showSizeChanger: true,  //是否改变每一页的列表数
      pageSize: 10,  //默认每一页的列表数
      total: 1,  //默认总的列表数
      },
      categoryList: [],  //搜索里的类目列表数据
       searchForm: {}, //搜索表单的参数
    }
  },
  methods: {
    //获取到搜索栏的传进的数据
    handleCommodity(from) {
      this.searchForm = from;
      this.handleTable();
    },
    //获取到表格数据
    handleTable() {
      // console.log(this.searchForm)
      api.list({
         page: this.page.current,
         size: this.page.pageSize,
        ...this.searchForm,
      }).then((res) => {
        this.page.total = res.total;
        // console.log(res.data)
       this.tableList = res.data.map((item) => {
         this.categoryList.forEach((res) => {
           if(item.category == res.id){
             item.category = res.name;
           }
         })
         return {
           ...item,
           key: item.id,
         }
       })
      })
    },
    //从新赋值翻页信息
    changePage(page) {
       this.page = page;
      this.handleTable();
    },
    //编辑按钮操作，跳转到编辑页以及传递该行的信息
    handleEdit(record) {
       this.$router.push({name: "ProductEdit"});
       console.log(record)
    },
    handleDelete(record) {
       this.$confirm({
        title: '确认删除',
        content: '是否删除名为'+ record.title + '商品？',
        okText: '确认',
        cancelText: '取消',
        onOk:() => {
          console.log("a")
          deleteProduct.delete(record.id).then(() => {
            this.handleTable();
          })
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    }
  },
   created() {
     this.handleTable();
      searchApi.getSearch().then((r) => {
      this.categoryList = r.data;
      // console.log(r.data)
    })
   }
}
</script>

<style code lang="less">
.productList-container{
  position: relative;
}
.addProduct {
  position: absolute;
  right:20px;
  top:14px;
  

}

</style>