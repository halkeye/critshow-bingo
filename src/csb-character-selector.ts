import {
  LitElement,
  html,
  customElement,
  eventOptions,
  property,
  css,
} from 'lit-element';
import '@polymer/paper-button/paper-button';
import {
  Character,
} from './types/character';

@customElement('csb-character-selector')
export default class CSBBoard extends LitElement {
  static styles = css`
    :host {
      background-color: white;
      color: black;
      display: grid;
      min-height: 10vh;
    }
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    li {
      padding: 1em;
    }
    paper-button {
      width: 50%;
    }
  `;

  @property({ type: Array })
  characters: Character[] = [];

  render() {
    return html`
      <ul>
        ${this.characters.map((c) => html`
          <li>
            <paper-button data-character-id=${c.id} @click="${this.handleClick}" raised>${c.name}</paper-button>
          </li>
        `)}
      </ul>
    `;
  }

  @eventOptions({ capture: true })
  handleClick(e: MouseEvent) {
    const { characterId } = (<HTMLElement>e.target).dataset;
    this.dispatchEvent(
      new CustomEvent('selected-character', {
        detail: { characterId },
        bubbles: true,
        composed: true,
      }),
    );
    this.dispatchEvent(
      new CustomEvent('selectedCharacter', {
        detail: { characterId },
        bubbles: true,
        composed: true,
      }),
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'csb-character-selector': CSBBoard;
  }
}
