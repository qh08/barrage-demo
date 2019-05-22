import "./index.less";
import Barrage from "./barrage";
import BarrageController from "./barrageController";
import data from "./data";

const container = document.getElementById("barrages");
const controller = new BarrageController();

controller.initBarrages(data);
controller.start()

document.getElementById("button").addEventListener("click", function() {
  const content = document.getElementById("input").value;

  const barrage = new Barrage({
    container,
    content
  });
  barrage.init({});
  barrage.start();
});
