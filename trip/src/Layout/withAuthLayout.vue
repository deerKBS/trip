<template>
  <v-app
    class="bg-sky-100 min-vh-100"
    style="background: linear-gradient(175deg, #bae6fd, #febbe1)"
  >
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: "WithAuthLayout",
};
</script>
