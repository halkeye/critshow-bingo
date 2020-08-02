import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';

import './shared-styles.js';

class BingoSquareHeader extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          background-color: #7E1E14;
          color: white;
          display: grid;
        }
        .header {
          padding: 2em;
          align-self: center;
          justify-self: center;
          color: white;
        }
      </style>
      <template>
        <div class="header">
          [[label]]
        </div>
      </template>
    `;
  }
  static get properties () {
    return {
      label: String,
    };
  }
}
window.customElements.define('csb-bingo-square-header', BingoSquareHeader);

class BingoSquare extends PolymerElement {
  static get template() {
    return html`
      <style>
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
      </style>
      <template is="dom-if" if="[[text]]">
        <div>
          [[text]]
        </div>
      </template>
      <template is="dom-if" if="[[star]]">
        <div class="star">
          <svg xmlns="http://www.w3.org/2000/svg" width="255" height="240" viewBox="0 0 51 48">
            <path fill="gold" stroke="black" d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"/>
          </svg>
        </div>
      </template>
    `;
  }
  static get properties () {
    return {
      text: String,
      star: Boolean
    };
  }
}
window.customElements.define('csb-bingo-square', BingoSquare);

class Bingo extends PolymerElement {
  static get template() {
    return html`
      <style>
        .root {
          display: grid;
          grid-column-gap: 1em;
          grid-row-gap: 1em;
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
      </style>
      <div class="root">
        <csb-bingo-square-header label="B"></csb-bingo-square-header>
        <csb-bingo-square-header label="I"></csb-bingo-square-header>
        <csb-bingo-square-header label="N"></csb-bingo-square-header>
        <csb-bingo-square-header label="G"></csb-bingo-square-header>
        <csb-bingo-square-header label="O"></csb-bingo-square-header>
        <template is="dom-repeat" items="[[items]]">
          <csb-bingo-square text=[[item]] />
        </template>
        <csb-bingo-square star class="star" />
      </div>
    `;
  }
  static get properties () {
    return {
      items: Array
    };
  }
}
window.customElements.define('csb-bingo', Bingo);

class MyView1 extends PolymerElement {
  static get template() {
    
    return html`
      <style include="shared-styles">
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
      </style>
      <iron-ajax
          auto
          url="/squares.yaml"
          handle-as="text"
          verbose
          on-response="handleResponse"
          contentType="text/yaml; charset=UTF-8"
          debounce-duration="300"
          last-response="{{ajaxResponse}}"
      >
      </iron-ajax>
      <img src="/images/critshow-banner-5.png" alt="critshow banner" />
      <csb-bingo items=[[data.spitz]] />
    `;
  }
  handleResponse(data) {
    this.set('data', jsyaml.load(data.target.lastResponse))
  }
}

window.customElements.define('my-view1', MyView1);
