import Vue from "vue";
import App from "./App.vue";
import router from "./routers/protectedRoute.js";
import store from "./store/store.js";

// for bootstrap 5
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

// import ans design for side bar
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
Vue.use(Antd);

// tailwind
import "./index.css";

// vuetify
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

Vue.use(Vuetify);

Vue.config.productionTip = false;

new Vue({
  vuetify: new Vuetify(),
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
