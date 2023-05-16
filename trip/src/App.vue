<template>
  <div v-if="isLoading" class="spin">
    <a-spin />
  </div>
  <ThemeProvider
    v-else
    :theme="{
      darkMode,
      mainContent,
      ...themeColor,
    }"
  >
    <Suspense>
      <template #default>
        <router-view></router-view>
      </template>
      <template #fallback>
        <div class="spin">
          <a-spin />
        </div>
      </template>
    </Suspense>
  </ThemeProvider>
</template>
<script>
import { ThemeProvider } from "vue3-styled-components";
import { themeColor } from "./config/theme/themeVariables";
import { computed, defineComponent, onMounted } from "vue";
import { useStore } from "vuex";
import "v-calendar/dist/style.css";

export default defineComponent({
  name: "App",
  components: {
    ThemeProvider,
  },
  setup() {
    const { state } = useStore();
    const isLoading = computed(() => state.themeLayout.loading);
    const darkMode = computed(() => state.themeLayout.data);
    const mainContent = computed(() => state.themeLayout.main);

    onMounted(() => {
      window.addEventListener("load", () => {
        darkMode.value ? document.body.classList.add("dark-mode") : "";
      });
    });

    return {
      themeColor,
      darkMode,
      isLoading,
      mainContent,
    };
  },
});
</script>
