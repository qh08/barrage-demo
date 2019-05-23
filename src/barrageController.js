import Barrage from "./barrage";

export default class barrageController {
  constructor({
    container,
    mode = "",
    barrageInfo,
    barrageHeight,
    isLoop,
    hasTimeLine
  }) {
    // 弹幕容器
    this.container = container;
    // 模式 full half quarter
    this.mode = mode;
    // 弹幕信息，数组对象，显示文字属性为 content
    this.barrageInfo = barrageInfo;
    // 弹幕高度
    this.barrageHeight = barrageHeight;
    // // 是否循环播放弹幕
    // this.isLoop = isLoop;
    // // 是否有时间轴
    // this.hasTimeLine = hasTimeLine;

    // 纵向显示弹幕的最大值
    this.verticalBarrageNum = Math.floor(
      this.container.clientHeight / this.barrageHeight / (this.mode === "full"
        ? 1
        : this.mode === 'half' ? 2 : 4)
    );
  }

  start() {
    this.barrageInfo.forEach((d, index) => {
      this.initBarrage(d.content, index);
    });
  }

  initBarrage(content, index) {
    const barrage = new Barrage({
      container: this.container,
      content
    });

    barrage.init({
      top: this.barrageHeight * (index % this.verticalBarrageNum),
      timeOut: 2000 * Math.floor(index / this.verticalBarrageNum)
    });
    barrage.start();
  }
}
