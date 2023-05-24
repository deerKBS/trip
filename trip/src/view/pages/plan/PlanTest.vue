<template>
  <div>
    <div :class="isToggleP" class="bg-sky-50" v-if="innerWidth > 1250">
      <div class="mb-3">
        <label for="titleInsert" class="form-label">여행 제목</label>
        <input type="text" class="form-control" id="titleInsert" v-model="title" placeholder="즐거운 국내 여행!" />
      </div>

      <v-menu ref="menu" v-model="menu2" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
        <template v-slot:activator="{ on, attrs }">
          <v-text-field v-model="localEvent.end" label="End Date" readonly v-bind="attrs" v-on="on"></v-text-field>
        </template>
        <v-date-picker v-model="localEvent.end" @input="menu2 = false"></v-date-picker>
      </v-menu>

      <div class="d-flex align-items-center justify-content-center">
        <button class="btn btn-sm btn-outline-primary mx-2" @click="decrement">-</button>
        <span>{{ count + "일" }}</span>
        <button class="btn btn-sm btn-outline-primary mx-2" @click="increment">+</button>
      </div>
    </div>

    <button class="toggle-button" @click="toggle = !toggle">
      {{ "Open" }}
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

      count: 1,
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
  position: fixed;
  bottom: 1%; /* Adjust as per your needs */
  right: 1%; /* Adjust as per your needs */
}

.container {
  position: relative;
  height: 100vh;
  overflow: hidden;
}
.planner-fold {
  position: fixed;
  bottom: 2%;
  right: 0;
  height: 90%;
  width: 2%;
  transition-property: width;
  transition-duration: 1s;
}
.planner-open {
  position: fixed;
  bottom: 2%;
  right: 0;
  height: 90%;
  width: 28vw;
  transition-property: width;
  transition-duration: 1s;
}
</style>
