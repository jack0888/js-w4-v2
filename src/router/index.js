/**
 * Created by 汪凤杰 on 2018/7/21.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router'


Vue.use(VueRouter);
const router = new VueRouter({
    routes,
    mode: 'hash',// history hash
    strict: process.env.NODE_ENV !== 'production',
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            if (from.meta.keepAlive) {
                from.meta.savedPosition = document.body.scrollTop;
            }
            return { x: 0, y: to.meta.savedPosition || 0 }
        }
    }
});

router.beforeEach(async (to, from, next) => {

    // TODO

    next();

    // 修改 title
    if (to.meta.title) {
        document.title = to.meta.title;
    }
});

export default router;

// export {store};
