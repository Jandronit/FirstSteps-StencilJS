class Tooltip extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
      const tooltipText = document.createElement('span');
      tooltipText.textContent = ' (?)';
      this.appendChild( tooltipText );
  }
}

customElements.define('my-tooltip', Tooltip);
 