import Vue from 'vue'
import App from './App'
import './uni.promisify.adaptor'
import uView from "uview-ui";
import store from './store';

Vue.use(uView);
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})

app.$mount()
