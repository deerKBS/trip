<template>
  <div class="container">
    <h1 class="text-center">공지사항</h1>

    <div class="input-group mb-3">
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">{{ categoryName }}</button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li v-for="(code, index) in codeList" :key="index">
            <a
              class="dropdown-item"
              @click="
                $store.commit('SET_NOTICE_CATEGORY', code.code);
                categoryName = code.codeName;
              "
              >{{ code.codeName }}</a
            >
          </li>
        </ul>
      </div>
      <input v-model="$store.state.notice.searchWord" @keydown.enter="noticeList" type="text" class="form-control" />

      <button @click="noticeList" class="btn btn-success" type="button">Search</button>
    </div>

    <table class="table table-hover">
      <thead>
        <tr>
          <th>No</th>
          <th>카테고리</th>
          <th>제목</th>
          <th>작성자</th>
          <th>작성일시</th>
          <th>조회수</th>
        </tr>
      </thead>
      <tbody>
        <tr style="cursor: pointer" v-for="(notice, index) in listGetters" @click="noticeDetail(notice.noticeId)" v-bind:key="index">
          <td>{{ notice.noticeId }}</td>
          <td>{{ notice.categoryName }}</td>
          <td>{{ notice.title }}</td>
          <td>{{ notice.userName }}</td>
          <td>{{ notice.regDt.date | makeDateStr(".") }}</td>
          <td>{{ notice.readCount }}</td>
        </tr>
      </tbody>
    </table>

    <PaginationUI v-on:call-parent="movePage" :page="`notice`"></PaginationUI>

    <button class="btn btn-sm btn-primary" @click="insertNotice()">글쓰기</button>
  </div>
</template>

<script>
import util from "@/common/util.js";
import http from "@/common/axios.js";

import PaginationUI from "@/components/PaginationUI.vue";

export default {
  name: "NoticeMain",
  components: { PaginationUI },
  data() {
    return {
      groupCode: "003",
      categoryName: "전체",
      codeList: [],
    };
  },
  computed: {
    listGetters() {
      return this.$store.getters.getNoticeList;
    },
  },
  methods: {
    noticeList() {
      this.$store.dispatch("noticeList");
    },

    // pagination
    movePage(pageIndex) {
      console.log("NoticeMainVue : movePage : pageIndex : " + pageIndex);

      this.$store.commit("SET_BOARD_MOVE_PAGE", pageIndex);

      this.noticeList();
    },

    insertNotice() {
      this.$router.push("/notice/insert");
    },

    // util
    makeDateStr: util.makeDateStr,

    // detail
    noticeDetail(noticeId) {
      this.$router.push("/notice/detail/" + noticeId);
    },
  },
  async created() {
    this.$store.commit("SET_NOTICE_CATEGORY", ""); // 카테고리 초기화
    this.movePage(1);
    this.noticeList(); // 초기 조건없이 리스트 받아오기

    // 카테고리 코드, 카테고리명 조회
    let params = {
      groupCode: this.groupCode,
    };
    try {
      let { data } = await http.get("/codes", { params }); // params : params shorthand property, Not JSON request
      console.log("RegisterVue: data : ");
      console.log(data);

      this.codeList = [{ code: "", codeName: "전체" }, ...data];
    } catch (error) {
      console.log("RegisterVue: error : ");
      console.log(error);
      this.$alertify.error("서버에 문제가 발생했습니다.");
    }
  },
  filters: {
    makeDateStr(date, separator) {
      return date.year + separator + (date.month < 10 ? "0" + date.month : date.month) + separator + (date.day < 10 ? "0" + date.day : date.day);
    },
  },
};
</script>

<style scoped></style>
