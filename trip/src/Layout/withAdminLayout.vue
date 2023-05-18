<template>
  <div>
    <h1>AdminLayout</h1>
    <side-nav></side-nav>
    <top-nav></top-nav>
    <router-view></router-view>
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
