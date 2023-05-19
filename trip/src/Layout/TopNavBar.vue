<template>
  <a-layout-header class="header bg-sky-200 shadow-current">
    <router-link v-show="!$store.state.login.isLogin" to="/login" class="btn">로그인</router-link>
    <router-link v-show="!$store.state.login.isLogin" to="/register" class="btn">회원가입</router-link>
    <router-link v-show="$store.state.login.isLogin" to="/userProfile" class="btn">회원정보</router-link>
  </a-layout-header>
</template>

<script>
export default {
  name: "TopNavBar",
};
</script>
