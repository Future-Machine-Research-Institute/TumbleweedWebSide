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
            <el-button type = "primary" @click = "login">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import { User,Lock } from '@element-plus/icons-vue'
    // import router from '../router/router'
    import EDCryptionShareInstance from '@future-machine-research-institute/jsbasetools/edcryption'

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
        //方法
        methods: {
            login() {
                const saltRounds = 10
                const myPlaintextPassword = 's0/\/\P4$$w0rD'
                const someOtherPlaintextPassword = 'not_bacon'
                let result = EDCryptionShareInstance.bcryptHashSync(myPlaintextPassword, saltRounds)
                let isSame = EDCryptionShareInstance.bcryptCompareSync(someOtherPlaintextPassword, result)
                if(isSame) {
                    this.$router.push('/home')
                } else {

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
    width: 10vw;
    height: 10vw;
    display: block;
    position: relative;
    top: 15vh;
    margin: 0 auto;
    min-width: 150px;
    min-height: 150px;
}

.login-form {
    width: 20vw;
    height: 30vh;
    position: relative;
    top: 15vh;
    margin: 0 auto;
    min-width: 307px;
    min-height: 260px;
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