<template>
  <div class="container">
    <div class="place-items">
      <div v-for="place in places" :key="place.id" draggable="true" @dragstart="drag($event, place)">
        {{ place.name }}
      </div>
    </div>

    <div class="droppable-area" @dragover.prevent @dragenter.prevent @drop="drop($event)">
      <div v-for="place in droppedPlaces" :key="place.id">
        {{ place.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      places: [
        { id: 1, name: "해운대 해수욕장" },
        { id: 2, name: "남산 타워" },
        { id: 3, name: "제주도 해녀 박물관" },
        { id: 4, name: "경주 보문산" },
        { id: 5, name: "평창 알펜시아 리조트" },
        // ...
      ],
      droppedPlaces: [],
    };
  },
  methods: {
    drag(event, place) {
      event.dataTransfer.setData("place", JSON.stringify(place));
    },
    drop(event) {
      const place = JSON.parse(event.dataTransfer.getData("place"));
      this.droppedPlaces.push(place);
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-around;
}
.droppable-area {
  width: 200px;
  height: 300px;
  border: 1px solid black;
}
</style>
