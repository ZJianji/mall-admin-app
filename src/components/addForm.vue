<template>
  <a-form-model
    :model="form"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    ref="ruleForm"
  >
    <a-form-model-item label="副标题" required prop="title">
      <a-input v-model="form.title" />
    </a-form-model-item>
    <a-form-model-item label="商品描述">
      <a-input v-model="form.desc" />
    </a-form-model-item>
    <a-form-model-item label="商品类目" required prop="category">
      <a-select
        v-model="form.category"
        @change="handleChange"
        placeholder="请选择商品类别！"
      >
        <a-select-option
          v-for="list in categoryList"
          :key="list.id"
          :value="list.name"
        >
          {{ list.name }}
        </a-select-option>
      </a-select>
      <a-select v-model="form.c_item" placeholder="请选择商品子类别！">
        <a-select-option
           v-for="(item, i) in c_itemsList"
          :key="i"
          :value="item" 
        >
          {{ item }}
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="商品标签" required prop="tags">
      <a-select v-model="form.tags" mode="tags" :token-separators="[',']" :default-value="['包邮，最晚次日达']">
        <a-select-option v-for="item in form.tags" :key="item">
          {{ item }}
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit"> 下一步 </a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
import api from "@/api/search";
export default {
  props: {
    form: [],
  },
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      rules: {},
      categoryList: [],
      c_itemsList: [],
      
    };
  },
  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          // console.log(this.form)
          this.$emit("onNext",this.form);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleChange(val) {
      let arr = [];
      arr = this.categoryList.filter((item) => {
        return item.name === val;
      });
      this.c_itemsList = arr[0].c_items;
     
      // console.log(this.c_itemsList);
    },
  },
  created() {
    api.getSearch().then((r) => {
       let arr = [];
         arr = r.data.filter((item) => {
        return item.id === this.form.category;
      });
      this.categoryList = r.data;
       this.form.category = arr[0].name;
    });
  },
  watch: {
    'form.category': {
      deep:true,
        handler:function(newV){
          console.log('watch中：',newV)
        }
    }
  }
};
</script>

