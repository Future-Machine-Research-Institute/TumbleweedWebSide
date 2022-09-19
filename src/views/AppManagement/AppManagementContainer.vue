<template>
  <div class="main">

    <el-dialog v-model="uploadPackageDialogVisible" title="App包上传" width="100%" top="0px" :destroy-on-close = "true">
      <!-- <Transition name="fade"></Transition> -->
      <div v-if="isShowUploadProgress" class="upload-progress-container">
        <el-progress class="upload-progress" type="circle" :percentage="uploadPercentage" />
      </div>
      <div class="upload-dialog-body">
        <el-form class="upload-dialog-form" ref = "uploadPackageForm" :model = "uploadPackageForm" :rules = "uploadPackageRules">
          <el-form-item label="App文件" prop = "fileName">
            <el-input v-model="uploadPackageForm.fileName" autocomplete="off" type="file" ref="fileSelectInput" accept=".apk,.ipa" @change="fileSelect" />
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

    <el-table class="container" :data="tableData" max-height="calc(100vh - 400px)">
      <el-table-column type="selection" />
      <el-table-column fixed prop="appIcon" label="图标" />
      <el-table-column prop="appId" label="AppID" />
      <el-table-column prop="appName" label="名称" />
      <el-table-column prop="version" label="版本" />
      <el-table-column prop="uploadTime" label="上传时间" />
      <el-table-column prop="lastModifiedTime" label="最近修改时间" />
      <el-table-column fixed="right" label="Operations">
        <el-button link type="primary" size="small" @click="updatePackage">更新</el-button>
      </el-table-column>
    </el-table>

    <el-input class="search-input" type="text" v-model="inputSearch">
      <template #prepend>
        <el-select v-model="inputSelect" placeholder="Select" style="width: 100px">
          <el-option label="App名称" value="1" />
          <el-option label="AppID" value="2" />
        </el-select>
      </template>
      <template #append>
        <el-button>
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
  // import { loadingViewShow, loadingViewDismiss} from '../../utils/loading-view'

    export default {
        components: {
            Search
        },
        data() {
            return {
              isShowUploadProgress: false,
              uploadPercentage: 0,
              uploadPackageDialogVisible: false,
              uploadPackageForm: {
                fileName: "",
                appName: "",
                appVersion: "",
                appSystem: null,
                appProgress: null,
                appDescription: "",
                appIcon: ""
              },
              inputSearch: "",
              inputSelect: "",
              tableData:
                [
                  {
                    appIcon: '2016-05-01',
                    appId: 'cajsnklmdlasadasdasda',
                    appName: 'California',
                    version: '1.0.1',
                    uploadTime: '2016-05-01',
                    lastModifiedTime: '2016-05-01',
                  },
                  {
                    appIcon: '2016-05-01',
                    appId: 'cajsnklmdlasadasdasda',
                    appName: 'California',
                    version: '1.0.1',
                    uploadTime: '2016-05-01',
                    lastModifiedTime: '2016-05-01',
                  },
                  {
                    appIcon: '2016-05-01',
                    appId: 'cajsnklmdlasadasdasda',
                    appName: 'California',
                    version: '1.0.1',
                    uploadTime: '2016-05-01',
                    lastModifiedTime: '2016-05-01',
                  },
                  {
                    appIcon: '2016-05-01',
                    appId: 'cajsnklmdlasadasdasda',
                    appName: 'California',
                    version: '1.0.1',
                    uploadTime: '2016-05-01',
                    lastModifiedTime: '2016-05-01',
                  }
                ]
            }
        },
        computed: {
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
        },
        //方法
        methods: {
            async fileSelect() {
              try {
                //IOS = 0 正式版 = 0
                const file = this.$refs.fileSelectInput.input.files[0]
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

            async uploadPackage() {
              this.$refs.uploadPackageForm.validate(async (isok) => {
                if (isok) {
                  this.isShowUploadProgress = true
                  try {
                    const file = this.$refs.fileSelectInput.input.files[0]
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

            updatePackage () {
              console.log("updatePackage")
            },

            deletePackage() {
              
            }

        },
        //生命周期 - 创建完成,访问当前this实例
        created() {
            
        },
        //生命周期 - 挂载完成,访问DOM元素
        mounted() {
            
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

.upload-progress {
  /* width: 50vw;
  height: 50vw;
  max-height: 100%; */
  display: flex;
  justify-content: center;
  align-items: center;
}

/* .fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
} */


</style>