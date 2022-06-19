<template>
    <div class = "main">
        <el-select v-model = "system" class="system-select" placeholder="选择系统" size="large">
            <el-option
            v-for="item in systems"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            >
            </el-option>
        </el-select>
        <el-select v-model = "version" class="version-select" placeholder="选择版本" size="large">
            <el-option
            v-for="item in versions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            >
            </el-option>
        </el-select>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                systems : [
                  {
                    value: '任何系统',
                    label: '任何系统',
                  },
                  {
                    value: 'IOS',
                    label: 'IOS',
                  },
                  {
                    value: 'Android',
                    label: 'Android',
                  }
                ],
                versions : [
                  {
                    value: '任何版本',
                    label: '任何版本',
                  },
                  {
                    value: '测试版',
                    label: '测试版',
                  },
                  {
                    value: '正式版',
                    label: '正式版',
                  }
                  ],
                system : "",
                version : ""
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
    display: flex;
    justify-content: left;
    align-items: center;
}

/* .system-select {

} */

.version-select {
  margin-left: 10px;
}
    
</style>