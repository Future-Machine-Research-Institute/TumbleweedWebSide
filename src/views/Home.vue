<template>
    <div class = "head"></div>
    <div class = "container">
        <div class = "item">1</div>
        <div class = "item">2</div>
        <div class = "item">3</div>
        <div class = "item">4</div>
        <div class = "item">5</div>
        <div class = "item">6</div>
        <div class = "item">7</div>
        <div class = "item">8</div>
        <div class = "item">9</div>
        <div class = "item">10</div>
    </div>
    
</template>

<script>
    export default {
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
    background-color: cornflowerblue;
}

.container {
    width: 100vw;
    height: calc(100vh - 104px);
    /* background-color: black; */
    display: grid;
    justify-content: space-evenly;
    grid-template-columns: repeat(auto-fill, 250px);
    grid-template-rows: repeat(auto-fill, 250px);
    grid-gap: 20px;
    gap: 20px;
    /* overflow: auto; */
    padding-top: 20px;
    padding-bottom: 20px;
}

.item {
    width: 250px;
    height: 250px;
    background-color: bisque;
}

    
</style>