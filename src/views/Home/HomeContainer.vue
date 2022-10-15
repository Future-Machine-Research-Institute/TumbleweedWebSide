<template>
  <div>
    <el-dialog class="app-descriptions-dialog" v-model="appDescriptionsVisible" title="App详情" width="85%">
      <el-descriptions :column="1">
        <el-descriptions-item label="AppId">
          <el-tag size="small">{{appItemId}}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="App名称">{{appItemName}}</el-descriptions-item>
        <el-descriptions-item label="App版本">{{appItemVersion}}</el-descriptions-item>
        <el-descriptions-item label="更新时间">{{appItemLastModifiedTime}}</el-descriptions-item>
        <el-descriptions-item label="App系统">{{appItemSystem}}</el-descriptions-item>
        <el-descriptions-item label="App进度">{{appItemProgress}}</el-descriptions-item>
      </el-descriptions>
      <el-divider class="divider" />
      <el-timeline class="app-descriptionLogs-timeline">
        <el-timeline-item v-for="descriptionLog in appItemDescriptionLogs" :timestamp="getLocalTime(descriptionLog.timeStamp)" placement="top">
          <el-card>
            <!-- <h4>Update Github template</h4> -->
            <p>{{descriptionLog.description}}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-dialog>
    <div class="main" v-loading="appListTableLoading" v-infinite-scroll="load" infinite-scroll-immediate="false">
      <el-card class="app-card" v-for="item in appListData">
        <template #header>
          <div class="app-card-header">
            <span>{{item.appName}}</span>
            <el-image class="app-card-icon" :src="item.appIcon" />
          </div>
        </template>
        <el-button class="app-card-button" @click="clickOnDownload(item.downloadLink, item.packageLink)">安装</el-button>
        <el-button class="app-card-button" @click="clickOnScanCode(item.downloadLink)">扫码</el-button>
        <el-button class="app-card-button" @click="clickOnDescriptions(item)">详情</el-button>
      </el-card>
    </div>
  </div>
</template>

<script>
    import NetApiShareInstance from '../../net/net-api'
    import { readAccount, readToken, platform, transformUTCTimeStampToLocalTime } from '../../utils/utils'
    import { errorMessageShow } from '../../utils/message-view'
    import { errorNotificationShow } from '../../utils/notification-view'
    // import { loadingViewShow, loadingViewDismiss } from '../../utils/loading-view'
    import { messageBoxShow } from '../../utils/message-box-view'
    import QrcodeVue from 'qrcode.vue'
    import Bus from '../../utils/bus'
    import {h} from 'vue'
    export default {
        components: {
          QrcodeVue
        },
        data() {
            return {
              appDescriptionsVisible: false,
              appListTableLoading: false,
              appListTableScrollLoading: false,
              appListData: [],
              obtainedCount: 0,
              appListInputSearchText: "",
              appListSelectSystemSearchText: -1,
              appListSelectProgressSearchText: -1,
              appItemId: "",
              appItemName: "",
              appItemVersion: "",
              appItemLastModifiedTime: "",
              appItemSystem: "",
              appItemProgress: "",
              appItemDescriptionLogs: []
            }
        },
        computed: {
          requiredCount() {
            const tableHeight = document.body.clientHeight - 164
            const tableWidth = document.body.clientWidth * 0.9 + 20
            // console.log("tableHeight: ", tableHeight)
            // console.log("tableWidth: ", tableWidth)
            const count = parseInt(tableHeight * tableWidth / 37500)
            console.log("count: ", count)
            return count
          },
          appListSearchObject() {
            if(this.appListInputSearchText === "") {
              if(this.appListSelectSystemSearchText === -1 && this.appListSelectProgressSearchText === -1) {
                return {}
              } else {
                if(this.appListSelectSystemSearchText === -1 && this.appListSelectProgressSearchText !== -1) {
                  return {"progress": this.appListSelectProgressSearchText}
                } else if (this.appListSelectSystemSearchText !== -1 && this.appListSelectProgressSearchText === -1) {
                  return {"system": this.appListSelectSystemSearchText}
                } else {
                  return {"progress": this.appListSelectProgressSearchText, "system": this.appListSelectSystemSearchText}
                }
              }
            } else {
              if(this.appListSelectSystemSearchText === -1 && this.appListSelectProgressSearchText === -1) {
                return {
                  $or: [
                    { "appId": this.appListInputSearchText },
                    { "appName": this.appListInputSearchText }
                  ]
                }
              } else {
                if(this.appListSelectSystemSearchText === -1 && this.appListSelectProgressSearchText !== -1) {
                  return {
                    $or: [
                      { "appId": this.appListInputSearchText, "progress": this.appListSelectProgressSearchText },
                      { "appName": this.appListInputSearchText, "progress": this.appListSelectProgressSearchText }
                    ]
                  }
                } else if (this.appListSelectSystemSearchText !== -1 && this.appListSelectProgressSearchText === -1) {
                  return {
                    $or: [
                      { "appId": this.appListInputSearchText, "system": this.appListSelectSystemSearchText },
                      { "appName": this.appListInputSearchText, "system": this.appListSelectSystemSearchText }
                    ]
                  }
                } else {
                  return {
                    $or: [
                      { "appId": this.appListInputSearchText, "progress": this.appListSelectProgressSearchText, "system": this.appListSelectSystemSearchText },
                      { "appName": this.appListInputSearchText, "progress": this.appListSelectProgressSearchText, "system": this.appListSelectSystemSearchText }
                    ]
                  }
                }
              }
            }
          }
        },
        methods: {
          clickOnDownload(downloadLink, packageLink) {
            window.open(platform() === 0 ?  downloadLink : packageLink)
          },
          clickOnScanCode(downloadLink) {
            messageBoxShow('扫描二维码以安装app', h(QrcodeVue, {value:downloadLink, size:128, level:"H"}))
          },
          clickOnDescriptions(item) {
            this.appDescriptionsVisible = true
            this.appItemId = item.appId
            this.appItemName = item.appName
            this.appItemVersion = item.version
            this.appItemLastModifiedTime = transformUTCTimeStampToLocalTime(item.lastModifiedTime)
            this.appItemSystem = item.system === 0 ? "IOS" : "Android"
            this.appItemProgress = item.progress === 0 ? "正式版" : "测试版"
            this.appItemDescriptionLogs = item.descriptionLogs
          },
          getLocalTime(timeStamp) {
            return transformUTCTimeStampToLocalTime(timeStamp)
          },
          load() {
            console.log("到底了")
            if(this.appListTableLoading === false && this.appListTableScrollLoading === false) {
              this.appListTableScrollLoading = true
              NetApiShareInstance.homeObtain(readAccount(), readToken(), this.requiredCount, this.obtainedCount, this.appListSearchObject).then((res) => {
                if (res.data.ret === 0) {
                  console.log("list: ", res.data.items)
                  console.log("finished: ", res.data.finished)
                  this.obtainedCount = this.obtainedCount + res.data.items.length
                  this.appListData.push.apply(this.appListData, res.data.items)
                  // this.isAppListLoadFinished = res.data.finished
                } else {
                  errorNotificationShow("获取app列表失败", res.data.message)
                }
                this.appListTableScrollLoading = false
              }).catch((err) => {
                errorMessageShow(err)
                this.appListTableScrollLoading = false
              })
            } else {
              errorMessageShow("正在等待加载.....")
            }
          },
          inputSearch(val) {
            this.appListInputSearchText = val
            this.clickOnSearch()
          },
          selectSearch(val) {
            this.appListSelectSystemSearchText = val.system
            this.appListSelectProgressSearchText = val.progress
            this.clickOnSearch()
          },
          clickOnSearch() {
            console.log("appListInputSearchText: ", this.appListInputSearchText)
            console.log("appListSelectSystemSearchText: ", this.appListSelectSystemSearchText)
            console.log("appListSelectProgressSearchText: ", this.appListSelectProgressSearchText)
            console.log("appListSearchObject: ", this.appListSearchObject)
            this.appListTableAllReload(this.requiredCount, 0, this.appListSearchObject)
          },
          appListTableAllReload(requiredCount, obtainedCount, searchObject) {
            if(this.appListTableLoading === false && this.appListTableScrollLoading === false) {
              this.appListTableLoading = true
              NetApiShareInstance.homeObtain(readAccount(), readToken(), requiredCount, obtainedCount, searchObject).then((res) => {
                if (res.data.ret === 0) {
                  console.log("list: ", res.data.items)
                  console.log("finished: ", res.data.finished)
                  this.obtainedCount = res.data.items.length
                  this.appListData = res.data.items
                  // this.appListData.push.apply(this.appListData, res.data.items)
                  // this.isAppListLoadFinished = res.data.finished
                } else {
                  errorNotificationShow("获取app列表失败", res.data.message)
                }
                this.appListTableLoading = false
              }).catch((err) => {
                errorMessageShow(err)
                this.appListTableLoading = false
              })
            } else {
              errorMessageShow("正在等待加载.....")
            }
          }
        },
        //生命周期 - 创建完成,访问当前this实例
        created() {
          Bus.on('inputSearch', this.inputSearch)
          Bus.on('selectSearch', this.selectSearch)
        },
        //生命周期 - 挂载完成,访问DOM元素
        mounted() {
          console.log("HomeContainer -- mounted")
          console.log("appListSearchObject: ", this.appListSearchObject)
          this.$nextTick(() => {
            this.appListTableAllReload(this.requiredCount, 0, {})
          })
        },
        unmounted() {
          Bus.off('inputSearch')
          Bus.off('selectSearch')
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

/* .item {
    width: 250px;
    height: 100px;
    background-color: white;
    border-radius: 5px;
    border: 0.2px solid lightgray;
} */

.app-descriptions-dialog {
  /* max-width: 500px; */
}

.app-descriptionLogs-timeline {
  width: 100%;
  height: 150px;
  padding: 0;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.app-descriptionLogs-timeline::-webkit-scrollbar {
    display:none;/*隐藏滚动条*/
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