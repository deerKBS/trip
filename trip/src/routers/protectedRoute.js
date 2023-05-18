import Vue from "vue"; // defalut module
import VueRouter from "vue-router"; // installed module

Vue.use(VueRouter);
import adminRoutes from "./AdminRoutes";
import authRoutes from "./authRoutes";

export default new VueRouter({
  routes: [
    {
      path: "/",
      component: () => import("@/Layout/withAdminLayout.vue"),
      children: [...adminRoutes],
    },
    {
      path: "/",
      name: "Auth",
      component: () => import("@/Layout/withAuthLayout.vue"),
      children: [...authRoutes],
    },
  ],
});
