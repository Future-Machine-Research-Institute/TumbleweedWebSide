<template>
    <div class = "main">
        <el-select v-model = "system" class="system-select" placeholder="选择系统" size="large" @change="selectSearch">
            <el-option
            v-for="item in systems"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            >
            </el-option>
        </el-select>
        <el-select v-model = "progress" class="version-select" placeholder="选择版本" size="large" @change="selectSearch">
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
    import Bus from '../../utils/bus'
    export default {
        data() {
            return {
                systems : [
                  {
                    value: -1,
                    label: '任何系统',
                  },
                  {
                    value: 0,
                    label: 'IOS',
                  },
                  {
                    value: 1,
                    label: 'Android',
                  }
                ],
                versions : [
                  {
                    value: -1,
                    label: '任何版本',
                  },
                  {
                    value: 0,
                    label: '正式版',
                  },
                  {
                    value: 1,
                    label: '测试版',
                  }
                  ],
                system : -1,
                progress : -1
            }
        },
        //生命周期 - 创建完成,访问当前this实例
        created() {
            
        },
        methods: {
          selectSearch() {
            Bus.emit('selectSearch', {system: this.system, progress: this.progress})
          }
        },
        //生命周期 - 挂载完成,访问DOM元素
        mounted() {
            
        },
        unmounted() {

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