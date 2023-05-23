export default [
  {
    path: "login",
    name: "login",
    component: () => import("@/view/authentication/LoginPage2.vue"),
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
  
];
