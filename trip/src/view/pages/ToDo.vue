<template>
  <div>
    <sdPageHeader title="Main Page" class="ninjadash-page-header-main"> </sdPageHeader>
    <Main>
      <a-row :gutter="25">
        <a-col :sm="24" :xs="24">
          <sdCards headless>
            <h3>Todo Page</h3>
          </sdCards>
        </a-col>
      </a-row>
    </Main>
  </div>
</template>

<script>
import { Main } from "../styled";
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainPage",
  components: {
    Main,
  },
});
</script>
