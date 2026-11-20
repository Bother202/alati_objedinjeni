# Alatnica — jednostavni dashboard za GitHub Pages

Neutralna web-stranica s pet alata (tri online aplikacije i dvije ekstenzije), pretragom i kratkim uputama. Nije potrebno instalirati ništa da bi se otvorio web-katalog.

## Najlakši način objave

1. Otvori https://github.com/new i napravi **Public** repozitorij, npr. `alatnica`.
2. Klikni **Add file → Upload files** i učitaj **sadržaj** ovog raspakovanog foldera (ne ZIP u cijelosti). `index.html`, `style.css`, `app.js` i `tools.js` moraju biti u korijenu repozitorija.
3. Potvrdi promjene dugmetom **Commit changes**.
4. Idi na **Settings → Pages → Build and deployment** i pod **Source** odaberi **Deploy from a branch**. Odaberi `main` i `/(root)`, zatim **Save**.
5. Objavljena adresa izgleda kao `https://IME-NALOGA.github.io/alatnica/`. Podijeli tu adresu kolegama.

Ako već imaš objavljenu staru verziju Alatnice, **zamijeni postojeće fajlove u istom repozitoriju novim sadržajem**. Ne moraš praviti novi repozitorij i link ostaje isti. Nakon objave probaj osvježavanje stranice sa `Ctrl + Shift + R`.

## Šta sadrži

- `index.html`, `style.css`, `app.js` — pojednostavljeni izgled i funkcije dashboarda.
- `tools.js` — katalog; tu dodaješ nove alate i uređuješ linkove.
- `downloads/FB_Screenshot_v6_1_FIX.zip` — originalna lokalna ekstenzija.
- `downloads/Datumi_Objava_Brave.zip` — originalna lokalna ekstenzija.
- `downloads/Alatnica_Bocni_Panel.zip` — opcioni dodatak za bočni panel.
- `panel-dodatak/` — izvorni fajlovi opcionalnog dodatka za bočni panel.

**Napomena:** Web-dashboard ne instalira lokalne ekstenzije automatski i ne može direktno pokretati njihove funkcije. Kolege će ZIP raspakovati, otići na `brave://extensions`, `chrome://extensions` ili `edge://extensions`, uključiti **Developer mode** i kliknuti **Load unpacked**. Trebaju odabrati folder koji sadrži `manifest.json`. Potom mogu koristiti te ekstenzije u svom pregledniku.

## Bočni panel (opciono)

Dashboard može raditi samo kao web-stranica. Za bočni panel:

1. Preuzmi `downloads/Alatnica_Bocni_Panel.zip` i raspakuj ga.
2. U pregledniku instaliraj raspakovani folder preko **Load unpacked**.
3. Klikni ikonu dodatka, unesi javnu GitHub Pages adresu, klikni **Sačuvaj**.

Ako preglednik blokira prikaz neke stranice u panelu, otvori je u tabu tipkom ↗. Ovaj dodatak samo prikazuje katalog, ne zamjenjuje dvije stvarne ekstenzije.

## Dodavanje novih alata

U `tools.js` dodaj novi objekat u niz `window.ALATNICA_TOOLS`. Za web alat postavi `type: "online"` i HTTPS `url`. Za ekstenziju postavi `type: "extension"` i putanju do ZIP-a unutar `downloads/`. Dodaj novi ZIP u folder `downloads/` i po potrebi upute u polje `tips`.

## Održavanje i privatnost

Stranica je statična i ne zahtijeva server, bazu podataka niti račun kolege. Postavljena je na GitHub Pages. Online alati mogu imati vlastite uslove pristupa. U **Public** repozitoriju preuzimanja i izvorni fajlovi su javno dostupni; ne postavljaj tajne ni privatne podatke. Ažuriranje lokalnih ekstenzija instaliranih preko `Load unpacked` obično zahtijeva preuzimanje nove verzije i ponovno učitavanje.
