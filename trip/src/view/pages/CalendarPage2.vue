<template>
  <v-app>
    <v-calendar
      v-model="selectedDate"
      color="primary"
      @click:date="openDialog"
    />
    
    <EventDialog
      :dialog.sync="dialog"
      :event="newEvent"
      @save="addEvent"
    />
    
  </v-app>
</template>

<script>
import EventDialog from '@/view/pages/modal/EventDialog.vue';

export default {
  components: {
    EventDialog,
  },

  data: () => ({
    selectedDate: null,
    dialog: false,
    newEvent: { name: "", start: "", end: "" },
    menu: false,
    events: [],
  }),
  methods: {
    openDialog(date) {
      this.dialog = true;
      this.newEvent.start = date;
      this.newEvent.end = date;
    },
    addEvent() {
      this.events.push({ ...this.newEvent });
      this.newEvent = { name: "", start: "", end: "" };
      this.dialog = false;
    },
  },
};
</script>
