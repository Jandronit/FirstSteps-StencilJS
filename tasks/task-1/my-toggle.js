class MyToggle extends HTMLElement {
  constructor() {
    super();
    this._isAvailable = false;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
    <style>
      #info-box {
        display: none;
      }
    </style>
      <button>Toggle</button>
        <p id="info-box">
            <slot></slot>
        </p>
    `;
    this._button = this.shadowRoot.querySelector('button');
    this._infoBox = this.shadowRoot.querySelector('#info-box');
    this._button.addEventListener('click', this._toggle.bind(this));
  }

  _toggle() {
    this._isAvailable = !this._isAvailable;
    this._infoBox.style.display = this._isAvailable ? 'block' : 'none';
    this._button.textContent = this._isAvailable ? 'Hide' : 'Show';
  }

  connectedCallback() {
    if (this.hasAttribute('is-available')) {
      if (this.getAttribute('is-available') === 'true') {
        this._toggle();
      }
    }
  }
}

customElements.define('my-toggle', MyToggle);