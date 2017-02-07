import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.config.debug = true;

Vue.use(VueRouter);
Vue.use(VueResource);

import one from './component/one.vue'
import two from './component/two.vue'

const router = new VueRouter({
	mode: 'history',
	base: __dirname,
	routes: [
	{
		path: '/one',
		component: one
	},{
		path: '/two',
		component: two
	}]
})

new Vue({
  el: '#app',
  router: router,
  components: {one,two},
  render: h => h(App)
}).$mount('#app')
