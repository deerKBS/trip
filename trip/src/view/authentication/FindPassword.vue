<template>
  <div class="container">
    <div class="container-fluid text-sm-center p-5 bg-light">
      <!-- bg-light is background color & p-5 is padding -->
      <h1 class="display-2">비밀번호 찾기</h1>
    </div>
    <h2 class="mb-3 mt-3">찾을 비밀번호의 이메일 입력</h2>
    <div class="mb-3">
      <input type="email" class="form-control" v-model="this.userEmail" placeholder="Email" />
    </div>
    <div>
      <button @click="findPassword" class="btn btn-primary">이메일 전송</button>
      <router-link to="/register" class="btn btn-success float-end">회원가입</router-link>
    </div>
  </div>
</template>

<script>
// import Vue from "vue";
// import VueAlertify from "vue-alertify";
// Vue.use(VueAlertify);

import http from "@/common/axios.js";

export default {
  data() {
    return {
      userEmail: "",
    };
  },
  methods: {
    async findPassword() {
      try {
        let { data } = await http.post("/login/findPassword/" + this.userEmail);

        console.log("LoginVue: data : ");
        console.log(data);
        console.log(data.userName);

        // board 로 이동
        this.$router.push("/login");
      } catch (error) {
        console.log("LoginVue: error : ");
        console.log(error);
        if (error.response.status == "404") {
          this.$alertify.error("이메일을 확인하세요.");
        } else {
          this.$alertify.error("Opps!! 서버에 문제가 발생했습니다.");
        }
      }
    },
  },
};
</script>

<style scoped></style>
