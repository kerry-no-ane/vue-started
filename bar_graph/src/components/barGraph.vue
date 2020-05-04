<template>
  <div class="barGraph">
    <svg viewBox="0 0 745 820" width="745" height="820">
      <!-- 背景の薄い罫線 -->
      <g stroke="#efefef" stroke-width="1">
        <line x1="475" y1="0" x2="475" y2="755" />
        <line x1="0" y1="0" x2="745" y2="0" />
        <line x1="0" y1="188.75" x2="475" y2="188.75" />
        <line x1="0" y1="377.5" x2="475" y2="377.5" />
        <line x1="0" y1="566.25" x2="475" y2="566.25" />
        <line x1="0" y1="755" x2="745" y2="755" />
      </g>
      <!-- 左側の縦の目盛り（４分割）-->
      <g font-size="20">
        <text
          v-for="(scaleData, index) in $props.graphObject.scale"
          :key="index"
          x="38"
          :y="33 + index * 190"
        >{{ scaleData }}</text>
      </g>
      <!-- 横の目盛り（７分割） -->
      <g font-size="18">
        <text v-for="(label, index) in $props.graphObject.labels[$props.viewNum]" :key="index">
          <tspan
            :x="label[0].length > 1 ? baseX(index) + 1 : baseX(index) + 5"
            y="785"
          >{{ label[0] }}</tspan>
          <tspan :x="baseX(index) + 2" y="805">{{ label[1] }}</tspan>
        </text>
      </g>
      <!-- グラフ背景グレー -->
      <g fill="rgba(230, 230, 230, 1)">
        <rect
          v-for="(data, index) in $props.graphObject.datas[$props.viewNum]"
          :key="index"
          :x="baseX(index)"
          y="3"
          :height="graphMaxNum - 3"
          width="21"
        />
      </g>
      <!-- グラフメイン -->
      <g transform="scale(1,-1)">
        <!-- グラデーション設定 -->
        <defs>
          <linearGradient
            id="g0"
            x1="0%"
            y1="100%"
            x2="0%"
            y2="0%"
            gradientUnits="userSpaceOnUse"
            spreadMethod="repeat"
          >
            <stop offset="0%" stop-color="#2dcecf" />
            <stop offset="16.7%" stop-color="#3082d4" />
            <stop offset="33.3%" stop-color="#b374e3" />
            <stop offset="50.0%" stop-color="#f85694" />
            <stop offset="66.7%" stop-color="#ff5c89" />
            <stop offset="100%" stop-color="#f98716" />
          </linearGradient>
        </defs>
        <!-- グラフ メインで伸びる部分 -->
        <rect
          v-for="(data, index) in $props.graphObject.datas[$props.viewNum]"
          :key="index"
          :x="baseX(index, 2)"
          :y="graphMaxNum * -1"
          height="0"
          width="25"
          fill="url(#g0)"
        >
          <animate
            attributeName="height"
            from="0"
            :to="getMaxPoint(data)"
            dur="1s"
            begin="indefinite"
            repeatCount="1"
            fill="freeze"
            class="barAnime"
          />
        </rect>
      </g>
      <!-- グラフ白抜き -->
      <g
        fill="rgba(255, 255, 255, 1)"
        v-for="(data, index) in $props.graphObject.datas[$props.viewNum]"
        :key="index"
      >
        <!-- 最大125回転するが、上を突き抜けるようであればそれ以降は出力しないようにする -->
        <template v-for="n in 125">
          <rect
            :key="n"
            v-if="graphMaxNum - n * 6 > -6"
            :x="getX(n, index, data)"
            :y="graphMaxNum - n * 6"
            :height="4"
            :width="getWidth(n, data)"
          />
        </template>
      </g>
    </svg>
    <!-- 右側の数値一覧。CSSで逆順に表示させている -->
    <div class="textArea">
      <dl v-for="(data, index) in $props.graphObject.datas[$props.viewNum]" :key="index">
        <dt>{{ $props.graphObject.labels[$props.viewNum][index].join("") }}</dt>
        <dd>¥{{ data }}</dd>
      </dl>
    </div>
  </div>
</template>

<script>
const graphMax = 755;
export default {
  name: "barGraph",
  props: {
    graphObject: Object,
    viewNum: Number
  },
  mounted: function() {
    this.graphAnimate();
  },
  methods: {
    // グラフの先端が数値によっては凹という形になってしまうため、それを防ぐために白抜きの棒の横幅を広げる
    // 先端付近の白抜きの幅は25になる。
    getWidth(n, val) {
      return graphMax - n * 6 > graphMax - this.getMaxPoint(val) ? "21" : "25";
    },
    // 白抜きの描画開始位置（横）を取得する。25幅の白抜きは、-2の位置から開始
    getX(n, index, data) {
      let x = this.baseX(index);
      return graphMax - n * 6 > graphMax - this.getMaxPoint(data) ? x : x - 2;
    },
    // グラフの灰色背景とメインの横位置を取得する。adjustmentに値を設定すると、その分左にずらすことが可能
    baseX(index, adjustment = 0) {
      return (index + 1) * 43 + 133 - adjustment;
    },
    // 渡された値がグラフ内で定めた最大値のNパーセントにあたるのか？を算出。該当するパーセンテージをかけた値を返す
    getMaxPoint(data) {
      let percent = Math.round((data / this.maxNum) * 1000) / 1000;
      return Math.round(graphMax * percent);
    },
    // グラフが伸びるアニメを実行する
    graphAnimate() {
      this.animate.forEach(target => target.beginElement());
    }
  },
  computed: {
    // 渡された配列の最大値＋５００の値を返す
    maxNum: function() {
      return Math.max.apply(null, this.graphObject.datas[this.viewNum]) + 500;
    },
    // アニメーション対象のタグを取得
    animate: function() {
      const tmp = document.getElementsByClassName("barAnime");
      const animate = Array.prototype.slice.call(tmp);
      return animate;
    }
  },
  data: () => ({
    graphMaxNum: graphMax
  }),
  // 指定している値に変化があった場合、記述してある処理を実行
  watch: {
    graphObject: function() {
      this.graphAnimate();
    },
    viewNum: function() {
      this.graphAnimate();
    }
  }
};
</script>

<style scoped>
/* グラフ描画エリアの横最大幅 */
.barGraph {
  max-width: 745px;
  margin: auto;
  position: relative;
}
/* 右側の日と金額を表示するエリア。逆順で表示 */
.textArea {
  position: absolute;
  top: 40px;
  left: 505px;
  display: flex;
  flex-direction: column-reverse;
  text-align: left;
  justify-content: flex-end;
}
.textArea dl {
  display: flex;
  justify-content: center;
  line-height: 22px;
  margin-bottom: 85px;
}
.textArea dl dt {
  width: 84px;
  font-weight: bold;
  font-size: 18px;
}
.textArea dl dd {
  font-size: 22px;
  color: #c2c2c2;
  font-weight: normal;
  vertical-align: middle;
}

@media screen and (max-width: 480px) {
  /* transformで縮小表示。高さを縮小後に合わせて修正 */
  .barGraph {
    transform-origin: 0px 0px;
    transform: scale(0.5, 0.5);
    margin: 0 -100% -100% 0;
    overflow: hidden;
  }
  .textArea {
    font-size: 12px;
    padding-bottom: 7%;
  }
  .textArea p span {
    padding-left: 16px;
  }
  .textArea dl dt {
    width: 50px;
  }
}
</style>
