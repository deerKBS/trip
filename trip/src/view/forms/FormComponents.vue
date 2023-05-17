<template>
  <Main>
    <FormComponentsWrap>
      <div class="Insert board">
        <h5>Write a New Post</h5>
        <div class="form-group">
          <label>Title</label>
          <input type="text" class="form-control" v-model="title" placeholder="Enter title" />
        </div>
        <div class="form-group">
          <label>Content</label>
          <div id="divEditorInsert"></div>
        </div>
        <div class="form-group">
          <label>Attach File</label>
          <input type="file" id="inputFileUploadInsert" @change="changeFile" />
          <div class="thumbnail-wrapper" v-if="fileList.length > 0">
            <img v-for="(file, index) in fileList" :key="index" :src="file" class="thumbnail" />
          </div>
        </div>
        <div class="form-group">
          <button class="btn btn-primary" @click="boardInsert">Submit</button>
          <button class="btn btn-secondary" @click="doLogout">Logout</button>
        </div>
      </div>
    </FormComponentsWrap>
  </Main>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Main } from "../styled";
import { FormComponentsWrap } from "./overview/Style";
//import http from "@/common/axios.js";

export default {
  name: "InsertModal",
  // data 가 최초 발생하는 곳이므로 store 를 사용하지 않아도 됨.
  components: {
    Main,
    FormComponentsWrap,
  },
  data() {
    return {
      title: "",
      CKEditor: "",
      attachFile: false,
      fileList: [],
    };
  },
  methods: {
    // modal 초기화
    initUI() {
      this.title = "";
      this.CKEditor.setData("What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting");
      this.attachFile = false;
      this.fileList = [];
      document.querySelector("#inputFileUploadInsert").value = "";
    },
    changeFile(fileEvent) {
      this.fileList = []; // thumbnail 초기화

      const fileArray = Array.from(fileEvent.target.files);
      fileArray.forEach((file) => {
        this.fileList.push(URL.createObjectURL(file)); // push : array 에 항목 추가
      });
    },
    // 굳이 actions 에 있을 필요 없다. backend async 작업이지만, 그 결과로 store 를 변경하는 내용이 없다.
    async boardInsert() {
      let formData = new FormData();
      formData.append("title", this.title);
      formData.append("content", this.CKEditor.getData());

      // file upload
      let attachFiles = document.querySelector("#inputFileUploadInsert").files;

      if (attachFiles.length > 0) {
        const fileArray = Array.from(attachFiles);
        fileArray.forEach((file) => formData.append("file", file));
      }

      // let options = {
      //   headers: { "Content-Type": "multipart/form-data" },
      // };

      // try {
      //   let { data } = await http.post("/boards", formData, options);

      //   console.log("InsertModalVue: data : ");
      //   console.log(data);
      //   if (data.result == "login") {
      //     this.doLogout();
      //   } else {
      //     this.$alertify.success("글이 등록되었습니다.");
      //     this.closeModal();
      //   }
      // } catch (error) {
      //   console.log("InsertModalVue: error ");
      //   console.log(error);
      // }
    },

    // logout 처리 별도 method
    doLogout() {
      this.$store.commit("SET_LOGIN", { isLogin: false, userName: "", userProfileImageUrl: "" });
      this.$router.push("/login");
    },
  },
  async mounted() {
    try {
      this.CKEditor = await ClassicEditor.create(document.querySelector("#divEditorInsert"));
    } catch (error) {
      console.error(error);
    }

    // bootstrap modal show event hook
    // InsertModal 이 보일 때 초기화
    let $this = this;
    this.$el.addEventListener("show.bs.modal", function () {
      $this.initUI();
    });
  },
};
</script>
