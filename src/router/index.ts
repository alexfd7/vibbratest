
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'



Vue.use(VueRouter)

const routes = [ ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'is-active'
})

const storeInit = store.dispatch('init')

router.beforeEach(async (to, from, next) => {
	await storeInit.then(function() {

		next()
		
	})
    .catch(e => {
		console.error(e);
    })

})

export default router
