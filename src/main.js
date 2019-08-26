import Vue from 'vue'
import App from './App.vue'
import VureResource from 'vue-resource'
import VeeValidate  from 'vee-validate'
import VueFilter from 'vue-filter';

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import Notifications from 'vue-notification'

Vue.use(VureResource)
Vue.use(VeeValidate)
Vue.use(Notifications)
Vue.use(VueFilter)


Vue.http.options.root = 'http://192.168.1.40:8000/users'
// Vue.http.options.root = 'http://localhost:3000/data'
// Vue.http.interceptors.push((request,next) => {
// 	if(request.method == "POST")
// 	{
// 		request.method = 'PUT'
// 	}	
// 	next(response => {
// 		response.json = () => { return {messages: response.body} }
// 	});
// })

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
