<template>
    <div class = "main">
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

.main {
    width: 90vw;
    height: calc(100vh - 164px);
    margin: 0 auto;
    background-color: white;
    display: grid;
    justify-content: space-evenly;
    grid-template-columns: repeat(auto-fill, 250px);
    grid-template-rows: repeat(auto-fill, 100px);
    grid-gap: 20px;
    gap: 20px;
    overflow: auto;
    padding-top: 25px;
    padding-bottom: 25px;
    padding-left: 10px;
    padding-right: 10px;
    
    -ms-overflow-style: none;
    scrollbar-width: none;

    border-radius: 5px;
}

.main::-webkit-scrollbar {
    display:none;/*隐藏滚动条*/
 }

.item {
    width: 250px;
    height: 100px;
    /* background-color: bisque; */
    background-color: white;
    border-radius: 5px;
    border: 0.2px solid lightgray;
    /* box-shadow: 0 0 30px #DCDFE6; */
}
    
</style>