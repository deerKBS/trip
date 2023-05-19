export default [
  {
    path: "main",
    name: "main",
    component: () => import("@/view/pages/MainPage.vue"),
  },
  {
    path: "search/tour",
    name: "searchTour",
    component: () => import("@/view/pages/SearchTour.vue"),
  },
  {
    path: "search/route",
    name: "searchRoute",
    component: () => import("@/view/pages/SearchRoute.vue"),
  },
  {
    path: "notice",
    name: "notice",
    component: () => import("@/view/pages/NoticePage.vue"),
  },
  {
    path: "board",
    name: "board",
    component: () => import("@/view/pages/BoardMain.vue"),
  },
  {
    path: "planBoard",
    name: "planBoard",
    component: () => import("@/view/pages/PlanBoard.vue"),
  },
  {
    path: "plan/calendar",
    name: "calendar",
    component: () => import("@/view/pages/CalendarPage.vue"),
  },
  {
    path: "plan/tour",
    name: "myPlans",
    component: () => import("@/view/pages/MyPlans.vue"),
  },
  {
    path: "plan/addMyplan",
    name: "addMyplan",
    component: () => import("@/view/pages/AddMyplan.vue"),
  },
  {
    path: "hotplace",
    name: "hotplace",
    component: () => import("@/view/pages/HotPlace.vue"),
  },
  // 사용자 페이지
  {
    path: "userProfile",
    name: "userProfile",
    component: () => import("@/view/pages/UserProfile.vue"),
  },
];