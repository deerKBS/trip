<template>
  <div>
    <a-layout style="min-height: 100vh">
      <!-- top nav bar -->
      <top-nav></top-nav>
      <a-layout>
        <!-- side nav bar -->
        <side-nav class="shadow-lg"></side-nav>
        <a-layout-content>
          <!-- content -->
          <div class="min-h-full bg-sky-100 max-w-full min-w-full w-full h-full">
            <router-view></router-view>
          </div>
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
