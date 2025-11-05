import {getGlobalStyleSheets} from "../../util/global-styles";

const ALERT_TYPE_CLASSES: Record<string, string> = {
  "success": "alert-success",
  "info": "alert-info",
  "warning": "alert-warning",
  "error": "alert-error",
}

const DEFAULT_TOAST_DURATION = 5000;

// recreating:
//   x-data="{
//   timeoutId: 0,
//     close() { $el.remove();}
//   }"
//   x-init="timeoutId = setTimeout(() => { close() }, 5000);"
//   @click="clearTimeout(timeoutId); close();"
//
// additional features: progress bar, pause on hover
// TODO: mobile swiping

class Toast extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: "open"});
    this.shadowRoot!.adoptedStyleSheets.push(...getGlobalStyleSheets());
  }

  #progressAnimation: Animation | undefined;

  connectedCallback() {
    this.render();

    const durationAttr = this.getAttribute("duration") || "";
    let toastDuration = parseInt(durationAttr);
    if (Number.isNaN(toastDuration)) {
      toastDuration = DEFAULT_TOAST_DURATION;
    }

    this.#progressAnimation = this.shadowRoot!.querySelector(".toast-alert-progress")!.animate([
      {
        width: "0%"
      },
      {
        width: "100%"
      }
    ], {
      duration: toastDuration,
      fill: "forwards"
    });

    this.#progressAnimation?.addEventListener("finish", this.triggerClose);

    this.addEventListener("mouseenter", this.onMouseEnter);
    this.addEventListener("mouseleave", this.onMouseLeave);
    this.addEventListener("click", this.triggerClose);
  }

  disconnectedCallback(){
    this.removeEventListener("mouseenter", this.onMouseEnter);
    this.removeEventListener("mouseleave", this.onMouseLeave);
    this.removeEventListener("click", this.triggerClose);
  }

  onMouseEnter = () =>  {
    this.#progressAnimation?.pause();
  }

  onMouseLeave = () => {
    this.#progressAnimation?.play();
  }

  triggerClose = () => {
    if(!this.#progressAnimation) return;
    this.#progressAnimation = undefined;
    this.animate([
      {
        scale: 1,
        opacity: 1
      },
      {
        scale: 0.9,
        opacity: 0
      }
    ], {
      duration: 250,
      easing: "ease-out",
      fill: "forwards"
    }).addEventListener("finish", () => {
      this.remove();
    });
  }

  render() {
    const alertType = this.getAttribute('type') || "";
    this.shadowRoot!.innerHTML = `
      <div class="toast-alert ${!!ALERT_TYPE_CLASSES[alertType] ? ALERT_TYPE_CLASSES[alertType] : ''}">
        <slot></slot>
        <div class="toast-alert-progress"></div>
      </div>
    `;
  }
}

export default function initToastComponent() {
  customElements.define("toast-element", Toast);
}