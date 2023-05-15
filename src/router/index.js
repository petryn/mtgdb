import { createRouter, createWebHistory } from 'vue-router';
import { getCurrentUser } from 'vuefire';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: 'Sets',
			component: () => import('../pages/database/Sets.vue'),
			meta: { requiresAuth: true }
		},
		{
			path: '/set/:code',
			name: 'Set',
			component: () => import('../pages/database/Set.vue'),
			meta: { requiresAuth: true }
		},
		{
			path: '/collection/cards',
			name: 'Collection cards',
			component: () => import('../pages/collection/Cards.vue'),
			meta: { requiresAuth: true }
		},			
		{
			path: '/collection/sets',
			name: 'Collection sets',
			component: () => import('../pages/collection/Sets.vue'),
			meta: { requiresAuth: true }
		},	
		{
			path: '/swap/:uid',
			name: 'Swap',
			component: () => import('../pages/collection/Swap.vue'),
			meta: { requiresAuth: false }
		},
		{
			path: '/test',
			name: 'Test',
			component: () => import('../pages/test.vue')
		},
		{
			path: '/login',
			name: 'Login',
			component: () => import('../pages/Login.vue'),
			meta: { requiresAuth: false }
		}
	]
});

//login guard
router.beforeEach(async (to) => {
	const currentUser = await getCurrentUser();

	if(to.meta.requiresAuth && !currentUser){	
		// if the user is not logged in, redirect to the login page
		return {path: '/login'};
	}else if(currentUser && to.path == '/login'){			
		return {path: '/'};
	}
});

export {router as default};
