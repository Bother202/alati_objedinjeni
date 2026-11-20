(() => {
  'use strict';
  const data = Array.isArray(window.RASKRINKAVANJE_TOOLS) ? window.RASKRINKAVANJE_TOOLS : [];
  const byId = id => document.getElementById(id);
  const BROWSERS = { Brave: 'brave://extensions', Chrome: 'chrome://extensions', Edge: 'edge://extensions' };
  const path = {
    archive: '<rect x="3.5" y="4" width="17" height="5" rx="1.3"/><path d="M5.5 9v11h13V9M9 13h6"/>',
    monitor: '<path d="M3 18V8m5 10V5m5 13v-7m5 7V3"/><path d="M2 21h20"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 10h18M8 15h3m3 0h2"/>',
    camera: '<path d="M4.5 7h3l2-3h5l2 3h3A2.5 2.5 0 0 1 22 9.5v9A2.5 2.5 0 0 1 19.5 21h-15A2.5 2.5 0 0 1 2 18.5v-9A2.5 2.5 0 0 1 4.5 7Z"/><circle cx="12" cy="13.5" r="3.6"/>',
    clock: '<circle cx="12" cy="13" r="9"/><path d="M12 8v5l3 2M8 2h8"/>',
    external: '<path d="M14 4h6v6m0-6-9 9"/><path d="M20 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5"/>',
    download: '<path d="M12 3v12m-5-5 5 5 5-5M4 18v3h16v-3"/>'
  };
  const svg = name => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path[name] || path.archive}</svg>`;
  const el = (parent, tag, className, text) => { const node = document.createElement(tag); if (className) node.className = className; if (text !== undefined) node.textContent = text; parent.appendChild(node); return node; };
  const validURL = link => { try { const u = new URL(link); return u.protocol === 'https:' ? u.href : null; } catch { return null; } };
  const validZIP = name => typeof name === 'string' && /^\.\/[A-Za-z0-9_.-]+\.zip$/.test(name) ? name : null;
  const dialog = byId('guideDialog');
  function showDialog(name, label, renderContent) {
    byId('dialogTitle').textContent = name;
    byId('dialogLabel').textContent = label;
    const body = byId('dialogContent'); body.replaceChildren(); renderContent(body);
    if (!dialog.open) dialog.showModal();
  }
  function steps(parent, items) { const list = el(parent,'ol','steps'); for (const item of items) el(list, 'li', null, item); }
  function makeAction(parent, title, href, other=false) {
    const anchor = el(parent,'a',other ? 'secondary':'',title);anchor.href = href;
    if (href.endsWith('.zip')) anchor.download = href.split('/').pop();
    else { anchor.target = '_blank'; anchor.rel = 'noopener noreferrer'; }
    return anchor;
  }
  function cards() {
    for (const t of data) {
      const ext = t.type === 'extension';
      const grid = byId(ext ? 'extensionGrid':'onlineGrid'); if (!grid) continue;
      const card = el(grid,'article','tool-card');
      const badge = el(card,'span','card-icon'); badge.innerHTML = svg(t.icon);
      el(card,'h3','card-title',t.name);
      el(card,'p','card-description',t.description);
      const bottom = el(card,'div','card-bottom');
      const dest = ext ? validZIP(t.download):validURL(t.url);
      if (dest) {
        const link = el(bottom,'a','primary-action');link.href = dest;
        link.innerHTML = (ext ? 'Preuzmi ZIP' : 'Otvori alat') + svg(ext?'download':'external');
        if(ext) link.download = dest.slice(2);
        else {link.target = '_blank';link.rel = 'noopener noreferrer';}
      }
      if(ext) {
        const button = el(bottom,'button','help-action','Upute');button.type='button';button.addEventListener('click',()=>showTool(t));
      }
    }
  }
  function showTool(tool) {
    showDialog(tool.name,'EKSTENZIJA', body => {
      el(body,'p','dialog-text',tool.description);
      el(body,'h3',null,'Instalacija');
      steps(body,['Preuzmi ZIP i raspakuj ga na računar.','Otvori postavke ekstenzija u svom pregledniku.','Uključi Developer mode, klikni Load unpacked i izaberi folder s manifest.json.']);
      el(body,'h3',null,'Korištenje'); steps(body,tool.usage || []);
      const actions = el(body,'div','dialog-actions');
      if(validZIP(tool.download)) makeAction(actions,'Preuzmi ZIP',tool.download);
      const more = el(actions,'button','secondary','Detaljne upute');more.type = 'button';more.addEventListener('click',showInstall);
    });
  }
  function showInstall() {
    if(dialog.open)dialog.close();
    showDialog('Instalacija ekstenzija','BRAVE · CHROME · EDGE',body=>{
      const tabs = el(body,'div','browser-tabs');
      const address = el(body,'div','browser-url');
      for (const browser of Object.keys(BROWSERS)) {
        const b = el(tabs,'button',browser==='Brave'?'active':'',browser);b.type='button';
        b.addEventListener('click',()=>{
          address.textContent = BROWSERS[browser];
          tabs.querySelectorAll('button').forEach(other=>other.classList.toggle('active',other===b));
        });
      }
      address.textContent = BROWSERS.Brave;
      steps(body,[
        'Preuzmi ZIP željene ekstenzije i raspakuj ga.',
        'Kopiraj gornju adresu u adresnu traku preglednika.',
        'Uključi Developer mode (Način rada za programere).',
        'Klikni Load unpacked (Učitaj raspakovano).',
        'Izaberi folder koji sadrži manifest.json i pričvrsti ikonu ekstenzije.'
      ]);
      el(body,'p','small-note','Folder ostavi na istom mjestu dok koristiš ekstenziju.');
    });
  }
  function showPanel() {
    showDialog('Alatnica u bočnom panelu','BRAVE · CHROME · EDGE',body=>{
      steps(body,[
        'Preuzmi dodatak za bočni panel i raspakuj ga.',
        'Instaliraj ga preko Load unpacked kao i ostale ekstenzije.',
        'Klikni njegovu ikonu u pregledniku. Alatnica će se otvoriti sa strane.'
      ]);
      el(body,'p','small-note','Bočni panel prikazuje online katalog. Ekstenzije FB Screenshot i Datumi objava instaliraju se zasebno.');
      const actions = el(body,'div','dialog-actions');
      makeAction(actions,'Preuzmi bočni panel','./Raskrinkavanje_Bocni_Panel.zip');
      const more = el(actions,'button','secondary','Upute za instalaciju');more.type='button';more.addEventListener('click',showInstall);
    });
  }
  byId('installTop').addEventListener('click',showInstall);
  byId('installFooter').addEventListener('click',showInstall);
  byId('panelFooter').addEventListener('click',showPanel);
  byId('closeDialog').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',ev=>{const box=dialog.getBoundingClientRect();if(ev.clientX<box.left||ev.clientX>box.right||ev.clientY<box.top||ev.clientY>box.bottom)dialog.close();});
  const logo = new Image();
  logo.addEventListener('load',()=>document.querySelectorAll('.clown-logo').forEach(node=>node.classList.add('has-official-logo')));
  logo.src='https://raskrinkavanje.ba/images/og.png';
  cards();
})();
