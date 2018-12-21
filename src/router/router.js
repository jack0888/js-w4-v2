const notFound = () => import('../pages/404/404').then(m => m.default);// 404

const home = () => import('../pages/home').then(m => m.default);// 首页



export default [
    //地址为空时跳转home页面
    {
        path: '',
        redirect: '/home',
        meta: {
            keepAlive: true, //此组件需要被缓存  
        }
    },
    {
        path: '/',
        component: home
    },
    // 首页
    {
        path: '/home',
        component: home,
        meta: {
            title: "首页",
            show: true,
            keepAlive: true, //此组件需要被缓存  
        }
    },
    {
        path: "*",
        component: notFound
    }
]
