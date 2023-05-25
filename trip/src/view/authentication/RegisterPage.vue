<template>
  <v-container>
    <v-row class="vh-100">
      <v-col align-self="center">
        <v-card class="mx-auto pa-8" style="width: 640px" rounded="xl">
          <h2
            class="text-h3 text-center font-weight-bold"
            style="color: #bae6fd"
          >
            회원가입
          </h2>
          <v-form ref="form" class="mt-8">
            <v-text-field
              type="email"
              v-model="userName"
              placeholder="이름"
              outlined
              height="64px"
              class="font-weight-bold"
              prepend-inner-icon="mdi-account"
              :rules="[rules.nameRequired, rules.name]"
            ></v-text-field>

            <v-text-field
              type="email"
              v-model="userEmail"
              placeholder="이메일"
              outlined
              height="64px"
              class="font-weight-bold mt-4"
              prepend-inner-icon="mdi-account"
              :rules="[rules.emailRequired, rules.email]"
            ></v-text-field>

            <v-text-field
              :type="show1 ? 'text' : 'password'"
              v-model="userPassword"
              placeholder="비밀번호"
              outlined
              height="64px"
              class="font-weight-bold mt-4"
              prepend-inner-icon="mdi-lock"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show1 = !show1"
              :rules="[rules.passwordRequired, rules.password]"
            ></v-text-field>

            <v-text-field
              :type="show2 ? 'text' : 'password'"
              v-model="userPassword2"
              placeholder="비밀번호 재확인"
              outlined
              height="64px"
              class="font-weight-bold mt-4"
              prepend-inner-icon="mdi-lock"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show2 = !show2"
              :rules="[rules.password2Required, rules.password2]"
            ></v-text-field>

            <v-btn
              block
              elevation="0"
              x-large
              class="text-h6 text-white font-weight-bold mt-4"
              style="background: #bae6fd"
              @click="register"
            >
              가입하기
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vue from "vue";
import VueAlertify from "vue-alertify";
Vue.use(VueAlertify);

import http from "@/common/axios.js";

export default {
  // data 사용 X
  data() {
    return {
      // v-model
      userName: "",
      userEmail: "",
      userPassword: "",
      userPassword2: "",

      // 회원 구분
      groupCode: "001",
      codeList: [],
      userClsf: "001", // 일반회원 default

      // 비밀번호 show 여부
      show1: false,
      show2: false,

      // 유효성 검사
      valid: {
        name: false,
        email: false,
        password: false,
        password2: false,
      },

      rules: {
        nameRequired: (value) => {
          this.valid.name = !!value;
          return this.valid.name || "필수 정보입니다.";
        },
        emailRequired: (value) => {
          this.valid.email = !!value;
          return this.valid.email || "필수 정보입니다.";
        },
        passwordRequired: (value) => {
          this.valid.password = !!value;
          return this.valid.password || "필수 정보입니다.";
        },
        password2Required: (value) => {
          this.valid.password2 = !!value;
          return this.valid.password2 || "필수 정보입니다.";
        },
        name: (value) => {
          this.valid.name = value.length <= 20;
          return this.valid.name || "이름은 최대 20자까지 입력 가능합니다.";
        },
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          this.valid.email = pattern.test(value);
          return this.valid.email || "이메일 형식이 올바르지 않습니다.";
        },
        password: (value) => {
          const patternEng = /[a-zA-Z]+/;
          const patternSpe = /[~!@#$%^&*()_+|<>?:{}]+/;
          const patternNum = /[0-9]+/;
          this.valid.password =
            value.length <= 16 &&
            patternEng.test(value) &&
            patternSpe.test(value) &&
            patternNum.test(value);
          return (
            this.valid.password ||
            "8~16자 영문 대소문자, 숫자, 특수문자를 사용하세요."
          );
        },
        password2: (value) => {
          this.valid.password2 = value == this.userPassword;
          return this.valid.password2 || "비밀번호가 일치하지 않습니다.";
        },
      },
    };
  },
  methods: {
    async register() {
      this.$refs.form.validate();

      let valid =
        this.valid.name &&
        this.valid.email &&
        this.valid.password &&
        this.valid.password2;

      if (!valid) return;

      let registerObj = {
        userName: this.userName,
        userEmail: this.userEmail,
        userPassword: this.userPassword,
        userClsf: this.userClsf,
      };
      try {
        let { data } = await http.post("/users", registerObj); // JSON Request, { params : registerObj } X params 를 쓰면 get => query string
        console.log("RegisterVue: data : ");
        console.log(data.result);

        let $this = this;
        this.$alertify.alert(
          "회원가입을 축하합니다. 로그인 페이지로 이동합니다",
          function () {
            $this.$router.push("/login");
          }
        );
      } catch (error) {
        console.log("RegisterVue: error : ");
        console.log(error);
        this.$alertify.error("서버에 문제가 발생했습니다.");
      }
    },
  },
  async created() {
    let params = {
      groupCode: this.groupCode,
    };

    try {
      let { data } = await http.get("/codes", { params }); // params : params shorthand property, Not JSON request
      console.log("RegisterVue: data : ");
      console.log(data);

      this.codeList = data;
    } catch (error) {
      console.log("RegisterVue: error : ");
      console.log(error);
      this.$alertify.error("서버에 문제가 발생했습니다.");
    }
  },
};
</script>
