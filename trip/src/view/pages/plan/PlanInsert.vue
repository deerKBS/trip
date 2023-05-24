<template>
  <div class="fl" :style="{ position: 'absolute', left: '425px', top: '66px' }">
    <div id="on_city_open_btn"></div>
    <div id="city_list" :data="0">
      <div class="list_title">
        <span></span>
        <div class="list_title_option_menu" :data-is_open="off">도시 변경</div>
      </div>
      <div id="on_city_close_btn"></div>
      <div class="clear"></div>
      <div class="city_change_box">
        <div class="city_text_search_box">
          <input type="text" class="city_text_search_input" id="city_search_key" />
        </div>
        <div class="city_search"></div>
        <div class="city_items"></div>
      </div>
      <div class="list_search_full_box">
        <div class="list_search_box">
          <input type="text" id="input_search" placeholder="장소 검색" />
          <div style="margin-left: 20px; margin-top: 5px">
            <span type="radio" class="radio" :data-val="city" :data-on="on" :data-name="search_type" style="color: #808080">도시내 검색</span>
            <span type="radio" class="radio" :data-val="total" :data-name="search_type" style="color: #808080">전체검색</span>
            <input type="hidden" name="search_type" id="search_type" class="news" />
          </div>
        </div>
        <div class="list_category_box">
          <div class="list_cat_item fl on" :data="3"><img src="/res/img/workspace/new/ic_300_c.png" /></div>
          <div class="list_cat_item fl" :data="2"><img src="/res/img/workspace/new/ic_200_a.png" /></div>
          <div class="list_cat_item fl" :data="4"><img src="/res/img/workspace/new/ic_400_a.png" /></div>
          <div class="list_cat_item fl" :data="1"><img src="/res/img/workspace/new/ic_100_a.png" /></div>
          <div class="list_cat_item fl" :data="5"><img src="/res/img/workspace/new/ic_000_a.png" /></div>
          <div class="clear"></div>
          <div class="list_tag_box">
            <div id="map_tag_select_box" class="et_slide_parent" :data-is_open="0">태그 선택</div>
            <div id="map_tag_select_sub_box" class="et_slide"></div>
          </div>
        </div>
      </div>
      <div class="list_box_overlay"></div>
      <div class="list_box connectedSortable"></div>
    </div>
    <div id="hotel_list" :data="0">
      <div class="list_title">
        <span></span> 호텔
        <div class="list_title_option_menu" :data-is_open="off">도시 변경</div>
      </div>
      <div id="detail_close_btn"></div>
      <div class="clear"></div>
      <div class="hotel_search_box">
        <div class="list_search_box" id="hotel_search_inner_box">
          <input type="text" id="key_hotelsearch" />
          <div id="key_hotelsearch_autocomplete"></div>
        </div>
        <div class="ht_change_search_box">
          <div class="fl" style="width: 150px; margin-left: 15px; margin-top: 15px">
            <div style="font-size: 15px; color: #555555; padding-top: 10px" id="hotel_info_date">→</div>
            <div style="font-size: 13px; color: #555555; padding-top: 10px" id="hotel_info_room_guest">, 투숙객 명</div>
          </div>
          <div class="fr" id="hotel_search_edit_btn" style="margin-top: 15px; margin-right: 15px">검색<br />변경</div>
          <div class="clear"></div>
        </div>
        <div class="ht_filter_box">
          <div id="hotel_rank_filter" :data-is_open="0" class="et_slide_parent">숙소 등급</div>
          <div id="hotel_rank_filter_box" style="display: none" class="et_slide">
            <div class="item" :data-check="0" :data="5"><img src="/res/img/city/hotel_star_5.png" /></div>
            <div class="item" :data-check="0" :data="4"><img src="/res/img/city/hotel_star_4.png" /></div>
            <div class="item" :data-check="0" :data="3"><img src="/res/img/city/hotel_star_3.png" /></div>
            <div class="item" :data-check="0" :data="2"><img src="/res/img/city/hotel_star_2.png" /></div>
            <div class="item" :data-check="0" :data="1"><img src="/res/img/city/hotel_star_1.png" /></div>
          </div>
          <div id="hotel_type_filter" :data-is_open="0" class="et_slide_parent">숙소 유형별</div>
          <div id="hotel_type_filter_box" style="display: none" class="et_slide"></div>
        </div>
      </div>
      <div class="list_box_overlay"></div>
      <div class="list_box connectedSortable">
        <div style="width: 100%; text-align: center; padding-top: 50px; font-size: 17px; line-height: 20px">
          <img src="/res/img/common/w_ic_loading1.gif" /><br />전 세계 주요 호텔 사이트를<br />검색하고 있습니다.
        </div>
      </div>
    </div>
    <div id="map" class="fr" style="height: 100%; position: relative"></div>
    <div id="select_detail_view_spot" :data="0"></div>
  </div>
</template>

<script>
export default {
  name: "PlanInsert",
  // Add your component's logic here
};
</script>

<style>
/* Add component-specific styles here */
</style>
