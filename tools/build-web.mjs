// Wraps the game source into a full web page and writes a version stamp.
// Usage: node tools/build-web.mjs <outDir> [version]
import fs from 'fs';
import { execSync } from 'child_process';
const out = process.argv[2] || 'site';
let version = process.argv[3];
if (!version) { try { version = execSync('git log -1 --format=%ct').toString().trim(); } catch (e) {} }
version = Number(version) || Math.floor(Date.now() / 1000);
const src = fs.readFileSync(new URL('../game/odies-world.html', import.meta.url), 'utf8');
const page = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#211a14">
<meta name="odies-world-version" content="${version}">
${src}
</body>
</html>
`;
fs.mkdirSync(out, { recursive: true });
fs.writeFileSync(`${out}/index.html`, page);
fs.copyFileSync(new URL('../game/privacy.html', import.meta.url), `${out}/privacy.html`);
fs.writeFileSync(`${out}/version.json`, JSON.stringify({ version }) + '\n');
console.log(`built ${out}/index.html version ${version}`);
