---
slug: /guide/integrazioni/api
description: "Guida passo-passo per integrare la tua piattaforma con le API REST di Voucherly: crea pagamenti, consulta i log delle richieste e gestisci le API key."
keywords:
  - API Voucherly
  - integrazione API
  - crea pagamento
  - API REST
  - API key
  - modalità test
---

# Integrazione API

Questi passaggi ti mostreranno come integrare con successo la tua piattaforma con le nostre API.

## Prerequisiti
- Leggi **[Come iniziare con un account Voucherly](/guide/introduzione/per-iniziare)**.

Prima di continuare con questo tutorial, verifica se puoi risparmiare tempo di sviluppo con la nostra [collection Postman](/api/postman) o la gamma di [wrapper e SDK](/api/librerie).

## Tutorial

### 1. Scopri come [funzionano le API Voucherly](/api/webapi/voucherly-api)

### 2. Crea un pagamento
Voucherly fornisce un'API RESTful accessibile tramite richieste HTTP per gestire i tuoi dati. L'API supporta dati esclusivamente in formato JSON.

L'elemento centrale della nostra API è il pagamento, che può essere collegato a più transazioni.

1. Inizia testando l'operazione più comune con la nostra API: [Crea un pagamento](/api/webapi/create-payment). 

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

2. Verifica di ricevere una risposta 200 OK.

**Esempio di risposta**

```json
{
    "id": "my-payment-id-1",
    "tenant": "live",
    "mode": "Payment",
    "customerId": "my-customer-id-1",
    "customerEmail": "mario.rossi@voucherly.it",
    "customerFirstName": "Mario",
    "customerLastName": "Rossi",
    "paymentGateways": [],
    "checkoutUrl": "https://example.voucherly.it/checkout",
    "totalAmount": 500,
    "discountAmount": 220,
    "finalAmount": 280,
    "paidAmount": 0,
    "paidVoucherAmount": 0,
    "amount": 280,
    "status": "Requested",
    "lines": [
        {
            "quantity": 2,
            "productName": "Muffin al Cioccolato",
            "productImage": "https://cdn.trovaricetta.com/photo/2016/10/07/1771032/b/muffin-al-cioccolato-facilissimi.jpg",
            "productExternalId1": "SKU-MUFFIN-001",
            "productExternalId2": "EAN-1234567890",
            "unitAmount": 250,
            "unitDiscountAmount": 10,
            "discountAmount": 0,
            "finalAmount": 480,
            "isFood": true
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

3. Apri il `checkoutUrl` per completare il pagamento nella pagina di checkout.

### 3. Visualizza i log

Ogni volta che effettui una chiamata alle API Voucherly, Voucherly crea e memorizza la richiesta API per il tuo account merchant. La API key che specifichi per la richiesta determina se gli oggetti vengono memorizzati in modalità test o live. Per esempio, se l'ultima richiesta ha utilizzato la tua secret key di test, Voucherly ha memorizzato gli oggetti in modalità test.

Per visualizzare il log delle richieste API:

1. Apri la pagina **Sviluppatori > [Log](https://dashboard.voucherly.it/Developer/Log)**.
2. Clicca sulla richiesta specifica `200 OK POST /v1/payments`.

### 4. Conserva le tue API key

Tutti gli account merchant hanno per impostazione predefinita un totale di quattro API key — due per la modalità test e due per la modalità live:

- **Secret key modalità test**. Usa questa chiave per autenticare le richieste sul tuo server in modalità test. Per impostazione predefinita, questa chiave può essere usata per eseguire qualsiasi richiesta API senza restrizioni.
- **Publishable key modalità test**. Usa questa chiave a scopo di test nel codice client-side della tua app web o mobile.
- **Secret key modalità live**. Usa questa chiave per autenticare le richieste sul tuo server in modalità live. Per impostazione predefinita, questa chiave può essere usata per eseguire qualsiasi richiesta API senza restrizioni.
- **Publishable key modalità live**. Usa questa chiave nel codice client-side della tua app web o mobile quando sei pronto a lanciare la tua app.

Puoi trovare le tue secret key e publishable key in **Sviluppatori > [API keys](https://dashboard.voucherly.it/Developer/ApiKey)**.

:::warning Test e sviluppo
Usa solo le tue API key di test per i test e lo sviluppo. Questo garantisce che tu non modifichi accidentalmente i tuoi clienti o addebiti in modalità live.
:::
