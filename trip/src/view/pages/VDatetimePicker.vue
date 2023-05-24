<template>
  <v-col cols="4" sm="6" md="4">
    <v-dialog ref="dialog" v-model="dateModal" :return-value.sync="date" lazy full-width width="340px">
      <template v-slot:activator="{ on }">
        <v-text-field v-model="date" :label="`${label}`" prepend-icon="📅" readonly v-on="on"></v-text-field>
      </template>
      <v-date-picker v-model="date" scrollable>
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="dateModal = false">Cancel</v-btn>
        <v-btn text color="primary" @click="timeModal = true">OK</v-btn>
      </v-date-picker>
    </v-dialog>

    <v-dialog ref="dialog2" v-model="timeModal" :return-value.sync="time" lazy full-width width="340px">
      <v-time-picker v-if="timeModal" v-model="time" full-width>
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="timeModal = false">Cancel</v-btn>
        <v-btn text color="primary" @click="set()">OK</v-btn>
      </v-time-picker>
    </v-dialog>
  </v-col>
</template>

<script>
export default {
  props: ["label"],
  data: () => ({
    date: "",
    dateModal: false,
    time: "",
    timeModal: false,
  }),
  methods: {
    set() {
      this.date = this.date + " " + this.time;
      this.$refs.dialog.save(this.date);
      this.$refs.dialog2.save(this.time);
    },
  },
};
</script>
