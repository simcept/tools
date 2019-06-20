import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: () => import("./views/About.vue")
    },

    // Applications
    {
      path: "/apps/json-for-human",
      name: "JSON for Human",
      component: () => import("./views/apps/JsonForHuman.vue")
    }
  ]
});
