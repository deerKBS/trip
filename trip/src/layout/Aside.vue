<template>
  <a-menu
    :open-keys="openKeys"
    v-model:selectedKeys="selectedKeys"
    :mode="mode"
    :theme="darkMode ? 'dark' : 'light'"
    class="scroll-menu"
    @openChange="onOpenChange"
    @click="onClick"
  >
    <NavTitle class="ninjadash-sidebar-nav-title">Search</NavTitle>
    <a-menu-item @click="toggleCollapsed" key="tour-search">
      <template #icon>
        <unicon name="circle"></unicon>
      </template>
      <router-link to="/search/tour">관광지 조회</router-link>
    </a-menu-item>
    <a-menu-item @click="toggleCollapsed" key="route-search">
      <template #icon>
        <unicon name="circle"></unicon>
      </template>
      <router-link to="/search/route">여행경로 조회</router-link>
    </a-menu-item>

    <NavTitle class="ninjadash-sidebar-nav-title">Others</NavTitle>
    <a-sub-menu key="plan">
      <template #icon>
        <unicon name="circle"></unicon>
      </template>
      <template #title>나만의 계획</template>
      <a-menu-item @click="toggleCollapsed" key="month">
        <router-link to="/plan/calendar">일 정</router-link>
      </a-menu-item>
      <a-menu-item @click="toggleCollapsed" key="tour">
        <router-link to="/plan/tour">여 행</router-link>
      </a-menu-item>
      <a-menu-item @click="toggleCollapsed" key="todo">
        <router-link to="/plan/todo">할 일</router-link>
      </a-menu-item>
    </a-sub-menu>

    <a-menu-item @click="toggleCollapsed" key="hotplace">
      <template #icon>
        <unicon name="circle"></unicon>
      </template>
      <router-link to="/hotplace">핫플레이스</router-link>
    </a-menu-item>

    <a-sub-menu key="board">
      <template #icon>
        <unicon name="setting"></unicon>
      </template>
      <template #title>게시판</template>
      <a-menu-item @click="toggleCollapsed" key="notice-board">
        <router-link to="/board/notice">공지사항</router-link>
      </a-menu-item>
      <a-menu-item @click="toggleCollapsed" key="free-board">
        <router-link to="/board">자유게시판</router-link>
      </a-menu-item>
      <a-menu-item @click="toggleCollapsed" key="planshare-board">
        <router-link to="/board/plan">여행계획</router-link>
      </a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>
<script>
import { computed, reactive, ref, toRefs, watch, watchEffect, defineComponent } from "vue";
import VueTypes from "vue-types";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { NavTitle } from "./style";

export default defineComponent({
  name: "AsideItems",
  props: {
    toggleCollapsed: VueTypes.func,
    events: VueTypes.object,
  },
  components: {
    NavTitle,
  },
  setup(props) {
    const store = useStore();
    const darkMode = computed(() => store.state.themeLayout.data);
    const mode = ref("inline");
    const { events } = toRefs(props);
    const { modeChangeDark, modeChangeLight } = events.value;

    const router = computed(() => useRoute());
    const state = reactive({
      rootSubmenuKeys: ["sub1", "sub2", "sub4"],
      selectedKeys: ["home"],
      openKeys: ["dashboard"],
      preOpenKeys: ["dashboard"],
    });

    const onOpenChange = (keys) => {
      state.openKeys = keys[keys.length - 1] !== "recharts" ? [keys.length && keys[keys.length - 1]] : keys;
    };

    const onClick = (item) => {
      if (item.keyPath.length === 1) state.openKeys = [];
    };

    watchEffect(() => {
      if (router.value.matched.length) {
        if (router.value.matched.length > 2) {
          state.selectedKeys = [router.value.matched[2].name];
          state.openKeys = [router.value.matched[1].name];
          state.preOpenKeys = [router.value.matched[1].name];
        } else if (router.value.matched.length > 3) {
          state.selectedKeys = [router.value.matched[3].name];
          state.openKeys = [router.value.matched[1].name];
          state.preOpenKeys = [router.value.matched[1].name];
        } else {
          state.selectedKeys = [router.value.matched[1].name];
          state.openKeys = [router.value.matched[1].name];
          state.preOpenKeys = [router.value.matched[1].name];
        }
      }
    });

    watch(
      () => state.openKeys,
      (val, oldVal) => {
        state.preOpenKeys = oldVal;
      }
    );

    return {
      mode,
      ...toRefs(state),
      darkMode,
      modeChangeDark,
      modeChangeLight,
      onOpenChange,
      onClick,
    };
  },
});
</script>
