<template>
  <div class="google-login">
    <b-card v-if="isLogin">
      <b-card-title>
        유저 정보
      </b-card-title>
      <b-card-body style="text-align: left; padding: 0 15%">
        <b-form-group
            label="Key"
            label-cols="2"
            label-cols-lg="2"
            label-cols-md="3"
            label-size="sm"
            label-align-sm="right"
            label-for="input-sm">
          <b-form-input
              v-model="user.id"
              type="text"
              size="sm"
              class="width-350"
              disabled
          />
        </b-form-group>
        <b-form-group
            label="아이디"
            label-cols="2"
            label-cols-lg="2"
            label-cols-md="3"
            label-size="sm"
            label-align-sm="right"
            label-for="input-sm">
          <b-form-input
              v-model="user.userId"
              type="text"
              size="sm"
              class="width-350"
              disabled
          />
        </b-form-group>
        <b-form-group
            label="이름"
            label-cols="2"
            label-cols-lg="2"
            label-cols-md="3"
            label-size="sm"
            label-align-sm="right"
            label-for="input-sm">
          <b-form-input
              v-model="user.userName"
              type="text"
              size="sm"
              class="width-350"
              disabled
          />
        </b-form-group>
        <b-form-group
            label="이메일"
            label-cols="2"
            label-cols-lg="2"
            label-cols-md="3"
            label-size="sm"
            label-align-sm="right"
            label-for="input-sm">
          <b-form-input
              v-model="user.userEmail"
              type="text"
              size="sm"
              class="width-350"
              disabled
          />
        </b-form-group>
      </b-card-body>
      <b-card-body style="text-align: right">
        <b-button variant="danger" @click="doLogout()">로그아웃</b-button>
      </b-card-body>
    </b-card>
    <b-card v-else>
      <b-card-title>
        로그인
      </b-card-title>
      <b-card-body>
        <b-card-text>
          <img src="@/assets/img/google_login_button.png" @click="doGoogleLogin()" style="width: 200px;" alt="구글 로그인" />
        </b-card-text>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "GoogleLogin",
  data() {
    return {
      userKey: this.$cookie.getCookie('user-key'),
      user: {
        id: '',
        userId: '',
        userName: '',
        userEmail: ''
      }
    }
  },
  computed: {
    isLogin() {
      return this.userKey
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      if (this.isLogin) {
        this.getUser()
      }
    },
    getUser() {
      this.$axios.get('/user/' + this.userKey).then((response) => {
        this.user = response.data
      })
    },
    
    doGoogleLogin() {
      const url = 'https://accounts.google.com/o/oauth2/v2/auth?client_id=' +
          "1006441345728-5lfi9bk5au7th30fqnh10q1d1m2f3re2.apps.googleusercontent.com" +
          '&redirect_uri=' +
          "http://localhost:8080/login/oauth2/code/google" +
          '&response_type=code' +
          '&scope=email profile';

      this.showSocialLoginPopup(url)
    },
    showSocialLoginPopup(url) {
      const popupHeight = '500'
      const popupWidth = '500'
      let popupOptions = 'height=--popupHeight--,width=--popupWidth--,left=--popupX--,top=--popupY--,scrollbars=yes,resizable=yes'

      popupOptions = popupOptions.replace('--popupHeight--', popupHeight)
      popupOptions = popupOptions.replace('--popupWidth--', popupWidth)

      this.openPopup(url, popupOptions)
      return false
    },
    openPopup(url, options) {
      window.open(
          url,
          '_blank',
          options
      )
    },
    doLogout() {
      this.$cookie.removeCookie('user-key')
      this.userKey = ''
      this.user = {}
    }
  }
}
</script>

<style scoped>
  .google-login {
    padding: 0 25%;
  }
</style>
