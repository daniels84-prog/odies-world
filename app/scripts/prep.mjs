// Fills app/www: bundled copy of the game, the loader page, and offline fonts.
import fs from 'fs';
import { execSync } from 'child_process';
const root = new URL('../../', import.meta.url).pathname, www = new URL('../www/', import.meta.url).pathname;
execSync(`node ${root}tools/build-web.mjs ${www}bundle ${process.env.GAME_VERSION || ''}`, { stdio: 'inherit', cwd: root });
const version = JSON.parse(fs.readFileSync(`${www}bundle/version.json`, 'utf8')).version;
fs.renameSync(`${www}bundle/index.html`, `${www}game.html`); fs.rmSync(`${www}bundle`, { recursive: true });
const loader = fs.readFileSync(new URL('../loader.html', import.meta.url), 'utf8').replace('__BUNDLED_VERSION__', String(version));
fs.writeFileSync(`${www}index.html`, loader);
fs.mkdirSync(`${www}fonts`, { recursive: true });
const nm = new URL('../node_modules/@fontsource/', import.meta.url).pathname;
const fonts = [['Bungee', 400, 'bungee/files/bungee-latin-400-normal.woff2'], ['Nunito', 800, 'nunito/files/nunito-latin-800-normal.woff2'], ['Nunito', 900, 'nunito/files/nunito-latin-900-normal.woff2']];
let css = '';
for (const [fam, w, f] of fonts) { const name = f.split('/').pop(); fs.copyFileSync(nm + f, `${www}fonts/${name}`); css += `@font-face{font-family:'${fam}';font-style:normal;font-weight:${w};font-display:swap;src:url(${name}) format('woff2')}\n`; }
fs.writeFileSync(`${www}fonts/fonts.css`, css);
console.log('app www ready, bundled version', version);
