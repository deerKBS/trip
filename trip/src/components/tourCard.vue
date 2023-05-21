<template>
  <div class="card shadow" style="width: 18rem; height: 16rem">
    <div class="card-body d-flex align-items-center justify-content-center py-1">
      <div class="card-image" :style="`background-image: url(${itemImg}); background-size: cover`" @click="moveCenterMap()"></div>
    </div>
    <div class="card-body pt-0 pb-0 box-content">
      <h5 :title="`${item.title}`">{{ item.title }}</h5>
      <h5 :title="`${item.addr1}`">{{ item.addr1 }}</h5>
      <div class="d-flex justify-content-end">
        <i v-if="!isStar" type="button" class="bi bi-star custom-star" @click="isStar = !isStar" />
        <i v-else type="button" class="bi bi-star-fill" style="color: #bae6fd" @click="isStar = !isStar" />
        <i v-if="!isLike" type="button" class="bi bi-heart custom-heart" @click="isLike = !isLike" />
        <i v-else type="button" class="bi bi-heart-fill" style="color: palevioletred" @click="isLike = !isLike" />
      </div>
    </div>
  </div>
</template>

<script>
import "bootstrap-icons/font/bootstrap-icons.css";
export default {
  name: "tourCard",
  props: ["item", "map"],
  data() {
    return {
      isStar: false,
      isLike: false,
    };
  },
  computed: {
    itemImg() {
      return this.item.firstimage === "" ? require("../assets/img/noimg.png") : this.item.firstimage;
    },
  },
  methods: {
    moveCenterMap() {
      this.map.setCenter(new window.kakao.maps.LatLng(this.item.mapy, this.item.mapx));
    },
  },
};
</script>

<style scoped>
.card-image {
  transition: transform 0.3s;
  border-radius: 10px;
  width: 15.5rem;
  height: 10rem;
}
.card-image:hover {
  transform: scale(1.1);
}
h5 {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.bi {
  margin-right: 10px;
  font-size: 20px;
}
.custom-heart:hover {
  color: palevioletred;
}
.custom-star:hover {
  color: #bae6fd;
}
</style>
