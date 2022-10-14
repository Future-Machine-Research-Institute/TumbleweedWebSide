import { ElMessageBox } from 'element-plus'
import 'element-plus/theme-chalk/el-message-box.css'

const messageBoxShow = (title, message) => {
    ElMessageBox.alert(message, title, {
        center: true,
        showConfirmButton: false,
        dangerouslyUseHTMLString: true
    }).catch((err) => {

    })
}

export {
    messageBoxShow
}