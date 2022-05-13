<template>
    <home-head class = "head"></home-head>
    <home-filter class = "filter"></home-filter>
    <home-container class = "container"></home-container>
</template>

<script>
    import HomeHead from "./HomeHead.vue"
    import HomeFilter from "./HomeFilter.vue"
    import HomeContainer from "./HomeContainer.vue"
    export default {
        components: {
            HomeHead,
            HomeFilter,
            HomeContainer
        },
        data() {
            return {
                
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

.head {
    width: 100vw;
    height: 64px;
    /* background-color: cornflowerblue; */
    /* background-color: rgb(236, 236, 236); */
}

.filter {
    width: calc(90vw + 20px);
    height: 50px;
    margin-left: calc(5vw - 10px);
    /* background-color: lightgrey; */

}

.container {
    width: 90vw;
    height: calc(100vh - 164px);
}
    
</style>