import {
  LitElement, html, customElement, property, css,
} from 'lit-element';

@customElement('csb-square-header')
export default class SquareHeader extends LitElement {
  static styles = css`
        :host {
          background-color: #7E1E14;
          color: white;
          display: grid;
        }
        * {
          align-self: center;
          justify-self: center;
          color: white;
          padding: 0;
          margin: 0;
        }
  `;

  @property({ type: String })
  label = '';

  render() {
    return html`<h1>${this.label}</h1>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'csb-square-header': SquareHeader;
  }
}
