<template>
  <div class="section border-top border-bottom overflow-auto">
    <h2 class="h5">{{ section.name }}</h2>
    <div class="items">
      <div class="item py-2 row" v-for="(item, index) in section.items" :key="index">
        <!-- 이미지 -->
        <div class="col-auto">
          <img :src="item.image" alt="image" class="img-fluid" />
        </div>
        <!-- input -->
        <div class="col">
          <input type="text" v-model="item.place" class="form-control input-sm" />

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
</template>

<script>
export default {
  props: {
    section: {
      type: Object,
      required: true,
    },
  },
  
};
</script>
