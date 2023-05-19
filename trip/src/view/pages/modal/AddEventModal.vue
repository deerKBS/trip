<template>
  <div class="modal fade" id="addEventModal" tabindex="-1" role="dialog" aria-labelledby="addEventModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addEventModalLabel">이벤트 추가</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <!-- 이벤트명 입력 필드 -->
          <div class="form-group">
            <label for="eventName">이벤트명</label>
            <input type="text" class="form-control" id="eventName" v-model="eventName" />
          </div>

          <!-- 시작날짜 입력 필드 -->
          <div class="form-group">
            <label for="startDate">시작날짜</label>
            <VDateTimePicker v-model="startDate" />
          </div>

          <!-- 종료날짜 입력 필드 -->
          <div class="form-group">
            <label for="endDate">종료날짜</label>
            <VDateTimePicker v-model="endDate" />
          </div>
          <v-container fluid class="pa-0">
            <v-row>
              <VDateTimePicker :label="시작날짜" v-model="startDate"></VDateTimePicker>
              <VDateTimePicker :label="종료날짜" v-model="endDate"></VDateTimePicker>
            </v-row>
          </v-container>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">취소</button>
          <button type="button" class="btn btn-primary" @click="saveEvent">저장</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VDateTimePicker from "@/view/pages/VDatetimePicker.vue";

export default {
  name: "AddEventModal",
  components: {
    VDateTimePicker,
  },
  data() {
    return {
      eventName: "", // 이벤트명 데이터
      startDate: null, // 시작날짜 데이터
      endDate: null, // 종료날짜 데이터
    };
  },
  methods: {
    saveEvent() {
      // 저장 버튼 클릭 시 실행되는 로직
      // 이벤트명, 시작날짜, 종료날짜 데이터를 이용하여 이벤트를 저장하는 동작을 수행할 수 있습니다.
      console.log("이벤트명:", this.eventName);
      console.log("시작날짜:", this.startDate);
      console.log("종료날짜:", this.endDate);
    },
  },
};
</script>

<style scoped>
/* 필요한 스타일링을 추가할 수 있습니다. */
</style>
