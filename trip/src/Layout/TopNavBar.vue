<template>
  <div>
    <h1>TopNavBar</h1>
    <router-link to="/auth/login" class="btn">로그인</router-link>
    <router-link to="/auth/register" class="btn">회원가입</router-link>
  </div>
</template>

<script>
export default {
  name: "TopNavBar",
};
</script>
