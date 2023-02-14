import { createRouter, createWebHashHistory } from 'vue-router';
import PlayerSheetView from '@/views/PlayerSheetView.vue';
import MapEditorView from '@/views/MapEditorView.vue';
import LoginView from '@/views/LoginView.vue';
import HomeView from '@/views/HomeView.vue';
import AuthService from '@/utils/auth/auth.service';

const routes = [
	{
		path: '/',
		name: 'home',
		component: HomeView,
	},
	{
		path: '/map-editor',
		component: MapEditorView,
	},
	{
		path: '/stats',
		component: PlayerSheetView,
	},
	{
		path: '/login',
		name: 'Login',
		component: LoginView,
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

const isAuthenticated = true;

router.beforeEach((to, from, next) => {
	const publicPages = ['/login', '/home'];
	const authRequired = !publicPages.includes(to.path);
	const loggedIn = AuthService.getCurrentUserFromLocalStorage();

	if (authRequired && to.name !== 'Login' && !loggedIn) next({ name: 'Login' });
	else next();
});

export default router;
