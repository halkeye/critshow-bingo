import {
  LitElement,
  html,
  customElement,
  property,
  css,
  eventOptions,
} from 'lit-element';
import './csb-square';
import './csb-square-header';

@customElement('csb-board')
export default class CSBBoard extends LitElement {
  static styles = css`
    .root {
      display: grid;
      grid-column-gap: 0.5em;
      grid-row-gap: 0.5em;
      grid-template-columns: repeat(5, 19%);
      grid-template-rows: 3em 1fr;
      justify-content: center;
    }
    .root::before {
      content: '';
      width: 0;
      padding-bottom: 100%;
      grid-row: 1 / 1;
      grid-column: 1 / 1;
    }
    .root > *:first-child {
      grid-row: 1 / 1;
      grid-column: 1 / 1;
    }
    .star {
      grid-column-start: 3;
      grid-column-end: 3;
      grid-row-start: 4;
      grid-row-end: 4;
    }
  `;

  @property({ type: Array })
  squares: string[] = new Array(26).fill('');

  @property({ type: Array })
  selected: boolean[] = new Array(26).fill(false);

  render() {
    return html`
    <div class="root">
      <csb-square-header label="B"></csb-square-header>
      <csb-square-header label="I"></csb-square-header>
      <csb-square-header label="N"></csb-square-header>
      <csb-square-header label="G"></csb-square-header>
      <csb-square-header label="O"></csb-square-header>
      ${this.squares.map((sq, idx) => html`<csb-square 
        @click="${this.handleClick}"
        data-index="${idx}"
        ?dabbed=${this.selected[idx]}
        text="${sq}"
      ></csb-square>`)}
      <csb-square star class="star"></csb-square>
    `;
  }

  @eventOptions({ capture: true })
  handleClick(e: MouseEvent) {
    const { index } = (<HTMLElement>e.target).dataset;
    if (index !== undefined) {
      const idx = parseInt(index, 10);
      this.selected = [
        ...this.selected.slice(0, idx),
        !this.selected[idx],
        ...this.selected.slice(idx + 1),
      ];
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'csb-board': CSBBoard;
  }
}
