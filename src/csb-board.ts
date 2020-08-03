import {
  LitElement, html, customElement, property, css,
} from 'lit-element';
import './csb-square';
import './csb-square-header';

@customElement('csb-board')
export class CSBBoard extends LitElement {
  static styles = css`
    .root {
      display: grid;
      grid-column-gap: 0.5em;
      grid-row-gap: 0.5em;
      grid-template-columns: repeat(5, auto);
      grid-template-rows: 7em auto;
      grid-auto-rows: 1fr;
    }
    .star {
      grid-column-start: 3;
      grid-column-end: 3;
      grid-row-start: 4;
      grid-row-end: 4;
    }
  `;

  @property({ type: Array })
  squares: string[] = [];

  render() {
    return html`
    <div class="root">
      <csb-square-header label="B"></csb-square-header>
      <csb-square-header label="I"></csb-square-header>
      <csb-square-header label="N"></csb-square-header>
      <csb-square-header label="G"></csb-square-header>
      <csb-square-header label="O"></csb-square-header>
      ${this.squares.map((sq) => html`<csb-square text="${sq}"></csb-square>`)}
      <csb-square star class="star"></csb-square>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'csb-board': CSBBoard;
  }
}
