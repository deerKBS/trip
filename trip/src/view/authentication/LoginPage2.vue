<template>
  <div class="container">
    <h2 class="mb-3 mt-3">Login</h2>
    <div class="mb-3">
      <input type="text" class="form-control" id="userEmail" v-model="user.userEmail" required placeholder="아이디 입력...." @keyup.enter="confirm" />
    </div>
    <div class="mb-3">
      <input type="password" class="form-control" v-model="user.userPassword" placeholder="Password" @keyup.enter="confirm" />
    </div>
    <div>
      <button @click="confirm" class="btn btn-primary">로그인</button>
      <router-link to="/findPassword"> 비밀번호를 잊어버리셨나요?</router-link>
      <router-link to="/register" class="btn btn-success float-end">회원가입</router-link>
    </div>
  </div>
</template>
<!--  위 코드에서 value 1234 실제 서비스시 반드시 지워야 함-->

<script>
import { mapState, mapActions } from "vuex";

const memberStore = "memberStore";

import Vue from "vue";
import VueAlertify from "vue-alertify";
Vue.use(VueAlertify);

//
export default {
  data() {
    return {
      // isLoginError: false,
      user: {
        userEmail: null,
        userPassword: null,
      },
    };
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "isLoginError", "userInfo"]),
  },
  methods: {
    ...mapActions(memberStore, ["userConfirm", "getUserInfo"]),
    async confirm() {
      await this.userConfirm(this.user);
      let token = sessionStorage.getItem("access-token");
      console.log("1. confirm() token >> " + token);
      if (this.isLogin) {
        await this.getUserInfo(token);
        console.log("4. confirm() userInfo :: ", this.userInfo);

        this.$router.push({ name: "main" });
      }
    },
    movePage() {
      this.$router.push({ name: "join" });
    },
  },
};
</script>
