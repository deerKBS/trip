<template>
  <div style="margin: auto; width: 80%">
    <div class="container w-full">
      <p class="row float-left my-1" style="font-size: 30px; border-bottom: 5px solid #188fff">게시판</p>
      <div class="row justify-content-between" style="min-width: 100%">
        <div class="dropdown col-2">
          <button class="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">{{ categoryName }}</button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li v-for="(code, index) in codeList" :key="index">
              <a
                class="dropdown-item"
                @click="
                  $store.commit('SET_BOARD_CATEGORY', code.code);
                  categoryName = code.codeName;
                "
                >{{ code.codeName }}</a
              >
            </li>
          </ul>
        </div>
        <div class="col-5 input-group">
          <input v-model="$store.state.board.searchWord" @keydown.enter="boardList" type="text" class="form-control" />

          <button @click="boardList" class="btn btn-info" type="button">Search</button>
        </div>
      </div>
    </div>
    <div class="bg-white p-3 mb-3 custom-tabe-back" style="border">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>No</th>
            <th>카테고리</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일시</th>
            <th>조회수</th>
            <th>댓글수</th>
          </tr>
        </thead>
        <tbody>
          <tr style="cursor: pointer" v-for="(notice, index) in noticeListGetters" @click="noticeDetail(notice.noticeId)" v-bind:key="index" class="custom-notice">
            <td>{{ notice.noticeId }}</td>
            <td>{{ notice.categoryName }}</td>
            <td>{{ notice.title }}</td>
            <td>{{ notice.userName }}</td>
            <td>{{ notice.regDt.date | makeDateStr(".") }}</td>
            <td>{{ notice.readCount }}</td>
            <td>-</td>
          </tr>
          <tr style="cursor: pointer" v-for="(board, index) in listGetters" @click="boardDetail(board.boardId)" v-bind:key="'board-' + index">
            <td>{{ board.boardId }}</td>
            <td>{{ board.categoryName }}</td>
            <td>{{ board.title }}</td>
            <td>{{ board.userName }}</td>
            <td>{{ board.regDt.date | makeDateStr(".") }}</td>
            <td>{{ board.readCount }}</td>
            <td>{{ board.commentCount }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <PaginationUI v-on:call-parent="movePage" :page="`board`"></PaginationUI>

    <button class="btn custom-btn" @click="insertBoard()">글쓰기</button>
  </div>
</template>

<script>
import util from "@/common/util.js";
import http from "@/common/axios.js";

import PaginationUI from "@/components/PaginationUI.vue";

export default {
  name: "BoardMain",
  components: { PaginationUI },
  data() {
    return {
      groupCode: "002",
      categoryName: "전체",
      codeList: [],
    };
  },
  computed: {
    listGetters() {
      return this.$store.getters.getBoardList;
    },
    noticeListGetters() {
      return this.$store.getters.getNoticeList;
    },
  },
  methods: {
    preNoticeList() {
      this.$store.dispatch("preNoticeList");
    },
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
      this.$router.push("/board/insert");
    },

    // util
    makeDateStr: util.makeDateStr,

    // detail
    boardDetail(boardId) {
      this.$router.push("/board/detail/" + boardId);
    },
    noticeDetail(noticeId) {
      this.$router.push("/notice/detail/" + noticeId);
    },
  },
  async created() {
    this.$store.commit("SET_BOARD_CATEGORY", ""); // 카테고리 초기화
    this.movePage(1);
    this.preNoticeList();
    this.boardList(); // 초기 조건없이 리스트 받아오기

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

<style scoped>
.custom-tabe-back {
  border: #bae6fd solid;
  border-radius: 20px;
}
.custom-notice {
  background: #febbe1;
}
.custom-btn {
  background: #ffffff;
  border: #fea4d7 solid;
  border-radius: 10px;
  float: right;
}
.custom-btn:hover {
  color: white;
  background: #fea4d7;
}
</style>
