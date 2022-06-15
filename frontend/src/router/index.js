import { createRouter, createWebHashHistory } from 'vue-router'
import Home from "@/views/Home";
import Login from "@/views/Login";
import Register from "@/views/Register";

const routes = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/",
    component: Home
  },
  {
    path: "/register",
    component: Register
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
