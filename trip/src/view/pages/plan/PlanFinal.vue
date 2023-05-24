<template>
  <div>
    <!-- 사이드 바 -->
    <div :class="isToggleP" class="bg-light" v-if="innerWidth > 1250">
      <div class="container" v-show="toggle">
        <div class="section border-top border-bottom overflow-auto" v-for="section in sections" :key="section.id">
          <h2 class="h5">{{ section.name }}</h2>
          <div class="items">
            <div class="item py-2" v-for="item in section.items" :key="item">
              {{ item }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <button
      :class="{ 'transform-translate': toggle, 'transform-translate2': !toggle }"
      class="toggle-button btn btn-primary btn-sm position-fixed bottom-0 end-0 m-3"
      @click="toggle = !toggle"
    >
      {{ toggle ? "Close" : "Open" }}
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      innerWidth: window.innerWidth,
      toggle_button: "<",
      toggle: false,
      title: "",

      menu2: false,
      localEvent: {
        end: "",
      }, // event prop의 복사본

      duration: 1,

      sections: [
        {
          id: 1,
          name: "Section 1",
          items: Array(10)
            .fill()
            .map((_, i) => `Item ${i + 1}`),
        },
        {
          id: 2,
          name: "Section 2",
          items: Array(30)
            .fill()
            .map((_, i) => `Item ${i + 1}`),
        },
      ],
    };
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
  methods: {
    toggleWindow() {
      this.isOpen = !this.isOpen;
    },
    increment() {
      this.count++;
    },
    decrement() {
      if (this.count > 1) {
        this.count--;
      }
    },
  },
};
</script>

<style scoped>
.toggle-button {
  z-index: 1030; /* To ensure the button stays on top */
}

.planner-fold {
  position: fixed;
  bottom: 0;
  right: 0;
  height: 91%;
  width: 1%;
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
