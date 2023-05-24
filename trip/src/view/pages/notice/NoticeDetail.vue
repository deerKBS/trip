<template>
  <div>
    <h5 class="modal-title">글 상세</h5>
    <table class="table">
      <tbody>
        <tr>
          <td>글번호</td>
          <td>{{ notice.noticeId }}</td>
        </tr>
        <tr>
          <td>분류</td>
          <td>{{ notice.categoryName }}</td>
        </tr>
        <tr>
          <td>제목</td>
          <td>{{ notice.title }}</td>
        </tr>
        <tr>
          <td>내용</td>
          <td v-html="notice.content"></td>
        </tr>
        <tr>
          <td>작성자</td>
          <td>{{ notice.userName }}</td>
        </tr>
        <tr>
          <td>작성일시</td>
          <td>{{ notice.regDate }} {{ notice.regTime }}</td>
        </tr>
        <tr>
          <td>조회수</td>
          <td>{{ notice.readCount }}</td>
        </tr>
        <tr>
          <td colspan="2">첨부파일</td>
        </tr>
        <tr v-if="notice.fileList.length > 0">
          <td colspan="2">
            <!-- 반복 -->
            <div v-for="(file, index) in notice.fileList" :key="index">
              <span class="fileName">{{ file.fileName }}</span>
              &nbsp;&nbsp;
              <a type="button" class="btn btn-outline btn-default btn-xs" v-bind:href="file.fileUrl" v-bind:download="file.fileName">내려받기</a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <button v-show="notice.sameUser" @click="changeToUpdate" class="btn btn-sm btn-primary btn-outline" type="button">글 수정하기</button>
    <button v-show="notice.sameUser" @click="changeToDelete" class="btn btn-sm btn-warning btn-outline" type="button">글 삭제하기</button>
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
      notice: {
        noticeId: 0,
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
    };
  },
  async created() {
    this.noticeDetail(this.$route.params.noticeId);
  },
  methods: {
    // util
    makeDateStr: util.makeDateStr,

    // detail
    async noticeDetail(noticeId) {
      let response = await http.get("/notices/" + noticeId);
      let { data } = response;
      console.log(data);

      if (data.result == "login") {
        this.$router.push("/login");
      } else {
        let { regDt } = data.dto;
        let noticeNew = {
          regDate: util.makeDateStr(regDt.date.year, regDt.date.month, regDt.date.day, "."),
          regTime: util.makeTimeStr(regDt.time.hour, regDt.time.minute, regDt.time.second, ":"),
          ...data.dto,
        };
        this.notice = noticeNew;
      }
    },
    changeToUpdate() {
      this.$router.push({
        path: "/notice/update/" + this.$route.params.noticeId,
      });
    },
    changeToDelete() {
      var $this = this; // alertify.confirm-function()에서 this는 alertify 객체
      this.$alertify.confirm(
        "이 글을 삭제하시겠습니까?",
        function () {
          $this.noticeDelete(); // $this 사용
        },
        function () {
          console.log("cancel");
        }
      );
    },
    async noticeDelete() {
      try {
        let response = await http.delete("/notices/" + this.notice.noticeId);
        let data = response;
        console.log(data);

        if (data.result == "login") {
          this.$router.href = "/login";
        } else {
          this.$alertify.success("글이 삭제되었습니다.");
          this.$router.push("/notice");
        }
      } catch (error) {
        console.error(error);
        this.$alertify.error("글 삭제 과정에 문제가 생겼습니다.");
      }
    },
  },
  filters: {
    makeDateStr(date, separator) {
      return date.year + separator + (date.month < 10 ? "0" + date.month : date.month) + separator + (date.day < 10 ? "0" + date.day : date.day);
    },
  },
};
</script>
