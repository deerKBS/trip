export default [
  {
    path: "login",
    name: "login",
    component: () => import("@/view/authentication/LoginPage.vue"),
  },

  {
    path: "register",
    name: "register",
    component: () => import("@/view/authentication/RegisterPage.vue"),
  },
  {
    path: "findPassword",
    name: "findPassword",
    component: () => import("@/view/authentication/FindPassword.vue"),
  },
  {
    path: "social",
    name: "social",
    component: () => import("@/view/authentication/SocialLogin.vue"),
  },
];
