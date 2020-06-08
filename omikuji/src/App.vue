<template>
  <div id="app">
    <h1>今日は定時退社できるかなー？</h1>
    <button name="myBtn" @click="uranau">占う！</button>
    <p class="font">{{ text }}</p>
  </div>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    result: "./img/dokidoki.jpg",
    text: "どきどき・・・",
    resultList: [
      {
        text: "明日の自分がなんとかしてくれるので、今日は定時で帰ろう"
      },
      {
        text: "みんなで協力して上司を倒せ！！"
      },
      {
        text:
          "会社で寝泊まりすれば、定時とか関係ないんじゃ・・・！（とか思わず、帰ろう）"
      },
      {
        text: "しつこく定時に帰りますアピールをしておこう"
      },
      {
        text: "帰らせてくれないならバイオテロだ！"
      },
      {
        text: "帰れないから、残業自慢しようぜ！"
      }
    ]
  }),
  methods: {
    uranau: function() {
      let result = this.resultList[
        Math.floor(Math.random() * this.resultList.length)
      ];

      this.text = result.text;
    }
  }
};
</script>
<style>
.font {
  font-size: 200%;
  font-weight: bold;
}
</style>