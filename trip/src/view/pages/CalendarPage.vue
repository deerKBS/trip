<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat>
          <v-btn variant="outlined" class="me-4" color="grey-darken-2" @click="setToday"> Today </v-btn>
          <v-btn fab variant="text" size="small" color="grey-darken-2" @click="prev">
            <v-icon size="small"> mdi-chevron-left </v-icon>
          </v-btn>
          <v-btn fab variant="text" size="small" color="grey-darken-2" @click="next">
            <v-icon size="small"> mdi-chevron-right </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu location="bottom end">
            <template v-slot:activator="{ on, attrs }">
              <v-btn variant="outlined" color="grey-darken-2" v-bind="attrs" v-on="on">
                <span>{{ typeToLabel[type] }}</span>
                <v-icon end> mdi-menu-down </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 days</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <!-- calendar view -->
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :type="type"
          @click:date="openAddEventModal"
        ></v-calendar>
        <add-event-modal :show="showAddEventModal" :selected-date="selectedDate" @close="closeAddEventModal" @add="addEvent"></add-event-modal>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import AddEventModal from "@/view/pages/modal/AddEventModal.vue";

export default {
  components: {
    "add-event-modal": AddEventModal,
  },
  data: () => ({
    focus: "",
    type: "month",
    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day",
      "4day": "4 Days",
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    colors: ["blue", "indigo", "deep-purple", "cyan", "green", "orange", "grey darken-1"],
    names: ["Meeting", "Holiday", "PTO", "Travel", "Event", "Birthday", "Conference", "Party"],
    showAddEventModal: false,
    selectedDate: null,
  }),
  mounted() {
    this.$refs.calendar.checkChange();
  },
  methods: {
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    openAddEventModal(date) {
      this.selectedDate = date;
      this.showAddEventModal = true;
    },
    closeAddEventModal() {
      this.showAddEventModal = false;
    },
    addEvent(event) {
      this.events.push(event);
      this.showAddEventModal = false;
    },
    // showEvent({ nativeEvent, event }) {
    //   const open = () => {
    //     this.selectedEvent = event;
    //     this.selectedElement = nativeEvent.target;
    //     requestAnimationFrame(() => requestAnimationFrame(() => (this.selectedOpen = true)));
    //   };

    //   if (this.selectedOpen) {
    //     this.selectedOpen = false;
    //     requestAnimationFrame(() => requestAnimationFrame(() => open()));
    //   } else {
    //     open();
    //   }

    //   nativeEvent.stopPropagation();
    // },
    // updateRange({ start, end }) {
    //   const events = [];

    //   const min = new Date(`${start.date}T00:00:00`);
    //   const max = new Date(`${end.date}T23:59:59`);
    //   const days = (max.getTime() - min.getTime()) / 86400000;
    //   const eventCount = this.rnd(days, days + 20);

    //   for (let i = 0; i < eventCount; i++) {
    //     const allDay = this.rnd(0, 3) === 0;
    //     const firstTimestamp = this.rnd(min.getTime(), max.getTime());
    //     const first = new Date(firstTimestamp - (firstTimestamp % 900000));
    //     const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
    //     const second = new Date(first.getTime() + secondTimestamp);

    //     events.push({
    //       name: this.names[this.rnd(0, this.names.length - 1)],
    //       start: first,
    //       end: second,
    //       color: this.colors[this.rnd(0, this.colors.length - 1)],
    //       timed: !allDay,
    //     });
    //   }

    //   this.events = events;
    // },
    // rnd(a, b) {
    //   return Math.floor((b - a + 1) * Math.random()) + a;
    // },
  },
};
</script>
