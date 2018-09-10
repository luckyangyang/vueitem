<template>
    <div class="login-wrap">
        <!-- :label-positionx表单域标签位置属性 -->
        <el-form
        :model="fromData"
        class="login-box"
        label-position="top"
        label-width="80px">
        <h2>用户登录</h2>
            <el-form-item label="用户名">
                <el-input v-model="fromData.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="fromData.password" type="password" @keyup.enter.native="handleLogin"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="btn" @click="handleLogin">主要按钮</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
// 点击获取绑定的数据
// 查看接口文档
// 发布请求
// 成功则跳转 不成功给提示信息
export default {
  data() {
    return {
      fromData: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    async handleLogin() {
      const response = await this.$http.post('login', this.fromData);
      console.log(response);
      const {meta: {msg, status}} = response.data;
      //   console.log(msg);
      //   console.log(status);
      if (status === 200) {
        this.$message.success(msg);
        //   设置token
        sessionStorage.setItem('token', response.data.data.token);
        this.$router.push('/');
      } else {
        this.$message.error(msg);
      };
      // .then((response) => {

      // })
      // .catch((err) => {
      //   this.$message.error(err);
      // });
    }
  }
};
</script>

<style>
    .login-wrap{
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgb(49, 64, 82);
        height: 100%;
    }
    .login-box{
        width: 500px;
        padding: 5px 30px;
        background-color: #fff;
        border-radius:15px;
    }
    .btn{
        width: 100%;
    }
</style>
