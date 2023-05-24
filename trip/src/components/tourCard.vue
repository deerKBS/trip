<template>
  <div class="card shadow" style="width: 18rem; height: 16rem">
    <div class="card-body d-flex align-items-center justify-content-center py-1">
      <div class="card-image" :style="`background-image: url(${itemImg}); background-size: cover`" @click="moveCenterMap()"></div>
    </div>
    <div class="card-body pt-0 pb-0 box-content">
      <h5 :title="`${item.title}`">{{ item.title }}</h5>
      <h5 :title="`${item.addr}`">{{ item.addr }}</h5>
      <div class="d-flex justify-content-end justify-i">
        <i v-if="!isStar" type="button" class="bi bi-star custom-star" @click="favoriteManage()" />
        <i v-else type="button" class="bi bi-star-fill" style="color: #bae6fd" @click="favoriteManage()" />
        <i v-if="!isLike" type="button" class="bi bi-heart custom-heart" @click="likeManage()" />
        <i v-else type="button" class="bi bi-heart-fill" style="color: palevioletred" @click="likeManage()" />
        <h5>{{ likeCount }}</h5>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/common/axios";

import "bootstrap-icons/font/bootstrap-icons.css";

import Vue from "vue";
import VueAlertify from "vue-alertify";
Vue.use(VueAlertify);

export default {
  name: "tourCard",
  props: ["item", "map"],
  data() {
    return {
      isStar: this.item.isFavoriteCheck,
      isLike: this.item.isLikeCheck,
      likeCount: this.item.likeCount,
    };
  },
  computed: {
    itemImg() {
      return this.item.firstImage === "" ? require("../assets/img/noimg.png") : this.item.firstImage;
    },
  },
  methods: {
    moveCenterMap() {
      this.map.setCenter(new window.kakao.maps.LatLng(this.item.mapy, this.item.mapx));
    },
    // 서버에서 DB기준으로 버튼 눌림, 안눌림 상태를 인식
    async favoriteManage() {
      try {
        let { data } = await http.get("/trip/favorite/" + this.item.contentId); // 서버에서 즐겨찾기 상태를 확인하고 반전시킨다.
        this.isStar = data;
        // 즐겨찾기 리스트 새로고침 한 번 해야함.
      } catch (error) {
        console.log(error);
        this.$alertify.error("즐겨찾기/취소 과정에 문제가 발생하였습니다.");
      }
    },
    async likeManage() {
      try {
        let { data } = await http.get("/trip/like/" + this.item.contentId); // 서버에서 좋아요 상태를 확인하고 반전시킨다.
        this.isLike = data;
        if (data) this.likeCount = this.likeCount + 1;
        else this.likeCount = this.likeCount - 1;
      } catch (error) {
        console.log(error);
        this.$alertify.error("좋아요/취소 과정에 문제가 발생하였습니다.");
      }
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
