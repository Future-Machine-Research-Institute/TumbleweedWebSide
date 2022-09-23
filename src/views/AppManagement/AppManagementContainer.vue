<template>
  <div class="main">

    <el-dialog v-model="uploadPackageDialogVisible" title="App包上传" width="100%" top="0px">
      <!-- <Transition name="fade"></Transition> -->
      <div v-if="isShowUploadProgress" class="upload-progress-container">
        <el-progress class="upload-progress" type="circle" :percentage="uploadPercentage" />
      </div>
      <div class="upload-dialog-body">
        <el-form class="upload-dialog-form" ref = "uploadPackageForm" :model = "uploadPackageForm" :rules = "uploadPackageRules">
          <el-form-item label="App文件" prop = "fileName">
            <el-input v-model="uploadPackageForm.fileName" autocomplete="off" type="file" ref="uploadFileSelectInput" accept=".apk,.ipa" @change="uploadFileSelect" />
          </el-form-item>
          <el-form-item label="App名称" prop = "appName">
            <el-input v-model="uploadPackageForm.appName" />
          </el-form-item>
          <el-form-item label="App版本" prop = "appVersion">
            <el-input v-model="uploadPackageForm.appVersion" />
          </el-form-item>
          <el-form-item label="App系统" prop = "appSystem">
            <el-radio-group v-model="uploadPackageForm.appSystem" disabled>
              <el-radio :label="0">IOS</el-radio>
              <el-radio :label="1">Android</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="App进度" prop = "appProgress">
            <el-radio-group v-model="uploadPackageForm.appProgress">
              <el-radio-button :label="0">正式版</el-radio-button>
              <el-radio-button :label="1">测试版</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="App描述" prop = "appDescription">
            <el-input v-model="uploadPackageForm.appDescription" maxlength="30" show-word-limit type="textarea"/>
          </el-form-item>
        </el-form>
      </div>
      
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="uploadPackageDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="uploadPackage">上传</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog v-model="updatePackageDialogVisible" title="App包更新" width="100%" top="0px">
      <div v-if="isShowUpdateProgress" class="update-progress-container">
        <el-progress class="update-progress" type="circle" :percentage="updatePercentage" />
      </div>
      <div class="update-dialog-body">
        <el-form class="update-dialog-form" ref = "updatePackageForm" :model = "updatePackageForm" :rules = "updatePackageRules">
          <el-form-item label="AppId" prop = "appId">
            <el-input v-model="updatePackageForm.appId" disabled/>
          </el-form-item>
          <el-form-item label="App文件" prop = "fileName">
            <el-input v-model="updatePackageForm.fileName" autocomplete="off" type="file" ref="updateFileSelectInput" accept=".apk,.ipa" @change="updateFileSelect" />
          </el-form-item>
          <el-form-item label="App名称" prop = "appName">
            <el-input v-model="updatePackageForm.appName" />
          </el-form-item>
          <el-form-item label="App版本" prop = "appVersion">
            <el-input v-model="updatePackageForm.appVersion" />
          </el-form-item>
          <el-form-item label="App系统" prop = "appSystem">
            <el-radio-group v-model="updatePackageForm.appSystem" disabled>
              <el-radio :label="0">IOS</el-radio>
              <el-radio :label="1">Android</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="App进度" prop = "appProgress">
            <el-radio-group v-model="updatePackageForm.appProgress">
              <el-radio-button :label="0">正式版</el-radio-button>
              <el-radio-button :label="1">测试版</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="App描述" prop = "appDescription">
            <el-input v-model="updatePackageForm.appDescription" maxlength="30" show-word-limit type="textarea"/>
          </el-form-item>
        </el-form>
      </div>
      
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="updatePackageDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="updatePackage">更新</el-button>
        </span>
      </template>
    </el-dialog>

    <el-table class="container" @selection-change="appListTableSelectionChange" id="appListTable" ref="appListTable" v-scroll="appListTableScrollToBottom" :data="appListTableData" max-height="calc(100vh - 400px)" :row-style="{height: '60px'}" v-loading="appListTableLoading">
      <el-table-column type="selection" align = "center"/>
      <el-table-column fixed label="图标" align = "center">
        <template #default="scope">
          <el-image style="width: 60px; height: 60px; margin: 0 auto;" :src = "scope.row.appIcon" :preview-src-list="[scope.row.appIcon]" :preview-teleported="true"/>
        </template>
      </el-table-column>
      <el-table-column prop="appId" label="AppID" align = "center"/>
      <el-table-column prop="appName" label="名称" align = "center"/>
      <el-table-column prop="version" label="版本" align = "center"/>
      <el-table-column label="上传时间" align = "center">
        <template #default="scope">
          <span>{{ getLocalTime(scope.row.uploadTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="uploadAccount" label="上传者" align = "center"/>
      <el-table-column fixed="right" label="Operations" align = "center">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="updatePackageDialog(scope.row)">更新</el-button>
        </template>
      </el-table-column>
      <!-- <template #append>
        <div class="scroll-loading" v-loading="appListTableScrollLoading" style="width: 100%; height: 35px; margin: 0 auto;"></div>
      </template> -->
    </el-table>

    <el-input class="search-input" type="text" v-model="inputSearchString">
      <template #prepend>
        <el-select v-model="inputSelectString" placeholder="Select" style="width: 100px">
          <el-option label="App名称" value="appName" />
          <el-option label="AppID" value="appId" />
          <el-option label="上传者" value="uploadAccount" />
        </el-select>
      </template>
      <template #append>
        <el-button @click="searchAppList">
          <el-icon>
            <Search />
          </el-icon>
        </el-button>
      </template>
    </el-input>


    <el-button class="upload-button" @click="uploadPackageDialogVisible = true">上传</el-button>
    <el-button class="delete-button" @click="deletePackage">删除</el-button>


  </div>
</template>

<script>
  import { Search } from '@element-plus/icons-vue'
  import { readPkgInfo } from '../../third-party/app-package-parser'
  import { errorMessageShow } from '../../utils/message-view'
  import { md5FromFile, getUTCTimeStamp, transformUTCTimeStampToLocalTime, readAccount, readToken } from '../../utils/utils'
  import NetApiShareInstance from '../../net/net-api'
  import { errorNotificationShow, successNotificationShow } from '../../utils/notification-view'
  import { parseInt } from 'lodash'

  // import { loadingViewShow, loadingViewDismiss} from '../../utils/loading-view'

    export default {
        components: {
            Search
        },
        data() {
            return {
              isShowUploadProgress: false,
              isShowUpdateProgress: false,
              uploadPercentage: 0,
              updatePercentage: 0,
              uploadPackageDialogVisible: false,
              updatePackageDialogVisible: false,
              uploadPackageForm: {
                fileName: "",
                appName: "",
                appVersion: "",
                appSystem: null,
                appProgress: null,
                appDescription: "",
                appIcon: ""
              },
              updatePackageForm: {
                appId: "",
                fileName: "",
                appName: "",
                appVersion: "",
                appSystem: null,
                appProgress: null,
                appDescription: "",
                appIcon: ""
              },
              inputSearchString: "",
              scrollLoadingSearchObject: {},
              inputSelectString: "",
              appListTableLoading: false,
              appListTableScrollLoading: false,
              isAppListLoadFinished: false,
              obtainedCount: 0,
              appListTableData:[],
              appListTableSelectionData: [],
              appUpdatePackageData:null
            }
        },
        directives: {
          'scroll': {
            beforeMount(el, binding) {
              const bodyWrap = el.querySelector('.el-table__body-wrapper')
              const scrollWrapDom = bodyWrap.querySelector('.el-scrollbar__wrap')
              let sign = 0
              let before = 0
              bodyWrap.addEventListener('scroll', (event) => {
                console.log("scrollTop: ", scrollWrapDom.scrollTop)
                // console.log("scrollHeight: ", scrollWrapDom.scrollHeight)
                // console.log("clientHeight: ", scrollWrapDom.clientHeight)
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
        computed: {
          requiredCount() {
            const tableHeight = document.body.clientHeight - 400
            console.log("tableHeight: ", tableHeight)
            const count = parseInt(tableHeight / 84) + 1
            console.log("count: ", count)
            return count
          },
          uploadPackageRules() {
            return {
              fileName: [
                {
                  required: true,
                  message: "上传的文件不能为空"
                },
              ],
              appName: [
                {
                  required: true,
                  message: "App名称不能为空"
                }
              ],
              appVersion: [
                {
                  required: true,
                  message: "App版本不能为空"
                }
              ],
              appSystem: [
                {
                  required: true,
                  message: "App系统未选择"
                }
              ],
              appProgress: [
                {
                  required: true,
                  message: "App进度未选择"
                }
              ],
              appDescription: [
                {
                  required: true,
                  message: "App描述不能为空"
                }
              ],
            }
          },
          updatePackageRules() {
            return {
              appId: [
                {
                  required: true,
                  message: "AppId不能为空"
                },
              ],
              fileName: [
                {
                  required: true,
                  message: "上传的文件不能为空"
                },
              ],
              appName: [
                {
                  required: true,
                  message: "App名称不能为空"
                }
              ],
              appVersion: [
                {
                  required: true,
                  message: "App版本不能为空"
                }
              ],
              appSystem: [
                {
                  required: true,
                  message: "App系统未选择"
                }
              ],
              appProgress: [
                {
                  required: true,
                  message: "App进度未选择"
                }
              ],
              appDescription: [
                {
                  required: true,
                  message: "App描述不能为空"
                }
              ],
            }
          }
        },
        //方法
        methods: {
            async uploadFileSelect() {
              try {
                //IOS = 0 正式版 = 0
                const file = this.$refs.uploadFileSelectInput.input.files[0]
                if(file) {
                  const extension = file.name.substr(file.name.lastIndexOf(".") + 1)
                  let apkInfo = await readPkgInfo(file);
                  this.uploadPackageForm.appName = apkInfo.name
                  this.uploadPackageForm.appVersion = apkInfo.versionName
                  this.uploadPackageForm.appSystem = extension === "ipa" ? 0 : 1
                  this.uploadPackageForm.appIcon = apkInfo.icon
                }
              } catch (error) {
                errorMessageShow(error)
              }
            },

            async updateFileSelect() {
              try {
                //IOS = 0 正式版 = 0
                const file = this.$refs.updateFileSelectInput.input.files[0]
                if(file) {
                  const extension = file.name.substr(file.name.lastIndexOf(".") + 1)
                  if(this.appUpdatePackageData.system === (extension === "ipa" ? 0 : 1)) {
                    let apkInfo = await readPkgInfo(file);
                    this.updatePackageForm.appName = apkInfo.name
                    this.updatePackageForm.appVersion = apkInfo.versionName
                    this.updatePackageForm.appSystem = extension === "ipa" ? 0 : 1
                    this.updatePackageForm.appIcon = apkInfo.icon
                  } else {
                    this.updatePackageForm.fileName = ""
                    errorMessageShow("更新包的系统类型必须一致")
                  }
                }
              } catch (error) {
                errorMessageShow(error)
              }
            },

            async uploadPackage() {
              this.$refs.uploadPackageForm.validate(async (isok) => {
                if (isok) {
                  this.isShowUploadProgress = true
                  try {
                    const file = this.$refs.uploadFileSelectInput.input.files[0]
                    const fileMd5 = await md5FromFile(file)
                    const utcTimeStamp = getUTCTimeStamp()
                    let formData = new FormData()
                    formData.append('package', file)
                    formData.append('account', readAccount())
                    formData.append('token', readToken())
                    formData.append('appIcon', this.uploadPackageForm.appIcon)
                    formData.append('appName', this.uploadPackageForm.appName)
                    formData.append('version', this.uploadPackageForm.appVersion)
                    formData.append('uploadTime', utcTimeStamp)
                    formData.append('system', this.uploadPackageForm.appSystem)
                    formData.append('progress', this.uploadPackageForm.appProgress)
                    formData.append('md5', fileMd5)
                    formData.append('description', this.uploadPackageForm.appDescription)
                    NetApiShareInstance.packageUpload(formData, (progress) => {
                      this.uploadPercentage = progress * 100
                    }).then((res) => {
                      console.log("上传: ", res)
                      if(res.data.ret === 0) {
                        successNotificationShow("App上传成功")
                        this.uploadPackageForm.fileName = ""
                        this.uploadPackageForm.appName = ""
                        this.uploadPackageForm.appVersion = ""
                        this.uploadPackageForm.appSystem = null
                        this.uploadPackageForm.appProgress = null
                        this.uploadPackageForm.appDescription = ""
                        this.uploadPackageForm.appIcon = ""
                        this.uploadPackageDialogVisible = false
                        this.appListTableAllReload(this.requiredCount, 0, {})
                      } else {
                        errorNotificationShow("App上传失败", res.data.message)
                      }
                      this.isShowUploadProgress = false
                      this.uploadPercentage = 0
                    }).catch((err) => {
                      this.isShowUploadProgress = false
                      this.uploadPercentage = 0
                      errorMessageShow(err)
                    })
                  } catch (error) {
                    this.isShowUploadProgress = false
                    this.uploadPercentage = 0
                    errorMessageShow(error)
                  }
                }
              })
            },

            updatePackageDialog(data) {

              this.appUpdatePackageData = data
              this.updatePackageDialogVisible = true
              
              this.updatePackageForm.appId = data.appId
              this.updatePackageForm.fileName = ""
              this.updatePackageForm.appName = data.appName
              this.updatePackageForm.appVersion = data.version
              this.updatePackageForm.appSystem = data.system
              this.updatePackageForm.appProgress = data.progress
              // this.uploadPackageForm.appIcon = data.appIcon
              // this.updatePackageForm.appDescription = data.appDescription
            },

            updatePackage () {
              // console.log("data: ", data)
              this.$refs.updatePackageForm.validate(async (isok) => {
                if(isok) {
                  this.isShowUpdateProgress = true
                  try {
                    const file = this.$refs.updateFileSelectInput.input.files[0]
                    const fileMd5 = await md5FromFile(file)
                    const utcTimeStamp = getUTCTimeStamp()
                    let formData = new FormData()
                    formData.append('package', file)
                    formData.append('account', readAccount())
                    formData.append('token', readToken())
                    formData.append('appId', this.updatePackageForm.appId)
                    formData.append('appIcon', this.updatePackageForm.appIcon)
                    formData.append('appName', this.updatePackageForm.appName)
                    formData.append('version', this.updatePackageForm.appVersion)
                    formData.append('lastModifiedTime', utcTimeStamp)
                    formData.append('system', this.updatePackageForm.appSystem)
                    formData.append('progress', this.updatePackageForm.appProgress)
                    formData.append('md5', fileMd5)
                    formData.append('description', this.updatePackageForm.appDescription)
                    NetApiShareInstance.packageUpdate(formData, (progress) => {
                      this.updatePercentage = progress * 100
                    }).then((res) => {
                      console.log("更新: ", res)
                      if(res.data.ret === 0) {
                        successNotificationShow("App更新成功")
                        this.updatePackageForm.appId = ""
                        this.updatePackageForm.fileName = ""
                        this.updatePackageForm.appName = ""
                        this.updatePackageForm.appVersion = ""
                        this.updatePackageForm.appSystem = null
                        this.updatePackageForm.appProgress = null
                        this.updatePackageForm.appDescription = ""
                        this.updatePackageForm.appIcon = ""
                        this.updatePackageDialogVisible = false
                        this.appListTableAllReload(this.requiredCount, 0, {})
                      } else {
                        errorNotificationShow("App更新失败", res.data.message)
                      }
                      this.isShowUpdateProgress = false
                      this.updatePercentage = 0
                    }).catch((err) => {
                      this.isShowUpdateProgress = false
                      this.updatePercentage = 0
                      errorMessageShow(err)
                    })
                  } catch (error) {
                    this.isShowUpdateProgress = false
                    this.updatePercentage = 0
                    errorMessageShow(error)
                  }
                }
              })
            },

            deletePackage() {
              if(this.appListTableScrollLoading === true || this.appListTableLoading === true) {
                console.log("正在等待加载.....")
              } else {
                let deleteAppIdArray = []
                for (const item of this.appListTableSelectionData) {
                  console.log("item: ", item.appId)
                  deleteAppIdArray.push({ "appId": item.appId })
                }
                console.log("deleteAppIdArray: ", deleteAppIdArray)
                if(deleteAppIdArray.length === 0) {
                  errorMessageShow("未选择删除项")
                } else {
                  this.appListTableLoading = true
                  NetApiShareInstance.packageDelete(readAccount(), readToken(), deleteAppIdArray).then((res) => {
                    this.appListTableLoading = false
                    if (res.data.ret === 0) {
                      // console.log("删除成功, this.appListTableSelectionData: ", this.appListTableSelectionData)
                      // this.$refs.appListTable.clearSelection()
                      this.appListTableAllReload(this.requiredCount, 0, {})
                    } else {
                      errorNotificationShow("获取App列表失败", res.data.message)
                    }
                  }).catch((err) => {
                    this.appListTableLoading = false
                    errorMessageShow(err)
                  })
                }
                
              }
            },

            appListTableSelectionChange(val) {
              this.appListTableSelectionData = val
            },

            appListTableScrollToBottom() {
              console.log("到底部了。。。。。")
              if(this.appListTableScrollLoading === false && this.appListTableLoading === false) {
                this.appListTableScrollLoading = true

                NetApiShareInstance.packageObtain(readAccount(), readToken(), this.requiredCount, this.obtainedCount, this.scrollLoadingSearchObject).then((res) => {
                  if (res.data.ret === 0) {
                    console.log("list: ", res.data.items)
                    console.log("finished: ", res.data.finished)
                    this.obtainedCount = this.obtainedCount + res.data.items.length
                    this.appListTableData.push.apply(this.appListTableData, res.data.items)
                    this.isAppListLoadFinished = res.data.finished
                  } else {
                    errorNotificationShow("获取App列表失败", res.data.message)
                  }
                  this.appListTableScrollLoading = false
                }).catch((err) => {
                  this.appListTableScrollLoading = false
                  errorMessageShow(err)
                })
              } else {
                console.log("正在等待加载.....")
              }
            },

            appListTableAllReload(requiredCount, obtainedCount, searchObject) {
              if(this.appListTableScrollLoading === true || this.appListTableLoading === true) {
                console.log("正在等待加载.....")
              } else {
                this.appListTableLoading = true
                NetApiShareInstance.packageObtain(readAccount(), readToken(), requiredCount, obtainedCount, searchObject).then((res) => {
                  if (res.data.ret === 0) {
                    console.log("list: ", res.data.items)
                    console.log("finished: ", res.data.finished)
                    //刷新app表时将滚动条置于初始位置
                    document.getElementById('appListTable').querySelector('.el-scrollbar__wrap').scrollTop = 0
                    this.obtainedCount = res.data.items.length
                    this.appListTableData = res.data.items
                    this.isAppListLoadFinished = res.data.finished
                    this.scrollLoadingSearchObject = searchObject
                    this.$refs.appListTable.clearSelection()
                    // console.log("删除成功, this.appListTableSelectionData: ", this.appListTableSelectionData)
                  } else {
                    errorNotificationShow("获取App列表失败", res.data.message)
                  }
                  this.appListTableLoading = false
                }).catch((err) => {
                  this.appListTableLoading = false
                  errorMessageShow(err)
                })
              }
            },

            searchAppList() {
              console.log("inputSelectString: ", this.inputSelectString)
              console.log("inputSearchString: ", this.inputSearchString)
              console.log("搜索信息完整, 搜索对象改为: ", {[this.inputSelectString]: this.inputSearchString})
              const searchObject = {[this.inputSelectString]: this.inputSearchString}
              // this.scrollLoadingSearchObject
              if(this.inputSearchString !== "" && this.inputSelectString !== "") {
                this.appListTableAllReload(this.requiredCount, 0, searchObject)
              } else {
                errorMessageShow("搜索信息不完整")
              }

            },

            getLocalTime(timeStamp) {
              return transformUTCTimeStampToLocalTime(timeStamp)
            }

        },
        //生命周期 - 创建完成,访问当前this实例
        created() {
            
        },
        //生命周期 - 挂载完成,访问DOM元素
        mounted() {
          this.appListTableAllReload(this.requiredCount, 0, {})
        },
        unmounted() {
          console.log("AppManagerContainer -- delloc")
        },
        
    }
</script>

<style scoped>
/* @import url(); 引入css类 */

.main {
  width: 90vw;
  height: calc(100vh - 100px);
  position: absolute;
  top: 80px;
  left: 5vw;
}

.container {
  width: 90vw;
  margin: 0 auto;
  border-radius: 10px;
}

.search-input {
  width: 90vw;
  position: absolute;
  top: calc(100vh - 380px);
  left: 0vw;
}

.search-input :deep(.el-input__inner) {
    height: 40px;
}

.upload-button {
  width: 90vw;
  height: 40px;
  position: absolute;
  top: calc(100vh - 320px);
  left: 0vw;
}

.delete-button {
  width: 90vw;
  height: 40px;
  position: absolute;
  margin: 0px;
  top: calc(100vh - 260px);
  left: 0vw;
}

/* .upload-dialog {
  width: 30%;
} */
.upload-dialog-body {
  width: 100%;
  height: 304px;
  /* background-color: black; */
}

.update-dialog-body {
  width: 100%;
  height: 354px;
}

.upload-progress-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999999;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.update-progress-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999999;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.upload-progress {
  /* width: 50vw;
  height: 50vw;
  max-height: 100%; */
  display: flex;
  justify-content: center;
  align-items: center;
}

.update-progress {
  display: flex;
  justify-content: center;
  align-items: center;
}
/* .scroll-loading :deep(.el-loading-spinner) {
  width: 35px;
  height: 35px;
} */

/* .fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
} */


</style>