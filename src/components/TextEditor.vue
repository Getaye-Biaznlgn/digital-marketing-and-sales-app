<template>
  <div>
    <ckeditor
      :editor="editor"
      @ready="onReady"
      v-model="editorData"
      :config="editorConfig"
      @blur="onEditorBlur"
      class="border"
    ></ckeditor>
  </div>
</template>

<script>
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";

export default {
  name: "app",
  props:['initText'],
  data() {
    return {
      editor: DecoupledEditor,
      editorData: this.initText,
      editorConfig: {
        toolbar: {
          items: [
            "heading",
            "|",
            "fontSize",
            "fontFamily",
            "bold",
            "italic",
            "underline",
            "fontColor",
            "fontBackgroundColor",
            "|",
            "strikethrough",
            //   'highlight',
            //   'removeFormat',
            "|",
            "alignment",
            "|",
            "numberedList",
            "bulletedList",
            "|",
            "indent",
            "outdent",
            "|",
            "todoList",
            "link",
            "blockQuote",
            "insertTable",
            "|",
            "undo",
            "redo",
          ],
        },
        language: "cs",
        image: {
          toolbar: [
            "imageTextAlternative",
            "imageStyle:full",
            "imageStyle:side",
            //"linkImage",
          ],
        },
        table: {
          contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
        },
        licenseKey: "",
      },
    };
  },
  methods: {
    onReady(editor) {
      // Insert the toolbar before the editable area.
      editor.ui
        .getEditableElement()
        .parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement()
        );
    },
    onEditorBlur(){
        this.$emit('editorValue', this.editorData)
    }
  },
  watch:{
    initText(){
      this.editorData= this.initText
    }
  }
};
</script>
