import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./views/HomeView.vue";
import { useAuthStore } from "./stores/authStore";

const routes = [
	{
		path: "/",
		name: "home",
		component: HomeView,
	},
	// Dashboard
	{
		path: '',
		component: () => import("./views/dashboard/Home.vue"),
		children: [
			{
				path: '/timeline',
				name: 'dashboard.timeline',
				component: () => import('./views/dashboard/Timeline.vue')
			},
			{
				path: '/notifications',
				name: 'dashboard.notifications',
				component: () => import('./views/dashboard/Notifications.vue')
			},
			{
				path: '/settings',
				name: 'dashboard.settings',
				component: () => import('./views/dashboard/Settings.vue')
			},
		],
		beforeEnter(to, from, next){
			const store = useAuthStore();
			if (store.isLoggedIn) {
				next();
			}else{
				next('/login');
			}
		}
	},
	{
		path: "/register",
		name: "register",
		component: () => import("./views/auth/Register.vue"),
	},
	{
		path: "/login",
		name: "login",
		component: () => import("./views/auth/Login.vue"),
		beforeEnter(to, from, next){
			const store = useAuthStore();
			if (store.isLoggedIn) {
				next('/timeline');
			}else{
				next();
			}
		}
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export default router;
