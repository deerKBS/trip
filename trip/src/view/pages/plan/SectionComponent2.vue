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

          <!-- select와 date picker -->
           <label for="startDate" class="small-text">시작일과 종료일:</label>
          <div class="d-flex mt-2">
           
            <input type="date" v-model="item.dateStart" class="form-control input-sm"  />
            <input type="date" v-model="item.dateEnd" class="form-control input-sm" />
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

<style scoped>

.small-text {
  font-size: 12px;
}

</style>

