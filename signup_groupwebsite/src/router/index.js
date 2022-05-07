import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '../views/user/register.vue'
import Welcome from '../views/manager/main-content/welcome.vue'
Vue.use(VueRouter)
const router = new VueRouter({
    routes: [{
            path: '/login',
            component: () =>
                import( /* webpackChunkName: "login" */ '../views/manager/login.vue'),
        },
        {
            path: '/register',
            component: Register
        },
        {
            path: '/home',
            component: () =>
                import( /* webpackChunkName: "home" */ '../views/manager/home.vue'),
            redirect: '/welcome',
            children: [{
                    path: '/welcome',
                    component: Welcome
                },
                {
                    path: '/student',
                    component: () =>
                        import( /* webpackChunkName: "student" */ '../views/manager/main-content/studentInfo.vue'),
                }
            ]
        },
        {
            path: '*',
            //重定向注册页面
            redirect: '/register'
        },

    ]
})
//解决路由重复问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
router.beforeEach((to, from, next) => {
    //挂载导航守卫
    if (to.path === '/login') return next()
    if (to.path === '/register') return next()
    const token = window.sessionStorage.getItem('token')
    if (!token) return next('/login')
    next()
})

export default router