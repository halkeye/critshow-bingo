import {LitElement, html, customElement, property, css} from 'lit-element';

@customElement('csb-square')
export class Square extends LitElement {
  static styles = css`
      :host {
        background-color: white;
        color: black;
        display: grid;
      }
      div {
        align-self: center;
        padding: 2em;
        justify-self: center;
      }
  `;
  @property({type: Boolean})
  star = false;

  @property({type: String})
  text = ""

  render() {
    return html`
			${this.text ? html`<div>${this.text}</div>` : ''}
			${this.star ? html`<div class="star">
				<svg xmlns="http://www.w3.org/2000/svg" width="255" height="240" viewBox="0 0 51 48">
					<path fill="gold" stroke="black" d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"/>
				</svg>
			</div>
			` : '' }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'csb-square': Square;
  }
}


