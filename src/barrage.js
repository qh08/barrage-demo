export default class Barrage {
  constructor({ container, content }) {
    this.container = container;
    this.content = content || "default text";
    this.color = null;
    this.backgroundColor = null;
    this.viewPortLength = null;
    this.time = 5000;
    this.heightOffset = null;
    this.timeOut = null;
    this.barrageStyle = {
      "line-height": "2",
      "user-select": "none",
      position: "absolute",
      left: `${container.offsetWidth}px`,
      top: "20px",
      transform: "0",
      transition: `transform 5s linear`,
      "white-space": "pre",
      "will-change": "transform",
      "font-size": "25px;",
      color: "#ffffff",
      "text-shadow":
        "rgb(0, 0, 0) 1px 0px 1px, rgb(0, 0, 0) 0px 1px 1px, rgb(0, 0, 0) 0px -1px 1px, rgb(0, 0, 0) -1px 0px 1px"
    };
    this.barrage = this.genBarrage();
  }

  init() {}

  getStyleString() {
    return Object.keys(this.barrageStyle)
      .map(key => `${key}:${this.barrageStyle[key]}`)
      .join(";");
  }

  genBarrage() {
    const div = document.createElement("div");
    div.textContent = this.content;
    div.setAttribute("style", this.getStyleString());
    return div;
  }

  init({
    top = 0,
    timeOut = 0,
    isNew = false
  }) {
    this.timeOut = timeOut;
    this.barrage.style.top = `${top}px`;
    if(isNew) {
      this.barrage.style.backgroundColor = `red`;
    }
    this.container.insertBefore(this.barrage, this.container.children[0]);
  }

  start() {
    setTimeout(() => {
      this.barrage.style.transform = `translateX(-${this.container.offsetWidth +
        this.barrage.offsetWidth +
        10}px)`;
    }, this.timeOut);
  }

  destroy() {}
}
