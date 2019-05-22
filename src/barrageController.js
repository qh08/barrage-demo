import Barrage from "./barrage";

const container = document.getElementById("barrages");
const lineHeight = 50;

export default class barrageController {
  constructor() {
    this.data = null;
    this.verticalCount = Math.floor(container.clientHeight / lineHeight);
    this.count = 0;
  }

  initBarrages(data) {
    this.data = data;
  }

  start() {
    this.data.forEach((d, index) => {
      const barrage = new Barrage({
        container,
        content: d.content
      });

      barrage.init({ top: lineHeight * (index % this.verticalCount), timeOut: 2000 * Math.floor(index / this.verticalCount)  });
      barrage.start();
    });
  }
}
