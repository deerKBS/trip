<template>
  <a-layout-sider v-model="collapsed" collapsible>
    <a-menu mode="inline" :style="{ height: '100%', borderRight: 0 }">
      <a-menu-item key="0">
        <span>Option 0</span>
      </a-menu-item>
      <a-sub-menu key="sub1">
        <template #title>
          <span> 검색 </span>
        </template>
        <a-menu-item key="1">여행지 검색</a-menu-item>
        <a-menu-item key="2">여행 경로 조회</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <template #title>
          <span> subnav 2 </span>
        </template>
        <a-menu-item key="5">option5</a-menu-item>
        <a-menu-item key="6">option6</a-menu-item>
        <a-menu-item key="7">option7</a-menu-item>
        <a-menu-item key="8">option8</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub3">
        <template #title>
          <span> subnav 3 </span>
        </template>
        <a-menu-item key="9">option9</a-menu-item>
        <a-menu-item key="10">option10</a-menu-item>
        <a-menu-item key="11">option11</a-menu-item>
        <a-menu-item key="12">option12</a-menu-item>
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>

<script>
export default {
  name: "SideNav",
  data() {
    return {
      collapsed: false, // store에 넣어서 상황에 따라 변경 가능하게 해야함.
    };
  },
};
</script>
