import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import http from "@/common/axios.js";

import router from "@/routers/protectedRoute.js";
import createPersistedState from "vuex-persistedstate";

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      paths: ["login"],
    }),
  ],
  state: {
    // login, NavBar
    login: {
      // NavBar
      isLogin: false,

      userName: "김땡땡",
      userProfileImageUrl: "",
      userRegisterDate: "2022-02-02",
      // Login
      userEmail: "deer119@naver.com",
      userPassword: "1q2w3e!",
    },
    //
    board: {
      // list
      list: [],
      limit: 10,
      offset: 0,
      searchWord: "",
      category: "",
      categoryName: "",

      // pagination
      listRowCount: 10,
      pageLinkCount: 10,
      currentPageIndex: 1,

      totalListItemCount: 0,

      // detail, update, delete

      boardId: 0,
      title: "",
      content: "",
      userName: "",
      regDate: "",
      regTime: "",
      readCount: 0,
      fileList: [],
      sameUser: false,
      commentCount:0,
    },
    notice: {
      // list
      list: [],
      limit: 10,
      offset: 0,
      searchWord: "",
      category: "",
      categoryName: "",

      // pagination
      listRowCount: 10,
      pageLinkCount: 10,
      currentPageIndex: 1,

      totalListItemCount: 0,

      // detail, update, delete

      noticeId: 0,
      title: "",
      content: "",
      userName: "",
      regDate: "",
      regTime: "",
      readCount: 0,
      fileList: [],
      sameUser: false,
    },
  },
  // state 상태를 변경하는 유일한 방법
  mutations: {
    SET_LOGIN(state, payload) {
      state.login.isLogin = payload.isLogin;
      state.login.userName = payload.userName;
      state.login.userProfileImageUrl = payload.userProfileImageUrl;
      state.login.userRegisterDate = payload.userRegisterDate;
      state.login.userEmail = payload.userEmail;
    },
    SET_LOGOUT(state) {
      state.login.isLogin = false;
      state.login.userName = "";
      state.login.userProfileImageUrl = "";
      state.login.userRegisterDate = "";
      state.login.userEmail = "";
      state.login.userPassword = "";
    },

    SET_BOARD_LIST(state, list) {
      state.board.list = list;
    },
    SET_BOARD_TOTAL_LIST_ITEM_COUNT(state, count) {
      state.board.totalListItemCount = count;
    },
    SET_BOARD_MOVE_PAGE(state, pageIndex) {
      state.board.offset = (pageIndex - 1) * state.board.listRowCount;
      state.board.currentPageIndex = pageIndex;
    },
    SET_BOARD_CATEGORY(state, category) {
      state.board.category = category;
    },

    SET_NOTICE_LIST(state, list) {
      state.notice.list = list;
    },
    SET_NOTICE_TOTAL_LIST_ITEM_COUNT(state, count) {
      state.notice.totalListItemCount = count;
    },
    SET_NOTICE_MOVE_PAGE(state, pageIndex) {
      state.notice.offset = (pageIndex - 1) * state.notice.listRowCount;
      state.notice.currentPageIndex = pageIndex;
    },
    SET_NOTICE_CATEGORY(state, category) {
      state.notice.category = category;
    },
  },
  // for async method
  actions: {
    async boardList(context) {
      let params = {
        limit: this.state.board.limit,
        offset: this.state.board.offset,
        searchWord: this.state.board.searchWord,
        category: this.state.board.category,
      };

      try {
        let { data } = await http.get("/boards", { params });
        console.log("BoardMainVue: data : ");
        console.log(data);
        if (data.result == "login") {
          router.push("/login");
        } else {
          context.commit("SET_BOARD_LIST", data.list);
          context.commit("SET_BOARD_TOTAL_LIST_ITEM_COUNT", data.count);
        }
      } catch (error) {
        console.error(error);
      }
    },
    async noticeList(context) {
      let params = {
        limit: this.state.notice.limit,
        offset: this.state.notice.offset,
        searchWord: this.state.notice.searchWord,
        category: this.state.notice.category,
      };

      try {
        let { data } = await http.get("/notices", { params });
        console.log("NoticeMainVue: data : ");
        console.log(data);
        if (data.result == "login") {
          router.push("/login");
        } else {
          context.commit("SET_NOTICE_LIST", data.list);
          context.commit("SET_NOTICE_TOTAL_LIST_ITEM_COUNT", data.count);
        }
      } catch (error) {
        console.error(error);
      }
    },
    async preNoticeList(context) {
      let params = {
        limit: 3,
        offset: 0,
        searchWord: "",
        category: "",
      };

      try {
        let { data } = await http.get("/notices", { params });
        console.log("NoticeMainVue: data : ");
        console.log(data);
        if (data.result == "login") {
          router.push("/login");
        } else {
          context.commit("SET_NOTICE_LIST", data.list);
          context.commit("SET_NOTICE_TOTAL_LIST_ITEM_COUNT", data.count);
        }
      } catch (error) {
        console.error(error);
      }
    },

    logout() {
      this.commit("SET_LOGOUT");
    },
  },
  getters: {
    isLogin: function (state) {
      return state.login.isLogin;
    },

    // BOARD getters
    getBoardList: function (state) {
      return state.board.list;
    },
    // pagination
    getPageCount: function (state) {
      return Math.ceil(state.board.totalListItemCount / state.board.listRowCount);
    },
    getStartPageIndex: function (state) {
      if (state.board.currentPageIndex % state.board.pageLinkCount == 0) {
        return (state.board.currentPageIndex / state.board.pageLinkCount - 1) * state.board.pageLinkCount + 1;
      } else {
        return Math.floor(state.board.currentPageIndex / state.board.pageLinkCount) * state.board.pageLinkCount + 1;
      }
    },
    getEndPageIndex: function (state, getters) {
      let ret = 0;
      if (state.board.currentPageIndex % state.board.pageLinkCount == 0) {
        ret = (state.board.currentPageIndex / state.board.pageLinkCount - 1) * state.board.pageLinkCount + state.board.pageLinkCount;
      } else {
        ret = Math.floor(state.board.currentPageIndex / state.board.pageLinkCount) * state.board.pageLinkCount + state.board.pageLinkCount;
      }
      return ret > getters.getPageCount ? getters.getPageCount : ret;
    },
    getPrev: function (state) {
      if (state.board.currentPageIndex <= state.board.pageLinkCount) {
        return false;
      } else {
        return true;
      }
    },
    getNext: function (state, getters) {
      if (Math.floor(getters.getPageCount / state.board.pageLinkCount) * state.board.pageLinkCount < state.board.currentPageIndex) {
        return false;
      } else {
        return true;
      }
    },

    // NOTICE Getters
    getNoticeList: function (state) {
      return state.notice.list;
    },
    // pagination
    getNoticePageCount: function (state) {
      return Math.ceil(state.notice.totalListItemCount / state.notice.listRowCount);
    },
    getNoticeStartPageIndex: function (state) {
      if (state.notice.currentPageIndex % state.notice.pageLinkCount == 0) {
        return (state.notice.currentPageIndex / state.notice.pageLinkCount - 1) * state.notice.pageLinkCount + 1;
      } else {
        return Math.floor(state.notice.currentPageIndex / state.notice.pageLinkCount) * state.notice.pageLinkCount + 1;
      }
    },
    getNoticeEndPageIndex: function (state, getters) {
      let ret = 0;
      if (state.notice.currentPageIndex % state.notice.pageLinkCount == 0) {
        ret = (state.notice.currentPageIndex / state.notice.pageLinkCount - 1) * state.notice.pageLinkCount + state.notice.pageLinkCount;
      } else {
        ret = Math.floor(state.notice.currentPageIndex / state.notice.pageLinkCount) * state.notice.pageLinkCount + state.notice.pageLinkCount;
      }
      return ret > getters.getNoticePageCount ? getters.getNoticePageCount : ret;
    },
    getNoticePrev: function (state) {
      if (state.notice.currentPageIndex <= state.notice.pageLinkCount) {
        return false;
      } else {
        return true;
      }
    },
    getNoticeNext: function (state, getters) {
      if (Math.floor(getters.getNoticePageCount / state.notice.pageLinkCount) * state.notice.pageLinkCount < state.notice.currentPageIndex) {
        return false;
      } else {
        return true;
      }
    },
  },
});
