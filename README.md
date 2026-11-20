# Raskrinkavanje alatnica

Dashboard za GitHub Pages: tri online alata, dvije ekstenzije za preuzimanje i opcioni dodatak za bočni panel.

## Postavljanje na postojeći GitHub

Repozitorij: https://github.com/Bother202/alati_objedinjeni

1. Raspakuj ZIP `Raskrinkavanje_Alatnica_GitHub_v3.zip`.
2. Na GitHubu otvori svoj repozitorij i klikni **Add file → Upload files**.
3. Označi **sve datoteke iz raspakovanog foldera** (uključujući tri ZIP datoteke) i prevuci ih u prozor za upload. Ne uploaduj arhivu `Raskrinkavanje_Alatnica_GitHub_v3.zip` kao jednu datoteku.
4. Klikni **Commit changes**. Svi fajlovi moraju stajati u glavnom dijelu repozitorija pored `index.html`.
5. Otvori https://bother202.github.io/alati_objedinjeni/ i osvježi s **Ctrl + Shift + R**.

Postavke **Settings → Pages → main → /(root)** već si uključio/la, ne treba ih mijenjati. GitHub Pages objavljuje fajlove iz repozitorija.

## Preuzimanja

- `FB_Screenshot_v6_1_FIX.zip` — Facebook screenshot ekstenzija.
- `Datumi_Objava_Brave.zip` — ekstenzija za datume objava.
- `Raskrinkavanje_Bocni_Panel.zip` — opcioni dodatak za prikaz kataloga u bočnom panelu Brave/Chrome/Edge.

**Svi su u korijenu repozitorija**, tako da ih možeš uploadovati zajedno s ostalim fajlovima i preuzeti preko linkova u dashboardu. Sve ZIP datoteke sadrže folder s `manifest.json`.

Ako želiš mijenjati nazive i adrese online alata, otvori `tools.js` na GitHubu.

### Kako instalirati ekstenziju

1. Preuzmi njen ZIP i raspakuj.
2. Otvori `brave://extensions` ili `chrome://extensions` ili `edge://extensions`.
3. Uključi **Developer mode**.
4. Klikni **Load unpacked**.
5. Odaberi folder iz raspakovanog ZIP-a koji sadrži `manifest.json`.

Ekstenzije se instaliraju lokalno; web-stranica ih ne može sama instalirati. Ovo je javni repozitorij: svi fajlovi, uključujući ZIP-ove, bit će javno dostupni.

### Logo

Zaglavlje i bočni panel koriste logo klovna direktno sa zvanične stranice Raskrinkavanje.ba (`https://raskrinkavanje.ba/images/og.png`). Za učitavanje loga potrebna je mrežna veza sa Raskrinkavanje.ba. Ako se logo ne učita, vidi se ljubičasta podloga.
