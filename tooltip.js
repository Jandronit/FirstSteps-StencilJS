class Tooltip extends HTMLElement {
  constructor() {
    super();
    console.log('Tooltip constructor');
  }
}

customElements.define('my-tooltip', Tooltip);
