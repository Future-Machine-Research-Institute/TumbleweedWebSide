<template>
  <div class = "main">

    <el-dialog v-model="dialogFormVisible" title="Shipping address">
    <el-form :model="form">
      <el-form-item label="Promotion name" >
        <el-input v-model="dialogFormName" autocomplete="off" type = "file" id = "file" @change="fileSelect"/>
      </el-form-item>
      <el-form-item label="Zones" >
        <el-select v-model="dialogFormRegion" placeholder="Please select a zone">
          <el-option label="Zone No.1" value="shanghai" />
          <el-option label="Zone No.2" value="beijing" />
        </el-select>
      </el-form-item>
    </el-form>
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
      <el-table-column fixed prop="date" label="图标" />
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="state" label="版本"  />
      <el-table-column prop="city" label="AppID" />
      <el-table-column prop="address" label="Address" />
      <el-table-column prop="zip" label="Zip" />
      <el-table-column fixed="right" label="Operations" >
        <template #default="scope">
          <el-button link type="primary" size="small" @click.prevent="deleteRow(scope.$index)">更新</el-button>
        </template>
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
                tableData: [
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
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


</style>