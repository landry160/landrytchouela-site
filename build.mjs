// Génère public/ (le site à déployer) et artifact/ (l'aperçu Claude) à partir de content.mjs.
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync, copyFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { site, jobs, flagship, projects, others, chain, toolbox, about, nav } from './content.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const T = v => typeof v === 'string' ? esc(v) : `<span data-l="fr">${esc(v.fr)}</span><span data-l="en">${esc(v.en)}</span>`;
const icon = (name, cls = 'icon') => readFileSync(`node_modules/lucide-static/icons/${name}.svg`, 'utf8')
  .replace(/<!--[\s\S]*?-->/g, '').replace(/\s+/g, ' ').replace('<svg', `<svg aria-hidden="true" class="${cls}"`).replace(/ class="lucide[^"]*"/, '').trim();
const tag = t => `<span class="chip">${T(t)}</span>`;
const L = (fr, en) => T({ fr, en });

const header = `
<header class="top"><div class="wrap"><div class="bar glass">
  <a class="brand" href="#accueil"><span class="mark">LT</span><span>Landry Tchouela</span></a>
  <nav class="nav-d" aria-label="${'Navigation'}">${nav.map(n => `<a href="#${n.id}" data-spy="${n.id}">${T(n.label)}</a>`).join('')}</nav>
  <div class="actions">
    <button class="iconbtn" id="lang" type="button">EN</button>
    <button class="iconbtn" id="theme-btn" type="button" aria-expanded="false" aria-controls="panel" aria-label="Apparence / Appearance">${icon('palette')}</button>
    <div class="panel glass" id="panel" hidden>
      <p class="label">${L('Affichage', 'Display')}</p>
      <div class="seg">
        <button type="button" data-mode="light">${icon('sun')}${L('Clair', 'Light')}</button>
        <button type="button" data-mode="dark">${icon('moon')}${L('Sombre', 'Dark')}</button>
        <button type="button" data-mode="system">${icon('monitor')}${L('Système', 'System')}</button>
      </div>
      <p class="label">${L('Couleur', 'Color')}</p>
      <div class="swatches">
        <button class="swatch" type="button" data-preset-btn="ocean" aria-label="Océan" title="Océan" style="background:linear-gradient(135deg,#00C6FF,#0078FF)"></button>
        <button class="swatch" type="button" data-preset-btn="nature" aria-label="Nature" title="Nature" style="background:linear-gradient(135deg,#34E39A,#18c480)"></button>
        <button class="swatch" type="button" data-preset-btn="dusk" aria-label="Crépuscule" title="Crépuscule" style="background:linear-gradient(135deg,#FF9A3C,#FF6B00)"></button>
        <button class="swatch" type="button" data-preset-btn="royal" aria-label="Royal" title="Royal" style="background:linear-gradient(135deg,#c084fc,#9b2cfa)"></button>
        <button class="swatch" type="button" data-preset-btn="mono" aria-label="Monochrome" title="Monochrome" style="background:linear-gradient(135deg,#64748b,#334155)"></button>
      </div>
    </div>
  </div>
</div></div></header>`;

const hero = `
<section class="hero" id="accueil"><div class="wrap">
  <h1 class="name"><span>Landry </span><span>Tchouela</span></h1>
  <div class="herorow">
    <div>
      <p class="thesis">${T(site.thesis)}</p>
      <p class="intro">${T(site.intro)}</p>
    </div>
    <div class="herocta">
      <span class="avail"><span class="led"></span>${T(site.availability)}</span>
      <a class="btn btn-primary" href="#projets">${L('Voir mes projets', 'See my projects')}</a>
    </div>
  </div>

  <div class="scope" role="group" aria-labelledby="scope-t">
    <div class="scope-head">
      <div>
        <h2 class="scope-title" id="scope-t">${L('Envoyez un message dans le lien de données de Performia', 'Send a message through the Performia data link')}</h2>
        <p class="scope-sub">${L(
          'Simulation calculée dans votre navigateur : votre texte devient une trame réelle, codée en Manchester et protégée par un CRC-16. Le format est simplifié, le principe est celui que j’ai programmé sur ESP32.',
          'A simulation computed in your browser: your text becomes a real frame, Manchester-encoded and protected by a CRC-16. The format is simplified; the principle is the one I programmed on ESP32.')}</p>
      </div>
      <p class="state" id="state" data-s="ready"><i></i><span id="state-t">Prêt à transmettre</span></p>
    </div>
    <div class="screen"><canvas id="trace" role="img" aria-label="${'Oscilloscope'}"></canvas></div>
    <div class="controls">
      <form class="field" id="scope-form" autocomplete="off">
        <label for="msg">${L('Votre message (12 octets max.)', 'Your message (12 bytes max.)')}</label>
        <div class="fieldrow">
          <input id="msg" name="msg" type="text" maxlength="12" value="LANDRY" spellcheck="false">
          <button class="btn btn-scope" id="noise" type="button">${icon('zap')}${L('Perturber la ligne', 'Disturb the line')}</button>
        </div>
      </form>
      <dl class="reads">
        <div><dt>${L('Reçu', 'Received')}</dt><dd id="rxtext">&nbsp;</dd></div>
        <div><dt>${L('Trame', 'Frame')}</dt><dd id="r-len">-</dd></div>
        <div><dt>${L('CRC émis / recalculé', 'CRC sent / recomputed')}</dt><dd><span id="r-sent">-</span><br><span id="r-recv">-</span></dd></div>
        <div><dt>${L('Tentatives', 'Attempts')}</dt><dd id="r-try">0</dd></div>
      </dl>
    </div>
    <p class="sr-only" id="announce" aria-live="polite"></p>
  </div>
</div></section>`;

const flagTile = `
<article class="tile tile-orange flag">
  <div class="tile-head">
    <div>
      <p class="pill">${T(flagship.status)}</p>
      <h3 style="margin-top:14px">${flagship.name}</h3>
    </div>
    <p style="font-weight:700;max-width:18em;text-align:right">${T(flagship.kicker)}</p>
  </div>
  <div class="flaggrid">
    <p class="sum">${T(flagship.summary)}</p>
    <div>
      <p style="font-weight:800">${T(flagship.fixedTitle)}</p>
      <ul class="fixes">${flagship.fixed.map(f => `<li>${icon('check')}<span>${T(f)}</span></li>`).join('')}</ul>
    </div>
  </div>
  <div class="metrics">${flagship.metrics.map(m => `<div><b>${m.v}${m.u ? `<small>${m.u}</small>` : ''}</b><span>${T(m.l)}</span></div>`).join('')}</div>
  <div class="tags">${flagship.tags.map(tag).join('')}</div>
</article>`;

const projTile = p => `
<article class="tile tile-${p.tone}">
  <p class="pill" style="align-self:flex-start">${T(p.status)}</p>
  <h3>${esc(p.name)}</h3>
  <p>${T(p.desc)}</p>
  <div class="tags">${p.tags.map(tag).join('')}</div>
  ${p.link ? `<a class="tilelink" href="${p.link.href}" target="_blank" rel="noopener">${T(p.link.label)}${icon('arrow-up-right')}</a>` : ''}
</article>`;

const projectsS = `
<section class="section" id="projets"><div class="wrap">
  <h2 class="h2">${L('Projets', 'Projects')}</h2>
  <p class="lede">${L('Du firmware temps réel à l’application d’IA, avec les vrais chiffres et les vrais problèmes.', 'From real-time firmware to AI applications, with the real numbers and the real problems.')}</p>
  <div class="tiles">${flagTile}${projects.map(projTile).join('')}</div>
  <div class="others glass">
    ${others.map(o => `<div class="other"><h4>${T(o.name)}</h4><span class="when">${T(o.when)}</span><p>${T(o.desc)}</p></div>`).join('')}
  </div>
</div></section>`;

const parcours = `
<section class="section" id="parcours"><div class="wrap">
  <h2 class="h2">${L('Parcours', 'Experience')}</h2>
  <p class="lede">${L('Cinq milieux, une progression : du soutien technique au logiciel d’IA pour l’industrie.', 'Five settings, one direction: from technical support to AI software for industry.')}</p>
  <ol class="timeline glass">
    ${jobs.map(j => `<li class="job">
      <div class="job-when"><span>${T(j.when)}</span>${j.current ? `<span class="now"><span class="led"></span>${L('En cours', 'Current')}</span>` : ''}</div>
      <div>
        <h3>${esc(j.company)}${j.detail ? `<small>${esc(j.detail)}</small>` : ''}</h3>
        <p class="role">${T(j.role)}, ${esc(j.place)}</p>
        <ul>${j.points.map(p => `<li>${T(p)}</li>`).join('')}</ul>
        <div class="tags">${j.tags.map(tag).join('')}</div>
      </div>
    </li>`).join('')}
  </ol>
</div></section>`;

const skills = `
<section class="section" id="competences"><div class="wrap">
  <h2 class="h2">${L('Toute la chaîne', 'The whole chain')}</h2>
  <p class="lede">${L('Mes compétences suivent le parcours d’une donnée, du capteur jusqu’au produit.', 'My skills follow the path of a piece of data, from the sensor to the product.')}</p>
  <div class="chain">
    ${chain.map(c => `<article class="link glass">
      <span class="link-ic">${icon(c.icon)}</span>
      <h3>${T(c.title)}</h3>
      <p>${T(c.text)}</p>
      <div class="tags">${c.items.map(tag).join('')}</div>
    </article>`).join('')}
  </div>
  <details class="tools glass">
    <summary>${L('Tous les outils', 'All tools')}${icon('chevron-down')}</summary>
    <p>${T(toolbox)}</p>
  </details>
</div></section>`;

const aboutS = `
<section class="section" id="apropos"><div class="wrap">
  <h2 class="h2">${T(about.title)}</h2>
  <div class="aboutgrid">
    <div class="aboutbody">${about.body.map(p => `<p>${T(p)}</p>`).join('')}</div>
    <dl class="facts glass">${about.facts.map(f => `<div><dt>${T(f.k)}</dt><dd>${T(f.v)}</dd></div>`).join('')}</dl>
  </div>
</div></section>`;

const contact = `
<section class="section" id="contact"><div class="wrap">
  <div class="contact">
    <h2 class="h2">${L('Parlons de votre prochain système.', 'Let’s talk about your next system.')}</h2>
    <p class="lede">${T(site.availability)}. ${L('Je réponds par courriel et sur LinkedIn.', 'I reply by email and on LinkedIn.')}</p>
    <p class="addr" id="addr">${site.email}</p>
    <div class="mailbox">
      <button class="btn btn-primary" id="copy" type="button">${icon('copy')}${L('Copier mon courriel', 'Copy my email')}</button>
      <a class="btn btn-ghost" href="${site.linkedin}" target="_blank" rel="noopener">${icon('linkedin')}LinkedIn</a>
      <a class="btn btn-ghost" href="${site.github}" target="_blank" rel="noopener">${icon('github')}GitHub</a>
    </div>
  </div>
</div></section>`;

const foot = `
<footer class="wrap"><div class="foot">
  <span>© ${new Date().getFullYear()} Landry Tchouela</span>
  <span>${L('Mis à jour en ', 'Updated ')}${T(site.updated)}</span>
</div></footer>`;

const navM = `<nav class="nav-m" aria-label="Navigation">${nav.map(n => `<a href="#${n.id}" data-spy="${n.id}">${icon(n.icon)}<span>${T(n.label)}</span></a>`).join('')}</nav>`;

const body = `
<a class="skip" href="#projets">${L('Aller au contenu', 'Skip to content')}</a>
<div class="scene" aria-hidden="true"><div class="orb orb-a"></div><div class="orb orb-b"></div><div class="orb orb-c"></div><div class="grain"></div></div>
${header}
<main>${hero}${projectsS}${parcours}${skills}${aboutS}${contact}</main>
${foot}
${navM}
<div class="toasts" id="toasts" aria-live="polite"></div>`;

const fonts = `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400..900&display=swap">`;
const boot = `<script>(function(){var r=document.documentElement,t={},l;try{t=JSON.parse(localStorage.getItem('ui_theme')||'{}');l=localStorage.getItem('lang')}catch(e){}if(t.mode==='dark'||t.mode==='light')r.dataset.theme=t.mode;r.dataset.preset=t.preset||'ocean';var q=/[?&]lang=(en|fr)/.exec(location.search);r.lang=q?q[1]:l||((navigator.language||'fr').indexOf('fr')===0?'fr':'en')})()</script>`;

mkdirSync('.cache', { recursive: true });
writeFileSync('.cache/page.html', body + readFileSync('src/app.js', 'utf8'));
execSync('npx tailwindcss -c tailwind.config.cjs -i src/styles.css -o .cache/styles.css --minify', { stdio: 'inherit' });
const css = readFileSync('.cache/styles.css', 'utf8');
const js = readFileSync('src/app.js', 'utf8');

const title = 'Landry Tchouela | Génie informatique, logiciel et IA';
const desc = 'Portfolio de Landry Tchouela, étudiant en génie informatique à l’Université de Sherbrooke : logiciel, IA et systèmes intelligents, du capteur au produit.';
const ld = { '@context': 'https://schema.org', '@type': 'Person', name: 'Landry Tchouela', url: site.url, jobTitle: 'Computer engineering student', alumniOf: 'Cégep de Granby', affiliation: 'Université de Sherbrooke', sameAs: [site.linkedin, site.github] };

const prod = `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${title}</title><meta name="description" content="${desc}">
<link rel="canonical" href="${site.url}/"><link rel="icon" href="/favicon.svg" type="image/svg+xml"><meta name="theme-color" content="#0078FF">
<meta property="og:type" content="website"><meta property="og:url" content="${site.url}/"><meta property="og:title" content="Landry Tchouela"><meta property="og:description" content="${desc}"><meta property="og:image" content="${site.url}/og.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
${boot}${fonts}<style>${css}</style></head>
<body>${body}<script>${js}</script></body></html>`;

const preview = `<title>Landry Tchouela — Portfolio</title><meta name="claude:viewport-fit-sides" content="cover"><meta name="description" content="${desc}">
${boot}${fonts}<style>${css}</style>
${body}<script>${js}</script>`;

rmSync('public', { recursive: true, force: true });
mkdirSync('public', { recursive: true }); mkdirSync('artifact', { recursive: true });
writeFileSync('public/index.html', prod);
writeFileSync('artifact/index.html', preview);
for (const f of ['.htaccess', 'robots.txt', 'sitemap.xml', '404.html', 'favicon.svg', 'og.png'])
  if (existsSync(`static/${f}`)) copyFileSync(`static/${f}`, `public/${f}`);
console.log('OK', (prod.length / 1024).toFixed(0) + ' Ko');
