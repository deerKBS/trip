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

// unicons
import Unicon from "vue-unicons/dist/vue-unicons-vue2.umd";
import { uniLayerGroupMonochrome, uniCarWash } from "vue-unicons/dist/icons";
Unicon.add([uniLayerGroupMonochrome, uniCarWash]);
Vue.use(Unicon);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
