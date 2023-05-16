<template>
  <AuthenticationWrap
    :style="{
      backgroundImage: `url('${require('../static/img/admin-bg-light.png')}')`,
    }"
  >
    <div class="ninjadash-authentication-wrap">
      <div class="ninjadash-authentication-brand">
        <img :src="require('../static/img/Logo_Dark.svg')" alt="" />
        <!-- 로고 이미지 -->
      </div>
      <router-view></router-view>
    </div>
  </AuthenticationWrap>
</template>
<script>
import { Content, AuthenticationWrap } from "./style";

const AuthLayout = {
  name: "AuthLayout",
  components: { Content, AuthenticationWrap },
};

export default AuthLayout;
</script>
