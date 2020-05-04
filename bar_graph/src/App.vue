<template>
  <div id="app">
    <barGraph :graphObject="chartData" :viewNum="viewNum" />
    <!--情報切り替えボタン-->
    <div class="btnArea">
      <button :disabled="isDisabledBfBtn" @click="BtnClick('-1')" class="bfBtn">先週</button>
      <button :disabled="isDisabledAfBtn" @click="BtnClick('1')" class="afBtn">翌週</button>
    </div>
  </div>
</template>

<script>
import barGraph from "@/components/barGraph.vue";

export default {
  name: "app",
  components: {
    barGraph
  },
  // 初期表示
  created() {
    this.setGraphData();
  },
  methods: {
    // グラフ描画に必要なデータを設定する
    setGraphData() {
      // グラフ下部にでる日付
      const labels = [
        [
          ["1", "日"],
          ["2", "月"],
          ["3", "火"],
          ["4", "水"],
          ["5", "木"],
          ["6", "金"],
          ["7", "土"]
        ],
        [
          ["8", "日"],
          ["9", "日"],
          ["10", "日"],
          ["11", "日"],
          ["12", "日"],
          ["13", "日"],
          ["14", "日"]
        ],
        [
          ["15", "日"],
          ["16", "日"],
          ["17", "日"],
          ["18", "日"],
          ["19", "日"],
          ["20", "日"],
          ["21", "日"]
        ]
      ];
      // 数値データ
      const datas = [
        [322, 228, 140, 221, 220, 51, 156],
        [411, 69, 294, 95, 500, 319, 214],
        [31, 465, 441, 360, 233, 100, 441]
      ];
      // データ上限（数値データの最大値）
      const maxValue = 500;

      //scaleを設定する。
      let fourDivision = Math.floor(maxValue / 4); // 1/4を求める(小数点以下切り捨て)
      let scale = [];
      let oneUnit = parseInt(maxValue, 10); // 数値に変換(文字列は無視する)
      let index = 0;
      do {
        let formatVal = "\xA5" + oneUnit.toLocaleString(); // ¥マーク、3桁カンマの設定
        scale.push(formatVal);
        oneUnit = oneUnit - fourDivision;
        index++;
      } while (index < 4);

      // データを更新
      this.chartData = {
        labels: labels,
        datas: datas,
        scale: scale
      };
      this.viewNum = 0;
      // 更新用ボタンの非活性設定
      this.isDisabledBfBtn = true;
      this.isDisabledAfBtn = false;
    },

    BtnClick(num) {
      // viewNumに引数で来た値を加算し、その値で切り替えボタンの活性・非活性を切り替える
      // viewNumが変化した時点でグラフコンポーネントに変更通知が行く
      this.viewNum = this.viewNum + Number(num);
      if (this.viewNum == 0) {
        this.isDisabledBfBtn = true;
      } else if (
        this.viewNum > 0 &&
        this.viewNum < this.chartData.datas.length - 1
      ) {
        this.isDisabledBfBtn = false;
        this.isDisabledAfBtn = false;
      } else if (this.viewNum == this.chartData.datas.length - 1) {
        this.isDisabledAfBtn = true;
      }
    }
  },
  data: () => ({
    chartData: {
      labels: [],
      datas: [],
      scale: []
    },
    viewNum: 0,
    isDisabledBfBtn: false,
    isDisabledAfBtn: false
  })
};
</script>

<style>
/* グラフの切り替えボタン */
.btnArea {
  display: flex;
  justify-content: space-between;
  padding: 20px 35px;
}
button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  appearance: none;
  font-size: 22px;
  color: #535353;
}
.bfBtn:before,
.afBtn:after {
  content: "";
  display: inline-block;
  width: 0;
  height: 0;
  border-style: solid;
  vertical-align: text-bottom;
}
.bfBtn:before {
  border-width: 12px 16px 12px 0;
  border-color: transparent #535353 transparent transparent;
  margin-right: 15px;
}
.afBtn:after {
  border-width: 12px 0 12px 16px;
  border-color: transparent transparent transparent #535353;
  margin-left: 15px;
}
/* 非活性時 */
.bfBtn:disabled,
.afBtn:disabled {
  color: #e8e8e8;
}
.bfBtn:disabled:before {
  border-color: transparent #e8e8e8 transparent transparent;
}
.afBtn:disabled:after {
  border-color: transparent transparent transparent #e8e8e8;
}

/* スマホサイズ */
@media screen and (max-width: 480px) {
  /* グラフの切り替えボタン */
  .btnArea {
    padding: 20px 22px 20px 17px;
  }
  button {
    font-size: 14px;
  }
  .bfBtn:before {
    border-width: 8px 10px 8px 0;
    margin-right: 10px;
  }
  .afBtn:after {
    border-width: 8px 0 8px 10px;
    margin-left: 10px;
  }
}
</style>
