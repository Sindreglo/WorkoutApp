import Vue from 'vue'
import VueRouter from 'vue-router'
import login from "@/views/Login";
import Home from "@/views/Home";
import newWorkout from "@/views/newWorkout";

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/newWorkout',
    name: 'newWorkout',
    component: newWorkout,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
