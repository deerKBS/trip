<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <div class="alert alert-secondary"><h3>로그인</h3></div>
      </div>
    </div>
    <div class="row">
      <div class="col"></div>
      <div class="col-8">
        <div class="card text-center mt-3" style="max-width: 40rem" align="left">
          <form class="text-left">
            <div class="alert alert-danger" v-if="isLoginError">아이디 또는 비밀번호를 확인하세요.</div>
            <div class="mb-3">
              <label for="userEmail" class="form-label">아이디:</label>
              <input type="text" class="form-control" id="userEmail" v-model="user.userEmail" required placeholder="아이디 입력...." @keyup.enter="confirm" />
            </div>
            <div class="mb-3">
              <label for="userpwd" class="form-label">비밀번호:</label>
              <input
                type="password"
                class="form-control"
                id="userpwd"
                v-model="user.userPassword"
                required
                placeholder="비밀번호 입력...."
                @keyup.enter="confirm"
              />
            </div>
            <button type="button" class="btn btn-primary m-1" @click="confirm">로그인</button>
            <button type="button" class="btn btn-success m-1" @click="movePage">회원가입</button>
          </form>
        </div>
      </div>
      <div class="col"></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  name: "UserLogin",
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

<style></style>
