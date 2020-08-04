import {
  LitElement,
  html,
  customElement,
  internalProperty,
  property,
  css,
  eventOptions,
} from 'lit-element';
import { PropertyValues } from 'lit-element/src/lib/updating-element';

import { Character, Square } from './types';
import './csb-board';
import './csb-character-selector';

@customElement('critshow-bingo-app')
export default class CritshowBingoApp extends LitElement {
  static styles = css`
    :host {
      display: block;
      background-color: #3D0A00;

      padding: 10px;
    }
    a img {
      display: block;
      margin-left: auto;
      margin-right: auto;
      width: 100%;
      height: auto;
      max-width: 800px;
    }
  `;

  @internalProperty()
  characters: Character[] = [];

  @property({ type: Number })
  numberOfSquares = 24;

  @internalProperty()
  selectedCharacter: Character | undefined = undefined;

  @internalProperty()
  squares: Square[] = [];

  render() {
    let body = html`<h1>Loading</h1>`;
    if (this.selectedCharacter) {
      body = html`<csb-board
        .allSquares="${this.selectedCharacter?.squares}"
        .chosenSquares="${this.squares}"
        @boardChanged="${this.handleBoardChanged}"
      ></csb-board>`;
    } else if (this.characters && this.characters.length) {
      body = html`
        <csb-character-selector
         .characters="${this.characters}"
         @selectedCharacter="${this.handleSelectedCharacter}"
        ></csb-character-selector>`;
    }
    return html`
      <a href="#" @click="${this.handleNewGameClick}">
        <img
          src="./images/critshow-banner-5.png"
          alt="critshow banner"
        />
      </a>
      ${body}
    `;
  }

  @eventOptions({ capture: true })
  handleNewGameClick(e: MouseEvent) {
    e.preventDefault();
    this.selectCharacter();
  }

  @eventOptions({ capture: true })
  handleBoardChanged(e: CustomEvent) {
    const { chosenSquares } = e.detail;
    const joinedChosen = chosenSquares.map((s: Square) => [s.idx, s.selected ? 't' : 'f'].join('')).join('');
    window.history.replaceState(
      null,
      '',
      `#${[
        this.selectedCharacter?.id,
        joinedChosen,
      ].join('|')}`,
    );
  }

  @eventOptions({ capture: true })
  handleSelectedCharacter(e: CustomEvent) {
    this.selectedCharacter = this.characters.find((c) => c.id === e.detail.characterId);
  }

  selectCharacter() {
    this.selectedCharacter = undefined;
    if (this.characters.length === 1) {
      // eslint-disable-next-line prefer-destructuring
      this.selectedCharacter = this.characters[0];
    }
  }

  updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    if (changedProperties.has('selectedCharacter') && !changedProperties.has('squares')) {
      const length = this.numberOfSquares || this.selectedCharacter?.squares?.length;
      this.squares = [...Array.from(Array(length).keys())].sort(
        () => Math.random() - Math.random(),
      ).slice(0, this.numberOfSquares).map(
        (val) => ({
          idx: val,
          selected: false,
        }),
      );
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchData();
  }

  async fetchData() {
    const { hash } = window.location;
    const response = await fetch('/squares.yaml');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const yamlData = window.jsyaml.load(await response.text()) as object;
    this.selectedCharacter = undefined;
    this.characters = Object.entries(yamlData).map(([character, characterData]) => ({
      id: character,
      name: characterData.name,
      squares: characterData.squares,
    }));
    if (!hash) {
      this.selectCharacter();
    } else {
      const [characterId, squares] = hash.replace('#', '').split('|');
      if (characterId) {
        this.selectedCharacter = this.characters.find((c) => c.id === characterId);
      }
      if (squares) {
        const matched = squares.match(/(\d+)([tf])/g);
        if (matched) {
          this.squares = matched.map((s) => {
            const [, idx, tf] = s.match(/(\d+)([tf])/) || [];
            return {
              idx: parseInt(idx, 10),
              selected: tf === 't',
            };
          });
        }
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'critshow-bingo-app': CritshowBingoApp;
  }
}
