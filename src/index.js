import "./index.less";
import BarrageController from "./barrageController";
import data from "./data";

const container = document.getElementById("barrages");
const controller = new BarrageController({
  container: document.getElementById("barrages"),
  barrageInfo: data,
  barrageHeight: 25,
  barrageFontSize:25,
  interval: 1000,
  lineNum: 4,
  barrageCharMaxNum: 13
  // isLoop: true,
  // hasTimeLine: false
});

controller.start();

document.getElementById("button").addEventListener("click", function() {
  const content = document.getElementById("input").value;

  const barrage = new Barrage({
    container,
    content
  });
  barrage.init({
    isNew: true,
    top: 100
  });
  barrage.start();
});
