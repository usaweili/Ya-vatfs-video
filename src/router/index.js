import { createRouter, createWebHashHistory } from "vue-router";
import Main from "../views/Main.vue";
import Search from "../views/Search.vue";
import History from "../views/History.vue";
import Player from "../views/Player.vue";

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main,
    redirect:'/',
    children:[
      {
        path: "/",
        name: "Search",
        component: Search
      },
      {
        path: "/player/:id",
        name: "Player",
        props: true,
        component: Player
      },
      {
        path: "/history",
        name: "History",
        component: History
      },
    ]
  },
  
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
