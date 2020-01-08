import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vconsole from 'vconsole';
import vueWebStorage from 'vue-web-storage';
import flexible from 'amfe-flexible';

const isPro = process.env.NODE_ENV === 'production';

import {
    Toast,
    Cell,
    CellGroup,
    Button,
    Popup,
    Tab,
    Tabs,
    Lazyload,
    Icon,
    Row,
    Col,
    Dialog
} from 'vant';

import('@css/reset.css');
import('@css/style.css');
import('vant/lib/icon/local.css');

Vue.use(flexible).use(Toast).use(Cell).use(CellGroup).use(Button).use(Popup).use(Lazyload, {
    error: require('@image/errorImg.png')
}).use(Icon).use(Row).use(Col).use(Tab).use(Tabs).use(Dialog).use({
    routes: router,
    defaultRouteUrl: '/'
});
if (!isPro) {
    console.log(9999)
    const vConsole = new Vconsole();
    Vue.use(vConsole);
}



// 使用vue存储插件
Vue.use(vueWebStorage, {
    // prefix: 'jnsApp', // default `app_`
    drivers: ['session', 'local'], // 生成Vue.$localStorage以及Vue.$sessionStorage
});
Vue.prototype.$local = Vue.$localStorage; // 原型链加方法
Vue.prototype.$session = Vue.$sessionStorage;

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
