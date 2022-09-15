import { ElNotification } from 'element-plus'
import 'element-plus/theme-chalk/el-notification.css'

const successNotificationShow = (title, message) => {
    ElNotification.success({
        title: title,
        message: message
    })
}

const errorNotificationShow = (title, message) => {
    ElNotification.error({
        title: title,
        message: message
    })
}

export {
    successNotificationShow,
    errorNotificationShow
}