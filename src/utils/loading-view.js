import { ElLoading } from 'element-plus'
import 'element-plus/theme-chalk/el-loading.css'

const loadingViewShow = () => {
    ElLoading.service({ fullscreen: true })
}

const loadingViewDismiss = () => {
    ElLoading.service({ fullscreen: true }).close()
}

export {
    loadingViewShow,
    loadingViewDismiss
}