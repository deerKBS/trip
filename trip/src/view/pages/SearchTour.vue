<template>
  <div style="padding-top: 25px; padding-left: 20px; margin-right: 10px; min-width: 1000px; width: 100%">
    <div class="bg-sky-50 shadow-lg" :class="isToggleC">
      <div class="row">
        <div class="col-md-auto" style="margin-top: 100px">
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
                    area = sido.codeName;
                    areaCode = sido.code;
                    getArea2List();
                  "
                  >{{ sido.codeName }}</a
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
                    sigungu = gungu.codeName;
                    sigunguCode = gungu.code;
                  "
                  >{{ gungu.codeName }}</a
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
                    catText = category.codeName;
                    cat = category.code;
                  "
                  >{{ category.codeName }}</a
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
          <div class="form-check form-switch d-flex align-items-center justify-content-end" style="margin-top: 40px">
            <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" @click="setMapType()" style="font-size: 20px; margin-right: 5px" />
            <label class="form-check-label" for="flexSwitchCheckChecked" style="font-size: 15px; margin-top: 3px">스카이뷰</label>
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
  components: {
    TourCard,
  },
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
      catList: [],
      list: [],

      map: null,
      temp: [],
      innerWidth: window.innerWidth,
      toggle_button: "<",
      toggle: false,

      check: false,
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
    this.getCategoryList();
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
        var marker = new window.kakao.maps.Marker({
          map: this.map,
          position: new window.kakao.maps.LatLng(this.list[i].mapy, this.list[i].mapx), // 마커를 표시할 위치
          title: this.list[i].title,
          image: markerImage,
        });
        this.temp.push(marker);
      }
      this.map.setCenter(new window.kakao.maps.LatLng(this.list[0].mapy, this.list[0].mapx));
    },
    setMapType() {
      this.check = !this.check;
      if (this.check) {
        this.map.setMapTypeId(window.kakao.maps.MapTypeId.HYBRID);
      } else {
        this.map.setMapTypeId(window.kakao.maps.MapTypeId.ROADMAP);
      }
    },

    async getArea1List() {
      let url = "/trip/area";

      let { data } = await http.get(url);
      this.areaCodes = data;
    },
    async getArea2List() {
      this.sigungu = "시군구 선택";
      this.sigunguCode = "";

      let url = "/trip/area2";
      let urlParams = "?areaCode=" + this.areaCode;

      let { data } = await http.get(url + urlParams);
      this.areaCodes2 = data;
    },
    async getCategoryList() {
      let url = "/trip/category";

      let { data } = await http.get(url);
      this.catList = data;
    },
    async getList() {
      let params = {
        limit: this.numOfRows,
        offset: this.pageNo,
        areaCode: this.areaCode,
        sigunguCode: this.sigunguCode,
        contentTypeId: this.cat,
        keyword: this.keyword,
      };

      let { data } = await http.get("/trip/list", { params });
      console.log(data);
      if (data.length > 0) {
        this.list = data;
        console.log(this.list);
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
.custom_typecontrol {
  position: absolute;
  top: 10px;
  right: 10px;
  overflow: hidden;
  width: 130px;
  height: 30px;
  margin: 0;
  padding: 0;
  z-index: 1;
  font-size: 12px;
  font-family: "Malgun Gothic", "맑은 고딕", sans-serif;
}
.custom_typecontrol span {
  display: block;
  width: 65px;
  height: 30px;
  float: left;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
}
.custom_typecontrol .btn {
  background: #fff;
  background: linear-gradient(#fff, #e6e6e6);
}
.custom_typecontrol .btn:hover {
  background: #f5f5f5;
  background: linear-gradient(#f5f5f5, #e3e3e3);
}
.custom_typecontrol .btn:active {
  background: #e6e6e6;
  background: linear-gradient(#e6e6e6, #fff);
}
.custom_typecontrol .selected_btn {
  color: #fff;
  background: #425470;
  background: linear-gradient(#425470, #5b6d8a);
}
.custom_typecontrol .selected_btn:hover {
  color: #fff;
}
</style>
