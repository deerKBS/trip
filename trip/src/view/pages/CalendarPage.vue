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
      </v-toolbar>
    </v-sheet>

    <v-calendar ref="calendar" v-model="selectedDate" color="primary" :events="events" @click:date="openDialog" @click:event="showEvent" />
    <!-- dialog 값이 변경되면 EventDialog 컴포넌트를 새로 생성합니다. -->
    <EventDialog v-if="dialog" :dialog.sync="dialog" :event="newEvent" @save="addEvent" />

    <v-menu max-width="500px" v-model="selectedOpen" :close-on-content-click="false" :activator="selectedElement">
      <v-card color="grey-lighten-4" min-width="350px" flat>
        <v-toolbar :color="selectedEvent.color" dark>
          <v-btn icon>
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>mdi-heart</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text> </v-card-text>
        <v-card-actions>
          <v-btn variant="text" color="secondary" @click="selectedOpen = false"> 편집 </v-btn>
          <v-btn variant="text" color="secondary" @click="deleteSchedule"> 삭제 </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </v-app>
</template>

<script>
import EventDialog from "@/components/modals/EventDialog.vue";
import http from "@/common/axios.js";

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

    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    selectedTemp: {},
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
       this.scheduleList();
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
    async scheduleList() {
      //이벤트에는 이름, 시작 날짜, 끝날짜, 색깔 timed: !allDay, 가 들어간다.

      try {
        //let { data } = await http.post("/schedules/" + this.$store.state.memberStore.userInfo.userEmail); // params: params shorthand property, let response 도 제거
        let { data } = await http.post("/schedules/" + this.$store.state.login.userEmail); // params: params shorthand property, let response 도 제거
        console.log("Schedule: data : ");
        console.log(data);
        if (data.result == "login") {
          this.$router.push("/login");
        } else {
          this.events = data.list.map((item) => ({
            name: item.scheduleName,
            start: item.scheduleStart,
            end: item.scheduleEnd,
            seq: item.scheduleSeq,
          }));
        }
      } catch (error) {
        console.error(error);
      }
    },
    async deleteSchedule() {
      try {
        let { data } = await http.delete("/schedules/" + this.selectedEvent.seq); // params: params shorthand property, let response 도 제거
        console.log("Schedule: data : ");
        console.log(data);
        if (data.result == "login") {
          this.$router.push("/login");
        } else {
          this.scheduleList();
        }
        this.selectedOpen = false;
      } catch (error) {
        console.error(error);
      }
    },

    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
     
        console.log("seq출력 " + event.seq);

        this.selectedElement = nativeEvent.target;
        requestAnimationFrame(() => requestAnimationFrame(() => (this.selectedOpen = true)));
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        requestAnimationFrame(() => requestAnimationFrame(() => open()));
      } else {
        open();
      }
      console.log();
      nativeEvent.stopPropagation();
    },
  },
  computed: {

  },
  updated() {
    this.scheduleList();
  },
  mounted() {
    //제일 처음 랜더링 할때 날짜를 표기하기 위한  <v-toolbar-title v-if="init"> 코드 조금 불안하다.
    this.init = true;
  },
};
</script>
