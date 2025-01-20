import { createRouter, createWebHistory } from "vue-router";
import Home from "@/components/Home.vue";
import Movies from "@/components/Movies.vue";
import Theaters from "@/components/Theaters.vue";
import Cities from "@/components/Cities.vue";
import Sessions from "@/components/Sessions.vue";
import CreateMovie from "@/components/CreateMovie.vue";
const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/movies',
    component: Movies,
  },
  {
    path: "/createMovie",
    component: CreateMovie,
  },
  {
    path: '/theaters',
    component: Theaters,
  },
  {
    path: "/cities",
    component: Cities,
  },
  {
    path: '/sessions',
    component: Sessions,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
