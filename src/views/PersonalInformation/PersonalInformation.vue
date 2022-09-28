<template>
    <el-page-header class = "head" :title="$t('personalInformation.backButtonText')" :content="$t('personalInformation.titleText')" @back="goBack" >
        <template #icon>
            <el-icon><arrow-left /></el-icon>
        </template>
    </el-page-header>
    <el-divider class = "divider" />
    <div class="container">
        <div class="user-information">
            <div class="user-name">{{userName}}</div>
            <div class="user-permission">{{userPermission}}</div>
        </div>
        <el-divider class = "container-divider" direction="vertical"/>
        <el-avatar class = "user-avatar" :src="userAvatar"></el-avatar>
    </div>
    <el-divider class = "bottom-divider"/>
</template>

<script>
    import { ArrowLeft} from '@element-plus/icons-vue'
    import NetApiShareInstance from '../../net/net-api'
    import { loadingViewShow, loadingViewDismiss } from '../../utils/loading-view'
    import { readAccount, readToken } from '../../utils/utils'
    import { errorMessageShow } from '../../utils/message-view'
    export default {
        components: {
            ArrowLeft
        },
        data() {
            return {
                userName: "",
                userPermission: "",
                userAvatar: ""
            }
        },
        //方法
        methods: {
            goBack() {
                this.$router.back()
            },
            getPermission(permission) {
                switch (permission) {
                    case 0:
                        return this.$t('personalInformation.administratorPermissionText')
                    case 1:
                        return this.$t('personalInformation.testerPermissionText')
                    case 2:
                        return this.$t('personalInformation.experiencerPermissionText')
                    default:
                        return this.$t('personalInformation.experiencerPermissionText')
                }
            }
        },
        //生命周期 - 创建完成,访问当前this实例
        created() {
            
        },
        //生命周期 - 挂载完成,访问DOM元素
        mounted() {
            loadingViewShow()
            NetApiShareInstance.userInformation(readAccount(), readToken()).then((res) => {
                loadingViewDismiss()
                if (res.data.ret === 0) {
                    this.userName = res.data.information.name 
                    this.userPermission = this.getPermission(res.data.information.permission)
                    this.userAvatar = res.data.information.avatar
                } else {
                    errorMessageShow(res.data.message)
                }
            }).catch((err) => {
                loadingViewDismiss()
                errorMessageShow(err)
            })
        },
        unmounted() {
          console.log("PersonalInformation -- delloc")
        }
    }
</script>

<style scoped>
/* @import url(); 引入css类 */

.head {
    height: 64px;
    align-items: center;
}

.divider {
    margin: 0px;
}

.container {
    width: 80vw;
    height: 80px;
    margin: 20px auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: white;
    border-radius: 5px;
}

.container-divider {
    width: 2px;
    height: 80%;
    margin: 0;
}

.bottom-divider {
    width: 80vw;
    margin: 0 auto;
}

.user-information {
    /* width: 80px; */
    height: 40px;
    margin: 10px;
}

.user-avatar {
    width: 40px;
    height: 40px;
    display: block;
    margin: 10px;
}

.user-name {
    height: 60%;
    font-weight: bold;
}

.user-permission {
    height: 40%;
    color: gray;
}

</style>