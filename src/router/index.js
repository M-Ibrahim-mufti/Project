import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: "/", component:() => import("../views/Authentication.vue") },
        {path: "/dashboard", component:() => import("../views/Dashboard.vue") },
        {path: "/Expense-manager", component:() => import("../views/Expense-manager.vue")},
        {path: "/Income-manager", component: () => import("../views/Income-manager.vue")},
        {path: "/About" , component:() => import("../views/About.vue")}
    ],
})

export default router