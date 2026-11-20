/*
 * KATALOG: izmijeni ovu datoteku na GitHubu kada dodaješ ili mijenjaš alate.
 * type: "online" ili "extension". Svaki unos mora imati jedinstven id.
 * Za online alat: url. Za ekstenziju: download (relativni put do ZIP-a).
 */
window.ALATNICA_TOOLS = [
  {
    id: "zn-hepek",
    name: "ZN Hepek",
    type: "online",
    category: "Online aplikacija",
    icon: "✳",
    theme: "mint",
    tagline: "Online alat u jednom kliku.",
    description: "Pristupi aplikaciji ZN Hepek direktno iz preglednika. Nije potrebna instalacija ekstenzije.",
    url: "https://znhepek.streamlit.app/",
    tips: ["Klikni na „Otvori aplikaciju”.", "Ako aplikacija traži prijavu, prijavi se direktno na njenoj stranici.", "Za konkretne funkcije koristi upute unutar same aplikacije."]
  },
  {
    id: "hepek20",
    name: "Hepek 2.0",
    type: "online",
    category: "Online aplikacija",
    icon: "◇",
    theme: "blue",
    tagline: "Web-aplikacija uvijek pri ruci.",
    description: "Pokreni Hepek 2.0 u novoj kartici, bez raspakivanja ZIP-a ili instaliranja dodataka.",
    url: "https://hepek20.streamlit.app/",
    tips: ["Klikni „Otvori aplikaciju” i sačekaj da se učita.", "Ako se pojavi Streamlit prijava ili ekran za buđenje aplikacije, postupi prema uputama servisa.", "Alatnica ne upravlja pristupom niti podacima aplikacije."]
  },
  {
    id: "date-analysis",
    name: "Date Analysis",
    type: "online",
    category: "Online aplikacija",
    icon: "◷",
    theme: "amber",
    tagline: "Online aplikacija za analizu datuma.",
    description: "Otvori Date Analysis u pregledniku. Ovo je odvojen online servis od lokalne ekstenzije Datumi objava.",
    url: "https://date-analysis.streamlit.app/",
    tips: ["Klikni „Otvori aplikaciju”.", "Radi unutar otvorene Streamlit aplikacije.", "Ne miješaj ovaj servis s lokalnom ekstenzijom „Datumi objava”."]
  },
  {
    id: "fb-screenshot",
    name: "FB Screenshot Formats",
    type: "extension",
    category: "Ekstenzija za preglednik",
    icon: "▣",
    theme: "rose",
    tagline: "Screenshoti Facebook objava u više formata.",
    description: "Mobilni, tablet, desktop i prilagođeni format. Vidljivi prozor, cijela objava, ručno izrezivanje, PNG i JPG.",
    download: "./downloads/FB_Screenshot_v6_1_FIX.zip",
    version: "v6.1",
    tips: ["Preuzmi ZIP i raspakuj ga u stalni folder.", "U pregledniku uključi Developer mode i odaberi Load unpacked; izaberi folder s manifest.json.", "Otvori Facebook objavu i klikni ikonu ekstenzije.", "Izaberi mobilni, tablet, desktop ili prilagođeni prikaz.", "Za cijelu objavu klikni „Cijela objava”, pomjeri miš iznad objave i potvrdi plavi okvir. Po potrebi prije toga proširi „Prikaži više”.", "Sliku sačuvaj kao PNG ili JPG. Ako automatsko snimanje ne prepozna objavu, koristi „Vidljivi prozor” ili ručno spajanje."]
  },
  {
    id: "datumi-objava",
    name: "Datumi objava",
    type: "extension",
    category: "Ekstenzija za preglednik",
    icon: "◫",
    theme: "violet",
    tagline: "Pronađi i pregledaj datume otvorenih objava.",
    description: "Analiza datuma na društvenim mrežama u otvorenim tabovima, sortiranje i CSV izvoz. Neutvrđene datume označava za provjeru.",
    download: "./downloads/Datumi_Objava_Brave.zip",
    version: "5.0 (manifest)",
    tips: ["Preuzmi ZIP i raspakuj ga u stalni folder.", "Instaliraj preko Load unpacked (folder s manifest.json) i isključi eventualnu staru verziju.", "Otvori objave koje želiš analizirati u tabovima istog prozora, pa klikni ikonu ekstenzije.", "U prikazanoj tabeli klikni „Brzo analiziraj tabove”.", "Provjeri datume koji su označeni kao nepotvrđeni ili procijenjeni. Za pojedine Facebook objave dostupan je dodatni pregled koji traži posebnu dozvolu.", "Sortiraj rezultate i preuzmi CSV ili kopiraj dvije kolone – datum i link."]
  }
];
