import {LitElement, html, customElement, property, css} from 'lit-element';
import './csb-board';

@customElement('critshow-bingo-app')
export class CritshowBingoApp extends LitElement {
  static styles = css`
		:host {
			display: block;
			background-color: #3D0A00;

			padding: 10px;
		}
		img {
			display: block;
			margin-left: auto;
			margin-right: auto;
		}
  `;

  @property({type: Array})
  squares: string[] = [];

  @property({type: Number})
  count = 0;

  render() {
    return html`
      <slot></slot>
      <img src="/images/critshow-banner-5.png" alt="critshow banner" />
      <csb-board .squares="${this.squares}" />
    `;
  }

	connectedCallback() {
		super.connectedCallback();
		this.fetchData();
	}

	fetchData() {
		fetch('/squares.yaml')
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.text();
		})
		.then(data => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			this.squares = (window.jsyaml.load(data) as any).spitz as string[];
			console.log('this.squares', this.squares);
		})
	}
}

declare global {
  interface HTMLElementTagNameMap {
    'critshow-bingo-app': CritshowBingoApp;
  }
}
