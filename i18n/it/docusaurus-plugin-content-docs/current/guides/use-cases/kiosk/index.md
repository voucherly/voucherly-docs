---
slug: /guide/casi-duso/chiosco
sidebar_position: 2
description: "Elabora i pagamenti sui chioschi self-service con Voucherly: mostra l'URL di checkout come QR code e usa il long polling per rilevare il completamento."
keywords:
  - pagamenti chiosco
  - chiosco self-service
  - pagamento QR code
  - Voucherly Checkout
  - long polling
  - Get Payment API
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Accordion from '@site/src/components/Accordion';
import PrefillCustomerTitle from './../_partial/prefill_customer_title.md';
import PrefillCustomerContent from './../_partial/prefill_customer_content.md';
import GatewayFlowContent from './../_partial/gateway_flow_content.md';
import CreatePaymentContent from './../_partial/create_payment_content.md';
import RedirectUrlContent from './../_partial/redirect_url_content.md';

# Kiosk

Usa l'integrazione Kiosk di Voucherly per elaborare i pagamenti direttamente tramite chioschi self-service.

:::warning Requisiti hardware
Il chiosco deve disporre di:
- Una connessione a internet.
- Un display rivolto verso l'utente.
:::


## Guida rapida

Vediamo un semplice esempio di integrazione del flusso di pagamento per un chiosco.

:::info
Questa integrazione è progettata per generare dinamicamente un QR code, consentendo agli utenti di scansionarlo facilmente con i propri dispositivi mobili e completare il processo di pagamento senza intoppi.
:::

### 1. Mostra il QR code

Puoi utilizzare Voucherly come intermediario per gestire tutti i tuoi pagamenti oppure integrarlo come metodo di pagamento aggiuntivo insieme a quelli esistenti.

Aggiungi un pulsante di checkout al tuo chiosco e crea un pagamento in Voucherly.

![Flusso Kiosk](./kiosk.svg)

<CreatePaymentContent />

**Esempio di richiesta**

```json
{
    "mode": "Payment",
    "customerEmail": "mario.rossi@voucherly.it",
    "customerFirstName": "Mario",
    "customerLastName": "Rossi",
    "redirectOkUrl": "https://{{redirect_host}}/payment/success",
    "redirectKoUrl": "https://{{redirect_host}}/payment/error",
    "country": "IT",
    "lines": [
        {
            "quantity": 2,
            "unitAmount": 250,
            "unitDiscountAmount": 10,
            "discountAmount": 0,
            "product": {
                "externalId": "SKU-MUFFIN-001",
                "name": "Muffin al Cioccolato",
                "image": "https://cdn.trovaricetta.com/photo/2016/10/07/1771032/b/muffin-al-cioccolato-facilissimi.jpg",
                "isFood": true
            }
        }
    ],
    "discounts": [
        {
            "discountName": "Coupon",
            "discountDescription": "",
            "amount": 200
        }
    ]
}
```

Dopo aver creato il pagamento, mostra il `checkoutUrl` restituito nella risposta come QR code sullo schermo del chiosco.
I clienti possono scansionare il QR code con i propri dispositivi mobili per accedere alla pagina di pagamento e completare la transazione.

:::tip
Puoi utilizzare una libreria come [qrcode.js](https://davidshimjs.github.io/qrcodejs/) o un generatore di QR code lato server per creare e mostrare il QR code.
:::

**Esempio di risposta**

```json
{
    "id": "my-payment-id-1",
    "tenant": "live",
    "mode": "Payment",
    "customerId": "my-customer-id-1",
    [...]
    "checkoutUrl": "https://example.voucherly.it/checkout",
    "status": "Requested",
    [...]
}
```



### 2. Attendi il completamento del pagamento

Poiché il chiosco non consente connessioni internet in ingresso, il meccanismo [Callback S2S](/api/generale/best-practice/s2s/) potrebbe non essere pratico. 
In alternativa, puoi utilizzare la [Get Payment API](/api/webapi/retrieve-payment/) con l'header `Voucherly-Wait-Time` per il long polling.

Se il chiosco è offline ma comunica tramite un server, è consigliabile utilizzare il meccanismo [Callback S2S](/api/generale/best-practice/s2s/). Il long polling rimane un approccio valido per aggiornare l'interfaccia del chiosco.

 Una volta chiuso il pagamento, è necessario gestire eventuali operazioni aggiuntive:
- Stampare le ricevute.
- Aggiornare i database locali.
- Abilitare l'hardware (ad es. aprire un locker).

:::tip
Un pagamento non deve essere considerato chiuso se il suo stato è `REQUESTED`.\
Consulta [Come funzionano i pagamenti](/guide/risorse/ciclo-di-vita-dei-pagamenti/#payment-statuses) per maggiori informazioni sugli stati dei pagamenti.
:::

:::warning
Dopo 10 minuti, è consigliabile interrompere il processo e considerare il pagamento annullato. Continuare all'infinito può comportare un utilizzo inutile di risorse e ritardi nella gestione della transazione.
:::



### 3. Mostra una pagina di successo

#### Dispositivo mobile 

<RedirectUrlContent />

#### Chiosco

Dopo che il cliente ha completato il pagamento sulla pagina di Voucherly Checkout, può chiudere il proprio dispositivo mobile e proseguire senza interruzioni l'esperienza d'ordine direttamente al chiosco.

Sei libero di gestire questa fase in autonomia, in linea con le best practice della tua azienda.


## Passi successivi

<Accordion>
    <PrefillCustomerTitle />
    <PrefillCustomerContent />
</Accordion>

<Accordion>
    <>
        ### Mostra i gateway di pagamento
    </>
    <>
        :::info
        Consulta il [caso d'uso Pagamento online](/guide/casi-duso/e-commerce?flow=gateway) per un esempio completo.
        :::
        <GatewayFlowContent />
    </>
</Accordion>
