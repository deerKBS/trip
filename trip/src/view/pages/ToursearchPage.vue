<template>
  <div>
    <Main>
      <a-row :gutter="25">
        <a-col :sm="24" :xs="24">
          <sdCards headless>
            <h3>Tour Search Page</h3>
            <Map></Map>
          </sdCards>
        </a-col>
      </a-row>
    </Main>
  </div>
</template>

<script>
import { Main } from "../styled";
import { defineComponent } from "vue";
import Map from "../../components/map/Map.vue";

export default defineComponent({
  name: "MainPage",
  components: { Main, Map },
});
</script>
