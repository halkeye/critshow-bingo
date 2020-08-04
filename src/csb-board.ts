import {
  LitElement,
  html,
  customElement,
  property,
  css,
  eventOptions,
} from 'lit-element';
import { PropertyValues } from 'lit-element/src/lib/updating-element';
import { Square } from './types';
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
  chosenSquares: Square[] = [];

  @property({ type: Array })
  allSquares: string[] = [];

  render() {
    return html`
    <div class="root">
      <csb-square-header label="B"></csb-square-header>
      <csb-square-header label="I"></csb-square-header>
      <csb-square-header label="N"></csb-square-header>
      <csb-square-header label="G"></csb-square-header>
      <csb-square-header label="O"></csb-square-header>
      ${this.chosenSquares.map((sq, idx) => html`<csb-square 
        @click="${this.handleClick}"
        data-index="${idx}"
        ?dabbed=${sq.selected}
        text="${this.allSquares[sq.idx]}"
      ></csb-square>`)}
      <csb-square star class="star"></csb-square>
    `;
  }

  dispatchBoardChanged() {
    this.dispatchEvent(
      new CustomEvent('boardChanged', {
        detail: { chosenSquares: this.chosenSquares },
        bubbles: true,
        composed: true,
      }),
    );
  }

  updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    this.dispatchBoardChanged();
  }

  @eventOptions({ capture: true })
  handleClick(e: MouseEvent) {
    const { index } = (<HTMLElement>e.target).dataset;
    if (index !== undefined) {
      const idx = parseInt(index, 10);
      this.chosenSquares = [
        ...this.chosenSquares.slice(0, idx),
        {
          ...this.chosenSquares[idx],
          selected: !this.chosenSquares[idx].selected,
        },
        ...this.chosenSquares.slice(idx + 1),
      ];
      this.dispatchBoardChanged();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'csb-board': CSBBoard;
  }
}
