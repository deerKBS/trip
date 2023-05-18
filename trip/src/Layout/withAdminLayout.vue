<template>
  <div>
    <a-layout>
      <!-- top nav bar -->
      <top-nav></top-nav>
      <a-layout>
        <!-- side nav bar -->
        <side-nav></side-nav>
        <a-layout-content>
          <!-- content -->
          <router-view></router-view>
          <!-- footer -->
          <!-- <a-layout-footer :style="{ 'line-height': 1.5 }">Footer</a-layout-footer> -->
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import SideNav from "@/Layout/SideNavBar.vue";
import TopNav from "@/Layout/TopNavBar.vue";
export default {
  name: "WithAdminLayout",
  components: { SideNav, TopNav },
};
</script>
