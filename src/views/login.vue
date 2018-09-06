<template>
    <div class="login-wrap">
        <!-- :label-positionx表单域标签位置属性 -->
        <el-form
        class="login-box"
        label-position="top"
        label-width="80px">
        <h2>用户登录</h2>
            <el-form-item label="用户名">
                <el-input></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="btn">主要按钮</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {

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
