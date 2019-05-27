import Barrage from "./barrage";

export default class barrageController {
  constructor({
    container,
    barrageInfo,
    barrageHeight,
    barrageFontSize,
    barrageCharMaxNum,
    isLoop,
    hasTimeLine,
    lineNum
  }) {
    // 弹幕容器
    this.container = container;
    // 弹幕信息，数组对象，显示文字属性为 content
    this.barrageInfo = this.initBarragInfo(barrageInfo, barrageCharMaxNum);
    // 弹幕高度
    this.barrageHeight = barrageHeight;
    // 弹幕字体大小
    this.barrageFontSize = barrageFontSize;
    // 是否循环播放弹幕
    this.isLoop = isLoop;
    // 是否有时间轴
    this.hasTimeLine = hasTimeLine;
    // 弹幕飘过的时间
    this.periodTime = 5000;
    // 弹幕最大长度，0为无限制长度, 单位px
    this.barrageMaxWidth = barrageCharMaxNum * barrageFontSize;
    // 同一行前后弹幕的最小时间间隔
    this.barrageInterval = null;
    // 纵向显示弹幕的最大值
    this.verticalBarrageNum = lineNum;
    this.verticalIndex = 0;

    this.lineBarrage = new Array(this.verticalBarrageNum);
    this.storage = [];

    this.initBarrageInterval();
    this.initTimeLine();
  }

  initBarrageInterval() {
    this.barrageInterval =
      (this.periodTime * this.barrageMaxWidth) /
      (this.container.clientWidth + this.barrageMaxWidth);
  }

  initTimeLine() {
    this.barrageInfo.forEach((info, index) => {
      const count = Math.floor(index / this.verticalBarrageNum);
      info.delay = (
        count * this.barrageInterval +
        0
        // (Math.random() * this.barrageInterval) / 1000
      ).toFixed(2);
    });
  }

  start() {
    this.barrageInfo.forEach((info, index) => {
      setTimeout(() => {
        let barrage = this.storage.find(barrage => !barrage.working);
        if (!barrage) {
          barrage = new Barrage({
            container: this.container,
            fontSize: this.barrageFontSize
          });
          this.storage.push(barrage);
          barrage.load();
          this.startBarrage(barrage, info.content);
        } else {
          barrage.restart({
            content: info.content,
            top: this.verticalIndex * this.barrageHeight,
            time: this.periodTime
          });
        }
        this.verticalIndex++;
        this.verticalIndex %= this.verticalBarrageNum;
      }, info.delay);
    });
  }

  startBarrage(barrage, content) {
    barrage.start({
      content,
      top: this.verticalIndex * this.barrageHeight,
      time: this.periodTime
    });
  }

  initBarragInfo(barrageInfo, barrageCharMaxNum) {
    barrageInfo.forEach(info => {
      let content = info.content;
      if (content.length > barrageCharMaxNum)
        info.content = content.substring(0, 13) + "...";
    });
    return barrageInfo;
  }
}
