import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
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
      path: "/apps/data-converter",
      name: "Data Converter",
      component: () => import("./views/apps/DataConverter.vue")
    }
  ]
});
