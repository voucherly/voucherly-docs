---
slug: /guide/pagamenti-online/components
title: Voucherly Components
sidebar_label: Guida all'integrazione
sidebar_position: 1
description: "Incorpora il modulo di pagamento Voucherly nella tua pagina di checkout con Voucherly.js: carte, buoni pasto, Apple Pay e Google Pay senza reindirizzare il cliente."
keywords:
  - Voucherly Components
  - Voucherly.js
  - checkout incorporato
  - modulo di pagamento
  - buoni pasto
  - Apple Pay
  - Google Pay
  - publishable key
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Voucherly Components

## Introduzione

I Voucherly Components ti permettono di accettare pagamenti **dentro la tua pagina di checkout**, senza mandare il cliente sul Voucherly Checkout. Aggiungi una piccola libreria JavaScript, Voucherly.js, e monti un componente (component) in un contenitore della tua pagina: Voucherly ci disegna il modulo di pagamento, con tutti i metodi di pagamento attivi sul tuo account — carte, buoni pasto, Apple Pay, Google Pay, credito personale e quota prepagata — e avvisa la tua pagina quando il pagamento è concluso.

:::info Cerchi il checkout ospitato?
Se preferisci reindirizzare il cliente a una pagina ospitata da Voucherly, segui [Checkout ospitato](/guide/pagamenti-online/checkout-ospitato). La parte lato server è la stessa: entrambe partono dalla creazione di un Payment.
:::

Sono disponibili due componenti:

- **Payment Component** — il modulo di pagamento completo: una fisarmonica con i metodi di pagamento disponibili, i flussi dei buoni pasto, i metodi di pagamento salvati e il pulsante di pagamento.
- **Express Checkout Component** — una fila di pulsanti a un tocco (Apple Pay, Google Pay, credito personale, quota prepagata) da mettere sopra il tuo modulo, per i clienti che vogliono pagare in un gesto.

Al termine di questa guida saprai come:

- Creare un Payment sul tuo server e mostrarlo nella tua pagina
- Gestire l'esito del pagamento, compresi i pagamenti parziali con i buoni pasto
- Supportare i metodi di pagamento che reindirizzano il cliente a un provider
- Personalizzare l'aspetto dei componenti per adattarli al tuo sito

## Come funziona

1. **Il tuo server crea un Payment** con l'API [Create a Payment](/api/webapi/create-payment) e la tua secret key (chiave segreta), esattamente come per il checkout ospitato, e passa l'id del Payment alla tua pagina.
2. **La tua pagina carica Voucherly.js** e monta un componente con la tua publishable key (chiave pubblicabile) e l'id del Payment. Il componente gira in un iframe servito da `checkout.voucherly.it`: i dati di pagamento del cliente vengono raccolti lì e non raggiungono mai la tua pagina.
3. **Il cliente paga.** Carte, buoni pasto e wallet vengono gestiti dentro il componente. I metodi di pagamento che richiedono la pagina del provider, come PayPal o Satispay, navigano l'intera pagina e riportano il cliente sulla tua.
4. **Voucherly avvisa la tua pagina** attraverso le callback che hai passato al componente, **e il tuo server** attraverso la callback S2S e l'API. Il tuo server è la fonte di verità per evadere l'ordine.

## Prerequisiti

- Leggi **[Come iniziare con un account Voucherly](/guide/inizia-a-integrare)**.
- La tua secret key e la tua publishable key da **Sviluppatori > [API keys](https://dashboard.voucherly.it/Developer/ApiKey)**. Usa la coppia `sk_sand_` e `pk_sand_` mentre sviluppi.
- Almeno un gateway di pagamento attivo in **Impostazioni > Pagamenti > [Gateway di pagamento](https://dashboard.voucherly.it/settings/payment/payment-gateways)**.
- Una pagina servita in **HTTPS**. Apple Pay, Google Pay e i provider di pagamento funzionano solo su origini sicure.

## Guida rapida

### 1. Crea un Payment

Dal tuo server, chiama [Create a Payment](/api/webapi/create-payment) con la tua secret key. Conserva l'`id` della risposta: la tua pagina ne ha bisogno per montare il componente.

**Esempio di richiesta**

```json
{
    "mode": "Payment",
    "customerEmail": "mario.rossi@voucherly.it",
    "customerFirstName": "Mario",
    "customerLastName": "Rossi",
    "redirectOkUrl": "https://{{redirect_host}}/payment/success",
    "redirectKoUrl": "https://{{redirect_host}}/payment/error",
    "callbackUrl": "https://{{callback_host}}/voucherly/callback",
    "country": "IT",
    "lines": [
        {
            "quantity": 2,
            "unitAmount": 250,
            "product": {
                "externalId": "SKU-MUFFIN-001",
                "name": "Muffin al Cioccolato",
                "isFood": true
            }
        }
    ]
}
```

**Esempio di risposta**

```json
{
    "id": "pay_4vZz3m9kQ1x",
    "status": "Requested",
    "amount": 500,
    "checkoutUrl": "https://example.voucherly.it/checkout",
    [...]
}
```

`redirectOkUrl` e `redirectKoUrl` sono obbligatori per l'API, ma con i Voucherly Components il cliente resta sulla tua pagina: vengono usati solo se qualcuno apre direttamente il `checkoutUrl`.

:::warning Tieni la secret key sul tuo server
Non inviare mai la tua chiave `sk_` al browser. Voucherly.js la rifiuta, e chiunque legga il sorgente della tua pagina potrebbe usarla per operare sul tuo account.
:::

### 2. Includi Voucherly.js

<Tabs groupId="install" queryString>
<TabItem value="script" label="Tag script">

Aggiungi lo script alla pagina in cui il cliente paga:

```html
<script src="https://checkout.voucherly.it/embed/v1/voucherly.js"></script>
```

</TabItem>
<TabItem value="npm" label="npm">

Installa il loader e chiama `loadVoucherly()`: inietta lo script e risolve con l'oggetto `Voucherly` appena è disponibile.

```sh
npm install @voucherly/voucherly-js
```

```js
import { loadVoucherly } from "@voucherly/voucherly-js";

const Voucherly = await loadVoucherly();
```

Il pacchetto include i tipi TypeScript di ogni opzione ed evento descritti in questa guida.

</TabItem>
</Tabs>

Carica Voucherly.js sempre da `checkout.voucherly.it`: non includerlo nel tuo bundle e non ospitarne una copia. Il file su `/embed/v1/` riceve aggiornamenti retrocompatibili senza alcuna modifica da parte tua — nuovi metodi di pagamento compresi — e una modifica incompatibile uscirebbe su un nuovo percorso, mai su `v1`. Consulta [Versionamento](./reference.md#versionamento).

### 3. Monta il Payment Component

Aggiungi un contenitore alla tua pagina e chiama `Voucherly.init` con la tua publishable key, l'id del Payment e le callback che vuoi gestire.

```html
<div id="voucherly-payment"></div>

<script>
    Voucherly.init({
        publicKey: "pk_sand_…",
        paymentId: "pay_4vZz3m9kQ1x",
        containerId: "voucherly-payment",
        onPaymentComplete: function (event) {
            // Il cliente ha pagato: conferma l'esito dal tuo server, poi mostra la tua pagina di successo.
            window.location.href = "/order/confirmed";
        },
        onPaymentError: function (event) {
            // Mostra un messaggio e lascia che il cliente riprovi con un altro metodo.
        },
    });
</script>
```

Il componente si dimensiona sul suo contenuto e cresce o si riduce mentre il cliente si muove nel modulo: dai al contenitore la larghezza che vuoi e lascia l'altezza al componente.

### 4. Gestisci l'esito

Il Payment Component comunica cosa succede attraverso le callback. Le tre che contano per il flusso del tuo ordine sono:

| Callback | Quando | Cosa fare |
| --- | --- | --- |
| `onPaymentComplete` | Il Payment è interamente pagato. | Conferma dal tuo server, poi fai proseguire il cliente. |
| `onPartialPayment` | Una transazione è stata pagata ma resta un importo, tipicamente dopo i buoni pasto. | Niente: il componente si ricarica e chiede l'importo residuo. Aggiorna i tuoi totali se li mostri. |
| `onPaymentError` | Una transazione è fallita, o il componente non è stato mostrato. | Mostra un messaggio; il cliente può riprovare dentro il componente. |

:::warning Conferma il pagamento dal tuo server
Le callback dicono alla tua pagina cosa ha visto il cliente, non cosa hanno registrato i tuoi sistemi. Prima di evadere l'ordine, controlla lo stato del Payment con [Retrieve a Payment](/api/webapi/retrieve-payment) o aspetta la [callback S2S](/api/generale/best-practice/s2s) sul `callbackUrl` che hai passato alla creazione. Un browser può essere chiuso, uno script manomesso, una callback persa: lo stato lato server è l'unico di cui fidarsi.
:::

L'`event` di `onPaymentComplete` contiene il `paymentId`, l'`amount` pagato in centesimi e lo `status` del Payment. Il payload completo di ogni callback è nel [riferimento](./reference.md#callback).

### 5. Metodi di pagamento con reindirizzamento

Alcuni metodi di pagamento — PayPal, Satispay, Scalapay, Klarna, i buoni pasto con il login dell'emittente come Edenred e Pluxee — richiedono la pagina del provider. Quando il cliente ne sceglie uno, Voucherly.js naviga **l'intera pagina**, non l'iframe, verso il provider; quando il cliente ha finito, il provider lo rimanda all'URL della tua pagina, con alcuni parametri di query che Voucherly.js consuma e rimuove dalla barra degli indirizzi.

Perché questo giro funzioni, la tua pagina deve poter mostrare di nuovo il componente dopo un ricaricamento:

- **Mantieni recuperabile l'id del Payment** — nella sessione del tuo server, o in un tuo parametro di query: Voucherly.js conserva i tuoi parametri e rimuove solo i propri. Quando la pagina si ricarica, chiama `Voucherly.init` con lo stesso `paymentId`: il componente riprende da dove il cliente era rimasto, `onReady` riceve `resumed: true`, e `onPaymentComplete` o `onPaymentError` scatta con l'esito.
- **Se il cliente deve tornare su una pagina diversa**, passala come `returnUrl`. Deve essere un URL `https` assoluto del tuo sito, e anche quella pagina deve montare il componente.
- **Se vuoi controllare la navigazione**, passa `onRedirect`. Il default è `window.location.href = url`; una single-page application può usarla per salvare prima il proprio stato. Non aprire mai l'URL dentro un frame: i provider lo rifiutano.

## Express Checkout Component

L'Express Checkout Component è una fila di pulsanti per i metodi di pagamento che chiudono il Payment in un solo gesto. Montalo in un contenitore dedicato, sopra il tuo modulo di checkout, con `Voucherly.initExpress`:

```html
<div id="voucherly-express"></div>
<div id="voucherly-payment"></div>

<script>
    var options = {
        publicKey: "pk_sand_…",
        paymentId: "pay_4vZz3m9kQ1x",
        onPaymentComplete: function (event) { /* … */ },
        onPaymentError: function (event) { /* … */ },
    };

    Voucherly.initExpress(Object.assign({ containerId: "voucherly-express" }, options), {
        paymentMethods: { wallet: "auto", prepaid: "auto" },
    });

    Voucherly.init(Object.assign({ containerId: "voucherly-payment" }, options));
</script>
```

I due componenti condividono lo stesso Payment e la stessa sessione, quindi un pagamento avviato in uno si riflette nell'altro. Apple Pay e Google Pay compaiono solo sui dispositivi e browser che li supportano, e solo se sul tuo account è attivo un gateway con il supporto ai wallet; credito personale e quota prepagata compaiono secondo `paymentMethods`, dove `auto` li mostra solo quando coprono l'intero importo residuo — un pulsante express che lascia al cliente un residuo da pagare tradisce il suo scopo.

## Personalizza l'aspetto

Entrambi i componenti accettano un oggetto `appearance` con i colori, i font e il raggio del tuo sito:

```js
Voucherly.init(options, {
    appearance: {
        variables: {
            colorPrimary: "#0f766e",
            colorText: "#111827",
            borderRadius: "4px",
            fontFamily: "Inter, system-ui, sans-serif",
        },
    },
});
```

L'elenco completo delle variabili e dei loro valori predefiniti è nel [riferimento](./reference.md#aspetto). Per mettere il pulsante di pagamento altrove nella tua pagina, nascondi quello del componente con `showSubmitButton: false` e chiama `Voucherly.submit()` dal tuo pulsante.

## Content Security Policy

Se il tuo sito invia un header `Content-Security-Policy`, consenti Voucherly.js e il suo iframe:

```text
script-src https://checkout.voucherly.it;
frame-src https://checkout.voucherly.it;
```

## Testa l'integrazione

Usa la tua chiave `pk_sand_` nella pagina e la tua chiave `sk_sand_` sul server: il Payment viene creato nell'ambiente sandbox e il componente mostra i gateway che hai attivato lì, con le loro credenziali di test. L'ambiente si legge dalla chiave, quindi la stessa pagina funziona in produzione una volta sostituite le chiavi.

Verifica almeno questi casi prima di andare in produzione:

- un pagamento completato dentro il componente, con `onPaymentComplete` che arriva alla tua pagina;
- un pagamento con un metodo a reindirizzamento, con il componente che riprende sulla tua pagina con l'esito;
- un pagamento con buoni pasto che copre parte dell'importo, seguito da un pagamento con carta per il resto;
- la callback S2S ricevuta dal tuo server per ciascuno di essi.

## Vai in produzione

Sostituisci le chiavi sandbox con quelle live, nella pagina e sul server, e segui la [checklist per il go-live](/guide/inizia-a-integrare/inizia-a-sviluppare/checklist-go-live).

:::info support

- Scrivi a support@voucherly.it.
- Invia una richiesta di supporto su [voucherly.it/contattaci](https://voucherly.it/contattaci).
:::
