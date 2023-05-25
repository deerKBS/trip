<template>
  <div class="section border-top border-bottom overflow-auto">
    <h2 class="h5">{{ section.name }}</h2>
    <div class="items">
      <div class="item py-2 row" v-for="(item, index) in section.items" :key="index">
        <!-- 이미지 -->
        <div class="col-auto">
          <img :src="item.firstImage || 'https://via.placeholder.com/80'" alt="image" class="img-fluid" :style="{ width: '80px', height: '80px' }" />
        </div>
        <!-- input -->
        <div class="col">
          <div class="d-flex mt-2 justify-content-between">
            <p class="form-control-static">{{ item.title }}</p>

            <i type="button" class="bi bi-trash enlarge-icon" @click="deletePlan(item)"></i>
          </div>
          <!-- select와 date picker -->
          <label for="startDate" class="small-text">시작일과 종료일:</label>
          <div class="d-flex mt-2">
            <input type="date" v-model="item.scheduleStart" class="form-control input-sm" />
            <input type="date" v-model="item.scheduleEnd" class="form-control input-sm" />
          </div>
          <div class="d-flex mt-2">
            <input type="text" class="form-control" v-model="item.content" />
          </div>
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-end mt-3">
      <!-- Increased margin to mt-3 -->
      <button class="btn btn-primary ml-auto" @click="savePlan(section)">저장</button>
      <!-- Added btn-lg and ml-auto classes -->
    </div>
  </div>
</template>

<script>
import "bootstrap-icons/font/bootstrap-icons.css";
//import http from "@/common/axios.js";

export default {
  props: {
    section: {
      type: Object,
      required: true,
    },
  },
  methods: {
    deletePlan(item) {
      this.$emit("delete-plan2", item);
    },
    savePlan(section) {
      console.log(section);
      this.$emit("save-plan", section);
    },
  },
};
</script>

<style scoped>
.small-text {
  font-size: 12px;
}
.enlarge-icon {
  font-size: 18px;
}
</style>
