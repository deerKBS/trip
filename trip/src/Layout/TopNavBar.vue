<template>
  <a-layout-header class="header bg-blue-100">
    <router-link to="/login" class="btn">로그인</router-link>
    <router-link to="/register" class="btn">회원가입</router-link>
  </a-layout-header>
</template>

<script>
export default {
  name: "TopNavBar",
};
</script>
