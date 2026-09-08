---
slug: /guide/pagamenti-online/components/riferimento
title: Riferimento di Voucherly.js
sidebar_label: Riferimento di Voucherly.js
sidebar_position: 2
description: "Riferimento di Voucherly.js: come includerlo, le opzioni del Payment Component e dell'Express Checkout Component, le callback con i loro payload, i metodi, gli errori e il versionamento."
keywords:
  - Voucherly.js
  - Voucherly Components
  - riferimento JavaScript
  - Voucherly.init
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
    onPaymentComplete: function (event) { /* … */ },
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
| `returnUrl` | `string` | La pagina su cui il cliente atterra dopo un metodo di pagamento con reindirizzamento. Il default è l'URL corrente della pagina. Deve essere un URL assoluto del tuo sito, e quella pagina deve montare il componente con lo stesso `paymentId`. |
| `onReady` | `function` | Vedi [Callback](#callback). |
| `onResize` | `function` | |
| `onPaymentComplete` | `function` | |
| `onPartialPayment` | `function` | |
| `onPaymentError` | `function` | |
| `onRedirect` | `function` | |

### componentOptions

| Parametro | Tipo | Descrizione |
| --- | --- | --- |
| `appearance.variables` | `object` | Colori, font e raggio del componente. Vedi [Aspetto](#aspetto). |
| `wallets.applePay` | `"auto"` \| `"never"` | Se proporre Apple Pay nel modulo. `auto` (default) lo mostra solo sui dispositivi che lo supportano, e solo se sul tuo account è attivo un gateway con Apple Pay. |
| `wallets.googlePay` | `"auto"` \| `"never"` | Lo stesso per Google Pay. |
| `showSubmitButton` | `boolean` | Se il componente mostra il proprio pulsante di pagamento. Default `true`. Con `false`, invia il modulo dalla tua pagina con [`Voucherly.submit()`](#voucherlysubmit). |

## Voucherly.initExpress(options, componentOptions)

Mostra l'Express Checkout Component: i pulsanti dei metodi di pagamento che completano il Payment in un gesto. Accetta le stesse `options` di `Voucherly.init` e le proprie `componentOptions`.

```js
Voucherly.initExpress({
    publicKey: "pk_live_…",
    paymentId: "pay_…",
    containerId: "voucherly-express",
    onPaymentComplete: function (event) { /* … */ },
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
| `paymentMethods.applePay` | `"auto"` \| `"never"` | Come `wallets.applePay` del Payment Component. |
| `paymentMethods.googlePay` | `"auto"` \| `"never"` | Come `wallets.googlePay` del Payment Component. |

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

L'altezza del componente è cambiata, per esempio quando il cliente ha aperto un metodo di pagamento. Voucherly.js applica da solo la nuova altezza; usa la callback solo se il tuo layout deve reagire.

### onPaymentComplete(event)

Il Payment è interamente pagato. Confermalo dal tuo server prima di evadere l'ordine.

| Campo | Tipo | Descrizione |
| --- | --- | --- |
| `success` | `boolean` | Sempre `true`. |
| `paymentId` | `string` | Il Payment. |
| `amount` | `number` | Il totale pagato, in centesimi. Assente quando il componente riprende dopo un reindirizzamento. |
| `status` | `string` | Lo stato del Payment, per esempio `Paid` o `Confirmed`. Assente quando il componente riprende dopo un reindirizzamento. |

### onPartialPayment(event)

Una transazione è stata pagata ma il Payment non è ancora chiuso, tipicamente dopo un buono pasto che copre parte dell'importo. Il componente si ricarica da solo e chiede l'importo residuo.

| Campo | Tipo | Descrizione |
| --- | --- | --- |
| `paymentId` | `string` | Il Payment. |
| `paidAmount` | `number` | L'importo pagato finora, in centesimi. |
| `remainingAmount` | `number` | L'importo ancora da pagare, in centesimi. |
| `transactionId` | `string` | La transazione appena pagata. |
| `gatewayName` | `string` | Il nome del gateway di pagamento della transazione. |

### onPaymentError(event)

Una transazione è fallita, il Payment è stato chiuso senza successo, oppure il componente non è stato mostrato. Dopo una transazione fallita il componente resta utilizzabile: il cliente può riprovare con un altro metodo. I campi dipendono da cosa è successo, e sono tutti facoltativi.

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

## Metodi

### Voucherly.configure(name, options)

Invia nuove `componentOptions` a un componente montato. `name` è `"element"` per il Payment Component o `"express"` per l'Express Checkout Component; omettilo per inviare le opzioni a entrambi.

```js
Voucherly.configure("element", { showSubmitButton: false });
Voucherly.configure({ appearance: { variables: { colorPrimary: "#b91c1c" } } });
```

### Voucherly.submit()

Invia il Payment Component con il metodo selezionato dal cliente, come farebbe il suo pulsante di pagamento. Pensato per le pagine che nascondono il pulsante con `showSubmitButton: false`.

### Voucherly.destroy()

Rimuove entrambi i componenti e i loro listener.

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

Voucherly.js genera un'eccezione, alla chiamata di `Voucherly.init` o `Voucherly.initExpress`, quando mancano `publicKey`, `paymentId` o `containerId`, quando la chiave non è una chiave `pk_`, o quando il contenitore non esiste nella pagina.

## Note di sicurezza

- La publishable key non è un segreto: è visibile nel sorgente della tua pagina. Identifica il tuo account e permette a Voucherly di verificare che il Payment ti appartenga; non può creare, leggere o rimborsare Payment. Quelle operazioni richiedono la secret key, sul tuo server.
- Il componente gira in un iframe servito da `checkout.voucherly.it`, isolato dalla tua pagina con l'attributo `sandbox`. I numeri di carta e gli altri dati di pagamento vengono inseriti dentro l'iframe e non raggiungono mai la tua pagina; la tua pagina riceve solo gli eventi descritti sopra.
- Voucherly.js accetta messaggi solo dall'origine dell'iframe, e l'iframe accetta messaggi solo dall'origine della pagina che lo ha montato.
- L'esito consegnato alla tua pagina serve all'esperienza del cliente. Ciò su cui agiscono i tuoi sistemi deve arrivare dalla [callback S2S](/api/generale/best-practice/s2s) o da [Retrieve a Payment](/api/webapi/retrieve-payment).
