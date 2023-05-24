<template>
  <div class="item py-2 row">
    <!-- 이미지 -->
    <div class="col-auto">
      <img :src="item.image" alt="image" class="img-fluid" />
    </div>
    <!-- 장소명 -->
    <div class="col">
      <div class="d-flex align-items-center">
        <span class="place-name">{{ item.place }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // props: {
  //   item: {
  //     type: Object,
  //     required: true,
  //   },
  // },

  data() {
    return {
      items: [
        {
          image: "https://via.placeholder.com/150",
          place: "Place A",
        },
        {
          image: "https://via.placeholder.com/150",
          place: "Place B",
        },
        {
          image: "https://via.placeholder.com/150",
          place: "Place C",
        },
      ],
    };
  },
};
</script>

<style>
.place-name {
  font-weight: bold;
  margin-left: 10px;
}
</style>
