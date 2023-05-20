<template>
    <v-dialog
       :value="dialog"
        @input="$emit('update:dialog', $event)"
        max-width="500px"
    > 
      <v-card>
        <v-card-title class="text-h5">
          Add Event
        </v-card-title>
        <v-card-text>
          <v-text-field
            label="Event Name"
            v-model="localEvent.name"
          ></v-text-field>
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="localEvent.start"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="localEvent.start"
                label="Start Date"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="localEvent.start"
              @input="menu = false"
            ></v-date-picker>
          </v-menu>
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="localEvent.end"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="localEvent.end"
                label="End Date"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="localEvent.end"
              @input="menu = false"
            ></v-date-picker>
          </v-menu>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="$emit('update:dialog', false)"
          >
            Cancel
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="addEvent"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
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
      
      localEvent: {...this.event}, // event prop의 복사본
    };
  },
  watch: {
    event(newEvent) {
      // 부모 컴포넌트에서 event prop의 값이 변경되면, 이를 localEvent에 반영
      this.localEvent = {...newEvent};
    }
  },
  methods: {
    addEvent(){
      this.$emit('save', this.localEvent);
    },
  },
};
</script>
