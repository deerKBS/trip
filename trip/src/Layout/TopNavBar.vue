<template>
  <a-layout-header class="header bg-sky-200 shadow-current">
    <router-link v-show="!userInfo" to="/login" class="btn">로그인</router-link>
    <router-link v-show="!userInfo" to="/register" class="btn">회원가입</router-link>
    <a @click="logout" v-show="userInfo" class="btn">로그아웃</a>
    <router-link v-show="userInfo" to="/userProfile" class="btn">회원정보</router-link>
  </a-layout-header>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  name: "TopNavBar",

  computed: {
    ...mapState(memberStore, ["isLogin", "userInfo"]),
    ...mapGetters(["checkUserInfo"]),
  },
  methods: {
    ...mapActions(memberStore, ["userLogout"]),
    // ...mapMutations(memberStore, ["SET_IS_LOGIN", "SET_USER_INFO"]),
    logout() {
      // this.SET_IS_LOGIN(false);
      // this.SET_USER_INFO(null);
      // sessionStorage.removeItem("access-token");
      // if (this.$route.path != "/") this.$router.push({ name: "main" });
      console.log("logout " + this.userInfo.userEmail);
      //vuex actions에서 userLogout 실행(Backend에 저장 된 리프레시 토큰 없애기
      //+ satate에 isLogin, userInfo 정보 변경)
      // this.$store.dispatch("userLogout", this.userInfo.userid);
      this.userLogout(this.userInfo.userEmail);
      sessionStorage.removeItem("access-token"); //저장된 토큰 없애기
      sessionStorage.removeItem("refresh-token"); //저장된 토큰 없애기
      console.log("돌아가나 " + this.userInfo);
      if (this.$route.path !== "/main") this.$router.push({ name: "main" });
    },
  },
  created() {
    //console.log("userinfo: " + this.userInfo.userEmail);
  },
};
</script>
