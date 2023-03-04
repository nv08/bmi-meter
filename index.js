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
  height: 100%
}
span {
  position: absolute;
  width: 35%;
  top: 59%;
  left: 15.2%;
  height: 2%;
  border-radius: 50% 0% 0% 50%;
  background-color: grey;
  transition: all 1s linear;
  transform-origin: 100%;
}
</style>`;

const template = document.createElement("template");
template.innerHTML = `
    ${styles}
    <div>
    <img
      src="https://www.bajajallianzlife.com/content/dam/balic/index/BMI-Calculator.png"
    />
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
      if (numValue >= 45) {
        return 180;
      }
      return 4 * numValue;
    } else {
      return 0;
    }
  }

  getNeedleColor(value) {
    const numValue = Number(value);
    if (!isNaN(numValue)) {
      if (numValue >= 0 && numValue < 10) {
        return "darkorange";
      } else if (numValue >= 10 && numValue < 23) {
        return "green";
      } else if (numValue >= 23 && numValue < 36) {
        return "chocolate";
      } else if (numValue >= 36) {
        return "red";
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
