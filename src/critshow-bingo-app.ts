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
import { Character } from './types/character';

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
    img {
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
  squares: number[] = [];

  render() {
    let body = html`<h1>Loading</h1>`;
    if (this.selectedCharacter) {
      const squares = this.squares.map((s) => this.selectedCharacter?.squares[s]);
      body = html`<csb-board .squares="${squares}" ></csb-board>`;
    } else if (this.characters && this.characters.length) {
      body = html`
        <csb-character-selector
         .characters="${this.characters}"
         @selectedCharacter="${this.handleSelectedCharacter}"
        ></csb-character-selector>`;
    }
    return html`
      <img src="/images/critshow-banner-5.png" alt="critshow banner" router-ignore />
      ${body}
    `;
  }

  @eventOptions({ capture: true })
  handleSelectedCharacter(e: CustomEvent) {
    this.selectedCharacter = this.characters.find((c) => c.id === e.detail.characterId);
  }

  updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    if (changedProperties.has('characters')) {
      if (this.characters.length === 1) {
        // eslint-disable-next-line prefer-destructuring
        this.selectedCharacter = this.characters[0];
      }
    }
    if (changedProperties.has('selectedCharacter')) {
      this.squares = [...Array.from(Array(this.numberOfSquares).keys())].sort(
        () => Math.random() - Math.random(),
      );
    }
  }

  // getDefaultTab() {
  //   const tabName = (typeof window !== 'undefined' && window.location.hash.replace('#', '')) || tabs[0].id;
  //   if (tabs.find((tab) => tab.id === tabName)) {
  //     return tabName;
  //   }
  //   return tabs[0].id;
  // }

  connectedCallback() {
    super.connectedCallback();
    this.fetchData();
  }

  async fetchData() {
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
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'critshow-bingo-app': CritshowBingoApp;
  }
}
