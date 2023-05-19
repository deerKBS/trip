<template>
  <div class="row p-1 pt-4">
    <div class="col">
      <div class="row">
        <div class="dropdown m-1" style="width: 200px; min-width: 200px">
          <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false"> Dropdown link </a>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </div>
        <div class="dropdown m-1" style="width: 200px; min-width: 200px">
          <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false"> Dropdown link </a>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </div>
        <div class="dropdown m-1" style="width: 200px; min-width: 200px">
          <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false"> Dropdown link </a>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </div>
        <div class="dropdown m-1" style="width: 200px; min-width: 200px">
          <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false"> Dropdown link </a>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </div>
        <div class="dropdown m-1" style="width: 200px; min-width: 200px">
          <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false"> Dropdown link </a>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </div>
        <button type="button" class="btn btn-outline-info m-1 ms-3" style="width: 146.58px; min-width: 146.58px">검 색</button>
      </div>
    </div>
    <div class="col-10 min-w-max card border shadow-black h-100 py-1 m-auto">
      <div class="card-body">
        <!--Map start-->
        <div id="map" class="mt" style="width: 100%; height: 600px"></div>
        <!--Map end-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchTour",
  data() {
    return {
      sido: "시도를 선택하세요",

      map: null,
    };
  },
  mounted() {
    //api 스크립트 소스 불러오기 및 지도 출력
    if (window.kakao && window.kakao.maps) {
      this.loadMap();
    } else {
      this.loadScript();
    }
  },
  unmounted() {},
  methods: {
    // api 불러오기
    loadScript() {
      const script = document.createElement("script");
      script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=fc028c62490f726b597bff7133044d1c&autoload=false";
      script.onload = () => window.kakao.maps.load(this.loadMap);

      document.head.appendChild(script);
    },
    // 맵 출력하기
    loadMap() {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(37.500613, 127.036431),
        level: 5,
      };
      this.map = new window.kakao.maps.Map(container, options);
      this.loadMaker();
    },
    // 지정한 위치에 마커 불러오기
    loadMaker() {
      const markerPosition = new window.kakao.maps.LatLng(37.500613, 127.036431);
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });

      marker.setMap(this.map);
    },
  },
};
</script>
