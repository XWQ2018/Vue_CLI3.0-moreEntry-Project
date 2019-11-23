import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../conponents/home.vue');

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/Home',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
        component: Home
    }
]

const router = new VueRouter({
    routes
})

export default router
