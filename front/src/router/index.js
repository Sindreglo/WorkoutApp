import Vue from 'vue'
import VueRouter from 'vue-router'
import DashBoard from "@/views/DashBoard";
import MyProfile from "@/views/MyProfile";
import SignUp from "@/views/SignUp";
import SignIn from "@/views/SignIn";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: DashBoard
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

export default router
