<template>
    <el-select class = "language-select" v-model="languageString" placeholder="lang" @change="changeLanguage">
        <el-option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale" :label = "$t(`language.${locale}`)">{{ $t(`language.${locale}`) }}</el-option>
    </el-select>
    <el-image class = "logo-image" :src = "logoUrl" >

    </el-image>
    <el-form class = "login-form" ref = "form" :model = "form" :rules = "rules" label-position="left">
        <el-form-item class = "account-item" prop = "account">
            <el-input type = "text" :placeholder = "$t('login.accountInputTipsText')" clearable v-model = "form.account">
                <template #prefix>
                    <el-icon class = "el-input__icon"><User /></el-icon>
                </template>
            </el-input>
        </el-form-item>

        <el-form-item class = "password-item" prop = "password">
            <el-input type = "password" :placeholder = "$t('login.passwordInputTipsText')" clearable v-model = "form.password">
                <template #prefix>
                    <el-icon class = "el-input__icon"><Lock /></el-icon>
                </template>
            </el-input>
        </el-form-item>

        <el-form-item class = "enter-item">
            <el-button type = "primary" @click = "login">{{$t('login.loginButtonText')}}</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import { User,Lock } from '@element-plus/icons-vue'
    import { storeAccount, readAccount, storeToken, readToken, md5HashSync, storeLanguage, readLanguage } from '../../utils/utils'
    import NetApiShareInstance from '../../net/net-api'
    import { loadingViewShow, loadingViewDismiss } from '../../utils/loading-view'
    import { successNotificationShow, errorNotificationShow} from '../../utils/notification-view'
    import { errorMessageShow } from '../../utils/message-view'
    import { HomeView } from '../../router/router-config'

    export default {
        components: {
            User,
            Lock
        },
        data() {
            return {
                languageString: this.$t(`language.${this.$i18n.locale}`),
                logoUrl: new URL('../.././assets/logo.png', import.meta.url).href,
                form: {
                    account: "",
                    password: ""
                },
            }
        },
        computed: {
            rules() {
                return {
                    account: [
                        {
                            required: true,
                            message: this.$t('login.accountInputTipsText')
                        },
                        {
                            pattern: /^1[3456789]\d{9}$/,
                            message: this.$t('login.accountInputIllegalText')
                        }
                    ],
                    password: [
                        {
                            required: true,
                            message: this.$t('login.passwordInputTipsText')
                        },
                        {
                            pattern: /^[^@#!*$^%& ]{8,20}$/,
                            message: this.$t('login.passwordInputIllegalText')
                        }
                    ]
                }
            },
        },
        //方法
        methods: {
            changeLanguage(value) {
                if(value === readLanguage()) {
                    console.log("do not change language")
                } else {
                    storeLanguage(value)
                    this.$i18n.locale = readLanguage()
                } 
            },
            login() {
                this.$refs.form.validate((isok) => {
                    if(isok) {
                        loadingViewShow()
                        NetApiShareInstance.userLogin(this.form.account, md5HashSync(this.form.password)).then((res) => {
                            loadingViewDismiss()
                            if (res.data.ret === 0) {
                                storeAccount(this.form.account)
                                storeToken(res.data.token)
                                this.$router.push(HomeView)
                                successNotificationShow(this.$t('login.loginSuccessNotificationText'))
                            } else {
                                errorNotificationShow(this.$t('login.loginFailedNotificationText'), res.data.message)
                            }
                        }).catch((err) => {
                            loadingViewDismiss()
                            errorNotificationShow(this.$t('login.requestFailedText'), err.message)
                        })
                    } else {
                        errorMessageShow(this.$t('login.loginDataInvalidText'))
                    }
                })
            }
        },
        //生命周期 - 创建完成,访问当前this实例
        created() {
            console.log(readLanguage())
        },
        //生命周期 - 挂载完成,访问DOM元素
        mounted() {
            loadingViewShow()
            NetApiShareInstance.checkToken(readAccount(), readToken()).then((res) => {
                loadingViewDismiss()
                if(res.data.ret === 0) {
                    this.$router.push(HomeView)
                }
            }).catch((err) => {
                loadingViewDismiss()
                errorNotificationShow(this.$t('login.requestFailedText'), err.message)
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
    min-height: 280px;
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

.account-item :deep(.el-form-item__error) {
    top: 70%;
    text-align: left;
}

.password-item :deep(.el-form-item__error) {
    top: 70%;
    text-align: left;
}

.language-select {
    width: 5vw;
    min-width: 90px;
    position: absolute;
    top: 10px;
    right: 10px;
}
    
</style>