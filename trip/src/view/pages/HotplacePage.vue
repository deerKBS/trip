<template>
  <div>
    <Main>
      <a-row :gutter="25">
        <a-col :sm="24" :xs="24">
          <sdCards headless>
            <h3>HotPlace Page</h3>
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
