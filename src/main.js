import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './App.vue'
import ElementUI from 'element-ui'
import routerConfig from './router/index.js'
import axios from 'axios'
import store from './store/store'
import $ from 'jquery'

import utils from './common/js/utils.js'
import 'element-ui/lib/theme-default/index.css'
import './common/js/bootstrap/css/bootstrap.min.css'
import './common/js/bootstrap/js/bootstrap.min.js'
import './common/css/common.css'
import './common/css/sprite.css'
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(utils)

Vue.prototype.$ajax = axios

const router = new VueRouter({
    mode: 'history',
    routes: routerConfig
})
   
//添加响应拦截器
axios.interceptors.response.use(function(response){
     //对响应数据做些事
      
      if(response.data.code=='1002'){
         router.replace('/')
      };
      if(response.data.user&&response.data.user.time!=null){
        store.commit('WARN_INFO',response.data.user)
      }
      
      return response;
   },function(error){
     //请求错误时做些事

     return Promise.reject(error);
   });
  new Vue({
      router,
      store,
      render: h => h(App)
  }).$mount('#app')