<template>
  <v-dialog v-model="localShow" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span>Add New Event</span>
      </v-card-title>
      <v-card-text>
        <!-- Form for event details -->
        <v-form ref="form">
          <!-- Event name -->
          <v-text-field v-model="event.name" label="Event name" :rules="[(v) => !!v || 'Event name is required']"></v-text-field>

          <!-- Event start and end date/time -->
          <v-datetime-picker v-model="event.start" label="Start" :rules="[(v) => !!v || 'Start time is required']"></v-datetime-picker>
          <v-datetime-picker v-model="event.end" label="End" :rules="[(v) => !!v || 'End time is required']"></v-datetime-picker>

          <!-- Event color -->
          <v-select v-model="event.color" :items="colors" label="Color" :rules="[(v) => !!v || 'Color is required']"></v-select>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close">Close</v-btn>
        <v-btn color="blue darken-1" text @click="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["show", "selectedDate"],
  data: () => ({
    localShow: false,
    event: {
      name: "",
      start: "",
      end: "",
      color: "",
    },
    colors: ["blue", "indigo", "deep-purple", "cyan", "green", "orange", "grey darken-1"],
  }),
  watch: {
    show(newVal) {
      this.localShow = newVal;
    },
    localShow(newVal) {
      if (!newVal) {
        this.$emit("close");
      }
    },
    selectedDate(newVal) {
      this.event.start = newVal;
      this.event.end = newVal;
    },
  },
  methods: {
    close() {
      this.localShow = false;
    },
    save() {
      if (this.$refs.form.validate()) {
        this.$emit("add", this.event);
        this.event = {
          name: "",
          start: "",
          end: "",
          color: "",
        };
      }
    },
  },
};
</script>
