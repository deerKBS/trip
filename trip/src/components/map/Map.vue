<template>
  <div class="container-fluid">
    <form class="col">
      <div class="row">
        <select id="area1List" class="form-select form-select-lg col me-2">
          <option value="">시도를 선택하세요</option>
        </select>
        <select id="area2List" class="form-select form-select-lg col me-2">
          <option value="">구군을 선택하세요</option>
        </select>
        <select id="cat1List" class="form-select form-select-lg col me-2">
          <option value="">대분류 선택하세요</option>
        </select>
        <select id="cat2List" class="form-select form-select-lg col me-2">
          <option value="">중분류 선택하세요</option>
        </select>
        <select id="cat3List" class="form-select form-select-lg col me-2">
          <option value="">소분류 선택하세요</option>
        </select>
        <button id="btnSearch" class="col btn btn btn-outline-primary">검색</button>
      </div>
    </form>

    <div class="card border shadow h-100 py-1 my-2">
      <div class="card-body">
        <!--Map start-->
        <div id="map" class="mt" style="width: 100%; height: 600px"></div>
        <!--Map end-->
      </div>
    </div>

    <!-- DataTales Example -->

    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">조회 결과</h6>
      </div>
      <div class="card-body">
        <table class="table table-striped" style="display: none">
          <thead>
            <tr>
              <th>대표이미지</th>
              <th>관광지명</th>
              <th>주소</th>
              <th>위도</th>
              <th>경도</th>
            </tr>
          </thead>
          <tbody id="trip-list"></tbody>
        </table>
      </div>
    </div>
    <!-- table -->
  </div>
  <!-- /.container-fluid -->
</template>

<script>
export default {
  name: "Map",
  data() {
    return {
      map: null,
    };
  },
  setup() {},
  created() {},
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
