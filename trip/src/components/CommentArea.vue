<template>
  <div>
    <div class="mb-3">
      <label for="exampleFormControlTextarea1" class="form-label">댓글 쓰기</label>
      <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="content"></textarea>
      <button @click="commentInsert" class="btn btn-sm btn-primary btn-outline float-end" type="button">등록</button>
    </div>
    <h1>댓글</h1>
    <table>
      <tbody>
        <tr v-for="(comment, index) in list" :key="index">
          <td>{{ comment.userName }}</td>
          <td>{{ comment.content }}</td>
          <td>{{ comment.regDt }}</td>
          <td v-if="comment.sameUser"><button @click="commentDelete(comment.commentId)" class="btn btn-sm btn-primary btn-outline float-end" type="button">삭제</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import http from "@/common/axios";

import Vue from "vue";
import VueAlertify from "vue-alertify";
Vue.use(VueAlertify);

export default {
  props: ["boardId"],
  data() {
    return {
      content: "",

      commentList: [],
    };
  },
  methods: {
    async commentInsert() {
      let comment = {
        boardId: this.boardId,
        content: this.content,
      };
      try {
        let { data } = await http.post("/boards/comments", comment);
        console.log(data.result);

        this.getCommentList();
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
};
</script>
