<template>
  <a-layout-header class="header bg-sky-200 shadow-current" style="width: 100vw">
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <router-link to="/main">
          <img src="../assets/logo.png" class="mr-2" style="height: 64px" />
        </router-link>
      </div>
      <div class="flex items-center justify-end">
        <router-link v-show="!$store.state.login.isLogin" to="/login" class="btn">로그인</router-link>
        <router-link v-show="!$store.state.login.isLogin" to="/register" class="btn">회원가입</router-link>
        <a @click="logout" v-show="$store.state.login.isLogin" to="/" class="btn">로그아웃</a>
        <router-link v-show="$store.state.login.isLogin" to="/userProfile" class="btn">회원정보</router-link>
      </div>
    </div>
  </a-layout-header>
</template>

<script>
export default {
  name: "TopNavBar",

  methods: {
    logout() {
      localStorage.setItem("isLogin", "false");
      console.log("로그아웃 " + localStorage.getItem("isLogin"));
      this.$store.commit("SET_LOGOUT");
    },
  },
  created() {
    console.log("새로고침 created");
  },
};
</script>
