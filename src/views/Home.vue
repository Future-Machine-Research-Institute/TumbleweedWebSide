<template>

    <div class = "container">
        <div class = "item">1</div>
        <div class = "item">2</div>
        <div class = "item">3</div>
        <div class = "item">4</div>
        <div class = "item">5</div>
        <div class = "item">6</div>
        <div class = "item">7</div>
        <div class = "item">8</div>
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

.container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    /* justify-content: space-around; */
    /* align-content: baseline; */
}

/* .container:after {
    content: "";
    width: 200px;
    height: 0px;
    visibility: hidden;
} */

.item {
    width: 200px;
    height: 200px;
    margin: 15px 10px 0 0;
    background-color: bisque;
}

    
</style>