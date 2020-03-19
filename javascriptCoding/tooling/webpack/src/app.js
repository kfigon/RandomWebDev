// npm init
// npm install --save-dev webpack webpack-cli
// create webpack.config.js <-- not json!
// add config and add build script in package.json

// will bundle sources, minify scripts
// live dev server!
// npm run build
// npm run build:dev

import {foo} from './utils'

console.log(foo());

const el = document.getElementById('main');
el.innerText='AAAAAAA'