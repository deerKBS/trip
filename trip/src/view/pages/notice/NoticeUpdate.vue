<template>
  <div>
    <h4>글수정</h4>
    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">{{ notice.categoryName }}</button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li v-for="(code, index) in codeList" :key="index">
          <a
            class="dropdown-item"
            @click="
              notice.categoryName = code.codeName;
              notice.category = code.code;
            "
            >{{ code.codeName }}</a
          >
        </li>
      </ul>
    </div>
    <div>
      <div class="mb-3"><label for="titleUpdate" class="form-label">제목</label> <input type="text" class="form-control" id="titleUpdate" v-model="notice.title" /></div>
      <div class="mb-3">
        <!-- New for FileUpload, CKEditor -->
        <div id="divEditorUpdate"></div>
        <!-- New for FileUpload -->
      </div>
      <div class="mb-3">
        첨부파일 :
        <!-- props notice 에서 이전 첨부된 file list -->
        <span v-for="(file, index) in notice.fileList" :key="index"> {{ file.fileName }} </span>
      </div>
      <div class="mb-3">
        <div class="form-check">
          <input v-model="attatchFile" class="form-check-input" type="checkbox" value="" id="chkFileUploadUpdate" /> <label class="form-check-label" for="chkFileUploadUpdate">파일 변경</label>
        </div>
      </div>
      <div v-show="attatchFile" class="mb-3" id="imgFileUploadUpdateWrapper">
        <input type="file" @change="changeFile" id="inputFileUploadUpdate" multiple />
        <div id="imgFileUploadUpdateThumbnail" class="thumbnail-wrapper">
          <img v-for="(file, index) in fileList" v-bind:key="index" v-bind:src="file" />
        </div>
      </div>
      <button @click="noticeUpdate" class="btn btn-sm btn-primary btn-outline float-end" type="button">수정</button>
    </div>
  </div>
</template>

<script>
import http from "@/common/axios";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import Vue from "vue";
import VueAlertify from "vue-alertify";
Vue.use(VueAlertify);

export default {
  data() {
    return {
      CKEditor: "",
      attatchFile: false,
      notice: {
        noticeId: "",
        title: "",
        content: "",
        fileList: [],
        categoryName: "", // String
        category: "", // code
      },
      fileList: [],

      groupCode: "003",
      codeList: [],
    };
  },
  methods: {
    changeFile(fileEvent) {
      this.fileList = [];
      const fileArray = Array.from(fileEvent.target.files); // Array 로 변환 가능
      fileArray.forEach((file) => {
        this.fileList.push(URL.createObjectURL(file));
      });
    },
    async noticeUpdate() {
      // file upload -> encoding Type : mutipart/form-data
      let formData = new FormData();
      formData.append("noticeId", this.notice.noticeId);
      formData.append("title", this.notice.title);
      formData.append("content", this.CKEditor.getData());
      formData.append("category", this.notice.category);

      let files = document.querySelector("#inputFileUploadUpdate").files;

      const fileArray = Array.from(files);
      fileArray.forEach((file) => formData.append("file", file));

      let options = {
        headers: { "Content-Type": "mutipart/form-data" },
      };
      let response = await http.post("/notices/" + this.notice.noticeId, formData, options);
      let { data } = response;

      if (data.result == "login") {
        this.$router.push("/login");
      } else {
        this.$alertify.success("글이 수정되었습니다.");
        this.$router.push("/notice/detail/" + this.$route.params.noticeId);
      }
    },
    async noticeDetail(noticeId) {
      let response = await http.get("/notices/" + noticeId);
      let { data } = response;
      console.log(data);

      if (data.result == "login") {
        this.$router.push("/login");
      } else {
        let noticeNew = {
          ...data.dto,
        };
        this.notice = noticeNew;
        this.CKEditor.setData(this.notice.content);
        if (!(noticeNew.fileList === undefined)) {
          this.attatchFile = true;
        }
      }
    },
  },
  async created() {
    console.log(this.$route.params.noticeId);
    this.noticeDetail(this.$route.params.noticeId);

    let params = {
      groupCode: this.groupCode,
    };
    try {
      let { data } = await http.get("/codes", { params }); // params : params shorthand property, Not JSON request
      console.log("RegisterVue: data : ");
      console.log(data);

      this.codeList = data;
    } catch (error) {
      console.log("RegisterVue: error : ");
      console.log(error);
      this.$alertify.error("서버에 문제가 발생했습니다.");
    }
  },
  async mounted() {
    try {
      this.CKEditor = await ClassicEditor.create(document.querySelector("#divEditorUpdate"));
    } catch (error) {
      console.error(error);
    }
  },
};
</script>
