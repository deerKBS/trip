import PageRoutes from "./PageRoutes";

const routes = [
  {
    path: "",
    name: "main-page",
    component: () => import("@/view/pages/MainPage.vue"),
  },
  ...PageRoutes,
];

export default routes;
