---
slug: /guide/pagamenti-online/components/riferimento
title: Riferimento di Voucherly.js
sidebar_label: Riferimento di Voucherly.js
sidebar_position: 2
description: "Riferimento di Voucherly.js: come includerlo, le opzioni del Payment Component e dell'Express Checkout Component, il reindirizzamento dopo il pagamento, la modalità popup, callback, metodi, errori e versionamento."
keywords:
  - Voucherly.js
  - Voucherly Components
  - riferimento JavaScript
  - Voucherly.init
  - reindirizzamento dopo il pagamento
  - modalità popup
  - aspetto
  - callback
  - modulo di pagamento incorporato
---

# Riferimento di Voucherly.js

Voucherly.js è la libreria che mostra i [Voucherly Components](./index.md) nella tua pagina. Espone un solo oggetto globale, `Voucherly`, descritto qui. Gli importi sono sempre interi in centesimi.

## Includere Voucherly.js

```html
<script src="https://checkout.voucherly.it/embed/v1/voucherly.js"></script>
```

Oppure, con npm, attraverso il pacchetto loader:

```sh
npm install @voucherly/voucherly-js
```

```js
import { loadVoucherly } from "@voucherly/voucherly-js";

const Voucherly = await loadVoucherly();
```

`loadVoucherly()` inietta lo script una sola volta — le chiamate successive condividono la stessa promise — e risolve con l'oggetto globale `Voucherly`. Risolve con `null` dove non esiste `window`, quindi può essere chiamata durante il rendering lato server. Il pacchetto contiene il loader e i tipi TypeScript, non Voucherly.js.

Carica Voucherly.js solo da `checkout.voucherly.it`: non includerlo nel tuo bundle e non servirne una copia dal tuo dominio.

### Versionamento

La versione è il segmento nel percorso, `v1`. Una versione riceve aggiornamenti retrocompatibili in continuo — nuovi metodi di pagamento, correzioni, miglioramenti — senza alcuna modifica alla tua integrazione; il file resta nella cache dei browser per cinque minuti, quindi un aggiornamento raggiunge i tuoi clienti in pochi minuti. Una modifica che romperebbe un'integrazione esistente esce su un nuovo percorso, `/embed/v2/`, e la versione precedente continua a funzionare.

Ogni major del pacchetto npm carica una versione di Voucherly.js; i due numeri sono indipendenti, e questa tabella è la corrispondenza:

| `@voucherly/voucherly-js` | Voucherly.js |
| --- | --- |
| `2.x` | `https://checkout.voucherly.it/embed/v1/voucherly.js` |

## Voucherly.init(options, componentOptions)

Mostra il Payment Component nel contenitore. Chiamarla di nuovo sostituisce il componente.

```js
Voucherly.init({
    publicKey: "pk_live_…",
    paymentId: "pay_…",
    containerId: "voucherly-payment",
}, {
    appearance: { variables: { colorPrimary: "#0f766e" } },
    showSubmitButton: true,
});
```

### options

Lo stesso oggetto è accettato da `Voucherly.init` e da `Voucherly.initExpress`.

| Parametro | Tipo | Descrizione |
| --- | --- | --- |
| `publicKey` | `string` (**obbligatorio**) | La publishable key (chiave pubblicabile) del tuo account merchant, `pk_live_…` o `pk_sand_…`. Decide l'ambiente: una chiave `pk_sand_` mostra i Payment sandbox, una chiave `pk_live_` quelli live. Una secret key (`sk_`) o una restricted key (`rk_`) genera un'eccezione. |
| `paymentId` | `string` (**obbligatorio**) | L'`id` del Payment creato con [Create a Payment](/api/webapi/create-payment), `pay_…`. Il Payment deve appartenere al merchant della chiave. |
| `containerId` | `string` (**obbligatorio**) | L'`id` dell'elemento in cui il componente viene mostrato. Il suo contenuto viene sostituito. |
| `redirect` | `"always"` \| `"if_required"` | Cosa fa la tua pagina quando il Payment si chiude. `always` (default) la manda sul `redirectOkUrl` o sul `redirectKoUrl` del Payment; `if_required` la lascia dov'è e fa scattare `onPaymentComplete` o `onPaymentError`. Vedi [Reindirizzamento dopo il pagamento](#reindirizzamento-dopo-il-pagamento). |
| `returnUrl` | `string` | La pagina su cui il cliente torna dopo un metodo di pagamento con reindirizzamento, per finire di pagare nel componente. Il default è l'URL corrente della pagina. Deve essere un URL assoluto del tuo sito, e quella pagina deve montare il componente con lo stesso `paymentId`. Non è la pagina di esito del Payment. |
| `onReady` | `function` | Vedi [Callback](#callback). |
| `onResize` | `function` | |
| `onPaymentComplete` | `function` | |
| `onPaymentPartialComplete` | `function` | |
| `onPaymentError` | `function` | |
| `onRedirect` | `function` | |

### componentOptions

| Parametro | Tipo | Descrizione |
| --- | --- | --- |
| `appearance.variables` | `object` | Colori, font e raggio del componente. Vedi [Aspetto](#aspetto). |
| `wallets.applePay` | `"auto"` \| `"never"` | `auto` (default) mostra Apple Pay se il browser del cliente può pagarci. `never` lo nasconde. |
| `wallets.googlePay` | `"auto"` \| `"never"` | `auto` (default) mostra Google Pay se il browser del cliente può pagarci. `never` lo nasconde. |
| `showSubmitButton` | `boolean` | Se il componente mostra il proprio pulsante di pagamento. Default `true`. Con `false`, invia il modulo dalla tua pagina con [`Voucherly.submit()`](#voucherlysubmit). |

Apple Pay e Google Pay richiedono inoltre un gateway con il supporto ai wallet attivo sul tuo account. Quando nella stessa pagina c'è l'Express Checkout Component, il Payment Component non li mostra, qualunque cosa dica `wallets`: sono già nella riga express. Allo stesso modo il Payment Component non mostra credito personale e quota prepagata quando la riga express li mostra, secondo i suoi [`paymentMethods`](#componentoptions-1).

### Reindirizzamento dopo il pagamento

`redirect` decide cosa fa la tua pagina quando il Payment si chiude. Funziona allo stesso modo inline e in modalità popup, e per entrambi i componenti.

| Valore | Quando il Payment si chiude |
| --- | --- |
| `always` (default) | Voucherly.js manda la tua pagina sul `redirectOkUrl` del Payment se è stato pagato, sul suo `redirectKoUrl` altrimenti. Né `onPaymentComplete` né `onPaymentError` vengono chiamate per il Payment chiuso. |
| `if_required` | La tua pagina resta dov'è, e `onPaymentComplete` o `onPaymentError` riceve l'esito. La pagina viene lasciata solo quando un metodo di pagamento lo richiede: inline, per un metodo con reindirizzamento; in modalità popup, mai. |

L'esito viaggia nella query string del reindirizzamento, con gli stessi parametri del [checkout ospitato](/guide/pagamenti-online/checkout-ospitato#3-mostra-una-pagina-di-successo): `success` (`OK` o `KO`), `status`, `paymentId`, `referenceId`, `amount`, `customerId` e `tenant`. Usali per decidere cosa mostrare, e controlla il Payment dal tuo server prima di evadere l'ordine.

Con `always`:

- **Il Payment deve avere sia `redirectOkUrl` sia `redirectKoUrl`.** Create a Payment li richiede, quindi un Payment senza è stato creato in un altro modo: il componente non viene mostrato, e `onPaymentError` riceve [`redirect_url_missing`](#errori) appena chiami `Voucherly.init`, prima che il cliente paghi.
- **Un Payment già chiuso quando il componente viene montato non viene reindirizzato**: scatta `onPaymentComplete` o `onPaymentError`, come con `if_required`. La pagina che monta il componente può quindi essere anche la tua pagina di esito, senza un ciclo di reindirizzamenti.
- **Le callback di un Payment aperto vengono comunque chiamate**: `onPaymentPartialComplete` dopo un pagamento parziale, e `onPaymentError` per una transazione fallita che il cliente può riprovare.
- **`onRedirect` non c'entra**: gestisce la navigazione verso la pagina di un provider durante il pagamento, non il reindirizzamento alla fine.
- Inline, dopo un metodo con reindirizzamento, il cliente torna prima sulla tua pagina: il componente carica il Payment chiuso, e solo allora Voucherly.js manda la pagina sull'URL di esito.

### Modalità popup

Con `displayMode: "popup"`, `Voucherly.init` non mostra nulla nella tua pagina: [`Voucherly.submit()`](#voucherlysubmit) apre il checkout Voucherly in una finestra popup sopra di essa. I metodi di pagamento con reindirizzamento restano dentro il popup, e quando il Payment si chiude il popup si chiude e [`redirect`](#reindirizzamento-dopo-il-pagamento) si applica come inline.

```js
Voucherly.init({
    displayMode: "popup",
    publicKey: "pk_live_…",
    paymentId: "pay_…",
    onPopupClosed: function () { /* … */ },
});

document.getElementById("pay-button").addEventListener("click", function () {
    Voucherly.submit();
});
```

| Parametro | Tipo | Descrizione |
| --- | --- | --- |
| `displayMode` | `"inline"` \| `"popup"` | `inline` (default) mostra il componente in `containerId`. `popup` lo apre in una finestra a `Voucherly.submit()`. |
| `publicKey` | `string` (**obbligatorio**) | Come in [options](#options). |
| `paymentId` | `string` (**obbligatorio**) | Come in [options](#options). |
| `redirect` | `"always"` \| `"if_required"` | Come in [options](#options). |
| `overlay` | `boolean` | Oscura la tua pagina finché il popup è aperto, con un pulsante per riportare il popup in primo piano e uno per chiuderlo. Default `true`. Con `false`, mostra un tuo stato di attesa a partire da `onPopupOpened` e `onPopupClosed`. |
| `onPaymentComplete` | `function` | Vedi [Callback](#callback). |
| `onPaymentPartialComplete` | `function` | |
| `onPaymentError` | `function` | |
| `onPopupOpened` | `function` | |
| `onPopupClosed` | `function` | |

In modalità popup:

- `containerId` e `returnUrl` non si usano, e `onReady`, `onResize` e `onRedirect` non vengono mai chiamate.
- `componentOptions` viene ignorato, con un avviso nella console: il popup mostra la pagina di checkout Voucherly, quindi `appearance` non si applica.
- Subito dopo `Voucherly.init`, Voucherly.js controlla il Payment: un Payment già chiuso fa scattare `onPaymentComplete` o `onPaymentError`, e una chiave non accettata, o un Payment senza gli URL richiesti da `redirect: "always"`, fa scattare `onPaymentError` con un [codice](#errori), prima che il cliente clicchi qualsiasi cosa.
- Quando il Payment si chiude, il popup si chiude da solo, appena Voucherly.js o il popup se ne accorgono, e l'overlay resta finché il popup non c'è più. Il cliente può anche annullare il Payment dal popup: si chiude senza successo e segue la stessa strada.
- Il popup vale solo per il Payment Component. L'Express Checkout Component viene sempre mostrato nel suo contenitore, e può stare nella stessa pagina; in quel caso Apple Pay e Google Pay compaiono sia nella riga express sia nel popup.
- Se la tua pagina si ricarica mentre il popup è aperto, chiama di nuovo `Voucherly.init` con lo stesso `paymentId`: Voucherly.js continua a seguire il Payment per 30 minuti dall'apertura del popup, e `Voucherly.submit()` riporta in primo piano lo stesso popup invece di aprirne un altro.
- Il popup si apre sul dominio di checkout del tuo account, il tuo dominio custom se ne hai uno, quindi può essere un'origine diversa da quella dello script.
- Sui browser mobile il popup si apre come una nuova scheda. Un browser può impedire al popup di chiudersi da solo, per esempio dopo le pagine di alcuni provider: il popup chiede allora al cliente di chiuderlo, e la tua pagina prosegue normalmente.

## Voucherly.initExpress(options, componentOptions)

Mostra l'Express Checkout Component: i pulsanti dei metodi di pagamento che completano il Payment in un gesto. Accetta le stesse `options` di `Voucherly.init` e le proprie `componentOptions`. Quando entrambi i componenti sono nella pagina, passa loro lo stesso `redirect` e le stesse callback: l'esito viene gestito una volta sola, qualunque componente chiuda il Payment.

```js
Voucherly.initExpress({
    publicKey: "pk_live_…",
    paymentId: "pay_…",
    containerId: "voucherly-express",
}, {
    buttonHeight: 48,
    buttonType: { applePay: "buy", googlePay: "buy" },
    paymentMethods: { wallet: "auto", prepaid: "auto" },
});
```

### componentOptions

| Parametro | Tipo | Descrizione |
| --- | --- | --- |
| `appearance.variables` | `object` | Vedi [Aspetto](#aspetto). |
| `buttonHeight` | `number` | Altezza dei pulsanti Apple Pay e Google Pay, in pixel. |
| `buttonType.applePay` | `string` | Etichetta del pulsante Apple Pay: `"buy"` (default), `"pay"`, `"plain"` o un altro tipo supportato da Apple Pay. |
| `buttonType.googlePay` | `string` | Etichetta del pulsante Google Pay: `"buy"` (default), `"pay"`, `"plain"` o un altro tipo supportato da Google Pay. |
| `paymentMethods.wallet` | `"always"` \| `"auto"` \| `"never"` | Il credito personale del cliente. `always` (default) lo mostra ogni volta che il cliente ha credito, `auto` solo quando il credito copre l'intero importo residuo, `never` lo nasconde. |
| `paymentMethods.prepaid` | `"always"` \| `"auto"` \| `"never"` | La quota prepagata del cliente, con gli stessi valori. |
| `paymentMethods.applePay` | `"auto"` \| `"never"` | `auto` (default) mostra il pulsante Apple Pay se il browser del cliente può pagarci. `never` lo nasconde. |
| `paymentMethods.googlePay` | `"auto"` \| `"never"` | `auto` (default) mostra il pulsante Google Pay se il browser del cliente può pagarci. `never` lo nasconde. |

## Aspetto

`appearance.variables` corrisponde alle custom property CSS del componente. Ogni valore è un valore CSS, passato come stringa.

| Variabile | Default | Si applica a |
| --- | --- | --- |
| `colorPrimary` | `#5C59F2` | Pulsante di pagamento, metodo selezionato, anello di focus |
| `colorPrimaryHover` | `#4a47d9` | Pulsante di pagamento al passaggio del mouse |
| `colorPrimaryText` | `#ffffff` | Testo sul colore primario |
| `colorText` | `#1a1a1a` | Testo |
| `colorTextMuted` | `#6b7280` | Testo secondario e suggerimenti |
| `colorBackground` | `#ffffff` | Sfondo del componente |
| `colorBorder` | `#e0e0e0` | Bordi dei metodi e dei campi |
| `colorDanger` | `#dc3545` | Messaggi di errore |
| `borderRadius` | `0.5rem` | Raggio di schede, campi e pulsanti |
| `fontFamily` | `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif` | Testo |
| `fontFamilyHeading` | uguale a `fontFamily` | Titoli |
| `fontSize` | `14px` | Dimensione base del testo |

Il componente le imposta al caricamento; per cambiarle in seguito usa [`Voucherly.configure`](#voucherlyconfigurename-options). `fontFamily` può indicare solo font installati sul dispositivo del cliente: il componente non può caricare i web font della tua pagina, quindi chiudi l'elenco con una famiglia generica.

## Callback

Ogni callback è facoltativa. Si passano in `options` e ricevono oggetti semplici.

### onReady(event)

Il componente è stato mostrato ed è interattivo.

| Campo | Tipo | Descrizione |
| --- | --- | --- |
| `height` | `number` | Altezza del componente in pixel, già applicata al suo contenitore. |
| `resumed` | `boolean` | `true` quando il componente si sta ricaricando dopo che il cliente è tornato da un metodo di pagamento con reindirizzamento. |

### onResize(height)

L'altezza del componente è cambiata, per esempio quando il cliente ha aperto un metodo di pagamento. Voucherly.js applica da solo la nuova altezza, fotogramma per fotogramma durante le animazioni del modulo; la callback viene chiamata una volta, con l'altezza finale, quando l'altezza si è assestata. Usala solo se il tuo layout deve reagire.

### onPaymentComplete(event)

Il Payment è interamente pagato. Viene chiamata con `redirect: "if_required"`, e con `always` solo per un Payment già pagato quando il componente è stato montato: altrimenti il cliente viene mandato sul `redirectOkUrl`. Confermalo dal tuo server prima di evadere l'ordine.

| Campo | Tipo | Descrizione |
| --- | --- | --- |
| `success` | `boolean` | Sempre `true`. |
| `paymentId` | `string` | Il Payment. |
| `amount` | `number` | Il totale pagato, in centesimi. |
| `status` | `string` | Lo stato del Payment: `Confirmed` quando il metodo cattura al checkout o il Payment ha `isAutoConfirm`, `Paid` quando serve ancora [Confirm a Payment](/api/webapi/confirm-payment). |

### onPaymentPartialComplete(event)

Una transazione è stata pagata ma il Payment non è ancora chiuso, tipicamente dopo un buono pasto che copre parte dell'importo. Il componente si ricarica da solo e chiede l'importo residuo. Viene chiamata qualunque sia `redirect`.

| Campo | Tipo | Descrizione |
| --- | --- | --- |
| `paymentId` | `string` | Il Payment. |
| `paidAmount` | `number` | L'importo pagato finora, in centesimi. |
| `remainingAmount` | `number` | L'importo ancora da pagare, in centesimi. |
| `transactionId` | `string` | La transazione appena pagata. |
| `gatewayName` | `string` | Il nome del gateway di pagamento della transazione. |

### onPaymentError(event)

Una transazione è fallita, il Payment è stato chiuso senza successo, oppure il componente non è stato mostrato. Dopo una transazione fallita il componente resta utilizzabile: il cliente può riprovare con un altro metodo. Un Payment chiuso senza successo arriva a questa callback con `redirect: "if_required"`, o con `always` quando era già chiuso al montaggio; altrimenti il cliente viene mandato sul `redirectKoUrl`. I campi dipendono da cosa è successo, e sono tutti facoltativi.

| Campo | Tipo | Descrizione |
| --- | --- | --- |
| `paymentId` | `string` | Il Payment. |
| `error` | `object` | L'errore della transazione fallita, lo stesso oggetto di `transactions[].error` in [Retrieve a Payment](/api/webapi/retrieve-payment): `code` (`Declined`, `Cancelled`, `Generic`, …) e, quando il provider ne ha riportato uno, `externalError` con `message` e `code`. |
| `gatewayName` | `string` | Il nome del gateway di pagamento della transazione fallita. |
| `success` | `boolean` | `false` quando il Payment è stato chiuso senza successo. |
| `status` | `string` | Lo stato del Payment quando è stato chiuso senza successo. |
| `message` | `string` | Una breve descrizione, quando il problema è avvenuto nel componente e non in una transazione. |
| `code` | `string` | Un errore di configurazione: il componente non è stato mostrato. Vedi [Errori](#errori). |

### onRedirect(url)

Il metodo di pagamento scelto richiede la pagina del provider. L'implementazione di default naviga la pagina con `window.location.href = url`; fornisci la tua per salvare prima lo stato. La navigazione deve avvenire al livello più alto della pagina, mai in un frame. Quando il cliente torna, monta di nuovo il componente con lo stesso `paymentId`: riprende con `resumed: true` in `onReady` e riporta l'esito.

Non viene chiamata per il reindirizzamento alla pagina di esito quando il Payment si chiude: vedi [Reindirizzamento dopo il pagamento](#reindirizzamento-dopo-il-pagamento). Non viene chiamata nemmeno in modalità popup: la pagina del provider si apre dentro il popup.

### onPopupOpened()

Solo in modalità popup. La finestra popup si è aperta.

### onPopupClosed()

Solo in modalità popup. La finestra popup è stata chiusa — dal cliente, con il pulsante **Annulla** dell'overlay, o da sola quando il Payment si è chiuso — oppure la tua pagina non riesce più a raggiungerla. **Non significa che il pagamento sia stato abbandonato**: alcuni provider, tra cui PayPal, staccano il popup dalla tua pagina mentre il cliente sta ancora pagando, quindi Voucherly.js continua a controllare il Payment e l'esito può ancora arrivare. Lascia al cliente la possibilità di riaprire il popup con `Voucherly.submit()`, e decidi dal tuo server quando rinunciare al Payment.

## Metodi

### Voucherly.configure(name, options)

Invia nuove `componentOptions` a un componente montato. `name` è `"element"` per il Payment Component o `"express"` per l'Express Checkout Component; omettilo per inviare le opzioni a entrambi.

```js
Voucherly.configure("element", { showSubmitButton: false });
Voucherly.configure({ appearance: { variables: { colorPrimary: "#b91c1c" } } });
```

### Voucherly.submit()

Invia il Payment Component con il metodo selezionato dal cliente, come farebbe il suo pulsante di pagamento. Pensato per le pagine che nascondono il pulsante con `showSubmitButton: false`.

In [modalità popup](#modalità-popup) apre il popup, o lo riporta in primo piano se è già aperto. Chiamalo direttamente da un gesto dell'utente, come il gestore del click del tuo pulsante di pagamento, e non attendere nulla prima di chiamarlo: i browser bloccano un popup che non viene aperto in risposta a un click.

### Voucherly.destroy()

Rimuove entrambi i componenti e i loro listener.

In modalità popup il popup resta aperto, perché il cliente potrebbe stare pagando: Voucherly.js smette di seguire il Payment, e un nuovo `Voucherly.init` con lo stesso `paymentId` lo riprende.

### Voucherly.destroyComponent(name)

Rimuove un componente, `"element"` o `"express"`.

## Errori

Quando il componente non può essere mostrato, `onPaymentError` riceve un evento con un `code`, e lo stesso codice viene scritto nella console del browser. Sono errori di integrazione: correggi la pagina invece di mostrarli al cliente.

| Codice | Causa | Rimedio |
| --- | --- | --- |
| `public_key_required` | Nessuna `publicKey` è arrivata al componente. | Passa la tua chiave `pk_` in `options`. |
| `invalid_public_key` | La chiave non è una publishable key di un account esistente, oppure è stata revocata. | Copia la chiave da **Sviluppatori > [API keys](https://dashboard.voucherly.it/Developer/ApiKey)**. |
| `public_key_tenant_mismatch` | L'ambiente della chiave non corrisponde a quello del Payment. | Crea il Payment con la chiave `sk_` dello stesso ambiente della chiave `pk_`: sandbox con sandbox, live con live. |
| `payment_not_found` | Nessun Payment con quell'id appartiene al merchant della chiave. | Controlla il `paymentId`, e che il Payment sia stato creato dallo stesso account a cui appartiene la chiave. |
| `merchant_not_active` | L'account merchant non è attivo. | Completa l'attivazione dell'account, oppure contatta il supporto. |
| `redirect_url_missing` | `redirect` è `always`, il default, e al Payment manca `redirectOkUrl` o `redirectKoUrl`. | Crea il Payment con entrambi gli URL, oppure passa `redirect: "if_required"` e gestisci l'esito nelle tue callback. |
| `popup_blocked` | Modalità popup: il browser ha rifiutato di aprire il popup. | Chiama `Voucherly.submit()` direttamente dal gestore del click di un pulsante, senza attendere nulla prima. |

Voucherly.js genera un'eccezione, alla chiamata di `Voucherly.init` o `Voucherly.initExpress`, quando mancano `publicKey`, `paymentId` o `containerId`, quando la chiave non è una chiave `pk_`, quando `redirect` o `displayMode` hanno un valore non supportato, o quando il contenitore non esiste nella pagina. In modalità popup `containerId` non è richiesto.

## Note di sicurezza

- La publishable key non è un segreto: è visibile nel sorgente della tua pagina. Identifica il tuo account e permette a Voucherly di verificare che il Payment ti appartenga; non può creare, recuperare o rimborsare Payment, e quelle operazioni richiedono la secret key, sul tuo server. In modalità popup permette solo a Voucherly.js di leggere lo stato del Payment mentre il popup è aperto: lo stato, l'importo pagato e il residuo, e il nome del gateway di pagamento.
- Il componente gira in un iframe servito da `checkout.voucherly.it`, isolato dalla tua pagina con l'attributo `sandbox`. I numeri di carta e gli altri dati di pagamento vengono inseriti dentro l'iframe e non raggiungono mai la tua pagina; la tua pagina riceve solo gli eventi descritti sopra.
- Voucherly.js accetta messaggi solo dall'origine dell'iframe, e l'iframe accetta messaggi solo dall'origine della pagina che lo ha montato.
- In modalità popup i dati di pagamento vengono inseriti nella pagina di checkout Voucherly, nella sua finestra, e la tua pagina non scambia messaggi con essa: Voucherly.js legge lo stato del Payment da `checkout.voucherly.it` con la tua publishable key.
- Il `redirectOkUrl` e il `redirectKoUrl` del Payment non raggiungono mai il browser prima che il cliente ci venga mandato: con `redirect: "always"`, Voucherly.js naviga su `checkout.voucherly.it`, che verifica la publishable key e reindirizza all'URL salvato sul Payment.
- L'esito consegnato alla tua pagina, nelle callback o nella query string della tua pagina di esito, serve all'esperienza del cliente. Ciò su cui agiscono i tuoi sistemi deve arrivare dalla [callback S2S](/api/generale/best-practice/s2s) o da [Retrieve a Payment](/api/webapi/retrieve-payment).
