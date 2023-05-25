<template>
  <div style="margin: auto; width: 80%">
    <div class="container w-full">
      <p class="row float-left my-3" style="font-size: 30px; border-bottom: 5px solid #188fff">No.{{ board.boardId }}</p>
      <div class="mt-4">
        <button v-show="board.sameUser" @click="changeToDelete" class="btn float-end custom-btn" type="button">글 삭제하기</button>
        <button v-show="board.sameUser" @click="changeToUpdate" class="btn float-end custom-btn" type="button">글 수정하기</button>
        <router-link to="/board">
          <button class="btn float-end custom-btn" type="button">목록으로</button>
        </router-link>
      </div>
      <div class="row justify-content-between" style="min-width: 100%">
        <div class="bg-white p-4 shadow-lg" style="border-radius: 20px">
          <div class="container">
            <div class="row">
              <div>{{ board.categoryName }}</div>
            </div>
            <div class="row">
              <div style="width: 100px">제목</div>
              <div class="w-fit">{{ board.title }}</div>
            </div>
            <div class="row">
              <div style="width: 100px">작성자</div>
              <div class="w-fit">{{ board.userName }}</div>
            </div>
            <div class="row">
              <div style="width: 100px">작성일</div>
              <div style="width: 130px; border-right: 1px solid">{{ board.regDate }}</div>
              <div style="width: 120px">작성시간</div>
              <div style="width: 130px; border-right: 1px solid">{{ board.regTime }}</div>
              <div style="width: 100px">조회수</div>
              <div style="width: 100px">{{ board.readCount }}</div>
            </div>
            <div class="row">
              <div style="width: 100px">내용</div>
            </div>
            <div class="row" style="height: 300px" v-html="board.content"></div>
            <div class="row">
              <div>첨부파일</div>
            </div>
            <div class="row">
              <div class="row" v-for="(file, index) in board.fileList" :key="index">
                <span class="fileName">{{ file.fileName }}</span>
                &nbsp;&nbsp;
                <a type="button" class="btn btn-outline btn-default btn-xs" v-bind:href="file.fileUrl" v-bind:download="file.fileName">내려받기</a>
              </div>
            </div>
          </div>
          <div class="bg-sky-100">
            <div class="mb-3 pt-3">
              <label for="exampleFormControlTextarea1" class="form-label px-4" style="border-bottom: 2px solid #8dd3f8">댓글 쓰기</label>
              <div class="px-3">
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="content"></textarea>
              </div>
              <button @click="commentInsert" class="btn btn-sm custom-btn float-end mt-2" type="button">등록</button>
            </div>
            <div class="mt-4 w-fit px-4" style="border-bottom: 2px solid #8dd3f8">댓글</div>
            <div class="p-4">
              <table class="table" style="font-size: 15px">
                <tbody>
                  <tr v-for="(comment, index) in list" :key="index" style="border-bottom: 1px solid">
                    <td>{{ comment.userName }}</td>
                    <td>{{ comment.content }}</td>
                    <td>{{ comment.regDt | makeComentRegDt }}</td>
                    <td v-if="comment.sameUser"><button @click="commentDelete(comment.commentId)" class="btn btn-sm float-end custom-btn" type="button">삭제</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
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
<style scoped>
.custom-btn {
  background: #ffffff;
  border: #fea4d7 solid;
  border-radius: 10px;
  float: right;
  margin-right: 10px;
}
.custom-btn:hover {
  color: white;
  background: #fea4d7;
}
div >>> .ck-editor__editable {
  width: 100%;
  height: 300px;
  overflow-y: scroll;
}
.container > .row {
  font-size: 20px;
  height: 50px;
  border-bottom: 1px solid;
  display: flex;
  align-items: center;
}
</style>
