<template>
  <v-dialog :value="dialog" @input="$emit('update:dialog', $event)" max-width="500px">
    <v-card>
      <v-card-title class="text-h5"> Add Event </v-card-title>
      <v-card-text>
        <v-text-field label="Event Name" v-model="localEvent.name"></v-text-field>
        <v-menu ref="menu" v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field v-model="localEvent.start" label="Start Date" readonly v-bind="attrs" v-on="on"></v-text-field>
          </template>
          <v-date-picker v-model="localEvent.start" scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn text color="primary" @click="set">OK</v-btn>
          </v-date-picker>
        </v-menu>

        <v-menu ref="menu" v-model="menu2" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field v-model="localEvent.end" label="End Date" readonly v-bind="attrs" v-on="on"></v-text-field>
          </template>
          <v-date-picker v-model="localEvent.end" @input="menu2 = false"></v-date-picker>
        </v-menu>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="$emit('update:dialog', false)"> Cancel </v-btn>
        <v-btn color="blue darken-1" text @click="addEvent"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import http from "@/common/axios.js";

export default {
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
    event: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      menu: false,
      menu2: false,
      date: "",
      localEvent: { ...this.event }, // event prop의 복사본
    };
  },
  watch: {
    event(newEvent) {
      // 부모 컴포넌트에서 event prop의 값이 변경되면, 이를 localEvent에 반영
      this.localEvent = { ...newEvent };
    },
  },
  methods: {
    addEvent() {
      this.scheduleInsert();
      this.$emit("save", this.localEvent);
    },

    set() {
      this.menu = false;
    },

    async scheduleInsert() {
      try {
        let newSchedule = {
          scheduleName: this.localEvent.name,
          scheduleStart: this.localEvent.start,
          scheduleEnd: this.localEvent.end,
        };

        let { data } = await http.put(`/schedules/${this.$store.state.login.userEmail}`, newSchedule);

        console.log("InsertModalVue: data : ");
        console.log(data);
        if (data.result == "login") {
          this.doLogout();
        } else {
          this.$alertify.success("일정이 등록되었습니다.");
          this.closeModal();
        }
      } catch (error) {
        console.log("InsertModalVue: error ");
        console.log(error);
      }
    },
  },
};
</script>
