<template>
    <div>
        <el-image class = "logo-image" :src = "logoUrl" ></el-image>
        <el-input class = "search-input" type = "text" v-model = "searchString" placeholder="请输入App名称或者AppId以搜索">
            <template #prefix>
                <el-icon class = "el-input__icon" :size = "20" ><search /></el-icon>
            </template>
        </el-input>
        <el-button class = "search-button" @click="clickOnSearch">搜索</el-button>
        <el-dropdown class = "avatar-container">
        <el-avatar class = "user-avatar" :src="userAvatar"></el-avatar>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click = "clickOnPersonalInformation">个人信息</el-dropdown-item>
            <el-dropdown-item divided v-if="showAppManagement" @click = "clickOnAppManagement">app管理</el-dropdown-item>
            <el-dropdown-item divided v-if="showUserManagement" @click = "clickOnUserManagement">用户管理</el-dropdown-item>
            <el-dropdown-item divided @click = "clickOnLogOut">退出账号</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
</template>

<script>
    import { UserFilled, Search } from '@element-plus/icons-vue'
    import NetApiShareInstance from '../../net/net-api'
    import { readAccount, readToken, removeAccount, removeToken } from '../../utils/utils'
    import { errorMessageShow } from '../../utils/message-view'
    import { errorNotificationShow} from '../../utils/notification-view'
    import { LoginView, PersonalInformationView, AppManagementView, UserManagementView } from '../../router/router-config'
    import Bus from '../../utils/bus'
    export default {
        components: {
            UserFilled,
            Search
        },
        data() {
            return {
                searchString: "",
                userAvatar: "",
                logoUrl: new URL('../.././assets/homeLogo.png', import.meta.url).href,
                showAppManagement: false,
                showUserManagement: false
            }
        },
        methods: {
            //搜索输入框失去焦点时要不要搜索待斟酌
            clickOnSearch() {
                Bus.emit('inputSearch', this.searchString)
            },

            clickOnPersonalInformation() {
                this.$router.push(PersonalInformationView)
            },

            clickOnAppManagement() {
                this.$router.push(AppManagementView)
            },

            clickOnUserManagement() {
                this.$router.push(UserManagementView)
            },

            clickOnLogOut() {
                removeAccount()
                removeToken()
                this.$router.push(LoginView)
            }

        },
        //生命周期 - 创建完成,访问当前this实例
        created() {
            // this.showUserManagement = true
        },
        //生命周期 - 挂载完成,访问DOM元素
        mounted() {
            console.log("HomeHead -- mounted")
            NetApiShareInstance.userInformation(readAccount(), readToken()).then((res) => {
                if (res.data.ret === 0) {
                    this.userAvatar = res.data.information.avatar
                    if(res.data.information.permission == 0) {
                        this.showAppManagement = true
                        this.showUserManagement = true
                    } else if(res.data.information.permission == 1) {
                        this.showAppManagement = true
                        this.showUserManagement = false
                    } else {
                        this.showAppManagement = false
                        this.showUserManagement = false
                    }
                } else {
                    errorNotificationShow("获取个人信息失败", res.data.message)
                }
            }).catch((err) => {
                errorMessageShow(err)
            })
        }
    }
</script>

<style scoped>
/* @import url(); 引入css类 */

/* .container {
    
} */

.logo-image {
    width: 44px;
    height: 44px;
    display: block;
    float: left;
    position: absolute;
    top: 10px;
    left: 10px;
}

.search-input {
    width: 25%;
    height: 40px;
    position: absolute;
    top: 12px;
    left: 84px;
}

/* .search-input :deep(.el-input__inner) {
    height: 40px;
    border: 0.2px solid lightgray;
    border-radius: 20px;
} */

.search-button {
    width: 5%;
    height: 40px;
    display: block;
    position: absolute;
    top: 12px;
    left: calc(25% + 94px);
    min-width: 60px;
    color: white;
    background-color: #409EFF;
}

.avatar-container{
    width: 40px;
    height: 40px;
    display: block;
    position: absolute;
    top: 12px;
    right: 15px;
}

.user-avatar {
    width: 40px;
    height: 40px;
    display: block;
    /* position: absolute;
    top: 12px;
    right: 15px; */
}
    
</style>