<template>
  <v-container>
    <v-row class="vh-100">
      <v-col align-self="center">
        <v-card class="mx-auto pa-8" style="width: 500px" rounded="xl">
          <h2
            class="text-h3 text-center font-weight-bold"
            style="color: #bae6fd"
          >
            비밀번호찾기
          </h2>
          <v-form class="mt-8">
            <v-text-field
              type="email"
              v-model="userEmail"
              placeholder="이메일"
              outlined
              height="64px"
              class="font-weight-bold"
              prepend-inner-icon="mdi-account"
            ></v-text-field>

            <v-btn
              block
              elevation="0"
              x-large
              class="text-h6 text-white font-weight-bold"
              style="background: #bae6fd"
              @click="findPassword"
            >
              비밀번호찾기
            </v-btn>
          </v-form>

          <div class="mt-8 text-center">
            <div class="mt-4">
              <router-link to="/register" class="link">회원가입</router-link>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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

<style scoped>
.link {
  color: #606060;
  font-size: 1rem;
}

.link:hover {
  text-decoration: underline;
}
</style>
