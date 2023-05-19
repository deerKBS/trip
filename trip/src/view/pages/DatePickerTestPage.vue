<template>
  <v-app id="inspire">
    <v-container fluid class="pa-0">
      <v-row>
        <VDateTimePicker :label="시작날짜"></VDateTimePicker>
        <VDateTimePicker :label="종료날짜"></VDateTimePicker>
      </v-row>
    </v-container>
    <button @click="showAddEventModal">모달 버튼</button>

    <add-event-modal-vue> </add-event-modal-vue>
  </v-app>
</template>

<script>
import VDateTimePicker from "@/view/pages/VDatetimePicker.vue";
import AddEventModalVue from "./modal/AddEventModal.vue";
import { Modal } from "bootstrap";

export default {
  name: "DatePickerTestPage",
  components: {
    VDateTimePicker,
    AddEventModalVue,
  },
  data() {
    return {
      addEventModal: null,
    };
  },
  methods: {
    showAddEventModal() {
      this.addEventModal.show();
    },
  },
  mounted() {
    this.addEventModal = new Modal(document.getElementById("addEventModal"));
  },
};
</script>
