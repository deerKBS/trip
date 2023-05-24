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
                    getCat2List();
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

     <!-- 사이드 바 -->
    <div :class="isToggleP" class="bg-light" v-if="innerWidth > 1250">
      <div class="container" v-show="toggle">
        <!-- 섹션 1 컴포넌트 인스턴스 -->
        <SectionComponent1 :section="sections[0]" @add-item="addItem" />
        <!-- 섹션 2 컴포넌트 인스턴스 -->
        <SectionComponent2 :section="sections[1]" />
      </div>
    </div>

    <button
      :class="{ 'transform-translate': toggle, 'transform-translate2': !toggle }"
      class="toggle-button btn btn-primary btn-sm position-fixed bottom-0 end-0 m-3"
      @click="toggle = !toggle"
    >
      {{ toggle ? "Close" : "Open" }}
    </button>
   
  </div>
</template>

<script>
import http from "@/common/axios.js";
import TourCard from "@/components/tourCard.vue";
import SectionComponent1 from "./plan/SectionComponent1.vue";
import SectionComponent2 from "./plan/SectionComponent2.vue";

import Vue from "vue";
import VueAlertify from "vue-alertify";
Vue.use(VueAlertify);

export default {
  name: "SearchTour",
  components: { 
    TourCard, 
    SectionComponent1,
    SectionComponent2,
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
      sections: [
        {
          id: 1,
          name: "명소",
          items:  Array(2)
            .fill()
            .map(() => ({
              image: "https://via.placeholder.com/80",
              place: "축사",
              address: "test",
             
            })),
        },
        {
          id: 2,
          name: "나의 여행지",
          items: Array(1)
            .fill()
            .map(() => ({
              image: "https://via.placeholder.com/80",
              place: "궁궐",
              nested: {
                dateStart: "",
                dateEnd: "",
              },
              options: ["부산", "서울", "광주"],
            })),
        },
      ],

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
      addItem(item) {
      // 새로운 아이템 추가 로직 구현
      // 받은 item을 이용하여 원하는 동작 수행
      console.log("addItem 메서드 호출:", item);

      this.sections[1].items.push({
        image: "https://via.placeholder.com/80",
        place: "",
        nested: {
          select: "",
          date: "",
        },
        options: ["부산", "서울", "광주"],
      });
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
