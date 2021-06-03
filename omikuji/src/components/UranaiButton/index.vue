<!--index.vue-->
<template>
  <button @click="uranau">{{text}}</button>
</template>

<script>
  export default {
    name: "uranaiButton",
    props: {
      text: {
        type: String,
        default: "占う！"
      }
    },
    data: () => ({
      resultList: [
        {
          src: "result1.jpg",
          text: "明日の自分がなんとかしてくれるので、今日は定時で帰ろう",
          buttonText: "定時退社成功！他の結果もみてみる？"
        },
        {
          src: "result2.jpg",
          text: "みんなで協力して上司を倒せ！！",
          buttonText: "俺たちの戦いはこれからだ！上司と戦った結果は・・・？"
        },
        {
          src: "result3.jpg",
          text:
            "会社で寝泊まりすれば、定時とか関係ないんじゃ・・・！（とか思わず、帰ろう）",
          buttonText: "会社は家ではありません。運命を変えよう"
        },
        {
          src: "result4.jpg",
          text:
            "家族だと　思っているのは　あなただけ（５・７・５。無視して帰ろう）",
          buttonText: "定時退社成功！他の結果もみてみる？"
        },
        {
          src: "result5.jpg",
          text: "しつこく定時帰りアピールをしておこう",
          buttonText: "帰ります帰ります帰ります・・・結果をみてみる？"
        },
        {
          src: "result6.jpg",
          text: "帰らせてくれないならバイオテロだ！",
          buttonText: "いやだ・・・死にたくない！運命よ、変われ！"
        },
        {
          src: "result7.jpg",
          text: "秘儀、横文字羅列！！お先に失礼しまーーーーす！",
          buttonText: "定時退社成功！他の結果もみてみる？"
        },
        {
          src: "result8.jpg",
          text: "帰れないから、残業自慢しようぜ！",
          buttonText: "ふざけんな！運命を変えてやる！"
        },
      ],
    }),
    methods: {
      uranau: function () {
        let result = this.resultList[
          Math.floor(Math.random() * this.resultList.length)
        ];
        const kekka = {
          src : result.src,
          text : result.text,
          buttonText: result.buttonText
        }
        this.$emit('result', kekka)
      },
    },
  };
</script>