<template>
  <div id="app">
    <h1>今日は定時退社できるかなー？</h1>
    <uranaiButton :text="buttonText" @result="kekka" />
    <resultArea :src="src" :text="text" />
  </div>
</template>

<script>
import uranaiButton from "@/components/UranaiButton"
import resultArea from "@/components/ResultArea"

export default {
  name: "App",
  components: {
    uranaiButton,
    resultArea
  },
  data: () => ({
    src: "dokidoki.jpg",
    text: "どきどき・・・",
    buttonText: "頼む！定時退社させてくれ！"
  }),
  methods: {
    kekka: function (result) {
      this.src = result.src;
      this.text = result.text;
      this.buttonText = result.buttonText
    }
  },
};
</script>
<style>
.font {
  font-size: 200%;
  font-weight: bold;
}
</style>