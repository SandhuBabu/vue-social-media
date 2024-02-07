import { createRouter, createWebHistory } from "vue-router";
import { isAuthenticated } from '@/firebase/util'

const rootRoutes = [
  {
    path: "/",
    name: "app",
    meta: {
      authRequired: true
    },
    component: () => import("./layout/AppLayout.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("./views/Home.vue"),
      },
      {
        path: "/profile",
        name: "profile",
        component: () => import('./views/Profile.vue')
      }
    ],
  },
];

const authRoutes = [
  {
    path: "/auth",
    name: "auth",
    meta: {
      unAuthRequired: true
    },
    component: () => import("./layout/AuthLayout.vue"),
    children: [
      {
        path: "login",
        name: "login",
        component: () => import("./views/auth/Login.vue"),
      },
      {
        path: "signup",
        name: "signup",
        component: () => import("./views/auth/Signup.vue"),
      },
    ],
  },
];

export const router = createRouter({
  routes: [...rootRoutes, ...authRoutes],
  history: createWebHistory(),
});

router.beforeEach(async (to, from) => {
  try {
    const isAuth = await isAuthenticated();

    if (isAuth && to.meta.authRequired) {
      return true
    }

    if (isAuth && to.meta.unAuthRequired) {
      return false
    }
  } catch (error) {
    if(to.meta.authRequired)
      return {name:'login'}
    else 
      return
  }
})