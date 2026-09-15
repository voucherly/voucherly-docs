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

I Voucherly Components ti permettono di accettare pagamenti **dentro la tua pagina di checkout**, senza mandare il cliente sul Voucherly Checkout. Aggiungi una piccola libreria JavaScript, Voucherly.js, e monti un componente (component) in un contenitore della tua pagina: Voucherly ci disegna il modulo di pagamento, con tutti i metodi di pagamento attivi sul tuo account — carte, buoni pasto, Apple Pay, Google Pay, credito personale e quota prepagata — e, a pagamento concluso, porta il cliente sulla tua pagina di esito.

:::info Cerchi il checkout ospitato?
Se preferisci reindirizzare il cliente a una pagina ospitata da Voucherly, segui [Checkout ospitato](/guide/pagamenti-online/checkout-ospitato). La parte lato server è la stessa: entrambe partono dalla creazione di un Payment.
:::

Sono disponibili due componenti:

- **Payment Component** — il modulo di pagamento completo: una fisarmonica con i metodi di pagamento disponibili, i flussi dei buoni pasto, i metodi di pagamento salvati e il pulsante di pagamento. Viene mostrato dentro la tua pagina, oppure in una finestra popup sopra di essa.
- **Express Checkout Component** — una fila di pulsanti a un tocco (Apple Pay, Google Pay, credito personale, quota prepagata) da mettere sopra il tuo modulo, per i clienti che vogliono pagare in un gesto.

Al termine di questa guida saprai come:

- Creare un Payment sul tuo server e mostrarlo nella tua pagina
- Portare il cliente sulla tua pagina di esito, oppure gestire l'esito senza lasciare la tua pagina
- Supportare i metodi di pagamento che reindirizzano il cliente a un provider
- Scegliere tra il componente inline e il popup
- Personalizzare l'aspetto dei componenti per adattarli al tuo sito

## Come funziona

1. **Il tuo server crea un Payment** con l'API [Create a Payment](/api/webapi/create-payment) e la tua secret key (chiave segreta), esattamente come per il checkout ospitato, e passa l'id del Payment alla tua pagina.
2. **La tua pagina carica Voucherly.js** e monta un componente con la tua publishable key (chiave pubblicabile) e l'id del Payment. Il componente gira in un iframe servito da `checkout.voucherly.it`, oppure in una finestra popup sul checkout Voucherly: i dati di pagamento del cliente vengono raccolti lì e non raggiungono mai la tua pagina.
3. **Il cliente paga.** Carte, buoni pasto e wallet vengono gestiti dentro il componente. I metodi di pagamento che richiedono la pagina del provider, come PayPal o Satispay, navigano l'intera pagina e riportano il cliente sulla tua — oppure, in un popup, restano dentro il popup.
4. **Il cliente arriva sulla tua pagina di esito.** Quando il Payment si chiude, Voucherly.js manda la tua pagina sul `redirectOkUrl` o sul `redirectKoUrl` del Payment, come fa il checkout ospitato. Se la tua pagina deve restare dov'è, `redirect: "if_required"` consegna invece l'esito alle tue callback.
5. **Voucherly avvisa il tuo server** attraverso la callback S2S e l'API. Il tuo server è la fonte di verità per evadere l'ordine.

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

`redirectOkUrl` e `redirectKoUrl` sono le tue pagine di esito: quando il Payment si chiude, Voucherly.js manda il cliente sulla prima se il Payment è stato pagato e sulla seconda altrimenti. Sono gli stessi URL che usa il checkout ospitato, con la stessa query string.

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

Aggiungi un contenitore alla tua pagina e chiama `Voucherly.init` con la tua publishable key e l'id del Payment.

```html
<div id="voucherly-payment"></div>

<script>
    Voucherly.init({
        publicKey: "pk_sand_…",
        paymentId: "pay_4vZz3m9kQ1x",
        containerId: "voucherly-payment",
    });
</script>
```

Alla pagina non serve altro: il componente mostra i metodi di pagamento, segnala al cliente i tentativi falliti e, quando il Payment si chiude, Voucherly.js porta il cliente sul tuo `redirectOkUrl` o `redirectKoUrl`.

Il componente si dimensiona sul suo contenuto e cresce o si riduce mentre il cliente si muove nel modulo: dai al contenitore la larghezza che vuoi e lascia l'altezza al componente.

### 4. Gestisci l'esito

Quando il Payment si chiude, Voucherly.js manda la tua pagina sulla pagina di esito del Payment:

- il `redirectOkUrl` quando il Payment è stato pagato;
- il `redirectKoUrl` quando è stato chiuso senza successo, per esempio perché è scaduto o il cliente lo ha annullato.

L'esito viaggia nella query string, con gli stessi parametri del [checkout ospitato](/guide/pagamenti-online/checkout-ospitato#3-mostra-una-pagina-di-successo): `success` (`OK` o `KO`), `status`, `paymentId`, `referenceId`, `amount`, `customerId` e `tenant`. La tua pagina di esito legge `paymentId`, controlla il Payment dal tuo server e mostra al cliente cosa è successo.

:::warning Conferma il pagamento dal tuo server
La query string e le callback dicono alla tua pagina cosa ha visto il cliente, non cosa hanno registrato i tuoi sistemi, e chiunque può digitare un URL con `success=OK`. Prima di evadere l'ordine, controlla lo stato del Payment con [Retrieve a Payment](/api/webapi/retrieve-payment) o aspetta la [callback S2S](/api/generale/best-practice/s2s) sul `callbackUrl` che hai passato alla creazione. Un browser può essere chiuso, uno script manomesso, una callback persa: lo stato lato server è l'unico di cui fidarsi.
:::

Finché il Payment è ancora aperto, il componente continua a informare la tua pagina con le callback, qualunque cosa succeda alla fine:

| Callback | Quando | Cosa fare |
| --- | --- | --- |
| `onPaymentPartialComplete` | Una transazione è stata pagata ma resta un importo, tipicamente dopo i buoni pasto. | Niente: il componente si ricarica e chiede l'importo residuo. Aggiorna i tuoi totali se li mostri. |
| `onPaymentError` | Una transazione è fallita, o il componente non è stato mostrato. | Niente per una transazione fallita: il componente mostra il messaggio e il cliente può riprovare. Un `code` è un errore di integrazione da correggere. |

Un Payment già chiuso quando monti il componente — il cliente ricarica il checkout dopo aver pagato, o ci torna — non viene mai reindirizzato: scatta invece `onPaymentComplete` o `onPaymentError`. Così la pagina che monta il componente può essere anche la tua pagina di esito, senza far girare il cliente in tondo.

#### Resta sulla tua pagina: `redirect: "if_required"`

Se la tua pagina non deve essere lasciata alla fine del pagamento — per esempio una single-page application che mostra la propria conferma — passa `redirect: "if_required"`. La pagina resta dov'è, e l'esito arriva alle tue callback:

```js
Voucherly.init({
    publicKey: "pk_sand_…",
    paymentId: "pay_4vZz3m9kQ1x",
    containerId: "voucherly-payment",
    redirect: "if_required",
    onPaymentComplete: function (event) {
        // Il cliente ha pagato: conferma l'esito dal tuo server, poi mostra la tua conferma.
    },
    onPaymentError: function (event) {
        // Con success: false il Payment è stato chiuso senza successo; altrimenti una transazione è fallita e il cliente può riprovare.
    },
});
```

| Callback | Quando | Cosa fare |
| --- | --- | --- |
| `onPaymentComplete` | Il Payment è interamente pagato. | Conferma dal tuo server, poi fai proseguire il cliente. |
| `onPaymentError` con `success: false` | Il Payment è stato chiuso senza successo. | Mostra un messaggio, e crea un nuovo Payment se il cliente vuole riprovare. |

La tua pagina viene comunque lasciata quando un metodo di pagamento lo richiede: inline, un metodo con reindirizzamento naviga la pagina verso il provider e ritorno. L'`event` di `onPaymentComplete` contiene il `paymentId`, l'`amount` pagato in centesimi e lo `status` del Payment. Il payload completo di ogni callback, e cosa cambia con `redirect`, sono nel [riferimento](./reference.md#reindirizzamento-dopo-il-pagamento).

#### `Paid` o `Confirmed`: cosa trovi dopo il pagamento

Un Payment passa da `Requested` a `Paid` quando il cliente completa il checkout, e a `Confirmed` quando i fondi vengono catturati — il [ciclo di vita dei pagamenti](/guide/informazioni/risorse/ciclo-di-vita-dei-pagamenti) descrive ogni stato. Quale dei due trovi sulla tua pagina di esito, o dopo `onPaymentComplete`, dipende dal metodo di pagamento e dal Payment:

- Buoni pasto, credito personale, quota prepagata e alcuni provider — tra cui Satispay, SumUp e Adyen — catturano al checkout: il Payment arriva direttamente in `Confirmed`.
- Carte, PayPal e gli altri provider a due fasi si limitano ad autorizzare: il Payment resta `Paid` finché non chiami [Confirm a Payment](/api/webapi/confirm-payment), o finché l'autorizzazione non scade e i fondi vengono rilasciati.
- Con `isAutoConfirm: true` in [Create a Payment](/api/webapi/create-payment), Voucherly conferma ogni transazione appena il cliente paga, e il Payment è `Confirmed` qualunque sia il metodo. Senza, vale il default impostato in **Impostazioni > Pagamenti > Gateway di pagamento > Contabilizzazione automatica**.

Non scrivere codice che ragiona per provider: leggi lo `status` dal tuo server e, se è `Paid`, confermalo — oppure crea il Payment con `isAutoConfirm: true` se non hai nulla da verificare tra l'autorizzazione e la cattura. Un Payment lasciato in `Paid` è denaro che non hai incassato.

### 5. Metodi di pagamento con reindirizzamento

Alcuni metodi di pagamento — PayPal, Satispay, Scalapay, Klarna, i buoni pasto con il login dell'emittente come Edenred e Pluxee — richiedono la pagina del provider. Quando il cliente ne sceglie uno nel componente inline, Voucherly.js naviga **l'intera pagina**, non l'iframe, verso il provider; quando il cliente ha finito, il provider lo rimanda all'URL della tua pagina, con alcuni parametri di query che Voucherly.js consuma e rimuove dalla barra degli indirizzi. In [modalità popup](#inline-o-popup) tutto questo non succede: la pagina del provider si apre dentro il popup, e la tua pagina non viene mai lasciata.

Perché il giro funzioni inline, la tua pagina deve poter mostrare di nuovo il componente dopo un ricaricamento:

- **Mantieni recuperabile l'id del Payment** — nella sessione del tuo server, o in un tuo parametro di query: Voucherly.js conserva i tuoi parametri e rimuove solo i propri. Quando la pagina si ricarica, chiama `Voucherly.init` con lo stesso `paymentId`: il componente riprende da dove il cliente era rimasto e `onReady` riceve `resumed: true`. Se il Payment si è chiuso presso il provider, Voucherly.js porta poi il cliente sulla tua pagina di esito — oppure, con `redirect: "if_required"`, fa scattare `onPaymentComplete` o `onPaymentError`.
- **Se il cliente deve tornare su una pagina diversa**, passala come `returnUrl`. Deve essere un URL `https` assoluto del tuo sito, e anche quella pagina deve montare il componente. `returnUrl` è la pagina su cui il cliente riprende a pagare, non la tua pagina di esito: quella è sempre il `redirectOkUrl` o il `redirectKoUrl` del Payment.
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
    };

    Voucherly.initExpress(Object.assign({ containerId: "voucherly-express" }, options), {
        paymentMethods: { wallet: "auto", prepaid: "auto" },
    });

    Voucherly.init(Object.assign({ containerId: "voucherly-payment" }, options));
</script>
```

I due componenti condividono lo stesso Payment e la stessa sessione, quindi un pagamento avviato in uno si riflette nell'altro, e l'esito viene gestito una volta sola, qualunque componente chiuda il Payment: passa a entrambi lo stesso `redirect` e le stesse callback, come fanno le `options` condivise qui sopra. Apple Pay e Google Pay compaiono solo sui dispositivi e browser che possono pagarci, e solo se sul tuo account è attivo un gateway con il supporto ai wallet; credito personale e quota prepagata compaiono secondo `paymentMethods`, dove `auto` li mostra solo quando coprono l'intero importo residuo — un pulsante express che lascia al cliente un residuo da pagare tradisce il suo scopo.

Finché l'Express Checkout Component è montato, il Payment Component nasconde ciò che la riga express mostra già: le proprie righe Apple Pay e Google Pay, e credito personale e quota prepagata quando la riga express li mostra. Ogni metodo viene offerto una volta sola e il form tiene il resto — con `paymentMethods.prepaid: "auto"`, una quota prepagata che non copre l'importo residuo resta fuori dalla riga express e rimane nel form. Non serve impostare nulla sul Payment Component per ottenerlo.

## Inline o popup

Di default il Payment Component viene mostrato inline, dentro la tua pagina, in un iframe. Può anche aprirsi in una **finestra popup** sopra la tua pagina: la tua pagina mostra solo il proprio pulsante di pagamento, e il cliente paga nella pagina di checkout Voucherly.

```html
<button id="pay-button">Paga</button>

<script>
    Voucherly.init({
        displayMode: "popup",
        publicKey: "pk_sand_…",
        paymentId: "pay_4vZz3m9kQ1x",
        onPopupClosed: function () {
            // La finestra non c'è più, non necessariamente il pagamento: lascia disponibile il pulsante di pagamento.
        },
    });

    document.getElementById("pay-button").addEventListener("click", function () {
        Voucherly.submit();
    });
</script>
```

`Voucherly.submit()` apre il popup, quindi deve essere eseguito direttamente nel gestore del click del tuo pulsante: i browser bloccano un popup aperto fuori da un gesto dell'utente, e in quel caso `onPaymentError` riceve `popup_blocked`. Finché il popup è aperto, Voucherly.js oscura la tua pagina con un pulsante per riportare il popup in primo piano; passa `overlay: false` per gestirlo tu.

Quando il Payment si chiude — il cliente ha pagato, o ha annullato dal popup — il popup si chiude da solo e la tua pagina va sul `redirectOkUrl` o sul `redirectKoUrl` del Payment, esattamente come inline. L'overlay resta finché il popup non c'è più, così la tua pagina non si scopre mai con il popup ancora sopra. Con `redirect: "if_required"` la tua pagina resta, e scattano invece le callback.

| | Inline | Popup |
| --- | --- | --- |
| Dove paga il cliente | Dentro la tua pagina | In una finestra Voucherly sopra la tua pagina |
| Aspetto | Personalizzabile con `appearance` | La pagina di checkout Voucherly |
| Metodi con reindirizzamento | Navigano l'intera pagina e tornano su di essa | Restano dentro il popup: la tua pagina non si ricarica mai |
| Quando il Payment si chiude | Il cliente va sulla tua pagina di esito, o scattano le callback con `if_required` | Il popup si chiude, poi come inline |
| Cosa deve gestire la tua pagina | Montare di nuovo il componente dopo un reindirizzamento | Lasciare disponibile il pulsante di pagamento se il popup viene chiuso |
| Mobile | Dentro la tua pagina | Si apre come una nuova scheda |

Scegli il popup quando la tua pagina non può ricaricarsi a metà di un pagamento — una single-page application con il carrello in memoria, un flusso difficile da riprendere — o quando non vuoi ospitare il modulo. Scegli l'iframe quando il modulo deve far parte della tua pagina.

`redirect` e le callback funzionano allo stesso modo nelle due modalità, tranne `onReady`, `onResize` e `onRedirect`, che il popup non chiama. **Chiudere il popup non annulla il pagamento**: `onPopupClosed` ti dice che la finestra non c'è più, ma il cliente potrebbe aver già pagato, e l'esito — il reindirizzamento o le callback — può ancora arrivare. L'Express Checkout Component viene sempre mostrato dentro la tua pagina, e può stare accanto a un Payment Component in modalità popup. I dettagli sono nel [riferimento](./reference.md#modalità-popup).

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
connect-src https://checkout.voucherly.it;
```

`connect-src` serve in modalità popup, dove Voucherly.js legge lo stato del Payment da `checkout.voucherly.it` finché il popup è aperto.

## Testa l'integrazione

Usa la tua chiave `pk_sand_` nella pagina e la tua chiave `sk_sand_` sul server: il Payment viene creato nell'ambiente sandbox e il componente mostra i gateway che hai attivato lì, con le loro credenziali di test. L'ambiente si legge dalla chiave, quindi la stessa pagina funziona in produzione una volta sostituite le chiavi. I codici dei buoni pasto Demo Voucherly e le carte di test sono in [Dati di test](/guide/inizia-a-integrare/inizia-a-sviluppare/dati-di-test).

Verifica almeno questi casi prima di andare in produzione:

- un pagamento completato dentro il componente, con il cliente che arriva sul tuo `redirectOkUrl`, dove il tuo server trova il Payment `Paid` o `Confirmed`;
- un pagamento con un metodo a reindirizzamento, con il componente che riprende sulla tua pagina prima che il cliente arrivi sulla tua pagina di esito;
- un pagamento con buoni pasto che copre parte dell'importo, seguito da un pagamento con carta per il resto;
- in modalità popup, un metodo con reindirizzamento completato dentro il popup, un pagamento annullato dal popup con il cliente che arriva sul tuo `redirectKoUrl`, e un popup chiuso prima di pagare e riaperto;
- con `redirect: "if_required"`, `onPaymentComplete` e `onPaymentError` che arrivano alla tua pagina al posto del reindirizzamento;
- la callback S2S ricevuta dal tuo server per ciascuno di essi.

## Vai in produzione

Sostituisci le chiavi sandbox con quelle live, nella pagina e sul server, e segui la [checklist per il go-live](/guide/inizia-a-integrare/inizia-a-sviluppare/checklist-go-live).

:::info support

- Scrivi a support@voucherly.it.
- Invia una richiesta di supporto su [voucherly.it/contattaci](https://voucherly.it/contattaci).
:::
