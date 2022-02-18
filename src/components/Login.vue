<template>
    <el-image class = "logo-image" :src = "logoUrl" >

    </el-image>
    <el-form class = "login-form">
            <!-- <el-form-item class = "login-item">
                <el-image></el-image>    
            </el-form-item> -->
        <el-form-item class = "account-item">
            <el-input type = "text" placeholder = "请输入账号" :prefix-icon = "User" clearable = "true" v-model = "form.account">
                <template #prefix>
                    <el-icon class = "el-input__icon"><user /></el-icon>
                </template>
            </el-input>
        </el-form-item>

        <el-form-item class = "password-item">
            <el-input type = "password" placeholder = "请输入密码" :prefix-icon = "Lock" clearable = "true" v-model = "form.password">
                <template #prefix>
                    <el-icon class = "el-input__icon"><lock /></el-icon>
                </template>
            </el-input>
        </el-form-item>

        <el-form-item class = "enter-item">
            <el-button type = "primary">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import { User,Lock } from '@element-plus/icons-vue'
    
    export default {
        components: {
            User,
            Lock
        },
        data() {
            return {
                logoUrl: new URL('.././assets/logo.png', import.meta.url).href,
                form: {
                    account: "",
                    password: ""
                }
            }
        },
        //生命周期 - 创建完成,访问当前this实例
        created() {
            
        },
        //生命周期 - 挂载完成,访问DOM元素
        mounted() {
            
        }
    }
</script>

<style scoped>
/* @import url(); 引入css类 */

html,body{
  width: 100%;
  height: 100%;
  margin: auto;
  box-sizing: border-box;
}

.logo-image {
    width: 200px;
    height: 200px;
    position: absolute;
    top: 10%;
    left: calc((100% - 200px) / 2.0);
}

.login-form {
    width: 20%;
    height: 30%;
    position: absolute;
    top: calc(10% + 200px);
    left: 40%;
    /* padding: 20px; */
    /* border: 0.2px solid lightgray;
    border-radius: 5px;
    box-shadow: 0 0 30px #DCDFE6; */
}

.account-item {
    width: 100%;
    height: 30%;
    margin-bottom: 0px;
}

.account-item :deep(.el-form-item__label) {
    display: flex;
    justify-content: center;
    align-items: center;
}

.password-item {
    width: 100%;
    height: 30%;
    margin-bottom: 0px;
}

.password-item :deep(.el-form-item__label) {
    display: flex;
    justify-content: center;
    align-items: center;
}

.enter-item {
    width: 100%;
    height: 30%;
    margin-bottom: 0px;
}

.enter-item :deep(.el-form-item__content) {
    display: flex;
    justify-content: center;
    align-items: center;
}

.enter-item :deep(.el-button) {
    font-size: 16px;
    width: 100%;
}
    
</style>