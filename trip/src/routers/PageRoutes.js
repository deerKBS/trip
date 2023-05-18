export default [
  {
    path: "main",
    name: "main",
    component: () => import("@/view/pages/MainPage.vue"),
  },
  {
    path: "board",
    name: "board",
    component: () => import("@/view/pages/BoardMain.vue"),
  },

  {
    path: "userProfile",
    name: "userProfile",
    component: () => import("@/view/pages/UserProfile.vue"),
  },
];
