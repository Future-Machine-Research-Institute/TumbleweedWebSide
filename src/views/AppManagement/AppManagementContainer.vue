<template>
  <div class="main">

    <el-dialog v-model="dialogFormVisible" title="App包上传" width="100%" top="0px">
      <div v-if="isShowUploadProgress" class="upload-progress-container">
        <el-progress class="upload-progress" type="circle" :percentage="uploadPercentage" />
      </div>
      <div class="upload-dialog-body">

        <el-form class="upload-dialog-form">
          <el-form-item label="App文件">
            <el-input v-model="dialogFormFileName" autocomplete="off" type="file" id="file" accept=".apk,.ipa" @change="fileSelect" />
          </el-form-item>
          <el-form-item label="App名称">
            <el-input v-model="dialogFormAppName" />
          </el-form-item>
          <el-form-item label="App版本">
            <el-input v-model="dialogFormAppVersion" />
          </el-form-item>
          <el-form-item label="App系统">
            <el-select v-model="dialogFormAppSystem" placeholder="请选择系统类型">
              <el-option label="IOS" :value="0" />
              <el-option label="Android" :value="1" />
            </el-select>
          </el-form-item>
          <el-form-item label="App进度">
            <el-radio-group v-model="dialogFormProgress">
              <el-radio label="正式版" />
              <el-radio label="测试版" />
            </el-radio-group>
          </el-form-item>
        </el-form>

      </div>
      
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
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


    <el-button class="upload-button" @click="dialogFormVisible = true">上传</el-button>
    <el-button class="delete-button" @click="deletePackage">删除</el-button>


  </div>
</template>

<script>
  import { Search } from '@element-plus/icons-vue'
  import { readPkgInfo } from '../../third-party/app-package-parser'

    export default {
        components: {
            Search
        },
        data() {
            return {
              isShowUploadProgress: false,
              uploadPercentage: 0,
              dialogFormVisible: false,
              dialogFormFileName: "",
              dialogFormAppName: "",
              dialogFormAppVersion: "",
              dialogFormAppSystem: null,
              dialogFormProgress: "",
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
        //方法
        methods: {

            async fileSelect() {
              const file = document.getElementById('file').files[0]
              let apkInfo = await readPkgInfo(file);
              console.log(apkInfo);
            },

            uploadPackage() {
              console.log("uploadPackage")
              this.isShowUploadProgress = true
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
  height: 30vh;
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

</style>