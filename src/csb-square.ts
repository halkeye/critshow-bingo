import {
  LitElement, html, customElement, property, css,
} from 'lit-element';

@customElement('csb-square')
export default class Square extends LitElement {
  static styles = css`
      :host {
        background-color: white;
        color: black;
        display: grid;
        justify-content: center;
        position: relative;
      }
      div.text {
        margin: 0.50em;
        font-size: 3vw;
        text-align: center;
        align-self: center;
        justify-self: center;
        user-select: none;
        hyphens: auto;
      }
      .dabbed {
        position: absolute;
        top: 5%;
        right: 5%;
        height: 90%;
        width: 90%;
        z-index: 2;
        background: rgba(255, 0, 0, 0.75);
        border: 1px solid rgba(255, 0, 0, 0.75);
        border-radius: 100%;
      }
  `;

  @property({ type: Boolean })
  star = false;

  @property({ type: Boolean })
  dabbed = false;

  @property({ type: String })
  text = '';

  render() {
    const dabbed = this.dabbed ? html`<div class="dabbed"></div>` : '';
    return html`
        ${this.text ? html`<div class="text">${this.text}</div>` : ''}
        ${this.star ? html`<div class="star">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 51 48">
            <path fill="gold" stroke="black" d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"/>
          </svg>
        </div>` : ''}
        ${dabbed}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'csb-square': Square;
  }
}
