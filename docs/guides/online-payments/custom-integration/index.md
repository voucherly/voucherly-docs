---
slug: /guide/pagamenti-online/integrazione-personalizzata
sidebar_position: 3
description: "Costruisci il tuo checkout su Voucherly: elenca i gateway di pagamento del tuo account, lascia che il cliente ne scelga uno sulla tua pagina, poi crea il Payment e reindirizza."
keywords:
  - integrazione di pagamento personalizzata
  - API gateway di pagamento
  - selectedPaymentGateway
  - metodi di pagamento del cliente
  - API Voucherly
---

import GatewayFlowContent from './../../_partial/gateway_flow_content.md';

# Integrazione personalizzata

Mostra i gateway di pagamento del tuo account sulla tua pagina — ognuno con il suo pulsante, invece di un generico *Paga con Voucherly* — e manda il cliente direttamente a quello che ha scelto.

:::info Altri modi per accettare pagamenti online
Se preferisci non costruire il selettore, il [checkout ospitato](/guide/pagamenti-online/checkout-ospitato) offre tutti i gateway su una pagina ospitata da Voucherly, e i [Voucherly Components](/guide/pagamenti-online/components) mostrano l'intero modulo di pagamento dentro la tua pagina. Consulta [Pagamenti online](/guide/pagamenti-online) per confrontarli.
:::

## Guida rapida

![Flusso di preparazione del checkout ospitato con gateway](./gateway_hosted_checkout.svg)

<GatewayFlowContent />

### 1. Crea un Payment per il gateway selezionato

Al clic, specifica il gateway di pagamento selezionato tramite il parametro `selectedPaymentGateway` oppure il metodo di pagamento del cliente tramite il parametro `customerPaymentMethodId`.

**Esempio di richiesta**

```json
{
    "mode": "Payment",
    "selectedPaymentGateway": "GATEWAY", // oppure customerPaymentMethodId
    "customerPaymentMethodId": "my-customer-method-1", // oppure selectedPaymentGateway
    "customerId": "my-customer-id-1",
    "customerEmail": "mario.rossi@voucherly.it",
    "customerFirstName": "Mario",
    "customerLastName": "Rossi",
    "redirectOkUrl": "https://{{redirect_host}}/payment/success",
    "redirectKoUrl": "https://{{redirect_host}}/payment/error",
    "callbackUrl": "https://{{s2s_host}}/webhook/payment",
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

Dopo aver creato un Payment, reindirizza il cliente al `checkoutUrl` restituito nella risposta: Voucherly apre direttamente il gateway selezionato, senza mostrare la propria pagina di scelta.

### 2. Gestisci la callback e il rientro

Da qui in poi il flusso è quello del checkout ospitato: gestisci la [callback S2S](/guide/pagamenti-online/checkout-ospitato#2-gestisci-la-callback-s2s-prima-del-reindirizzamento) e [mostra una pagina di successo](/guide/pagamenti-online/checkout-ospitato#3-mostra-una-pagina-di-successo).

:::tip Metodi di pagamento salvati
Per permettere a un cliente che torna di pagare con un metodo salvato in un clic, leggi [Gestione clienti](/api/generale/best-practice/gestione-clienti).
:::
