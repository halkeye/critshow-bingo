import {CritshowBingoApp} from '../critshow-bingo-app.js';
import {fixture, html} from '@open-wc/testing';

const assert = chai.assert;

suite('critshow-bingo-app', () => {
  test('is defined', () => {
    const el = document.createElement('critshow-bingo-app');
    assert.instanceOf(el, CritshowBingoApp);
  });

  test('renders with default values', async () => {
    const el = await fixture(html`<critshow-bingo-app></critshow-bingo-app>`);
    assert.shadowDom.equal(
      el,
      `
      <h1>Hello, World!</h1>
      <button part="button">Click Count: 0</button>
      <slot></slot>
    `
    );
  });

  test('renders with a set name', async () => {
    const el = await fixture(html`<critshow-bingo-app name="Test"></critshow-bingo-app>`);
    assert.shadowDom.equal(
      el,
      `
      <h1>Hello, Test!</h1>
      <button part="button">Click Count: 0</button>
      <slot></slot>
    `
    );
  });

  test('handles a click', async () => {
    const el = (await fixture(html`<critshow-bingo-app></critshow-bingo-app>`)) as CritshowBingoApp;
    const button = el.shadowRoot!.querySelector('button')!;
    button.click();
    await el.updateComplete;
    assert.shadowDom.equal(
      el,
      `
      <h1>Hello, World!</h1>
      <button part="button">Click Count: 1</button>
      <slot></slot>
    `
    );
  });
});
