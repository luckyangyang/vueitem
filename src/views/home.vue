<template>
  <el-container>
    <!-- 头部 -->
  <el-header>
    <el-col :span="4" class="logoo">
      <img src="@/assets/logo.png" alt="">
    </el-col>
    <el-col :span="19" class="titleT">
      <span>电商管理系统</span>
    </el-col>
    <el-col :span="1">
      <a href="#" class="excc" @click="logout">退出</a>
    </el-col>
  </el-header>
  <el-container>
    <!-- 侧边栏 -->
    <el-aside width="200px">
      <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :unique-opened="true"
      :router="true">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
          <el-menu-item index="users">
            <i class="el-icon-menu"></i>
            用户管理
          </el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>权限管理</span>
        </template>
          <el-menu-item index="2-1">
            <i class="el-icon-menu"></i>
            角色列表
          </el-menu-item>
          <el-menu-item index="2-2">
            <i class="el-icon-menu"></i>
            权限列表
          </el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>商品管理</span>
        </template>
          <el-menu-item index="3-1">
            <i class="el-icon-menu"></i>
            商品列表
          </el-menu-item>
          <el-menu-item index="3-2">
            <i class="el-icon-menu"></i>
            分类参数
          </el-menu-item>
          <el-menu-item index="3-3">
            <i class="el-icon-menu"></i>
            商品分类
          </el-menu-item>
      </el-submenu>
    </el-menu>
    </el-aside>
    <!-- 内容区 -->
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  beforeCreate() {
    const token = sessionStorage.getItem('token');
    console.log(token);

    if (token === null) {
      this.$message.warning('请登录');
      this.$router.push('/login');
    }
  },
  methods: {
    // 退出时清除sessionStorage
    logout: function() {
      // alert(1)
      sessionStorage.clear();
      this.$router.push('/login');
    }
  }
};
// ........................................新几家
</script>

<style>
   .logoo{
     text-align: center;
   }
   .excc{
     color: blue;
   }
   .titleT{
     text-align: center;
     color: #fff;
     font-size: 20px;
   }
   .el-header{
     padding: 0;
   }
   .el-container {
     height: 100%;
   }
   .el-header {
    background-color: #B3C0D1;
    color: #333;
    /* text-align: center; */
    line-height: 60px;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    /* text-align: center; */
    line-height: 200px;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    /* text-align: center; */
    /* line-height: 160px; */
  }
  .el-menu-vertical-demo{
    height: 100%;
  }
</style>
