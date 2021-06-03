<!--index.vue-->
<template>
  <div>
    <p class="font">{{ text }}</p>
    <img :src="imgMake(src)" alt="結果" width="400" />
  </div>
</template>

<script>
  export default {
    name: "resultArea",
    props: {
      text: {
        type: String,
        required: true
      },
      src: {
        type: String,
        required: true
      }
    },
    methods: {
      imgMake: function (fileName) {
        return require("@/assets/img/" + fileName);
      }
    }
  };
</script>