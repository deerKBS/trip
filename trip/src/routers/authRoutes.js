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
    path: "google",
    name: "GoogleLogin",
    component: () => import("@/view/authentication/GoogleLogin.vue"),
  },
  {
    path: "test",
    name: "TestLogin",
    component: () => import("@/view/authentication/TestLogin.vue"),
  },
];
