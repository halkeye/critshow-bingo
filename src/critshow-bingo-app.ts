import {
  LitElement,
  html,
  customElement,
  property,
  css,
} from 'lit-element';
import { connect } from 'pwa-helpers';

import {
  store,
  RootState,
} from './redux/store';

import {
  setCharacters,
} from './redux/feature/characters';

import './csb-board';

@customElement('critshow-bingo-app')
export default class CritshowBingoApp extends connect(store)(LitElement) {
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

  stateChanged(state: RootState) {
    this.characters = Object.keys(state.characters.characters);
    this.squares = state.characters.selectedCharacter?.squares || [];
  }

  @property({ type: Array })
  squares: string[] = [];

  @property({ type: Array })
  characters: string[] = [];

  render() {
    let body = html`<h1>Loading</h1>`;
    if (this.characters && this.characters.length) {
      body = html`<csb-board .squares="${this.squares}"></csb-board>`;
    }
    return html`
      <img src="/images/critshow-banner-5.png" alt="critshow banner" router-ignore />
      ${body}
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchData();
  }

  fetchData() {
    fetch('/squares.yaml')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then((data) => {
        const yamlData = window.jsyaml.load(data) as object;
        const characters = Object.entries(yamlData).map(([character, characterData]) => ({
          id: character,
          name: characterData.name,
          squares: characterData.squares,
        }));
        store.dispatch(setCharacters(characters));
      });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'critshow-bingo-app': CritshowBingoApp;
  }
}
