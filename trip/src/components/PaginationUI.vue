<template>
  <!-- a tag href="#" 제외!!
route url 이 board 에서 / 로 변경되는 문제 발생 -->
  <nav aria-label="Page navigation">
    <ul class="pagination justify-content-center">
      <li v-if="prev" class="page-item">
        <a class="page-link" :href="pageLink" aria-label="Previous" @click="paginationChanged(startPageIndex - 1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li v-for="index in endPageIndex - startPageIndex + 1" :key="index" v-bind:class="{ active: startPageIndex + index - 1 == $store.state.board.currentPageIndex }" class="page-item">
        <a @click="paginationChanged(startPageIndex + index - 1)" class="page-link" :href="pageLink">{{ startPageIndex + index - 1 }}</a>
        <!-- href 는 그대로, 커서 모양 유지-->
      </li>
      <li v-if="next" class="page-item">
        <a class="page-link" :href="pageLink" aria-label="Next" @click="paginationChanged(endPageIndex + 1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ["page"],
  data() {
    return {
      pageLink: "#/" + this.page,
    };
  },
  computed: {
    pageCount: function () {
      if (this.page === "board") return this.$store.getters.getPageCount;
      return this.$store.getters.getNoticePageCount;
    },
    startPageIndex: function () {
      if (this.page === "board") return this.$store.getters.getStartPageIndex;
      return this.$store.getters.getNoticeStartPageIndex;
    },
    endPageIndex: function () {
      if (this.page === "board") return this.$store.getters.getEndPageIndex;
      return this.$store.getters.getNoticeEndPageIndex;
    },
    prev: function () {
      if (this.page === "board") return this.$store.getters.getPrev;
      return this.$store.getters.getNoticePrev;
    },
    next: function () {
      if (this.page === "board") return this.$store.getters.getNext;
      return this.$store.getters.getNoticeNext;
    },
  },
  methods: {
    // 부모에게 event 전달
    paginationChanged(pageIndex) {
      console.log("paginationVue : paginationChanged : pageIndex : " + pageIndex);
      this.$emit("call-parent", pageIndex);
    },
  },
};
</script>

<style scoped>
.pagination > li > a {
  background-color: white;
  color: #5a4181;
}

.pagination > li > a:focus,
.pagination > li > a:hover,
.pagination > li > span:focus,
.pagination > li > span:hover {
  color: #5a5a5a;
  background-color: #eee;
  border-color: #ddd;
}

.pagination > .active > a {
  color: white;
  background-color: #fea4d7 !important;
  border: solid 1px #fea4d7 !important;
}

.pagination > .active > a:hover {
  background-color: #fea4d7 !important;
  border: solid 1px #fea4d7;
}
</style>
