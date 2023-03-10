const styles = `<style>
div {
  height: 100%;
  width: 100%;
  max-height: 600px;
  max-width: 600px;
  position: relative;
}
img{
  object-fit: contain;
  width: 100%;
  height: 100%;
}
span {
  position: absolute;
  width: 20%;
  top: 72.5%;
  left: 30%;
  height: 2%;
  border-radius: 50% 0% 0% 50%;
  background-color: grey;
  transform-origin: 100%;
}

// span:after {
//   display: block;
//   content:'';
//   width: 20px;
//   height: 20px;
//   color: black;
//   background: black;
//   z-index: 100;
//   position: absolute;
//   top: -6px;
// }

// span:before {
//   display: block;
//   content: '';
//   width: 20px;
//   height: 20px;
//   color: black;
//   position: absolute;
//   right: 0;
//   top: -6px;
//   background: black;
//   z-index: 100;
//   border-radius: 50%;
//   outline: 10px solid red;
//   border : 5px solid white;
// }
</style>`;

const template = document.createElement("template");
template.innerHTML = `
    ${styles}
    <div>
    <img src="./bmi.png"/>
    <span></span>
  </div>
`;

class BMIMeter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ["value"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const needle = this.shadowRoot.querySelector("span");
    needle.style.transition = "all 1s linear";
    setTimeout(() => {
      needle.style.transform = `rotateZ(${this.getNeedleAngle(newValue)}deg)`;
      needle.style.background = this.getNeedleColor(newValue);
    }, 0);
  }

  getNeedleAngle(value) {
    const numValue = Number(value);
    if (!isNaN(numValue) && numValue >= 0) {
      if (numValue < 18.5) {
        return 15;
      } else if (numValue >= 18.5 && numValue < 25) {
        return 52;
      } else if (numValue >= 25 && numValue < 30) {
        return 90;
      } else if (numValue >= 30 && numValue < 35) {
        return 129;
      } else if (numValue > 35) {
        return 165;
      }
    } else {
      return 0;
    }
  }

  getNeedleColor(value) {
    const numValue = Number(value);
    if (!isNaN(numValue)) {
      if (numValue >= 0 && numValue < 18.5) {
        return "#18aee2";
      } else if (numValue >= 18.5 && numValue < 25) {
        return "#41b75a";
      } else if (numValue >= 25 && numValue < 30) {
        return "#efeb42";
      } else if (numValue >= 30 && numValue < 35) {
        return "#f79633";
      } else if (numValue > 35) {
        return "#ee3138";
      }
    } else {
      return "grey";
    }
  }

  getValue() {
    return this.getAttribute("value");
  }
}

customElements.define("bmi-meter", BMIMeter);
