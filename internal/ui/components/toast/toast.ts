class Toast extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                /* Add your styles here */
            </style>
            <div class="toast">
                <slot></slot>
            </div>
        `;
    }
}

customElements.define("toast-container", Toast);
