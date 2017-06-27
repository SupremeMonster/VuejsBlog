// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'

import 'bootstrap/dist/css/bootstrap.css'
import './style.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import Vuex from 'vuex'


Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(Vuex)

Vue.filter('userDate', function(value) {
  if (!value) { return ''}
  return new Date(parseInt(value)).toLocaleString().replace(/:\d{1,2}$/,' ').slice(0,9);
})


Vue.filter('userDate2', function(value) {
  if (!value) { return ''}
  return new Date(parseInt(value)).toLocaleString().replace(/:\d{1,2}$/,' ');
})



Vue.filter('parseDate',function(value){
	let date = new Date(value);
	if (!value) { return ''}
		 return date.getFullYear() + '-' + (date.getMonth() + 1 > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)) + "-" +
          (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) + " " +
          (date.getHours() > 9 ? date.getHours() : "0" + date.getHours()) + ":" +
          (date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()) + ":" +
          (date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds());
     
})

const vuex_store=new Vuex.Store({
    state:{
         number:'',
    },
    mutations:{
       showNumber(state){
           alert(this.state.number);
       }
    }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store:vuex_store,
  template: '<App/>',
  components: { App }
})
