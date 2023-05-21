<template>
  <div>
    <h4>글쓰기</h4>
    <div>
      <div class="mb-3">
        <label for="titleInsert" class="form-label">제목</label>
        <input type="text" class="form-control" id="titleInsert" v-model="title" />
      </div>
      <div class="mb-3">
        <label for="contentInsert" class="form-label">내용</label>
        <!-- New for FileUpload, CKEditor -->
        <div id="divEditorInsert"></div>
      </div>
      <div class="mb-3">
        <div class="form-check">
          <input v-model="attachFile" class="form-check-input" type="checkbox" value="" id="chkFileUploadInsert" />
          <label class="form-check-label" for="chkFileUploadInsert">파일 추가</label>
        </div>
      </div>
      <div v-show="attachFile" class="mb-3" style="display: none" id="imgFileUploadInsertWrapper">
        <input @change="changeFile" type="file" id="inputFileUploadInsert" multiple />
        <!-- 여러개 선택 가능! multiple! -->
        <div id="imgFileUploadInsertThumbnail" class="thumbnail-wrapper">
          <img v-for="(file, index) in fileList" v-bind:key="index" v-bind:src="file" />
        </div>
      </div>
      <button @click="boardInsert" id="btnBoardInsert" class="btn btn-sm btn-primary btn-outline float-end" type="button">등록</button>
    </div>
  </div>
</template>

<script>
import http from "@/common/axios";
import Vue from "vue";
import CKEditor from "@ckeditor/ckeditor5-vue2";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import VueAlertify from "vue-alertify";

Vue.use(CKEditor).use(VueAlertify);
export default {
  data() {
    return {
      title: "",
      CKEditor: "",
      attachFile: false,
      fileList: [],
    };
  },
  methods: {
    initUI() {
      this.title = "";
      this.CKEditor.setData("");
      this.attachFile = false;
      this.fileList = [];
      document.querySelector("#inputFileUploadInsert").value = "";
    },
    changeFile(fileEvent) {
      this.fileList = [];
      const fileArray = Array.from(fileEvent.target.files); // Array 로 변환 가능
      fileArray.forEach((file) => {
        this.fileList.push(URL.createObjectURL(file));
      });
    },
    async boardInsert() {
      // file upload -> encoding Type : mutipart/form-data
      let formData = new FormData();
      formData.append("title", this.title);
      formData.append("content", this.CKEditor.getData());

      let files = document.querySelector("#inputFileUploadInsert").files;

      const fileArray = Array.from(files);
      fileArray.forEach((file) => formData.append("file", file));

      let options = {
        headers: { "Content-Type": "mutipart/form-data" },
      };
      let response = await http.post("/boards", formData, options);
      let { data } = response;

      console.log(data);

      if (data.result == "login") {
        this.$router.push("/login");
      } else {
        this.$alertify.success("글이 등록되었습니다.");
        this.$router.push("/board");
      }
    },
  },
  async mounted() {
    try {
      this.CKEditor = await ClassicEditor.create(document.querySelector("#divEditorInsert"));
    } catch (error) {
      console.error(error);
    }
  },
};
</script>
