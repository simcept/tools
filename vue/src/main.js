import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./plugins/vuetify";

Vue.config.productionTip = false;

const apps = [
  {
    name: "JSON for Human",
    description: "Convert the JSON into human readable format.",
    url: "/apps/json-for-human"
  }
];

new Vue({
  router,
  render: h => h(App),
  data: {
    apps
  }
}).$mount("#app");
