<template>
    <el-page-header class = "head" :title="$t('appManagement.backButtonText')" :content="$t('appManagement.titleText')" @back="goBack" >
        <template #icon>
            <el-icon><arrow-left /></el-icon>
        </template>
    </el-page-header>
    <el-divider class = "divider" />
    <app-management-container></app-management-container>
</template>

<script>
    import { ArrowLeft } from '@element-plus/icons-vue'
    import AppManagementContainer from './AppManagementContainer.vue'
    export default {
        components: {
            ArrowLeft,
            AppManagementContainer
        },
        data() {
            return {
                
            }
        },
        //方法
        methods: {
            goBack() {
                this.$router.back()
            }
        },
        //生命周期 - 创建完成,访问当前this实例
        created() {
            
        },
        //生命周期 - 挂载完成,访问DOM元素
        mounted() {
            
        },
        unmounted() {
          console.log("AppManager -- delloc")
        }
    }
</script>

<style scoped>
/* @import url(); 引入css类 */

.head {
    height: 64px;
    /* background-color: white; */
    display: flex;
    align-items: center;
}

.divider {
    margin: 0px;
}
    
</style>