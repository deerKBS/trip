import Vue from "vue";
import App from "./App.vue";
import router from "./routers/protectedRoute.js";
import store from "./store/store.js";

// for bootstrap 5
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

// import ans design for side bar
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

Vue.use(Antd);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
