import { createRouter, createWebHistory } from "vue-router";
import { isAuthenticated, getCurrentUser } from '@/firebase/util'

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
      },
      {
        path: "/:userUid",
        name: "user",
        component: () => import('./views/Profile.vue')
      },
      {
        path: "/addPost",
        name: "addPost",
        component: () => import('./views/AddPost.vue')
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
  linkExactActiveClass: 'active'
});

router.beforeEach(async (to) => {
  try {
    const isAuth = await isAuthenticated();

    if (isAuth && to.meta.authRequired) {
      if(to.name === "user") {
        if (getCurrentUser().uid === to.params.userUid)
          return {name: "profile"}
      }
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