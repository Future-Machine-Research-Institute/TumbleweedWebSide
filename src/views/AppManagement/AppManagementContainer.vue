<template>
  <div class = "main">

    <el-dialog class = "upload-dialog" v-model="dialogFormVisible" title="App包上传" width="100%" top = "0px">
      <div class = "upload-dialog-body">

        <el-form class = "upload-dialog-form">
          <el-form-item label="App文件">
            <el-input v-model="dialogFormName" autocomplete="off" type = "file" id = "file" @change="fileSelect"/>
          </el-form-item>
          <el-form-item label="App名称">
            <el-input/>
          </el-form-item>
          <el-form-item label="App版本">
            <el-input/>
          </el-form-item>
        </el-form>
        <el-form-item label="App系统">
          <el-select placeholder="请选择系统类型">
            <el-option label="IOS" value="0" />
            <el-option label="Android" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="App进度">
          <el-radio-group v-model="progress">
            <el-radio label="正式版" />
            <el-radio label="测试版" />
          </el-radio-group>
        </el-form-item>
        
      </div>
    <!-- <el-input v-model="dialogFormName" autocomplete="off" type = "file" id = "file" @change="fileSelect"/>
    <el-select v-model="dialogFormRegion" placeholder="Please select a zone">
          <el-option label="Zone No.1" value="shanghai" />
          <el-option label="Zone No.2" value="beijing" />
        </el-select> -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>

    <el-table class = "container" :data="tableData" max-height="calc(100vh - 400px)">
      <el-table-column type="selection" />
      <el-table-column fixed prop="appIcon" label="图标" />
      <el-table-column prop="appId" label="AppID" />
      <el-table-column prop="appName" label="名称" />
      <el-table-column prop="version" label="版本"  />
      <el-table-column prop="uploadTime" label="上传时间" />
      <el-table-column prop="lastModifiedTime" label="最近修改时间" />
      <el-table-column fixed="right" label="Operations" >
        <el-button link type="primary" size="small" @click="updatePackage">更新</el-button>
      </el-table-column>
    </el-table>

    <el-input class = "search-input" type = "text" v-model = "searchString" >
      <template #prepend>
        <el-select v-model="selectString" placeholder="Select" style="width: 100px">
          <el-option label="App名称" value="1" />
          <el-option label="AppID" value="2" />
        </el-select>
      </template>
      <template #append>
        <el-button >
          <el-icon ><Search /></el-icon>
        </el-button>
      </template>
    </el-input>


    <el-button class = "upload-button" @click="dialogFormVisible = true">上传</el-button>
    <el-button class = "delete-button" >删除</el-button>
    

  </div>
</template>

<script>
  import { Search } from '@element-plus/icons-vue'
  import AppInfoParser from "app-info-parser" 
    export default {
        components: {
            Search
        },
        data() {
            return {
              selectString: "",
              dialogFormVisible: false,
              dialogFormName: "",
              dialogFormRegion:"",
              progress: "",
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
            fileSelect() {
              const files = document.getElementById('file').files
              const parser = new AppInfoParser(files[0])
              parser.parse().then(result => {
    console.log('app info ----> ', result)
    console.log('icon base64 ----> ', result.icon)
  }).catch(err => {
    console.log('err ----> ', err)
  })
            },
            updatePackage () {
              console.log("updatePackage")
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

</style>