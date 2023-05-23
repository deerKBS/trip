import store from "@/store/store.js";
//import router from "@/routers/protectedRoute.js";

// https://v3.router.vuejs.org/kr/guide/advanced/navigation-guards.html
const onlyAuthUser = async (to, from, next) => {
  const checkUserInfo = store.getters["memberStore/checkUserInfo"];
  const checkToken = store.getters["memberStore/checkToken"];
  let token = sessionStorage.getItem("access-token");
  console.log("로그인 처리 전", checkUserInfo, token);

  if (checkUserInfo != null && token) {
    console.log("토큰 유효성 체크하러 가자!!!!");
    await store.dispatch("memberStore/getUserInfo", token);
  }
  if (!checkToken || checkUserInfo === null) {
    console.log("로그인이 필요한 페이지입니다.");
    alert("로그인이 필요한 페이지입니다..");
    next({ name: "login" });
    //router.push({ name: "main" });
  } else {
    console.log("로그인 했다!!!!!!!!!!!!!.");
    next();
  }
};

export default [
  {
    path: "main",
    name: "main",
    component: () => import("@/view/pages/MainPage.vue"),
  },
  {
    path: "search/tour",
    name: "searchTour",
    beforeEnter: onlyAuthUser,
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
    component: () => import("@/view/pages/notice/NoticeMain.vue"),
  },
  {
    path: "notice/detail/:noticeId",
    name: "noticeDetail",
    component: () => import("@/view/pages/notice/NoticeDetail.vue"),
  },
  {
    path: "notice/insert",
    name: "noticeInsert",
    component: () => import("@/view/pages/notice/NoticeInsert.vue"),
  },
  {
    path: "notice/update/:noticeId",
    name: "noticeUpdate",
    component: () => import("@/view/pages/notice/NoticeUpdate.vue"),
  },
  {
    path: "board",
    name: "board",
    //beforeEnter: onlyAuthUser,
    component: () => import("@/view/pages/board/BoardMain.vue"),
  },
  {
    path: "board/detail/:boardId",
    name: "boardDetail",
    component: () => import("@/view/pages/board/BoardDetail.vue"),
  },
  {
    path: "board/insert",
    name: "boardInsert",
    component: () => import("@/view/pages/board/BoardInsert.vue"),
  },
  {
    path: "board/update/:boardId",
    name: "boardUpdate",
    component: () => import("@/view/pages/board/BoardUpdate.vue"),
  },
  {
    path: "planBoard",
    name: "planBoard",
    beforeEnter: onlyAuthUser,
    component: () => import("@/view/pages/PlanBoard.vue"),
  },
  {
    path: "plan/calendar",
    name: "calendar",
    beforeEnter: onlyAuthUser,
    component: () => import("@/view/pages/CalendarPage.vue"),
  },

  {
    path: "plan/tour",
    name: "myPlans",
    component: () => import("@/view/pages/MyplansPage.vue"),
  },
  {
    path: "plan/addMyplan",
    name: "addMyplan",
    beforeEnter: onlyAuthUser,
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
    beforeEnter: onlyAuthUser,
    component: () => import("@/view/pages/UserProfile.vue"),
  },
];
