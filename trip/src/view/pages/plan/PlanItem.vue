<template>
  <div>
    <!-- 사이드 바 -->
    <div :class="isToggleP" class="bg-light" v-if="innerWidth > 1250">
      <div class="container">
        <!-- 섹션 1 컴포넌트 인스턴스 -->
        <SectionComponent1 :section="sections[0]" @add-item="addItem" @delete-plan1="deletePlan1" />
        <!-- 섹션 2 컴포넌트 인스턴스 -->
        <SectionComponent2 :section="sections[1]" @delete-plan2="deletePlan2" @save-plan="savePlan" />
      </div>
    </div>

    <button
      :class="{
        'transform-translate': toggle,
        'transform-translate2': !toggle,
      }"
      class="toggle-button btn btn-primary btn-sm position-fixed bottom-0 end-0 m-3"
      @click="toggleButton"
    >
      {{ toggle ? "Close" : "Open" }}
    </button>
  </div>
</template>

<script>
import SectionComponent1 from "./SectionComponent1.vue";
import SectionComponent2 from "./SectionComponent2.vue";
import http from "@/common/axios";
import Vue from "vue";
import VueAlertify from "vue-alertify";
Vue.use(VueAlertify);

export default {
  data() {
    return {
      innerWidth: window.innerWidth,
      toggle: false,
      sections: [
        {
          id: 1,
          name: "명소",
          items: [],
        },
        {
          id: 2,
          name: "나의 여행지",
          items: [],
        },
      ],
    };
  },

  components: {
    SectionComponent1,
    SectionComponent2,
  },
  methods: {
    addItem(item) {
      // 새로운 아이템 추가 로직 구현
      // 받은 item을 이용하여 원하는 동작 수행
      console.log("addItem 메서드 호출:", item);

      this.planeInsert(item);
    },
    async planeInsert(item) {
      try {
        let newSchedule = {
          title: item.title,
          addr: item.addr,
          firstImage: item.firstImage,
        };

        let { data } = await http.post(`/plan/insert`, newSchedule);

        console.log("InsertModalVue: data : ");
        console.log(data);

        // 리스트 불러오기
        this.myTourList();

        if (data.result == "login") {
          this.doLogout();
        } else {
          this.$alertify.success("일정이 등록되었습니다.");
          this.closeModal();
        }
      } catch (error) {
        console.log("InsertModalVue: error ");
        console.log(error);
      }
    },
    // 내 여행 계획 전부 저장
    async savePlan(section) {
      console.log(section);
      try {
        let { data } = await http.post("/plan/save", section);
        console.log(data);
        this.myTourList();
        this.toggleButton();
      } catch (e) {
        this.$alertify.error("서버에 여행 계획 삭제 실패");
      }
    },
    deletePlan1(item) {
      console.log(item.contentId);
      this.deleteFavoriteTourList(item.contentId);
    },
    async deletePlan2(item) {
      console.log(item.planSeq);
      try {
        let { data } = await http.delete("/plan/delete/" + item.planSeq);
        console.log(data);
        this.myTourList();
      } catch (e) {
        this.$alertify.error("서버에 여행 계획 삭제 실패");
      }
    },
    async myTourList() {
      try {
        let { data } = await http.get("/plan/myList");

        this.sections[1].items = data.map((item) => ({
          title: item.title,
          scheduleStart: item.scheduleStart,
          scheduleEnd: item.scheduleEnd,
          addr: item.addr,
          planSeq: item.planSeq,
          firstImage: item.firstImage,
          content: item.content,
        }));
      } catch (e) {
        this.$alertify.error("서버에서 여행 계획 가져오기 실패");
      }
    },

    async getFavoriteTourList() {
      try {
        let { data } = await http.get("/plan/favorite/list");
        console.log(data);

        this.sections[0].items = data.map((tour) => ({
          addr: tour.addr,
          contentId: tour.contentId,
          firstImage: tour.firstImage,
          mapx: tour.mapx,
          mapy: tour.mapy,
          title: tour.title,
          likeCount: tour.likeCount,
          isFavoriteCheck: tour.isFavoriteCheck,
          isLikeCheck: tour.isLikeCheck,
        }));
      } catch (e) {
        this.$alertify.error("서버에서 즐겨찾기 리스트 가져오기 실패");
      }
    },
    async deleteFavoriteTourList(contentId) {
      try {
        let { data } = await http.get("/trip/favorite/" + contentId); // 서버에서 즐겨찾기 상태를 확인하고 반전시킨다.
        this.isFavorite = data;

        // 즐겨찾기 리스트 새로고침 한 번 해야함.
        this.getFavoriteTourList();
      } catch (error) {
        console.log(error);
        this.$alertify.error("즐겨찾기/취소 과정에 문제가 발생하였습니다.");
      }
    },

    toggleButton() {
      this.toggle = !this.toggle;
      //console.log(this.toggle);
      if (this.toggle) {
        this.getFavoriteTourList();
        this.myTourList();
      }
    },
  },
  computed: {
    isToggleP() {
      return this.toggle ? "planner-open" : "planner-fold";
    },
  },
  watch: {
    innerWidth() {
      if (this.innerWidth < 1250 && this.toggle) {
        this.toggle = !this.toggle;
      }
    },
  },
};
</script>

<style>
.toggle-button {
  z-index: 1030; /* To ensure the button stays on top */
}

.planner-fold {
  position: fixed;
  bottom: 0;
  right: 0;
  height: 91%;
  width: 0%;
  overflow-x: hidden;
  transition-property: width;
  transition-duration: 1s;
}

.planner-open {
  position: fixed;
  bottom: 0;
  right: 0;
  height: 91%;
  width: 25%;
  overflow-x: hidden;
  transition-property: width;
  transition-duration: 1s;
}

.container {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.transform-translate {
  transform: translateX(-600%);
  transition: transform 1s;
}
.transform-translate2 {
  transform: translateX(5%);
  transition: transform 1s;
}
.section {
  flex: 1;
}

.item {
  border-bottom: 1px solid #ddd;
}
</style>
