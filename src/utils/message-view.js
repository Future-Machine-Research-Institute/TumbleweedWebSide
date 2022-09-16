import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'

const successMessageShow = (message) => {
    ElMessage.success({
        showClose: true,
        message: message
    })
}

const errorMessageShow = (message) => {
    ElMessage.error({
        showClose: true,
        message: message
    })
}

export {
    successMessageShow,
    errorMessageShow
}