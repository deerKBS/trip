import Vue from "vue"; // defalut module
import VueRouter from "vue-router"; // installed module

Vue.use(VueRouter);
import adminRoutes from "./AdminRoutes";
import authRoutes from "./authRoutes";

export default new VueRouter({
  routes: [
    {
      name: "Admin",
      path: "/",
      component: () => import("@/Layout/withAdminLayout.vue"),
      children: [...adminRoutes],
    },
    {
      name: "Auth",
      path: "/",
      component: () => import("@/Layout/withAuthLayout.vue"),
      children: [...authRoutes],
    },
  ],
});
