---
slug: /api/generale/best-practice/gestione-clienti
sidebar_position: 5
description: "Gestisci i clienti registrati con Voucherly per ottimizzare il checkout, riutilizzare i metodi di pagamento salvati e semplificare la riconciliazione."
keywords:
  - gestione clienti Voucherly
  - customerId
  - metodi di pagamento salvati
  - checkout
  - riconciliazione
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Accordion from '@site/src/components/Accordion';

# Gestione dei clienti

Una corretta gestione dei clienti non è solo una best practice tecnica, ma è anche essenziale per migliorare l'esperienza utente, semplificare le operazioni e favorire il successo del business.

Questa guida spiega come e perché utilizzare i clienti registrati con Voucherly.

## Guida allo sviluppo

### 1. Prepara la richiesta



<Tabs groupId="payment" queryString>
<TabItem value="first" label="Primo pagamento">

Quando crei un pagamento, includi i dettagli del cliente.

**Esempio di richiesta**

```json
{
    "mode": "Payment",
    [...]
    "customerEmail": "mario.rossi@voucherly.it",
    "customerFirstName": "Mario",
    "customerLastName": "Rossi",
    [...]
}
```

</TabItem>

<TabItem value="next" label="Pagamento successivo">

Prima di creare un pagamento, recupera il `customerId` di Voucherly. Poi includilo nel payload della richiesta per garantire una corretta elaborazione.

**Esempio di richiesta**

```json
{
    "mode": "Payment",
    [...]
    "customerId": "my-customer-id-1",
    [...]
}
```

Puoi anche passare i dettagli del cliente per aggiornarli.

**Esempio di richiesta**

```json
{
    "mode": "Payment",
    [...]
    "customerId": "my-customer-id-1",
    "customerEmail": "mario.rossi@voucherly.it",
    "customerFirstName": "Mario Luigi",
    "customerLastName": "Rossi",
    [...]
}
```


</TabItem>
</Tabs>

### 2. Gestisci la risposta

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

<Tabs groupId="payment" queryString>
<TabItem value="first" label="Primo pagamento">

Se non hai fornito un `customerId` nella richiesta iniziale, dovresti:
- Estrarre il `customerId` dalla risposta.
- Salvarlo nel tuo database.
- Includerlo nelle richieste successive per lo stesso cliente.

</TabItem>

<TabItem value="next" label="Pagamento successivo">

Poiché hai fornito un `customerId` nella richiesta iniziale, il pagamento farà automaticamente riferimento al Customer esistente corrispondente.

Non è richiesta alcuna ulteriore azione da parte tua.


</TabItem>
</Tabs>

<Accordion>
    <>
        ### Recupera i metodi di pagamento del cliente
    </>
    <>
        
        Utilizza la `GET Customer Payment Methods API` per recuperare i metodi di pagamento salvati di un cliente. Questa funzionalità può essere utilizzata per:
        - Mostrare i metodi di pagamento salvati nella pagina del profilo del cliente.
        - Ridurre i tempi di checkout e aumentare i tassi di conversione offrendo accesso diretto ai metodi di pagamento preferiti del cliente.


        Il Checkout di Voucherly mostra automaticamente tutti i metodi di pagamento salvati dell'utente. Non è quindi necessario mostrarli in anticipo, poiché il processo di checkout garantisce già un'esperienza utente fluida ed efficiente.

        Se utilizzi un'integrazione personalizzata, consulta il [caso d'uso Pagamento online](/guide/casi-duso/e-commerce/?flow=gateway) per un esempio completo.

        #### Flusso di integrazione personalizzata

        - Recupera i metodi di pagamento salvati.
        - Mostrali sul tuo sito web.
        - Usa `customerPaymentMethodId` per preselezionare il metodo di pagamento preferito del cliente durante la creazione del pagamento.

        **Esempio di richiesta**

        ```json
        {
            "mode": "Payment",
            [...]
            "customerId": "my-customer-id-1",
            "customerPaymentMethodId": "my-customer-method-1",
            [...]
        }
        ```
    </>
</Accordion>



## Perché? I vantaggi! {#why}

- **Ottimizza il checkout**.
   - Precompila i dettagli del cliente come nome ed email, riducendo l'inserimento manuale.
   - Salva le preferenze e i metodi di pagamento del cliente per checkout futuri più rapidi.
   - Riduci gli attriti. Ad esempio, gateway di pagamento come Edenred utilizzano il Single Sign-On (SSO). Voucherly può mantenere attive le sessioni, migliorando il flusso di acquisto.
- **Riconciliazione semplificata**. Associare ogni pagamento a un cliente consente un tracciamento chiaro delle transazioni. Questo è particolarmente utile per gestire i rimborsi, l'analisi delle vendite e le verifiche contabili.