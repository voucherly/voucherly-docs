---
slug: /guide/prodotti/marketing/plugin
title: Riferimento del plugin Marketing
sidebar_label: Plugin Marketing
sidebar_position: 1
description: "Riferimento del plugin Marketing di Voucherly: come includerlo, init e le sue opzioni, il carrello, il pagamento, gli eventi su window, il cliente riconosciuto e il consenso."
keywords:
  - plugin Marketing
  - VoucherlyMarketing
  - popup sul sito
  - upselling sul carrello
  - loadVoucherlyMarketing
  - riferimento JavaScript
---

# Riferimento del plugin Marketing

Il plugin Marketing mostra sul tuo sito i popup dei funnel che crei nella Dashboard, in **Marketing › Funnel**: popup sulle pagine, upselling sul carrello, premi a soglia. Espone un solo oggetto globale, `VoucherlyMarketing`, descritto qui. Gli importi sono sempre interi in centesimi.

Il plugin risponde solo dai domini del tuo sito: aggiungili in **Impostazioni › Marketing e CRM › Siti**, dove trovi anche la publishable key (chiave pubblicabile) e il segreto di identità.

## Includere il plugin

```html
<script src="https://js.voucherly.it/marketing/v1/voucherly-marketing.js" async></script>
```

Lo script è asincrono: ascolta `voucherly:ready` prima del tag, oppure controlla che `window.VoucherlyMarketing` esista.

```html
<script>
    window.addEventListener("voucherly:ready", () => {
        const marketing = VoucherlyMarketing.init("pk_live_…");
    });
</script>
```

Senza codice, la chiave può stare nell'indirizzo dello script, e il plugin parte da solo con le opzioni di default:

```html
<script src="https://js.voucherly.it/marketing/v1/voucherly-marketing.js?key=pk_live_…" async></script>
```

Oppure, con npm, attraverso il secondo punto d'ingresso del pacchetto loader, dalla versione 2.2.0:

```sh
npm install @voucherly/voucherly-js
```

```js
import { loadVoucherlyMarketing } from "@voucherly/voucherly-js/marketing";

const VoucherlyMarketing = await loadVoucherlyMarketing();
const marketing = VoucherlyMarketing.init("pk_live_…");
```

`loadVoucherlyMarketing()` inserisce lo script una volta sola, e risolve con `null` dove non c'è `window`, quindi si può chiamare anche durante il rendering sul server.

## Avvio

`VoucherlyMarketing.init(publishableKey, opzioni)` restituisce l'istanza e non lancia mai: con una secret key o una chiave non valida scrive un errore in console e restituisce un'istanza che non fa niente. Un secondo `init` restituisce la stessa istanza.

| Opzione | Tipo | Descrizione |
| --- | --- | --- |
| `pages` | `"auto"` \| `"manual"` | Con `auto`, il default, il plugin dichiara da solo ogni pagina e ogni cambio della cronologia; con `manual` le dichiari tu con `page()` |
| `locale` | `string` | La lingua dei testi del popup; altrimenti quella di `<html lang>` |
| `user` | `{ id, hash }` | Il cliente che ha fatto l'accesso: vedi [Cliente riconosciuto](#cliente-riconosciuto) |

## Metodi dell'istanza

| Metodo | Descrizione |
| --- | --- |
| `page({ type })` | Dichiara la pagina, con un tipo come `home`, `product_list`, `product`, `cart` o `checkout` |
| `cart({ lines, coupons })` | Il carrello intero, a ogni modifica: vedi [Il carrello](#il-carrello) |
| `cartOpened()` | Il cassetto del carrello si è aperto |
| `checkoutStarted()` | Il cliente ha premuto il pulsante per pagare: vedi [Il pagamento](#il-pagamento) |
| `consent({ analytics, personalization, marketing })` | Le scelte del visitatore sul tuo banner dei cookie |
| `identify({ id, hash })` | Il cliente che fa l'accesso a pagina aperta; `identify(null)` quando esce |
| `values({ nome: valore })` | Valori del sito per le etichette e i segnaposto `{{nome}}` dei popup |
| `track(nome)` | Un evento del sito, che parte solo se un funnel lo cita |
| `context({ store, mode })` | Il punto vendita e la modalità della visita: `delivery`, `pickup` o `table` |
| `sessionId()` | L'id della sessione (`vses_…`), oppure `null` |
| `on(nome, gestore)` | Ascolta un evento senza il prefisso `voucherly:`; restituisce la funzione che lo stacca |
| `destroy()` | Spegne il plugin sulla pagina |

## Il carrello

Passa il carrello intero a ogni modifica, non le differenze:

```js
marketing.cart({
    lines: [
        { product: "prod_…", quantity: 2, price: 850 },
        { product: "menu-pranzo", quantity: 1, price: 1200, items: [{ product: "prod_…", quantity: 1 }] },
    ],
    coupons: ["PRANZO10"],
});
```

| Campo della riga | Descrizione |
| --- | --- |
| `product` | Il codice del prodotto nel tuo sistema (il codice esterno del catalogo Voucherly), oppure il suo id `prod_` |
| `quantity` | Le unità della riga |
| `price` | Il prezzo unitario in centesimi, prima dei coupon. Passalo solo se il prezzo lo fa il tuo sito: senza, vale quello del catalogo Voucherly |
| `items` | Per un menu, i prodotti che contiene, sommati sulle sue unità |

`coupons` sono i codici dei coupon che il tuo sito ha applicato al carrello.

## Il pagamento

`checkoutStarted()` restituisce una promise che non viene mai rifiutata: vai al pagamento quando si risolve. Si risolve subito se nessun popup parte dal pagamento, quando il visitatore esce dal popup, e al più dopo 2 secondi se il popup non compare.

```js
payButton.addEventListener("click", async () => {
    await marketing.checkoutStarted();
    goToPayment();
});
```

Quando crei il Payment, metti l'id della sessione nei suoi metadati, con la chiave `voucherly_marketing_session`: così la Dashboard conta gli ordini arrivati dopo un popup, e le righe aggiunte da un upselling.

```js
const metadata = { voucherly_marketing_session: marketing.sessionId() };
```

## Eventi su window

Tutti gli eventi hanno il prefisso `voucherly:` e portano i loro dati in `event.detail`. Gli eventi che chiedono un'azione al tuo sito si chiudono con `event.detail.resolve(esito)`, vero se ci sei riuscito: senza risposta in 8 secondi valgono come falliti.

| Evento | Quando | Cosa fai |
| --- | --- | --- |
| `voucherly:ready` | Lo script è caricato | Chiami `init` |
| `voucherly:offer-show` | Un popup sta per comparire | Puoi rinunciare con `preventDefault()` o rimandarlo con `detail.defer(promise)` |
| `voucherly:offer-shown` | Il popup è comparso | — |
| `voucherly:offer-exit` | Il visitatore ha scelto un'uscita (`exit`, `element`) | — |
| `voucherly:add-to-cart` | Il visitatore ha premuto «Aggiungi» (`product`, `productId`, `quantity`) | Aggiungi la riga, chiami `resolve` e poi `cart()` |
| `voucherly:set-quantity` | Il visitatore ha cambiato la quantità di un prodotto proposto (`quantity` assoluta, zero per togliere la riga) | Porti la riga a quella quantità, chiami `resolve` e poi `cart()` |
| `voucherly:open-product` | Il visitatore ha premuto «Scegli» su un prodotto con opzioni | Apri la pagina del prodotto |
| `voucherly:product-info` | Il visitatore ha premuto la «i» di un prodotto | Puoi aprire la tua scheda con `preventDefault()`, e chiamare `detail.resolve()` quando si chiude |
| `voucherly:apply-coupon` | Il visitatore ha accettato un premio (`code`) | Il tuo server valida e applica il coupon, chiami `resolve` e poi `cart()` |
| `voucherly:remove-coupon` | Il carrello non vale più il premio (`code`) | Togli il coupon, chiami `resolve` e poi `cart()` |
| `voucherly:navigate` | Il plugin sta per cambiare pagina (`url`) | Un sito che instrada da sé chiama `preventDefault()` e naviga con il suo router |
| `voucherly:identity-rejected` | L'hash non prova l'id del cliente | Il visitatore resta anonimo; puoi passare un hash nuovo con `identify` |
| `voucherly:error` | Una richiesta è fallita (`code`, `status`) | — |

L'annullamento va fatto in un listener sincrono.

```js
window.addEventListener("voucherly:add-to-cart", async (event) => {
    const added = await myCart.add(event.detail.product, event.detail.quantity);
    event.detail.resolve(added);
    marketing.cart(myCart.toVoucherly());
});
```

## Cliente riconosciuto

Quando un cliente ha fatto l'accesso al tuo sito, passa al plugin il suo id nel tuo sistema e l'hash che ne calcola il tuo server: l'HMAC-SHA256 con chiave il segreto di identità del sito e messaggio l'id, entrambi in UTF-8, scritto in 64 caratteri esadecimali. L'id è il `referenceId` del Customer in Voucherly: un cliente con lo stesso `referenceId` è lo stesso cliente.

```js
// Sul tuo server: il segreto non deve mai arrivare nella pagina.
import { createHmac } from "node:crypto";

const hash = createHmac("sha256", process.env.VOUCHERLY_IDENTITY_SECRET).update(user.id, "utf8").digest("hex");
```

```js
// Nella pagina.
const marketing = VoucherlyMarketing.init("pk_live_…", { user: { id: user.id, hash } });
```

Un id senza hash, o con un hash sbagliato, non vale: il visitatore resta anonimo, e il plugin emette `voucherly:identity-rejected`. Se rigeneri il segreto nella Dashboard, ogni hash calcolato con quello vecchio smette di valere.

## Consenso

Il consenso lo raccoglie il banner dei cookie del tuo sito. Il plugin lo legge, in quest'ordine:

1. dalla tua dichiarazione, `consent({ analytics, personalization, marketing })`, che vince su tutto e si può chiamare anche a pagina aperta. Una finalità che non nomini vale come rifiutata;
2. da IAB TCF v2.2;
3. da Google Consent Mode v2, nei comandi `consent` del `dataLayer`.

Senza nessun segnale vale «nessun consenso»: il plugin mostra comunque i popup che usano solo la visita in corso.

## Content Security Policy

Se il tuo sito usa una Content Security Policy, ammetti `js.voucherly.it` in `script-src`, `api.voucherly.it` in `connect-src`, e l'host delle immagini e dei video dei popup in `img-src` e `media-src`: lo trovi in **Impostazioni › Marketing e CRM › Siti**.

## Versionamento

Lo script `marketing/v1/` riceve aggiornamenti compatibili sullo stesso indirizzo, senza modifiche alla tua integrazione. Un cambio incompatibile arriverà su un indirizzo nuovo, `marketing/v2/`, e `v1` continuerà a funzionare.

| `@voucherly/voucherly-js` | Plugin Marketing |
| --- | --- |
| `2.2.0` e successive | `https://js.voucherly.it/marketing/v1/voucherly-marketing.js` |
