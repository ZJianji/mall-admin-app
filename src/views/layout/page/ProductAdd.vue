<template>
  <div class="productAdd-container">
    <a-steps :current="current" class="steps">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <AddForm v-if="current === 0" @onNext="next" :form="form"/>
       <SaleList v-else @prev="prev" :form="form" @onNext="handleSubmit"/>
       
    </div>
    <div class="steps-action">
    </div>
  </div>
</template>
<script>
import AddForm from "@/components/addForm"
import SaleList from "@/components/saleList"
import api from "@/api/product"
import search from "@/api/search"
export default {
  components: {
    AddForm,
    SaleList
  },
  data() {
    return {
      current: 0,
      form: {
        title: "",
        desc: "",
        category: '',
        c_items: [],
        tags: ['包邮，最晚次日达'],
        price: 0,
        price_off: 0,
        inventory: 0,
        unit: '',
        images: [],
        status: 1
      },
      steps: [
        {
          title: '请填写商品基本信息',
        },
        {
          title: '填写商品销售信息',
        },
      ],
    };
  },
  methods: {
    next(form) {
       search.getSearch().then((r) => {
         let arr = [];
         let c = [];
         arr = r.data.filter((item) => {
        return item.name === form.category;
      });
      form.category = arr[0].id; 
      c.push(form.c_items);
      form.c_items = c;
      console.log(arr[0])
     });
      this.form = form;
      this.form.title = form.title;
      this.form.price = form.price;
      this.current++;
 
    },
    prev() {
      this.current--;
    },
    handleSubmit(val) {
      console.log(val)
      
         api.add(val).then((r) => {
         console.log(r);
      })
     
      
     
    }
  },
};
</script>
<style scoped lang="less">
.productAdd-container{
  .steps{
    width: 50%;
    margin: 30px auto;
  }
  .steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}

.steps-action {
  margin-top: 24px;
}
.steps-action {
  text-align: center;
}
}

</style>
