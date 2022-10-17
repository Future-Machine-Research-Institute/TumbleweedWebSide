<template>
    <div class = "main">
        <el-select v-model = "system" class="system-select" :placeholder="$t('home.homeFilterSystemSelectPlaceholderText')" size="large" @change="selectSearch">
            <el-option
            v-for="item in systems"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            >
            </el-option>
        </el-select>
        <el-select v-model = "progress" class="version-select" :placeholder="$t('home.homeFilterVersionSelectPlaceholderText')" size="large" @change="selectSearch">
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
                    label: this.$t('home.homeFilterSystemSelectOption1Text'),
                  },
                  {
                    value: 0,
                    label: this.$t('home.homeFilterSystemSelectOption2Text'),
                  },
                  {
                    value: 1,
                    label: this.$t('home.homeFilterSystemSelectOption3Text'),
                  }
                ],
                versions : [
                  {
                    value: -1,
                    label: this.$t('home.homeFilterVersionSelectOption1Text'),
                  },
                  {
                    value: 0,
                    label: this.$t('home.homeFilterVersionSelectOption2Text'),
                  },
                  {
                    value: 1,
                    label: this.$t('home.homeFilterVersionSelectOption3Text'),
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