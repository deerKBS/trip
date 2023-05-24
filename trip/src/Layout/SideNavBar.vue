<template>
  <!-- :trigger="null" -->
  <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
    <a-menu mode="inline" :style="{ height: '100%', borderRight: 0 }">
      <a-sub-menu key="sub1">
        <template #title>
          <span> 검 색 </span>
        </template>
        <a-menu-item key="1">
          <router-link to="/search/tour">관광지 조회</router-link>
        </a-menu-item>
        <a-menu-item key="2">
          <router-link to="/search/route">경로 조회</router-link>
        </a-menu-item>
      </a-sub-menu>
      <a-divider style="min-width: 90%; width: 90%" class="bg-blue-100 mt-0 mb-0 ml-auto mr-auto" />
      <a-sub-menu key="sub2">
        <template #title>
          <span> 게시판 </span>
        </template>
        <a-menu-item key="3">
          <router-link to="/notice">공지사항</router-link>
        </a-menu-item>
        <a-menu-item key="4">
          <router-link to="/board">자유게시판</router-link>
        </a-menu-item>
        <a-menu-item key="5">
          <router-link to="/planBoard">여행계획</router-link>
        </a-menu-item>
      </a-sub-menu>
      <a-divider style="min-width: 90%; width: 90%" class="bg-blue-100 mt-0 mb-0 ml-auto mr-auto" />
      <a-sub-menu key="sub3">
        <template #title>
          <span> 나만의 계획 </span>
        </template>
        <a-menu-item key="6">
          <router-link to="/plan/calendar">일 정</router-link>
        </a-menu-item>
        <a-menu-item key="7">
          <router-link to="/plan/tour">여 행</router-link>
        </a-menu-item>
        <a-menu-item key="8">
          <router-link to="/plan/addMyplan">여행 계획 세우기</router-link>
        </a-menu-item>
      </a-sub-menu>
      <a-divider style="min-width: 90%; width: 90%" class="bg-blue-100 mt-0 mb-0 ml-auto mr-auto" />
      <a-menu-item key="9">
        <template #icon>
          <unicon name="circle"></unicon>
        </template>
        <router-link to="/hotplace">핫플레이스</router-link>
      </a-menu-item>
      <a-divider style="min-width: 90%; width: 90%" class="bg-blue-100 mt-0 mb-0 ml-auto mr-auto" />
    </a-menu>
  </a-layout-sider>
</template>

<script>
export default {
  name: "SideNav",
  data() {
    return { collapsed: false };
  },
  computed: {},
};
</script>

<style>
.ant-layout-sider-trigger {
  background-color: #bae6fd;
  color: rgb(14, 174, 248);
}
</style>
