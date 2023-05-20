<template>
  <v-app>
    <v-sheet height="64">
        <v-toolbar flat>
          <v-btn variant="outlined" class="me-4" color="grey-darken-2" @click="setToday"> Today </v-btn>
          <v-btn fab variant="text" size="small" color="grey-darken-2" @click="prev">
            <v-icon size="small"> mdi-chevron-left </v-icon>
          </v-btn>
          <v-btn fab variant="text" size="small" color="grey-darken-2" @click="next">
            <v-icon size="small"> mdi-chevron-right </v-icon>
          </v-btn>
          <v-toolbar-title v-if="init">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <!-- <v-menu location="bottom end">
            <template v-slot:activator="{ on, attrs }">
              <v-btn variant="outlined" color="grey-darken-2" v-bind="attrs" v-on="on">
                <span>{{ typeToLabel[type] }}</span>
                <v-icon end> mdi-menu-down </v-icon>
              </v-btn>
            </template>
        
          </v-menu> -->
        </v-toolbar>
      </v-sheet>

    <v-calendar
      ref="calendar"
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
import EventDialog from '@/components/modals/EventDialog.vue';

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
    init: false,
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
    setToday() {
      this.selectedDate = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
  },
  mounted(){ //제일 처음 랜더링 할때 날짜를 표기하기 위한  <v-toolbar-title v-if="init"> 코드 조금 불안하다.
    this.init = true;
  }
};
</script>
