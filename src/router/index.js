import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: () => import('../pages/Sets.vue')
		},
		{
			path: '/collection/sets',
			name: 'Collection sets',
			component: () => import('../pages/collection/Sets.vue')
		},
		{
			path: '/set/:code',
			name: 'Set',
			component: () => import('../pages/Set.vue')
		},
		{
			path: '/test',
			name: 'Test',
			component: () => import('../pages/test.vue')
		}
	]
})

export default router
