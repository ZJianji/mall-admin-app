<template>
  <div class="login-container">
    <a-form-model
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      v-bind="layout"
    >
      <a-form-model-item has-feedback label="邮箱" prop="email">
        <a-input v-model="ruleForm.email" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="密码" prop="password">
        <a-input v-model="ruleForm.password" type="password" autocomplete="off" />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="submitForm('ruleForm')">
          提交
        </a-button>
        <a-button style="margin-left: 10px" @click="resetForm('ruleForm')">
          取消
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>

import api from '@/api/user';
export default {
  data() {
    let emailReg = /^[\w-]+@[\w.-]+.com$/;
    let validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱！"));
      }
      if (emailReg.test(value)) {
        //   this.$refs.ruleForm.validateField('checkPass');
        return callback();
      } else {
        return callback(new Error("邮箱格式错误！"));
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码！"));
      } else {
        return callback();
      }
    };
    return {
      ruleForm: {
        password: "",
        email: "",
      },
      rules: {
        password: [{ validator: validatePass, trigger: "change" }],
        email: [{ validator: validateEmail, trigger: "change" }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api.login(this.ruleForm).then((data) => {
            console.log(data);
            this.$store.dispatch('setUserName',data);
            this.$router.push({
              name: 'Home'
            });
          }).catch((error) => {
            this.$message.error(error);
          })
        } else {
          console.log("提交失败!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped lang='less'>
.login-container {
  .ant-form {
    width: 400px;
    margin: 100px auto;
  } 
}

</style>
