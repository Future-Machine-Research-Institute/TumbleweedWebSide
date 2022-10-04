import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login/Login.vue'
import Home from '../views/Home/Home.vue'
import PersonalInformation from '../views/PersonalInformation/PersonalInformation.vue'
import AppManagement from '../views/AppManagement/AppManagement.vue'
import UserManagement from '../views/UserManagement/UserManagement.vue'
import { LoginView, HomeView, PersonalInformationView, AppManagementView, UserManagementView } from './router-config'
import NetApiShareInstance from '../net/net-api'

const routes = [
    {
        path:'/',
        redirect: HomeView
    },
    {
        path: LoginView,
        name: 'Login',
        component: Login
    },
    {
        path: HomeView,
        name: 'Home',
        component: Home
    },
    {
        path: PersonalInformationView,
        name: 'PersonalInformation',
        component: PersonalInformation
    },
    {
        path: AppManagementView,
        name: 'AppManagement',
        component: AppManagement
    },
    {
        path: UserManagementView,
        name: 'UserManagement',
        component: UserManagement
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    NetApiShareInstance.cancel()
    next();
})

export default router