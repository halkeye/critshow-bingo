import merge from 'deepmerge';
import copy from 'rollup-plugin-copy';
import filesize from 'rollup-plugin-filesize';
import { generateSW } from 'rollup-plugin-workbox';

// use createSpaConfig for bundling a Single Page App
import { createSpaConfig } from '@open-wc/building-rollup';

// use createBasicConfig to do regular JS to JS bundling
// import { createBasicConfig } from '@open-wc/building-rollup';

const baseConfig = createSpaConfig({
  // use the outputdir option to modify where files are output
  // outputDir: 'dist',

  // if you need to support older browsers, such as IE11, set the legacyBuild
  // option to generate an additional build just for this browser
  // legacyBuild: true,

  // development mode creates a non-minified build for debugging or development
  developmentMode: process.env.ROLLUP_WATCH === 'true',

  // set to true to inject the service worker registration into your index.html
  injectServiceWorker: false,
});

export default merge(baseConfig, {
  // if you use createSpaConfig, you can use your index.html as entrypoint,
  // any <script type="module"> inside will be bundled by rollup
  input: './index.html',

  // alternatively, you can use your JS as entrypoint for rollup and
  // optionally set a HTML template manually
  // input: './app.js',
  plugins: [
    copy({
      targets: [
        { src: 'squares.yaml', dest: 'dist/' },
        { src: 'images/**/*', dest: 'dist/images/' },
        { src: 'manifest.webmanifest', dest: 'dist/' },
      ],
      // set flatten to false to preserve folder structure
      flatten: false,
    }),
    filesize({
      showBrotliSize: true,
    }),
    generateSW({
      swDest: 'dist/sw.js',
      globDirectory: 'dist/',
      globPatterns: [
        '**/*.html',
        '**/*.yaml',
        '**/*.png',
        '**/*.ico',
        '**/*.css',
        '**/*.js'
      ],
    })
  ],
});

