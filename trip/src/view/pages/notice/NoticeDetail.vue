<template>
  <div style="margin: auto; width: 80%">
    <div class="container w-full">
      <p class="row float-left my-3" style="font-size: 30px; border-bottom: 5px solid #188fff">No.{{ notice.noticeId }}</p>
      <div class="mt-4">
        <button v-show="notice.sameUser" @click="changeToDelete" class="btn float-end custom-btn" type="button">글 삭제하기</button>
        <button v-show="notice.sameUser" @click="changeToUpdate" class="btn float-end custom-btn" type="button">글 수정하기</button>
        <router-link to="/board">
          <button class="btn float-end custom-btn" type="button">목록으로</button>
        </router-link>
      </div>
      <div class="row justify-content-between" style="min-width: 100%">
        <div class="bg-white p-4 shadow-lg" style="border-radius: 20px">
          <div class="container bg-white">
            <div class="row">
              <div>{{ notice.categoryName }}</div>
            </div>
            <div class="row">
              <div style="width: 100px">제목</div>
              <div class="w-fit">{{ notice.title }}</div>
            </div>
            <div class="row">
              <div style="width: 100px">작성자</div>
              <div class="w-fit">{{ notice.userName }}</div>
            </div>
            <div class="row">
              <div style="width: 100px">작성일</div>
              <div style="width: 130px; border-right: 1px solid">{{ notice.regDate }}</div>
              <div style="width: 120px">작성시간</div>
              <div style="width: 130px; border-right: 1px solid">{{ notice.regTime }}</div>
              <div style="width: 100px">조회수</div>
              <div style="width: 100px">{{ notice.readCount }}</div>
            </div>
            <div class="row">
              <div style="width: 100px">내용</div>
            </div>
            <div class="row" style="height: 300px" v-html="notice.content"></div>
            <div class="row">
              <div>첨부파일</div>
            </div>
            <div class="row">
              <div class="row" v-for="(file, index) in notice.fileList" :key="index">
                <span class="fileName">{{ file.fileName }}</span>
                &nbsp;&nbsp;
                <a type="button" class="btn btn-outline btn-default btn-xs" v-bind:href="file.fileUrl" v-bind:download="file.fileName">내려받기</a>
              </div>
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
