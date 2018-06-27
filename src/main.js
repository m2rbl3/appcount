// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import './assets/css/bootstrap.css'
import './assets/css/font-awesome.css'
import { VueHammer } from 'vue2-hammer'

Vue.use(VueHammer)
Vue.config.productionTip = true
/* eslint-disable no-new */
var appCount=new Vue({
  el:'#account-app',
  template:`<App/>`,
  components:{App}								
})
