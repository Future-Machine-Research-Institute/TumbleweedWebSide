<template>
    <div class="main" v-scroll="load">
      <el-card class="app-card" v-for="item in appListData">
        <template #header>
          <div class="app-card-header">
            <span>Tumblew</span>
            <el-image class="app-card-icon"/>
          </div>
        </template>
        <el-button>安装</el-button>
        <el-button>扫码</el-button>
        <el-button>详情</el-button>
      </el-card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                appListData: [
                  "Tumblew",
                  "Tumblew",
                  "Tumblew",
                  "Tumblew",
                  "Tumblew",
                  "Tumblew",
                  "Tumblew",
                  "Tumblew",
                  "Tumblew",
                  "Tumblew",
                  "Tumblew",
                  "Tumblew",
                  "Tumblew",
                  "Tumblew",
                  "Tumblew",
                  "Tumblew",
                  "Tumblew",
                  "Tumblew",
                  "Tumblew",
                  "Tumblew",
                  "Tumblew",
                  "Tumblew",
                  "Tumblew",
                  "Tumblew"
                ]
            }
        },
        directives: {
          'scroll': {
            beforeMount(el, binding) {
              // const bodyWrap = el.querySelector('.app-card')
              const bodyWrap = el
              const scrollWrapDom = el
              // console.log(el.scrollTop)
              let sign = 0
              let before = 0
              bodyWrap.addEventListener('scroll', (event) => {
                console.log("scrollTop: ", scrollWrapDom.scrollTop)
                //排除左右滚动的情况
                if(scrollWrapDom.scrollTop !== before) {
                  if(scrollWrapDom.scrollTop !== 0) {
                    const scrollDistance = scrollWrapDom.scrollHeight - scrollWrapDom.scrollTop - scrollWrapDom.clientHeight
                  if (scrollDistance <= sign) {
                    binding.value()
                  }
                  before = scrollWrapDom.scrollTop
                  }
                }
              }, true)
            }
          }
        },
        methods: {
          load() {
            console.log("到底了")
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
    width: 100%;
    height: 100%;
    background-color: white;
    display: grid;
    justify-content: space-evenly;
    grid-template-columns: repeat(auto-fill, 250px);
    grid-template-rows: repeat(auto-fill, 150px);
    grid-gap: 20px;
    gap: 20px;
    overflow: auto;
    padding-top: 25px;
    padding-bottom: 25px;
    
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

.app-card {
  width: 250px;
  height: 150px;
}

.app-card-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.app-card-icon {
  width: 40px;
  height: 40px;
  background-color: black;
}

</style>