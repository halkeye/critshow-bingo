import {LitElement, html, customElement, property, css} from 'lit-element';
// import {Router} from '@vaadin/router'; 
import { connect } from 'pwa-helpers';
import { store, RootState } from './redux/store';
import { setCharacters, setCharacterSquares } from './redux/feature/characters';

import './csb-board';

@customElement('critshow-bingo-app')
export class CritshowBingoApp extends connect(store)(LitElement) {
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
    this.squares = state.characters.characterSquares[state.characters.selectedCharacter] || [];
    this.characters = state.characters.characters;
  }

  @property({type: Array})
  squares: string[] = [];

  @property({type: Array})
  characters: string[] = [];

  render() {
    return html`
      <csb-board .squares="${this.squares}"></csb-board>
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
        const yamlData = window.jsyaml.load(data) as object;
        store.dispatch(setCharacters(Object.keys(yamlData)));
        for (const [character, squares] of Object.entries(yamlData)) {
          store.dispatch(setCharacterSquares({ [character]: squares }));
        }
      });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'critshow-bingo-app': CritshowBingoApp;
  }
}
