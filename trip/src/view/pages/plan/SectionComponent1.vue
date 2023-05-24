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
          <p class="form-control-static">{{ item.place }}</p>
          <p class="form-control-static">{{ item.address }}</p>
          <!-- select와 date picker -->
          <button class="btn btn-primary btn-sm float-end mt-2" @click="handleAddItemClick(item)">+</button>
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
      this.$emit('add-item', item); 
    },
  },
};
</script>
