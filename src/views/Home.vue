<template>
    <!-- <div class = "head"></div> -->
    <home-head class = "head"></home-head>
    <!-- <div class = "filter-bar"></div> -->
    <home-filter class = "filter-bar"></home-filter>
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
    import HomeHead from "./HomeHead.vue"
    import HomeFilter from "./HomeFilter.vue"
    export default {
        components:{
            HomeHead,
            HomeFilter
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

.filter-bar {
    width: 100vw;
    height: 50px;
    /* background-color: lightgrey; */

}

.container {
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

    /* border: 0.2px solid lightgray; */
    border-radius: 5px;
}

.container::-webkit-scrollbar {
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