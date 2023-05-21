<template>
  <div class="container">
    <h4 class="text-center">게시판 - Main</h4>

    <div class="input-group mb-3">
      <!-- store 사용 -->
      <!-- <input v-model="searchWord" @keydown.enter="boardList" type="text" class="form-control"> -->
      <input v-model="$store.state.board.searchWord" @keydown.enter="boardList" type="text" class="form-control" />
      <button @click="boardList" class="btn btn-success" type="button">Search</button>
    </div>

    <table class="table table-hover">
      <thead>
        <tr>
          <th>#</th>
          <th>제목</th>
          <th>작성자</th>
          <th>작성일시</th>
          <th>조회수</th>
        </tr>
      </thead>
      <tbody>
        <tr style="cursor: pointer" v-for="(board, index) in listGetters" @click="boardDetail(board.boardId)" v-bind:key="index">
          <td>{{ board.boardId }}</td>
          <td>{{ board.title }}</td>
          <td>{{ board.userName }}</td>
          <td>{{ board.regDt.date | makeDateStr(".") }}</td>
          <td>{{ board.readCount }}</td>
        </tr>
      </tbody>
    </table>

    <PaginationUI v-on:call-parent="movePage" :page="`board`"></PaginationUI>

    <button class="btn btn-sm btn-primary" @click="insertBoard()">글쓰기</button>
  </div>
</template>

<script>
import util from "@/common/util.js";

import PaginationUI from "@/components/PaginationUI.vue";

// 삭제
// import Vue from "vue";
// import VueAlertify from "vue-alertify";
// Vue.use(VueAlertify);

export default {
  name: "BoardMain",
  components: { PaginationUI },
  computed: {
    listGetters() {
      return this.$store.getters.getBoardList;
    },
  },
  methods: {
    boardList() {
      this.$store.dispatch("boardList");
    },

    // pagination
    movePage(pageIndex) {
      console.log("BoardMainVue : movePage : pageIndex : " + pageIndex);

      this.$store.commit("SET_BOARD_MOVE_PAGE", pageIndex);

      this.boardList();
    },

    insertBoard() {
      this.$router.push("board/insert");
    },

    // util
    makeDateStr: util.makeDateStr,

    // detail
    async boardDetail(boardId) {
      this.$router.push("board/detail/" + boardId);
    },
  },
  created() {
    this.boardList();
  },
  filters: {
    makeDateStr(date, separator) {
      return date.year + separator + (date.month < 10 ? "0" + date.month : date.month) + separator + (date.day < 10 ? "0" + date.day : date.day);
    },
  },
};
</script>

<style scoped></style>
