import Vue from 'vue'
import VueRouter from 'vue-router'
import DashBoard from "@/views/DashBoard";
import MyProfile from "@/views/MyProfile";
import SignUp from "@/views/SignUp";
import SignIn from "@/views/SignIn";
import { status} from "@/plugins/firebase";
import Calendar from "@/views/Calendar";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: DashBoard,
    meta: {requiresAuth: true}
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: Calendar,
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
  const isAuthenticated = await status();
  if (requiresAuth && !isAuthenticated) {
    next("/signin")
  } else {
    next();
  }
})

export default router
