<template>
    <el-image class = "logo-image" :src = "logoUrl" >

    </el-image>
    <el-form class = "login-form" ref = "form" :model = "form" :rules = "rules">
        <el-form-item class = "account-item" prop = "account">
            <el-input type = "text" placeholder = "请输入账号" clearable v-model = "form.account">
                <template #prefix>
                    <el-icon class = "el-input__icon"><User /></el-icon>
                </template>
            </el-input>
        </el-form-item>

        <el-form-item class = "password-item" prop = "password">
            <el-input type = "password" placeholder = "请输入密码" clearable v-model = "form.password">
                <template #prefix>
                    <el-icon class = "el-input__icon"><Lock /></el-icon>
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
    import { storeAccount, readAccount, removeAccount, storeTokenKey, readTokenKey, removeTokenKey, md5HashSync } from '../../utils/utils'
    import NetApiShareInstance from '../../net/net-api'
    import { loadingViewShow, loadingViewDismiss } from '../../utils/loading-view'
    import { successNotificationShow, errorNotificationShow} from '../../utils/notification-view'
    // import router from '../router/router'

    export default {
        components: {
            User,
            Lock
        },
        data() {
            return {
                logoUrl: new URL('../.././assets/logo.png', import.meta.url).href,
                form: {
                    account: "",
                    password: ""
                },
                rules: {
                    account: [
                        {
                            required: true,
                            message: "请输入账号"
                        },
                        {
                            pattern: /^1[3456789]\d{9}$/,
                            message: "请输入正确的手机号"
                        }
                    ],
                    password: [
                        {
                            required: true,
                            message: "请输入密码"
                        },
                        {
                            pattern: /^[^@#!*$^%& ]{8,20}$/,
                            message: "密码长度必须在8-20位以内, 且不能包含特殊字符和空格号"
                        }
                    ]
                }
            }
        },
        //方法
        methods: {
            login() {
                this.$refs.form.validate((isok) => {
                    if(isok) {
                        loadingViewShow()
                        NetApiShareInstance.userLogin(this.form.account, md5HashSync(this.form.password)).then((res) => {
                            loadingViewDismiss()
                            if (res.data.ret === 0) {
                                storeAccount(this.form.account)
                                storeTokenKey(res.data.token)
                                this.$router.push('/home')
                                successNotificationShow("登录成功")
                            } else {
                                errorNotificationShow("登录失败", res.data.message)
                            }
                        }).catch((err) => {
                            loadingViewDismiss()
                            errorNotificationShow("请求失败", err.message)
                        })
                    } else {
                        alert("数据不合法！")
                    }
                })
            }
        },
        //生命周期 - 创建完成,访问当前this实例
        created() {
            
        },
        //生命周期 - 挂载完成,访问DOM元素
        mounted() {
            loadingViewShow()
            NetApiShareInstance.checkToken(readAccount(), readTokenKey()).then((res) => {
                loadingViewDismiss()
                if(res.data.ret === 0) {
                    this.$router.push('/home')
                }
            }).catch((err) => {
                loadingViewDismiss()
                errorNotificationShow("请求失败", err.message)
            })
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
    min-width: 280px;
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