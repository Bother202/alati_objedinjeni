(() => {
  'use strict';
  const TOOLS = Array.isArray(window.ALATNICA_TOOLS) ? window.ALATNICA_TOOLS : [];
  const $ = id => document.getElementById(id);
  const BROWSERS = {brave:'brave://extensions',chrome:'chrome://extensions',edge:'edge://extensions'};
  let currentBrowser = 'brave';
  let toastTimeout;

  const paths = {
    external: '<path d="M14 4h6v6M20 4l-9 9"/><path d="M20 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5"/>',
    download: '<path d="M12 3v12m0 0 5-5m-5 5-5-5M4 17v3h16v-3"/>',
    sparkle: '<path d="m12 2 1.8 7.2L21 11l-7.2 1.8L12 20l-1.8-7.2L3 11l7.2-1.8L12 2Z"/><path d="m19 18 .5 2L22 20.5l-2.5.5L19 23l-.5-2-2.5-.5 2.5-.5z"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 16l9 5 9-5"/>',
    calendar: '<rect x="3.5" y="5" width="17" height="16" rx="2"/><path d="M7.5 3v4m9-4v4M3.5 10h17M8 14h3m-3 4h3"/>',
    camera: '<path d="M4 7h4l2-3h4l2 3h4a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z"/><circle cx="12" cy="13.5" r="3.5"/>',
    calendarCheck: '<rect x="3.5" y="5" width="17" height="16" rx="2"/><path d="M7.5 3v4m9-4v4M3.5 10h17m-12.5 6 2 2 4-4"/>'
  };
  function svg(name) { return `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${paths[name] || paths.sparkle}</svg>`; }
  const safeOnlineUrl = str => {try {const u=new URL(str);return u.protocol === 'https:' ? u.href : null;}catch{return null;}};
  const safeZip = str => typeof str === 'string' && /^\.\/downloads\/[a-zA-Z0-9_.-]+\.zip$/.test(str) ? str : null;
  const add = (parent,tag,cls,txt) => {const el=document.createElement(tag);if(cls)el.className=cls;if(txt!==undefined)el.textContent=txt;parent.appendChild(el);return el;};

  function card(t){
    const ext = t.type === 'extension';
    const article = document.createElement('article'); article.className = 'tool-card';
    const main = add(article,'div','card-main');
    const icon = add(main,'span',`tool-icon ${['mint','blue','amber','rose','violet'].includes(t.theme)?t.theme:'mint'}`); icon.innerHTML = svg(({ 'zn-hepek':'sparkle','hepek20':'layers','date-analysis':'calendar','fb-screenshot':'camera','datumi-objava':'calendarCheck' })[t.id]||'sparkle');
    add(main,'h3',null,t.name);
    add(article,'p','tagline',t.tagline);
    const actions=add(article,'div','card-actions');
    const href = ext ? safeZip(t.download) : safeOnlineUrl(t.url);
    if(href){
      const a=add(actions,'a','action-main');a.href=href;a.innerHTML=(ext?'Preuzmi ZIP':'Otvori alat')+svg(ext?'download':'external');
      if(ext)a.setAttribute('download','');else {a.target='_blank';a.rel='noopener noreferrer';}
    } else add(actions,'span','action-main','Nije dostupno');
    const info=add(actions,'button','action-info',ext?'Kako instalirati':'Upute');info.type='button';info.addEventListener('click',()=>showTool(t));
    return article;
  }
  function render(){
    const q=$('search').value.trim().toLocaleLowerCase('bs');
    let shown=0;
    for(const [type,grid,section,count] of [['online','onlineGrid','onlineSection','onlineCount'],['extension','extensionGrid','extensionsSection','extensionCount']]){
      const items=TOOLS.filter(t=>t.type===type&&(!q||[t.name,t.tagline,t.description].join(' ').toLocaleLowerCase('bs').includes(q)));
      $(grid).replaceChildren(...items.map(card));
      $(section).hidden=items.length===0;$(count).textContent=items.length;
      shown+=items.length;
    }
    $('helpStrip').hidden=shown===0;
    $('emptyState').hidden=shown>0;
  }
  function toast(text){
    const el=$('toast');el.textContent=text;el.hidden=false;clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>el.hidden=true,3000);
  }
  async function copy(text){
    try{await navigator.clipboard.writeText(text);toast('Link je kopiran.');}
    catch{
      const ta=document.createElement('textarea');ta.value=text;ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();const ok=document.execCommand('copy');ta.remove();toast(ok?'Link je kopiran.':'Kopiranje nije uspjelo.');
    }
  }
  function openDialog(title,subtitle,build){
    $('dialogTitle').textContent=title;$('dialogEyebrow').textContent=subtitle;
    $('dialogContent').replaceChildren();build($('dialogContent'));
    $('infoDialog').showModal();
  }
  function steps(parent,items){const ol=add(parent,'ol','dialog-list');items.forEach(s=>add(ol,'li',null,s));return ol;}
  function actionLink(parent,label,url,secondary=false,download=false){
    const actions=parent.querySelector('.dialog-actions')||add(parent,'div','dialog-actions');
    const a=add(actions,'a',secondary?'secondary-action':'',label);a.href=url;
    if(download)a.setAttribute('download','');else if(url.startsWith('https://')){a.target='_blank';a.rel='noopener noreferrer';}
    return a;
  }
  function showTool(t){
    const ext=t.type==='extension';
    openDialog(t.name,ext?'LOKALNA EKSTENZIJA':'ONLINE ALAT',body=>{
      add(body,'p',null,t.description);
      add(body,'h3',null,ext?'Koraci za korištenje':'Kako koristiti');
      steps(body,t.tips||[]);
      if(ext){
        add(body,'p','dialog-note','Ekstenziju prvo raspakuj, a zatim učitaj folder koji sadrži datoteku manifest.json.');
        const buttons=add(body,'div','dialog-actions');
        const url=safeZip(t.download);if(url)actionLink(body,'↓ Preuzmi ZIP',url,false,true);
        const guide=add(buttons,'button','secondary-action','Detaljne upute za instalaciju');guide.type='button';guide.addEventListener('click',showInstallGuide);
      } else {
        const url=safeOnlineUrl(t.url);if(url)actionLink(body,'↗ Otvori alat',url);
      }
    });
  }
  function browserTabs(body){
    const tabs=add(body,'div','browser-tabs');
    const address=add(body,'div','browser-url');
    const code=add(address,'code',null,BROWSERS[currentBrowser]);
    const button=add(address,'button',null,'Kopiraj');button.type='button';button.addEventListener('click',()=>copy(BROWSERS[currentBrowser]));
    ['brave','chrome','edge'].forEach(browser=>{
      const btn=add(tabs,'button',browser===currentBrowser?'active':'',browser[0].toUpperCase()+browser.slice(1));btn.type='button';
      btn.setAttribute('aria-pressed',String(browser===currentBrowser));
      btn.addEventListener('click',()=>{
        currentBrowser=browser;code.textContent=BROWSERS[browser];
        tabs.querySelectorAll('button').forEach(x=>{const active=x===btn;x.classList.toggle('active',active);x.setAttribute('aria-pressed',String(active));});
      });
    });
  }
  function showInstallGuide(){
    if($('infoDialog').open)$('infoDialog').close();
    openDialog('Instalacija ekstenzije','JEDNOM I GOTOVO',body=>{
      add(body,'p',null,'Uputstvo je isto za obje ekstenzije. Izaberi preglednik koji koristiš:');
      browserTabs(body);
      steps(body,[
        'Na kartici ekstenzije klikni „Preuzmi ZIP” i raspakuj ga u folder koji nećeš premještati.',
        'Otvori navedenu adresu u adresnoj traci preglednika.',
        'Uključi „Developer mode” (Način rada za programere).',
        'Klikni „Load unpacked” (Učitaj raspakovano).',
        'Odaberi raspakovani folder koji neposredno sadrži manifest.json.',
        'Na ikoni slagalice (Ekstenzije) pronađi alat, pričvrsti ga i po potrebi osvježi Facebook stranicu.'
      ]);
      add(body,'p','dialog-note','Online alati ne zahtijevaju instalaciju. ZIP nije potrebno učitati direktno – prvo ga raspakuj.');
    });
  }
  function showSidePanelGuide(){
    openDialog('Alatnica u bočnom panelu','DODATNA MOGUĆNOST',body=>{
      add(body,'p',null,'Dashboard može ostati otvoren sa strane dok pregledavaš druge stranice. Za to postoji mali dodatak koji se instalira jednom.');
      steps(body,[
        'Preuzmi dodatak za bočni panel i raspakuj ZIP.',
        'Instaliraj dodatak u Brave, Chrome ili Edge preko Load unpacked, na isti način kao ostale ekstenzije.',
        'Klikni ikonu Alatnice u pregledniku i u postavkama zalijepi javnu adresu svog GitHub Pages dashboarda.',
        'Klikni Sačuvaj. Ako se stranica ne može prikazati u panelu, otvori je iz panela u novom tabu.'
      ]);
      add(body,'p','dialog-note','Bočni panel je opcion. Katalog radi kao obična web-stranica bez instalacije.');
      actionLink(body,'↓ Preuzmi dodatak','./downloads/Alatnica_Bocni_Panel.zip',false,true);
    });
  }
  $('search').addEventListener('input',render);
  $('shareButton').addEventListener('click',()=>copy(location.href.split('#')[0].split('?')[0]));
  $('helpButton').addEventListener('click',showInstallGuide);
  $('installationButton').addEventListener('click',showInstallGuide);
  $('sidePanelButton').addEventListener('click',showSidePanelGuide);
  $('closeDialog').addEventListener('click',()=>$('infoDialog').close());
  $('infoDialog').addEventListener('click',e=>{const r=$('infoDialog').getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)$('infoDialog').close();});
  document.addEventListener('keydown',e=>{if(e.key==='/'&&!e.target.closest('input,textarea')&&!$('infoDialog').open){e.preventDefault();$('search').focus();}});
  render();
})();
