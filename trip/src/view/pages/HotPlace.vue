<template>
  <div class="w-full h-full p-4 d-flex justify-content-center align-items-center">
    <div class="bg-sky-200 container-fluid pb-5 shadow-lg" style="border-radius: 20px 40px 60px 80px">
      <div class="row mt-3">
        <p style="font-size: 30px">핫플레이스</p>
      </div>
      <div class="row m-auto">
        <div class="col" v-for="(item, index) in list" :key="index"><tour-card :item="item" /></div>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/common/axios";
import tourCard from "@/components/tourCard.vue";
export default {
  name: "HotPlace",
  components: { tourCard },
  data() {
    return {
      list: [],
    };
  },
  mounted() {
    this.getListTop();
  },
  methods: {
    async getListTop() {
      try {
        let { data } = await http.get("/trip/list/top10");
        console.log(data);
        if (data.length > 0) {
          this.list = data;
        } else {
          this.$alertify.error("검색 결과 없음");
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
