export default class Barrage {
  constructor({ container }) {
    this.container = container;
    this.content = "";
    this.color = null;
    this.backgroundColor = null;
    this.viewPortLength = null;
    this.heightOffset = null;
    this.startTime = null;
    this.working = false;
    this.delay = 0;
    this.barrageStyle = {
      "line-height": "1",
      "user-select": "none",
      position: "absolute",
      left: `${container.clientWidth}px`,
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
    this.setStyle(div);
    return div;
  }

  setStyle(dom) {
    dom.setAttribute("style", this.getStyleString());
  }

  load() {
    this.container.insertBefore(this.barrage, this.container.children[0]);
  }

  restart({
    content = "default text",
    top = 0,
    isNew = false,
    workingTime = 5000
  }) {
    this.barrage.setAttribute("style", "");
    this.working = true;
    this.barrage.textContent = '';
    
    setTimeout(() => {
      this.barrage.setAttribute("style", this.getStyleString());
      this.barrage.textContent = content;
      this.barrage.style.top = `${top}px`;
      if (isNew) {
        this.barrage.style.backgroundColor = `red`;
      }

      setTimeout(() => {
        this.barrage.style.transition = "transform 5s linear";
        this.barrage.style.transform = `translateX(-${this.container
          .offsetWidth +
          this.barrage.offsetWidth +
          10}px) translateY(0px) translateZ(0px)`;
      }, 0);

      setTimeout(() => {
        this.working = false;
      }, workingTime);
    }, 1000);
  }

  start({
    content = "default text",
    top = 0,
    isNew = false,
    workingTime = 5000
  }) {
    this.barrage.textContent = content;
    this.barrage.style.top = `${top}px`;
    if (isNew) {
      this.barrage.style.backgroundColor = `red`;
    }
    this.working = true;

    setTimeout(() => {
      this.barrage.style.transform = `translateX(-${this.container.offsetWidth +
        this.barrage.offsetWidth +
        10}px) translateY(0px) translateZ(0px)`;
    }, 0);

    setTimeout(() => {
      this.working = false;
    }, workingTime);
  }

  destroy() {}
}
