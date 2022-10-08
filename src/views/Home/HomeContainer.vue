<template>
  <div class="main" v-loading="appListTableLoading" v-infinite-scroll="load" infinite-scroll-immediate="false">
    <el-card class="app-card" v-for="item in appListData">
      <template #header>
        <div class="app-card-header">
          <span>{{item.appName}}</span>
          <el-image class="app-card-icon" :src="item.appIcon" />
        </div>
      </template>
      <el-button class="app-card-button" @click="clickOnDownload(item.downloadLink)">安装</el-button>
      <el-button class="app-card-button">扫码</el-button>
      <el-button class="app-card-button">详情</el-button>
    </el-card>
  </div>
</template>

<script>
    import NetApiShareInstance from '../../net/net-api'
    import { readAccount, readToken } from '../../utils/utils'
    import { errorMessageShow } from '../../utils/message-view'
    import { errorNotificationShow } from '../../utils/notification-view'
    // import { loadingViewShow, loadingViewDismiss } from '../../utils/loading-view'
    export default {
        data() {
            return {
              appListTableLoading: false,
              appListData: []
            }
        },
        methods: {
          clickOnDownload(url) {
            window.open(url)
          },
          load() {
            console.log("到底了")
          }
        },
        //生命周期 - 创建完成,访问当前this实例
        created() {
            
        },
        //生命周期 - 挂载完成,访问DOM元素
        mounted() {
          console.log("HomeContainer -- mounted")
          this.$nextTick(() => {
            this.appListTableLoading = true
            NetApiShareInstance.homeObtain(readAccount(), readToken(), 10, 0, {}).then((res) => {
              if (res.data.ret === 0) {
                console.log("list: ", res.data.items)
                console.log("finished: ", res.data.finished)
                // this.obtainedCount = this.obtainedCount + res.data.items.length
                this.appListData.push.apply(this.appListData, res.data.items)
                // this.isAppListLoadFinished = res.data.finished
              } else {
                errorNotificationShow("获取app列表失败", res.data.message)
              }
              this.appListTableLoading = false
            }).catch((err) => {
              errorMessageShow(err)
              this.appListTableLoading = false
            })
          })
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

.app-card :deep(.el-card__body) {
  display: flex;
  justify-content: space-evenly;
}

/* .app-card-button{
  width: 24%;
  height: 32px;
  padding: 0px;
  margin: 0;
} */
</style>