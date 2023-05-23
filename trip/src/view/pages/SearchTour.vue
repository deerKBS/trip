<template>
  <div style="padding-top: 25px; padding-left: 20px; margin-right: 10px; min-width: 1000px; width: 100%">
    <div class="bg-sky-50 shadow-lg" :class="isToggleC">
      <div class="row">
        <div class="col-md-auto" style="margin-top: 50px">
          <!-- buttons -->
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle custom-dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              {{ area }}
            </button>
            <ul class="dropdown-menu custom-dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <a
                  class="dropdown-item custom-dropdown-item"
                  @click="
                    area = '시도 선택';
                    areaCode = '';
                    sigungu = '시군구 선택';
                    sigunguCode = '';
                    areaCodes2 = [];
                  "
                  >시도 선택</a
                >
              </li>
              <li v-for="(sido, index) in areaCodes" v-bind:key="index">
                <a
                  class="dropdown-item custom-dropdown-item"
                  @click="
                    area = sido.name;
                    areaCode = sido.code;
                    getArea2List();
                  "
                  >{{ sido.name }}</a
                >
              </li>
            </ul>
          </div>
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle custom-dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              {{ sigungu }}
            </button>
            <ul class="dropdown-menu custom-dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <a
                  class="dropdown-item custom-dropdown-item"
                  @click="
                    sigungu = '시군구 선택';
                    sigunguCode = '';
                  "
                  >시군구 선택</a
                >
              </li>
              <li v-for="(gungu, index) in areaCodes2" v-bind:key="index">
                <a
                  class="dropdown-item custom-dropdown-item"
                  @click="
                    sigungu = gungu.name;
                    sigunguCode = gungu.code;
                  "
                  >{{ gungu.name }}</a
                >
              </li>
            </ul>
          </div>
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle custom-dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              {{ catText }}
            </button>
            <ul class="dropdown-menu custom-dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <a
                  class="dropdown-item custom-dropdown-item"
                  @click="
                    catText = '카테고리 선택';
                    cat = '';
                  "
                  >카테고리 선택</a
                >
              </li>
              <li v-for="(category, index) in catList" v-bind:key="index">
                <a
                  class="dropdown-item custom-dropdown-item"
                  @click="
                    catText = category.name;
                    cat = category.code;
                    getCat2List();
                  "
                  >{{ category.name }}</a
                >
              </li>
            </ul>
          </div>
          <div>
            <input v-model="keyword" type="text" class="form-control keyword-input" placeholder="검색어" />
          </div>
          <div>
            <button type="button" class="btn custom-btn" @click="keyword === '' ? getList() : keywordGetList()">검 색</button>
          </div>
        </div>
        <!-- buttons end -->
        <div class="col">
          <div class="card border shadow-black h-100" style="width: 100%">
            <div class="card-body">
              <!--Map start-->
              <div id="map" class="mt" style="height: 600px"></div>
              <!--Map end-->
            </div>
          </div>
        </div>
      </div>
      <!-- search result area start -->
      <div class="container">
        <div class="row">
          <div class="col" v-for="(item, index) in list" :key="index"><tour-card :item="item" :map="map" /></div>
        </div>
      </div>
      <!-- search result area end -->
    </div>
    <div :class="isToggleP" class="bg-sky-50" v-if="innerWidth > 1250">
      <div>
        <button class="toggle-button" @click="toggle = !toggle">
          {{ this.toggle_button }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/common/axios.js";
import TourCard from "@/components/tourCard.vue";

import Vue from "vue";
import VueAlertify from "vue-alertify";
Vue.use(VueAlertify);

export default {
  name: "SearchTour",
  components: { TourCard },
  data() {
    return {
      numOfRows: 10,
      pageNo: 1,
      areaCode: "",
      sigunguCode: "",
      cat: "",
      keyword: "",
      area: "시도 선택",
      sigungu: "시군구 선택",
      catText: "카테고리 선택",

      areaCodes: [],
      areaCodes2: [],
      catList: [
        { code: "12", name: "관광지" },
        { code: "14", name: "문화시설" },
        { code: "15", name: "축제공연행사" },
        { code: "25", name: "여행코스" },
        { code: "28", name: "레포츠" },
        { code: "32", name: "숙박" },
        { code: "38", name: "쇼핑" },
        { code: "39", name: "음식점" },
      ],
      list: [],

      map: null,
      temp: [],
      innerWidth: window.innerWidth,
      toggle_button: "<",
      toggle: false,
    };
  },
  computed: {
    isToggleP() {
      return this.toggle ? "planner-open" : "planner-fold";
    },
    isToggleC() {
      return this.toggle ? "map-content-narrow" : "map-content-wide";
    },
  },
  watch: {
    innerWidth() {
      if (this.innerWidth < 1250 && this.toggle) {
        this.toggle = !this.toggle;
      }
    },
  },
  mounted() {
    this.loadScript();
    window.addEventListener("resize", this.handleResize);
    this.getArea1List();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      this.innerWidth = window.innerWidth;
    },
    loadScript() {
      const script = document.createElement("script");
      script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=fc028c62490f726b597bff7133044d1c&autoload=false";
      script.onload = () => window.kakao.maps.load(this.loadMap);

      document.head.appendChild(script);
    },
    loadMap() {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(37.500613, 127.036431),
        level: 5,
      };
      this.map = new window.kakao.maps.Map(container, options);
    },
    displayMarker() {
      if (!(this.temp === undefined)) {
        for (var j = 0; j < this.temp.length; j++) {
          this.temp[j].setMap(null);
        }
        this.temp = [];
      }
      var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
      var imageSize = new window.kakao.maps.Size(24, 35);
      var markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
      for (var i = 0; i < this.list.length; i++) {
        this.temp.push(
          new window.kakao.maps.Marker({
            map: this.map,
            position: new window.kakao.maps.LatLng(this.list[i].mapy, this.list[i].mapx), // 마커를 표시할 위치
            title: this.list[i].title,
            image: markerImage,
          })
        );
      }
      this.map.setCenter(new window.kakao.maps.LatLng(this.list[0].mapy, this.list[0].mapx));
    },
    async getArea1List() {
      let url = "/trip/areaCode";

      let { data } = await http.get(url);
      this.areaCodes = data;
    },
    async getArea2List() {
      this.sigungu = "시군구 선택";
      this.sigunguCode = "";

      let url = "/trip/areaCode2";
      let urlParams = "&areaCode=" + this.areaCode;

      let { data } = await http.get(url + urlParams);
      this.areaCodes2 = data;
    },
    async getList() {
      let url = "/trip/list";
      let urlParams = "?numOfRows=" + this.numOfRows + "&pageNo=" + this.pageNo + "&areaCode=" + this.areaCode + "&sigunguCode=" + this.sigunguCode + "&contentTypeId=" + this.cat;

      let { data } = await http.get(url + urlParams);
      if (data.response.body.totalCount > 0) {
        this.list = data.response.body.items.item;
        console.log(this.list);
        this.displayMarker();
      } else {
        this.$alertify.error("검색 결과 없음");
      }
    },
    async keywordGetList() {
      let url = "/trip/keyword";
      let urlParams =
        "?numOfRows=" + this.numOfRows + "&pageNo=" + this.pageNo + "&areaCode=" + this.areaCode + "&sigunguCode=" + this.sigunguCode + "&contentTypeId=" + this.cat + "&keyword=" + this.keyword;

      let { data } = await http.get(url + urlParams);
      if (data.response.body.totalCount > 0) {
        this.list = data.response.body.items.item;

        this.displayMarker();
      } else {
        this.$alertify.error("검색 결과 없음");
      }
    },
  },
};
</script>
<style scoped>
.planner-fold {
  position: fixed;
  bottom: 2%;
  right: 0;
  height: 90%;
  width: 2%;
  transition-property: width;
  transition-duration: 1s;
}
.planner-open {
  position: fixed;
  bottom: 2%;
  right: 0;
  height: 90%;
  width: 28vw;
  transition-property: width;
  transition-duration: 1s;
}
.map-content-wide {
  padding-left: 30px;
  padding-right: 20px;
  min-height: 86vh;
  width: 97%;
  transition-property: width;
  transition-duration: 1s;
}
.map-content-narrow {
  padding-left: 30px;
  padding-right: 20px;
  min-height: 86vh;
  width: 67%;
  transition-property: width;
  transition-duration: 1s;
}
.custom-dropdown-toggle {
  background-color: #e6f7ff;
  border-color: #bae6fd;
  color: #454545;
}

.custom-dropdown-toggle:hover {
  background-color: #bae6fd;
}

.custom-dropdown-menu {
  background-color: #ffffff;
  border-color: #bae6fd;
  max-height: 180px;
  overflow-y: auto;
}

.custom-dropdown-item {
  color: #454545;
}

.custom-dropdown-item:hover {
  background-color: #e9e9e9;
}
.dropdown-toggle {
  width: 180px;
  margin-bottom: 40px;
}
.custom-btn {
  width: 180px;
  background-color: #e6f7ff;
  border-color: #bae6fd;
  color: #454545;
}
.custom-btn:hover {
  background-color: #188fff;
  color: #ffffff;
}
.keyword-input {
  border-color: #bae6fd;
  width: 180px;
  margin-bottom: 40px;
  text-align: center;
}
</style>
