import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login/Login.vue'
import Home from '../views/Home/Home.vue'
import PersonalInformation from '../views/PersonalInformation/PersonalInformation.vue'
import AppManagement from '../views/AppManagement/AppManagement.vue'
import UserManagement from '../views/UserManagement/UserManagement.vue'

const routes = [
    {
        path:'/',
        redirect:'/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/personalInformation',
        name: 'PersonalInformation',
        component: PersonalInformation
    },
    {
        path: '/appManagement',
        name: 'AppManagement',
        component: AppManagement
    },
    {
        path: '/userManagement',
        name: 'UserManagement',
        component: UserManagement
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router