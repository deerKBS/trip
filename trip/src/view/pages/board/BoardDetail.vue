<template>
  <div>
    <h5 class="modal-title">글 상세</h5>
    <table class="table">
      <tbody>
        <tr>
          <td>글번호</td>
          <td>{{ board.boardId }}</td>
        </tr>
        <tr>
          <td>분류</td>
          <td>{{ board.categoryName }}</td>
        </tr>
        <tr>
          <td>제목</td>
          <td>{{ board.title }}</td>
        </tr>
        <tr>
          <td>내용</td>
          <td v-html="board.content"></td>
        </tr>
        <tr>
          <td>작성자</td>
          <td>{{ board.userName }}</td>
        </tr>
        <tr>
          <td>작성일시</td>
          <td>{{ board.regDate }} {{ board.regTime }}</td>
        </tr>
        <tr>
          <td>조회수</td>
          <td>{{ board.readCount }}</td>
        </tr>
        <tr>
          <td colspan="2">첨부파일</td>
        </tr>
        <tr v-if="board.fileList.length > 0">
          <td colspan="2">
            <!-- 반복 -->
            <div v-for="(file, index) in board.fileList" :key="index">
              <span class="fileName">{{ file.fileName }}</span>
              &nbsp;&nbsp;
              <a type="button" class="btn btn-outline btn-default btn-xs" v-bind:href="file.fileUrl" v-bind:download="file.fileName">내려받기</a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <button v-show="board.sameUser" @click="changeToUpdate" class="btn btn-sm btn-primary btn-outline" type="button">글 수정하기</button>
    <button v-show="board.sameUser" @click="changeToDelete" class="btn btn-sm btn-warning btn-outline" type="button">글 삭제하기</button>

    <div class="mb-3">
      <label for="exampleFormControlTextarea1" class="form-label">댓글 쓰기</label>
      <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="content"></textarea>
      <button @click="commentInsert" class="btn btn-sm btn-primary btn-outline float-end" type="button">등록</button>
    </div>
    <h1>댓글</h1>
    <table class="table">
      <tbody>
        <tr v-for="(comment, index) in list" :key="index">
          <td>{{ comment.userName }}</td>
          <td>{{ comment.content }}</td>
          <td>{{ comment.regDt | makeComentRegDt }}</td>
          <td v-if="comment.sameUser"><button @click="commentDelete(comment.commentId)" class="btn btn-sm btn-primary btn-outline float-end" type="button">삭제</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import http from "@/common/axios.js";
import util from "@/common/util.js";

// 삭제
import Vue from "vue";
import VueAlertify from "vue-alertify";
Vue.use(VueAlertify);

export default {
  data() {
    return {
      board: {
        boardId: 0,
        title: "",
        content: "",
        userName: "",
        regDate: "",
        regTime: "",
        readCount: 0,
        fileList: [],
        sameUser: false,
        categoryName: "",
        //category:"",
      },
      content: "",
      commentList: [],
    };
  },
  async created() {
    this.boardDetail(this.$route.params.boardId);
    this.getCommentList(this.$route.params.boardId);
  },
  methods: {
    // util
    makeDateStr: util.makeDateStr,

    // detail
    async boardDetail(boardId) {
      let response = await http.get("/boards/" + boardId);
      let { data } = response;
      console.log(data);

      if (data.result == "login") {
        this.$router.push("/login");
      } else {
        let { regDt } = data.dto;
        let boardNew = {
          regDate: util.makeDateStr(regDt.date.year, regDt.date.month, regDt.date.day, "."),
          regTime: util.makeTimeStr(regDt.time.hour, regDt.time.minute, regDt.time.second, ":"),
          ...data.dto,
        };
        this.board = boardNew;
      }
    },
    changeToUpdate() {
      this.$router.push({
        path: "/board/update/" + this.$route.params.boardId,
      });
    },
    changeToDelete() {
      var $this = this; // alertify.confirm-function()에서 this는 alertify 객체
      this.$alertify.confirm(
        "이 글을 삭제하시겠습니까?",
        function () {
          $this.boardDelete(); // $this 사용
        },
        function () {
          console.log("cancel");
        }
      );
    },
    async boardDelete() {
      try {
        let response = await http.delete("/boards/" + this.board.boardId);
        let data = response;
        console.log(data);

        if (data.result == "login") {
          this.$router.href = "/login";
        } else {
          this.$alertify.success("글이 삭제되었습니다.");
          this.$router.push("/board");
        }
      } catch (error) {
        console.error(error);
        this.$alertify.error("글 삭제 과정에 문제가 생겼습니다.");
      }
    },
    async getCommentList() {
      try {
        let { data } = await http.get("/boards/comments/" + this.$route.params.boardId);

        this.commentList = data.list;
      } catch (error) {
        console.error(error);
      }
    },
    async commentInsert() {
      let comment = {
        boardId: this.$route.params.boardId,
        content: this.content,
      };
      try {
        let { data } = await http.post("/boards/comments", comment);
        console.log(data.result);

        this.getCommentList();
        this.content = "";
        this.$alertify.success("댓글이 등록되었습니다.");
      } catch (error) {
        console.log("CommentInsert error");
        this.$alertify.error("댓글 등록에 실패하였습니다.");
      }
    },
    async commentDelete(commentId) {
      try {
        let response = await http.delete("/boards/comments/" + commentId);
        console.log(response);

        this.getCommentList();
        this.$alertify.success("댓글이 삭제되었습니다.");
      } catch (error) {
        console.log(error);
        this.$alertify.error("댓글 삭제에 실패하였습니다.");
      }
    },
  },
  computed: {
    list: function () {
      return this.commentList;
    },
  },
  filters: {
    makeDateStr(date, separator) {
      return date.year + separator + (date.month < 10 ? "0" + date.month : date.month) + separator + (date.day < 10 ? "0" + date.day : date.day);
    },
    makeComentRegDt(dateTime) {
      let date = dateTime.date;
      let time = dateTime.time;

      let now = new Date();
      if (date.year == now.getFullYear() && date.month == now.getMonth() + 1 && date.day == now.getDate()) {
        let t = parseInt(now.getHours()) - parseInt(time.hour);
        let m = parseInt(now.getMinutes()) - parseInt(time.minute);
        if (m < 0) {
          t = t - 1;
          m = m + 60;
        }
        return t + "시간 " + m + "분 전";
      } else {
        return date.year + "." + date.month + "." + date.day;
      }
    },
  },
};
</script>
