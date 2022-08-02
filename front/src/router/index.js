import Vue from 'vue'
import VueRouter from 'vue-router'
import MyProfile from "@/views/MyProfile";
import SignUp from "@/views/SignUp";
import SignIn from "@/views/SignIn";
import ExerciseView from "@/views/ExerciseView";
import storageService from "@/services/storageService";
import DashBoard from "@/views/DashBoard";
import Workouts from "@/views/Workouts";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: DashBoard,
    meta: {requiresAuth: true},
  },
  {
    path: '/exercises',
    name: 'exercises',
    component: ExerciseView,
    meta: {requiresAuth: true}
  },
  {
    path: '/workouts',
    name: 'workouts',
    props: true,
    component: Workouts,
    meta: {requiresAuth: true}
  },
  {
    path: '/profile',
    name: 'profile',
    component: MyProfile
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/signin',
    name: 'signin',
    component: SignIn
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth && storageService.getToken() === null) {
    next("/signin")
  } else {
    next();
  }
});

export default router
