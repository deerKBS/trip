<template>
  <div>
    <!-- 사이드 바 -->
    <div :class="isToggleP" class="bg-light" v-if="innerWidth > 1250">
      <div class="container" v-show="toggle">
        <!-- 섹션 1 컴포넌트 인스턴스 -->
        <SectionComponent1 :section="sections[0]" @add-item="addItem" @delete-plan1="deletePlan1" />
        <!-- 섹션 2 컴포넌트 인스턴스 -->
        <SectionComponent2 :section="sections[1]" @delete-plan2="deletePlan2" />
      </div>
    </div>

    <button
      :class="{
        'transform-translate': toggle,
        'transform-translate2': !toggle,
      }"
      class="toggle-button btn btn-primary btn-sm position-fixed bottom-0 end-0 m-3"
      @click="toggle = !toggle"
    >
      {{ toggle ? "Close" : "Open" }}
    </button>
  </div>
</template>

<script>
import SectionComponent1 from "./SectionComponent1.vue";
import SectionComponent2 from "./SectionComponent2.vue";

export default {
  data() {
    return {
      innerWidth: window.innerWidth,
      toggle: false,
      sections: [
        {
          id: 1,
          name: "명소",
          items: Array(2)
            .fill()
            .map((_, i) => ({
              image: "https://via.placeholder.com/80",
              place: "축사",
              address: "test",
              count: "1100",
              idx: i + 1,
            })),
        },
        {
          id: 2,
          name: "나의 여행지",
          items: Array(1)
            .fill()
            .map((_, i) => ({
              image: "https://via.placeholder.com/80",
              place: "궁궐",
              nested: {
                dateStart: "",
                dateEnd: "",
              },
              contnet: "",
              idx: i + 1,
            })),
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

      this.sections[1].items.push({
        image: "https://via.placeholder.com/80",
        place: "",
        nested: {
          dateStart: "",
          dateEnd: "",
        },
        content: "",
        idx: this.sections[1].items.length + 1,
      });
    },
    deletePlan1(item) {
      console.log(item.idx);
      this.sections[0].items.splice(item.idx - 1, 1);
    },
    deletePlan2(item) {
      console.log(item.idx);
      this.sections[1].items.splice(item.idx - 1, 1);
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
