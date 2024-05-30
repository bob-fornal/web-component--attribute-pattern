class AttributeElement extends HTMLDivElement {
  _rendered = false;

  _bgColor = null;
  get bgcolor() {
    return this.getAttribute('bgColor');
  }
  set bgcolor(value) {
    if (!!value) {
      this.setAttribute('bgColor', value);
      this._bgColor = value;
    } else {
      this.removeAttribute('bgColor');
      this._bgColor = null;
    }
  }

  constructor() {
    super();
  }

  connectedCallback() {
    if (this._rendered === false) {
      this.attachShadow({ mode: 'open' });
      this.render();
      this._rendered = true;
    }
  }

  static get observedAttributes() {
    return ['bgcolor'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[`handle${name[0].toUpperCase()}${name.substring(1)}`](newValue);
    this.render();
  }

  handleBgcolor(value) {
    this._bgColor = value;
  }

  render() {
    if (this.shadowRoot === undefined || this.shadowRoot === null) return;

    const span = document.createElement('span');
    span.textContent = "Hello, world!";
    this.shadowRoot.appendChild(span);

    if (this._bgColor !== null) {
      const shadowStyle = document.createElement('style');
      shadowStyle.textContent = `
        :host {
          background-color: ${this._bgColor};
          color: white;
          font-family: san-serif, Arial;
          font-size: 1.4rem;
          font-weight: bold;
          padding: 0.5rem 1rem;
          text-align: center;
        }
      `;
      this.shadowRoot.appendChild(shadowStyle);
    }
  }
}

customElements.define('attr-element', AttributeElement, {extends: 'div'});