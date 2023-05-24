<template>
  <div>
    <!-- 사이드 바 -->
    <div :class="isToggleP" class="bg-light" v-if="innerWidth > 1250">
      <div class="container" v-show="toggle">
        <div class="section border-top border-bottom overflow-auto" v-for="section in sections" :key="section.id">
          <h2 class="h5">{{ section.name }}</h2>
          <div class="items">
            <div class="item py-2 row" v-for="(item, index) in section.items" :key="index">
              <!-- 이미지 -->
              <div class="col-auto">
                <img :src="item.image" alt="image" class="img-fluid" />
              </div>
              <!-- input -->
              <div class="col">
                <input type="text" v-model="item.input" class="form-control input-sm" />

                <!-- select와 date picker -->
                <div class="d-flex mt-2">
                  <select v-model="item.select" class="form-select select-sm me-2">
                    <option v-for="option in item.options" :key="option">{{ option }}</option>
                  </select>
                  <input type="date" v-model="item.date" class="form-control input-sm" />
                </div>
              </div>
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
      toggle: false,
      sections: [
        {
          id: 1,
          name: "Section 1",
          items: Array(3)
            .fill()
            .map((_, i) => `Item ${i + 1}`),
        },
        {
          id: 2,
          name: "Section 2",
          items: Array(1)
            .fill()
            .map(() => ({
              image: "https://via.placeholder.com/80",
              input: "",
              nested: {
                select: "",
                date: "",
              },
              options: ["부산", "서울", "광주"],
            })),
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
};
</script>

<style>
/* .input-sm {
  height: 25px; /* 원하는 높이 값으로 조정 */
/*} 

.select-sm {
  height: 25px; /* 원하는 높이 값으로 조정 */
/*} */

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
