import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./plugins/vuetify";

Vue.config.productionTip = false;

const apps = [
  {
    name: "Data Converter",
    description: "Convert the data into a desirable format.",
    url: "/apps/data-converter"
  }
];

new Vue({
  router,
  render: h => h(App),
  data: {
    currentApp: null,
    apps
  }
}).$mount("#app");
