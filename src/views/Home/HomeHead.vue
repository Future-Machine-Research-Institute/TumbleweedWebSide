<template>
    <div>
        <el-image class = "logo-image" :src = "logoUrl" ></el-image>
        <el-input class = "search-input" type = "text" v-model = "searchString" >
            <template #prefix>
                <el-icon class = "el-input__icon" :size = "20" ><search /></el-icon>
            </template>
        </el-input>
        <el-button class = "search-button" >搜索</el-button>
        <el-dropdown class = "avatar-container">
        <el-avatar class = "user-avatar" ></el-avatar>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click = "clickOnPersonalInformation">个人信息</el-dropdown-item>
            <el-dropdown-item divided @click = "clickOnAppManagement">app管理</el-dropdown-item>
            <el-dropdown-item divided v-if="showUserManagement" @click = "clickOnUserManagement">用户管理</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
</template>

<script>
    import { UserFilled, Search } from '@element-plus/icons-vue'
    export default {
        components: {
            UserFilled,
            Search
        },
        data() {
            return {
                searchString: "",
                logoUrl: new URL('../.././assets/homeLogo.png', import.meta.url).href,
                showUserManagement: true
            }
        },
        methods: {

            clickOnPersonalInformation() {
                this.$router.push('/personalInformation')
            },

            clickOnAppManagement() {
                this.$router.push('/appManagement')
            },

            clickOnUserManagement() {
                this.$router.push('/userManagement')
            }

        },
        //生命周期 - 创建完成,访问当前this实例
        created() {
            // this.showUserManagement = true
        },
        //生命周期 - 挂载完成,访问DOM元素
        mounted() {
            
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