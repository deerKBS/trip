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
              <li v-for="(sido, index) in areaCodes" v-bind:key="index">
                <a
                  class="dropdown-item custom-dropdown-item"
                  href="#"
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
              <li v-for="(gungu, index) in areaCodes2" v-bind:key="index">
                <a
                  class="dropdown-item custom-dropdown-item"
                  href="#"
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
              {{ catText1 }}
            </button>
            <ul class="dropdown-menu custom-dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li v-for="(cat, index) in cat1List" v-bind:key="index">
                <a
                  class="dropdown-item custom-dropdown-item"
                  href="#"
                  @click="
                    catText1 = cat.name;
                    cat1 = cat.code;
                    getCat2List();
                  "
                  >{{ cat.name }}</a
                >
              </li>
            </ul>
          </div>
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle custom-dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              {{ catText2 }}
            </button>
            <ul class="dropdown-menu custom-dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li v-for="(cat, index) in cat2List" v-bind:key="index">
                <a
                  class="dropdown-item custom-dropdown-item"
                  href="#"
                  @click="
                    catText2 = cat.name;
                    cat2 = cat.code;
                    getCat3List();
                  "
                  >{{ cat.name }}</a
                >
              </li>
            </ul>
          </div>
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle custom-dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              {{ catText3 }}
            </button>
            <ul class="dropdown-menu custom-dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li v-for="(cat, index) in cat3List" v-bind:key="index">
                <a
                  class="dropdown-item custom-dropdown-item"
                  href="#"
                  @click="
                    catText3 = cat.name;
                    cat3 = cat.code;
                  "
                  >{{ cat.name }}</a
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
      <div class="container">
        <div class="row">
          <div class="col" v-for="(item, index) in list" :key="index"><tour-card :item="item" /></div>
        </div>
      </div>
    </div>
    <div :class="isToggleP" class="bg-sky-50" v-if="innerWidth > 1200">
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

export default {
  name: "SearchTour",
  components: { TourCard },
  data() {
    return {
      numOfRows: 10,
      pageNo: 1,
      areaCode: "",
      sigunguCode: "",
      cat1: "",
      cat2: "",
      cat3: "",
      keyword: "",
      area: "시도를 선택하세요",
      sigungu: "시군구를 선택하세요",
      catText1: "대분류를 선택하세요",
      catText2: "중분류를 선택하세요",
      catText3: "소분류를 선택하세요",

      areaCodes: [],
      areaCodes2: [],
      cat1List: [],
      cat2List: [],
      cat3List: [],
      list: [],

      map: null,
      temp: null,
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
  mounted() {
    this.loadScript();
    window.addEventListener("resize", this.handleResize);
    this.getArea1List();
    this.getCat1List();
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
      var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
      var imageSize = new window.kakao.maps.Size(24, 35);
      var markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
      for (var i = 0; i < this.list.length; i++) {
        this.temp = new window.kakao.maps.Marker({
          map: this.map,
          position: new window.kakao.maps.LatLng(this.list[i].mapy, this.list[i].mapx), // 마커를 표시할 위치
          title: this.list[i].title,
          image: markerImage,
        });
      }
      this.map.setCenter(new window.kakao.maps.LatLng(this.list[0].mapy, this.list[0].mapx));
    },
    async getArea1List() {
      let url = "/trip/areaCode";
      let urlParams = "?numOfRows=17" + "&pageNo=" + this.pageNo;

      let { data } = await http.get(url + urlParams);
      this.areaCodes = data.response.body.items.item;
    },
    async getArea2List() {
      this.sigungu = "시군구를 선택하세요";

      let url = "/trip/areaCode";
      let urlParams = "?numOfRows=50" + "&pageNo=" + this.pageNo + "&areaCode=" + this.areaCode;

      let { data } = await http.get(url + urlParams);
      this.areaCodes2 = data.response.body.items.item;
    },
    async getCat1List() {
      let url = "/trip/categoryCode";
      let urlParams = "?numOfRows=30" + "&pageNo=" + this.pageNo;

      let { data } = await http.get(url + urlParams);
      this.cat1List = data.response.body.items.item;
    },

    async getCat2List() {
      let url = "/trip/categoryCode";
      let urlParams = "?numOfRows=30" + "&pageNo=" + this.pageNo + "&cat1=" + this.cat1;

      let { data } = await http.get(url + urlParams);
      this.cat2List = data.response.body.items.item;
    },

    async getCat3List() {
      let url = "/trip/categoryCode";
      let urlParams = "?numOfRows=30" + "&pageNo=" + this.pageNo + "&cat1=" + this.cat1 + "&cat2=" + this.cat2;

      let { data } = await http.get(url + urlParams);
      this.cat3List = data.response.body.items.item;
    },
    async getList() {
      let url = "/trip/list";
      let urlParams =
        "?numOfRows=" +
        this.numOfRows +
        "&pageNo=" +
        this.pageNo +
        "&areaCode=" +
        this.areaCode +
        "&sigunguCode=" +
        this.sigunguCode +
        "&cat1=" +
        this.cat1 +
        "&cat2=" +
        this.cat2 +
        "&cat3=" +
        this.cat3;

      let { data } = await http.get(url + urlParams);
      this.list = data.response.body.items.item;

      console.log(data.response.body.items.item);
      this.displayMarker();
    },
    async keywordGetList() {
      let url = "/trip/keyword";
      let urlParams =
        "?numOfRows=" +
        this.numOfRows +
        "&pageNo=" +
        this.pageNo +
        "&areaCode=" +
        this.areaCode +
        "&sigunguCode=" +
        this.sigunguCode +
        "&cat1=" +
        this.cat1 +
        "&cat2=" +
        this.cat2 +
        "&cat3=" +
        this.cat3 +
        "&keyword=" +
        this.keyword;

      let { data } = await http.get(url + urlParams);
      this.list = data.response.body.items.item;

      console.log(data.response.body.items.item);
      this.displayMarker();
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
