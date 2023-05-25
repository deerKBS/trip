<template>
  <div style="margin: auto; width: 80%">
    <div class="container w-full">
      <p class="row float-left my-3" style="font-size: 30px; border-bottom: 5px solid #188fff">글 작성</p>
      <div class="row justify-content-between" style="min-width: 100%">
        <div class="dropdown col-2">
          <button class="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">{{ categoryName }}</button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li v-for="(code, index) in codeList" :key="index">
              <a
                class="dropdown-item"
                @click="
                  category = code.code;
                  categoryName = code.codeName;
                "
                >{{ code.codeName }}</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div>
      <div class="mb-3">
        <label for="titleInsert" class="form-label">제목</label>
        <input type="text" class="form-control" id="titleInsert" v-model="title" />
      </div>
      <div class="mb-3">
        <label for="contentInsert" class="form-label">내용</label>
        <!-- New for FileUpload, CKEditor -->
        <div id="divEditorInsert"></div>
        <!-- New for FileUpload -->
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
      <button @click="noticeInsert" id="btnNoticeInsert" class="btn float-end custom-btn" type="button">등록</button>
      <button @click="cancel" class="btn float-end custom-btn" type="button">취소</button>
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
      category: "",
      categoryName: "",

      groupCode: "003",
      codeList: [],
    };
  },
  async created() {
    // 카테고리 코드, 카테고리명 조회
    let params = {
      groupCode: this.groupCode,
    };
    try {
      let { data } = await http.get("/codes", { params }); // params : params shorthand property, Not JSON request
      console.log("RegisterVue: data : ");
      console.log(data);

      this.category = data[0].code;
      this.categoryName = data[0].codeName;
      this.codeList = data;
    } catch (error) {
      console.log("RegisterVue: error : ");
      console.log(error);
      this.$alertify.error("서버에 문제가 발생했습니다.");
    }
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
    async noticeInsert() {
      // file upload -> encoding Type : mutipart/form-data
      let formData = new FormData();
      formData.append("title", this.title);
      formData.append("content", this.CKEditor.getData());
      formData.append("category", this.category);

      let files = document.querySelector("#inputFileUploadInsert").files;

      const fileArray = Array.from(files);
      fileArray.forEach((file) => formData.append("file", file));

      let options = {
        headers: { "Content-Type": "mutipart/form-data" },
      };
      let response = await http.post("/notices", formData, options);
      let { data } = response;

      console.log(data);

      if (data.result == "login") {
        this.$router.push("/login");
      } else {
        this.$alertify.success("글이 등록되었습니다.");
        this.$router.push("/notice");
      }
    },
    cancel() {
      this.$router.go(-1);
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

<style scoped>
.custom-btn {
  background: #ffffff;
  border: #fea4d7 solid;
  border-radius: 10px;
  float: right;
  margin-right: 10px;
}
.custom-btn:hover {
  color: white;
  background: #fea4d7;
}
div >>> .ck-editor__editable {
  width: 100%;
  height: 300px;
  overflow-y: scroll;
}

/*파일업로드 thumbnail*/
div >>> .thumbnail-wrapper {
  margin-top: 5px;
}

div >>> .thumbnail-wrapper img {
  width: 100px !important;
  margin-right: 5px;
  max-width: 100%;
}
</style>
