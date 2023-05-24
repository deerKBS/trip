<template>
  <div>
    <div v-for="day in duration" :key="day">
      <h3>Day {{ day }}</h3>
      <!-- <div class="itinerary-items" v-if="itinerary[day]">
        <p v-for="item in itinerary[day]" :key="item.id">{{ item.name }}</p>
      </div> -->
    </div>
    <button class="btn-outline-primary mx-2" @click="increment">Day 추가</button>
  </div>
</template>

<script>
export default {
  //props: ["duration"],
  data() {
    return {
      duration: 3,
      //   itinerary: {
      //     1: [
      //       { id: 1, name: "장소1" },
      //       { id: 2, name: "장소2" },
      //     ],
      //     2: [
      //       { id: 3, name: "장소3" },
      //       { id: 4, name: "장소4" },
      //     ],
      //     3: [{ id: 5, name: "장소5" }],
      //     // ...
      //   },
    };
  },

  methods: {
    increment() {
      this.duration++;
    },
  },
};
</script>
