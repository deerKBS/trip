<template>
  <div>
    <div id="Whole-background" style="padding: 10px">
      <div class="container mt-5">
        <h1>회원 정보 관리</h1>
        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
          <button type="button" class="btn btn-info" @click="showCard1">회원 정보 조회</button>
          <button type="button" class="btn btn-warning" @click="showCard2">회원 정보 수정</button>
          <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteProfileModal" @click="showCard3">회원 탈퇴</button>
        </div>
      </div>

      <!--  회원 정보 조회 카드 -->
      <div class="card mt-3 displayNone" v-show="card1" id="card1" style="width: 60%; left: 20%">
        <div class="card-body">
          <div id="profileInfo">
            <div class="container">
              <div>
                <table class="table table-bordered">
                  <tr>
                    <th>Email</th>
                    <td><input v-model="this.$store.state.login.userEmail" type="text" name="email" class="form-control" /></td>
                  </tr>

                  <tr>
                    <th>이름</th>
                    <td><input v-model="this.$store.state.login.userName" type="text" name="name" class="form-control" /></td>
                  </tr>
                  <tr>
                    <th>가입일</th>
                    <td>
                      <input v-model="this.$store.state.login.userRegisterDate" type="text" name="registerDate" class="form-control" />
                    </td>
                  </tr>
                </table>
                <!-- <input disabled id="submit" type="submit" value="수정" class="btn btn-primary"> -->
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--  회원 정보 수정 카드 -->
      <div class="card mt-3 displayNone" v-show="card2" style="width: 70%; left: 15%">
        <div class="card-body">
          <form id="editProfileForm" novalidate>
            <div class="mb-3">
              <label for="userPassword" class="form-label">새 비밀번호</label>
              <input v-model="newPassword" type="password" class="form-control" placeholder="Enter User Password" />
              <div class="valid-feedback">Valid</div>
              <div class="invalid-feedback">Invalid</div>
            </div>
            <div class="mb-3">
              <label for="userPassword2" class="form-label">비밀번호 확인</label>
              <input v-model="checkPassword" type="password" class="form-control" placeholder="Confirm Password" />
              <div class="valid-feedback">Valid</div>
              <div class="invalid-feedback">Invalid</div>
            </div>
            <button @click="updatePassword" type="button" id="updateBtn" class="btn btn-warning">수정하기</button>
          </form>
        </div>
      </div>

      <!-- 회원 탈퇴 팝업 -->
      <div class="modal fade" id="deleteProfileModal" tabindex="-1" aria-labelledby="deleteProfileModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="deleteProfileModalLabel">회원 탈퇴</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.</p>
              <button @click="deleteAccount" type="button" class="btn btn-danger">탈퇴하기</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- content end -->
  </div>
</template>

<script>
// import Vue from "vue";
import http from "@/common/axios.js";

export default {
  data() {
    return {
      card1: false, //정보
      card2: false, //수정

      newPassword: "",
      checkPassword: "",
    };
  },
  methods: {
    showCard1() {
      //조회

      this.card1 = true;
      this.card2 = false;
    },
    showCard2() {
      //수정
      this.card1 = false;
      this.card2 = true;
    },
    showCard3() {
      //회원 탈퇴
    },
    async updatePassword() {
      if (this.newPassword == this.checkPassword) {
        //=== 아닌지 알아보세요
        let formData = {
          //userEmail: this.$store.state.memberStore.userInfo.userEmail,
          userEmail: this.$store.state.login.userEmail,
          userPassword: this.newPassword,
        };

        try {
          let { data } = await http.put("/userinfo", formData);

          console.log("UpdateModalVue: data : ");
          console.log(data);
          //   if (data.result == "login") {
          //     this.doLogout();
          //   } else {
          //     this.$alertify.success("변경 되었습니다.");
          //     this.closeModal();
          //   }
          if (data.result === "success") {
            // 업데이트에 성공한 경우  로그인 필터 미적용
            console.log("사용자 정보가 성공적으로 업데이트되었습니다.");
          } else {
            // 업데이트에 실패한 경우
            console.log("사용자 정보 업데이트에 실패했습니다.");
          }
        } catch (error) {
          console.log("UpdateProfileVue: error ");
          console.log(error);
        }
      }
    },

    async deleteAccount() {
      try {
        //let { data } = await http.delete("/userinfo/" + this.$store.state.memberStore.userInfo.userEmail);
        let { data } = await http.delete("/userinfo/" + this.$store.state.login.userEmail);

        console.log("UpdateModalVue: data : ");
        console.log(data);
        if (data.result === "success") {
          // 성공적으로 회원 정보를 삭제했으면 로그인 상태를 변경하고 로그인 페이지로 이동합니다.
          this.$store.commit("SET_LOGOUT");
          this.$router.push("/login");
        } else {
          // 실패한 경우에는 적절한 오류 메시지를 표시합니다.
          this.$alertify.error("회원 정보 삭제에 실패했습니다실.");
        }
      } catch (error) {
        console.log("UpdateProfileVue: error ");
        console.log(error);
      }
    },
  },
};
</script>
