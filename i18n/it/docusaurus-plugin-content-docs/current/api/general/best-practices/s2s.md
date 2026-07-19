---
slug: /api/generale/best-practice/s2s
sidebar_position: 4
description: "Implementa il callback server-to-server (S2S) di Voucherly per ricevere gli esiti dei pagamenti in modo affidabile ed evitare perdite."
keywords:
  - callback S2S Voucherly
  - server-to-server
  - webhook
  - notifica pagamento
  - retry callback
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Callback S2S

La comunicazione Server-to-Server (S2S) avviene tra il server di Voucherly e il server del merchant al termine di una fase di checkout per notificare al merchant l'esito del pagamento.

Ti consigliamo di utilizzarla, poiché non farlo potrebbe portare a pagamenti persi o a una gestione errata delle informazioni di pagamento.

## Prerequisiti

Devi impostare un endpoint webhook, ovvero un URL che:
- Non include numeri di porta.
- È accessibile pubblicamente, oppure includa Voucherly nella tua allow list.
- Utilizza HTTPS. Non accettiamo HTTP per motivi di sicurezza.

## Guida allo sviluppo

### 1. Configura il tuo endpoint

L'URL dell'endpoint del merchant deve essere specificato durante la creazione del pagamento tramite la [Create Payment API](/api/webapi/create-payment).

Quando il cliente lascia la pagina di Checkout di Voucherly dopo un pagamento andato a buon fine, Voucherly tenta di contattare il server del merchant prima di reindirizzare il cliente al sito web del merchant.

I merchant devono configurare un endpoint che accetti una richiesta POST con un body JSON contenente un sottoinsieme delle proprietà del pagamento.

:::info
Voucherly garantisce che il callback venga consegnato in modo sincrono. Puoi fare affidamento su questo meccanismo con fiducia.
Se il tuo server incontra un errore durante la gestione del callback, Voucherly annullerà e rimborserà automaticamente il pagamento per evitare incongruenze.
:::

### 2. Gestisci i callback

#### Richiesta

- **Id** *(string)*  
  Identificatore univoco del pagamento.  
- **Tenant** *(string)*  
  Indica l'ambiente: *live* o *sand*.  
- **Mode** *(string)*  
  La modalità del pagamento: `Payment` o `Wallet`.  
- **ReferenceId** *(string)*  
  Una stringa univoca per riferirsi al pagamento (ad es. ID cliente, ID carrello) per la riconciliazione con i sistemi interni.  
- **MerchantId** *(string)*  
  L'identificatore del merchant.  
- **CustomerId** *(string)*  
  L'ID del cliente per questo pagamento.  
- **TotalAmount** *(long)*  
  L'importo totale prima degli sconti.  
- **DiscountAmount** *(long)*  
  L'importo scontato.  
- **FinalAmount** *(long)*  
  L'importo finale, calcolato come `TotalAmount` - `DiscountAmount`.  
- **PaidAmount** *(long)*  
  L'importo effettivamente pagato.  
- **PaidVoucherAmount** *(long)*  
  La porzione del pagamento pagata utilizzando i buoni.  
- **Amount** *(long)*  
  L'importo netto di questo pagamento.  
- **Status** *(string)*  
  Lo stato attuale del pagamento: `Requested`, `Paid`, `Confirmed`, `Refunded`, `Cancelled`, `Voided` o `Expired`.  

Di seguito un esempio del body della richiesta S2S inviata da Voucherly.

```json
{
    "id": "pay_7orq17rP3Kx",
    "tenant": "sand",
    "mode": "Payment",
    "referenceId": "eb8f57f8-241b-4142-b7b0-d308d724541a",
    "merchantId": "7C9E6679-7425-40DE-944B-E07FC1F90AE7",
    "customerId": "cs_XR6jxrbJAqM",
    "totalAmount": 750,
    "discountAmount": 50,
    "finalAmount": 700,
    "paidAmount": 700,
    "paidVoucherAmount": 0,
    "amount": 700,
    "status": "Paid"
}
```
:::warning
Poiché l'endpoint S2S del merchant non richiede alcuna configurazione di autenticazione, è consigliabile chiamare la [Get Payment API](/api/webapi/retrieve-payment) per verificare che la richiesta provenga da Voucherly. Questa API fornisce tutte le informazioni necessarie sul pagamento.
:::

#### Risposta
Il server del merchant deve rispondere con un codice di stato HTTP `200 OK` e un body JSON nel seguente formato:

- **Ok** *(bool)*  
  Indica se la richiesta S2S è stata elaborata con successo dal server del merchant.
- **OrderId** *(string?)*  
  L'identificatore univoco dell'ordine nel sistema del merchant.
- **Stop** *(bool?)*  
  Se `true`, Voucherly non effettuerà ulteriori tentativi di chiamare l'endpoint di callback, indipendentemente dallo stato della risposta o dal campo `Ok`. 
- **error** *(string?)*  
  Messaggio di errore del merchant. Utile solo a scopo di indagine. 

```json
{
    "ok": true,
    "orderId": "<order_id>"
}
```

Finché non riceviamo una risposta attesa, reinviamo la notifica fino a 3 volte.

:::warning
Se il problema persiste, il pagamento verrà annullato e tutte le transazioni verranno rimborsate.
:::

Se l'errore è *gestito* e non sei interessato a un nuovo tentativo, puoi specificare `stop` come `true`.

```json
{
    "ok": false,
    "stop": true,
    "error": "An error occurred and I'm not interested in a retry"
}
```

### Callback multipli e pagamenti Wallet

I callback vengono inviati ogni volta che un utente completa con successo un flusso di checkout. In determinati scenari possono verificarsi più callback.

Ad esempio, se il pagamento avviato dal merchant è in modalità **Payment** e il cliente decide di ricaricare il proprio wallet durante il processo, Voucherly gestisce questa ricarica del wallet come un pagamento separato. Questo pagamento separato è collegato al pagamento originale avviato dal merchant tramite la proprietà `ParentPaymentId` e gli viene assegnata la modalità **Wallet**.

Per maggiori dettagli, consulta il caso d'uso [Ricarica Wallet](/guide/casi-duso/ricarica-wallet).

:::warning
Voucherly si riserva il diritto di chiamare l'endpoint di callback in futuro per ogni aggiornamento dello stato del pagamento. Assicurati che il tuo endpoint sia robusto e in grado di gestire senza problemi più tentativi di callback.
:::

### Callback e pagamenti diretti

Quando lavori con i **pagamenti diretti**, come quelli avviati specificando  `customerPaymentMethodId` o `selectedPaymentGateway` nella richiesta della [Create Payment API](/api/webapi/create-payment), puoi sempre fare affidamento sul callback server-to-server (S2S) per attivare la tua logica di elaborazione interna.

È fondamentale comprendere che uno stato `Confirmed` o `Paid` non garantisce invariabilmente l'elaborazione riuscita del callback da parte del tuo sistema. Negli scenari in cui il callback non viene elaborato con successo, nonostante il pagamento sia tecnicamente confermato, **Voucherly rileverà automaticamente l'errore e avvierà un rimborso poco dopo**. Per identificare questi casi, devi ispezionare la proprietà `closeCheckout.success` nella risposta dell'API. Un valore `false` per questa proprietà indica un fallimento del callback.

Ecco un esempio di un caso simile: un pagamento contrassegnato come `Confirmed` ma il cui callback è fallito:

```json
{
    "id": "my-payment-id-1",
    "tenant": "live",
    "mode": "Payment",
    "customerId": "my-customer-id-1",
    [...]
    "checkoutUrl": "https://example.voucherly.it/checkout",
    "callbackUrl": "https://api.myecommerce.com/webhook/payment",
    "closeCheckout": {
        "success": false,
        "date": "2025-01-01T10:00:00.0000000+02:00",
        "errorReason": "Payment.Callback"
    },
    "callback": {
        "success": false,
        "date": "2025-01-01T10:00:00.0000000+02:00"
    },
    "status": "Confirmed",
    [...]
}
```

:::warning
Il campo `status` da solo non è sufficiente a determinare l'esito finale di un pagamento diretto. Controlla sempre `closeCheckout.success` per assicurarti che il callback sia stato elaborato correttamente dal tuo sistema.
:::


## Perché? Perdita di pagamenti! {#why}

Come detto in precedenza, ogni pagamento dovrebbe essere gestito tramite callback.
Se il callback non viene gestito correttamente, può portare a potenziali perdite di pagamenti, specialmente negli e-commerce.

Affidarsi esclusivamente al reindirizzamento di Voucherly verso il tuo sito web per la conferma del pagamento non è consigliato.

Per illustrarlo ulteriormente, considera il seguente scenario:

1. Durante il processo di checkout, l'utente sceglie Voucherly come metodo di pagamento.
1. L'utente viene reindirizzato alla pagina di Checkout di Voucherly ed effettua il pagamento.
1. L'utente chiude il browser prima di essere reindirizzato al sito web del merchant.
1. In questo scenario, mentre Voucherly elabora effettivamente la transazione, la mancata gestione appropriata dei callback lato e-commerce può portare alla generazione errata di un ordine.


