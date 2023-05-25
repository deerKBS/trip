<template>
  <div class="w-full h-full p-4 d-flex justify-content-center">
    <div class="bg-sky-100 container-fluid p-5 shadow-lg">
      <!-- 캐러셀 -->
      <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel" style="width: 70%">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="../../assets/img/1.jpg" class="d-block w-100" />
          </div>
          <div class="carousel-item">
            <img src="../../assets/img/2.jpg" class="d-block w-100" />
          </div>
          <div class="carousel-item">
            <img src="../../assets/img/3.jpg" class="d-block w-100" />
          </div>
          <div class="carousel-item">
            <img src="../../assets/img/4.jpg" class="d-block w-100" />
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainPage",
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>

<style scoped></style>
