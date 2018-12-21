/**
 * Created by 汪凤杰 on 2018/8/18.
 */
import Vue from 'vue'
import router from './router/index'
import App from './app.vue'

// register components

const app = new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
