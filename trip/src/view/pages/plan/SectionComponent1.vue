<template>
  <div class="section border-top border-bottom" style="max-height: 400px; overflow-x: hidden">
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

          <p class="form-control-static">{{ item.addr }}</p>
          <div class="d-flex mt-2 justify-content-between">
            <div class="d-flex align-items-center">
              <i type="button" class="bi bi-heart-fill" style="color: palevioletred"></i>
              <h5>{{ item.likeCount }}</h5>
            </div>
            <button class="btn btn-primary btn-sm" @click="handleAddItemClick(item)">+</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    section: {
      type: Object,
      required: true,
    },
  },
  methods: {
    handleAddItemClick(item) {
      this.$emit("add-item", item);
    },
    deletePlan(item) {
      this.$emit("delete-plan1", item);
    },
  },
};
</script>

<style scoped>
.enlarge-icon {
  font-size: 18px;
}
</style>
