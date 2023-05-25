<template>
  <v-container>
    <v-row class="vh-100">
      <v-col align-self="center">
        <v-card class="mx-auto pa-8" style="width: 500px" rounded="xl">
          <h2
            class="text-h3 text-center font-weight-bold"
            style="color: #bae6fd"
          >
            로그인
          </h2>
          <v-form class="mt-8">
            <v-text-field
              type="email"
              v-model="$store.state.login.userEmail"
              placeholder="이메일"
              outlined
              height="64px"
              class="font-weight-bold"
              prepend-inner-icon="mdi-account"
            ></v-text-field>

            <v-text-field
              :type="show ? 'text' : 'password'"
              v-model="$store.state.login.userPassword"
              placeholder="비밀번호"
              outlined
              height="64px"
              class="font-weight-bold"
              prepend-inner-icon="mdi-lock"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show = !show"
            ></v-text-field>

            <v-btn
              block
              elevation="0"
              x-large
              class="text-h6 text-white font-weight-bold"
              style="background: #bae6fd"
              @click="login"
            >
              로그인
            </v-btn>
          </v-form>

          <div class="mt-8 text-center">
            <div>
              <router-link to="/findPassword" class="link">
                비밀번호를 잊어버리셨나요?
              </router-link>
            </div>
            <div class="mt-4">
              <router-link to="/register" class="link">회원가입</router-link>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<!--  위 코드에서 value 1234 실제 서비스시 반드시 지워야 함-->

<script>
import Vue from "vue";
import VueAlertify from "vue-alertify";
Vue.use(VueAlertify);

import http from "@/common/axios.js";
//
export default {
  data() {
    return {
      show: false,
    };
  },
  methods: {
    async login() {
      let loginObj = {
        userEmail: this.$store.state.login.userEmail,
        userPassword: this.$store.state.login.userPassword,
      };
      console.log(
        "로그인결과 " +
          this.$store.state.login.userEmail +
          " " +
          this.$store.state.login.userPassword
      );

      try {
        let { data } = await http.post("/login", loginObj);

        console.log("로그인결과 no catch " + data.result);

        if (data.result != "fail") {
          console.log("LoginVue: data : ");
          console.log(data);
          console.log(data.userName);

          this.$store.commit("SET_LOGIN", {
            isLogin: true,
            userName: data.userName,
            userProfileImageUrl: data.userProfileImageUrl,
            userRegisterDate: data.userRegisterDate,
            userEmail: data.userEmail,
          });

          localStorage.setItem("isLogin", "true");

          this.$router.push("/");
        }
      } catch (error) {
        console.log("LoginVue: error : ");
        console.log(error);
        if (error.response.status == "404") {
          this.$alertify.error("이메일 또는 비밀번호를 확인하세요.");
        } else {
          this.$alertify.error("Opps!! 서버에 문제가 발생했습니다.");
        }
      }
    },
  },
  created() {
    this.$store.state.login.userEmail = "deer119@naver.com";
    this.$store.state.login.userPassword = "1q2w3e!";
  },
};
</script>

<style scoped>
.link {
  color: #606060;
  font-size: 1rem;
}

.link:hover {
  text-decoration: underline;
}
</style>
