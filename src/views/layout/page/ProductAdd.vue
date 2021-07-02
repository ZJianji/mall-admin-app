<template>
  <div class="productAdd-container">
    <a-steps :current="current" class="steps">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <AddForm v-if="current === 0" @onNext="next"/>
    </div>
    <div class="steps-action">
      <a-button
        v-if="current == steps.length - 1"
        type="primary"
        @click="$message.success('提交成功!')"
      >
        提交
      </a-button>
      <a-button v-if="current > 0"  @click="prev">
        上一步
      </a-button>
    </div>
  </div>
</template>
<script>
import AddForm from "@/components/addForm"
export default {
  components: {
    AddForm,
  },
  data() {
    return {
      current: 0,
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
    next() {
      this.current++;
    },
    prev() {
      this.current--;
    },
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
