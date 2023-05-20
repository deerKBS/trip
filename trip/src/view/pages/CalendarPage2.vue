<template>
  <v-app>
    <v-calendar
      v-model="selectedDate"
      color="primary"
      :events="events" 
      @click:date="openDialog"
    />
    <!-- dialog 값이 변경되면 EventDialog 컴포넌트를 새로 생성합니다. -->
    <EventDialog
      
      v-if="dialog"  
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
    newEvent: null,
    menu: false,
    events: [],
  }),
  methods: {
    openDialog() {
      this.newEvent = { name: "", start: "", end: "" }; // newEvent 객체를 새로 생성합니다.
      this.dialog = true;
    },
    addEvent(event) {
      this.events.push(event);
      //this.newEvent = { name: "", start: "", end: "" };
      this.dialog = false;
    },
  },
};
</script>
