---
sidebar_position: 3
---

# Shopify
Technical manual for Voucherly's free plugin for Shopify e-commerce platform.

:::warning
Shopify does not allow direct integration of external payment methods within its checkout process. Therefore, payments through Voucherly are handled asynchronously. See [Checkouts](#checkouts) for additional info.
:::


## Prerequisites
- Read **[Getting started with a Voucherly account](/guides/intro/getting-started)**.

## Configuration

A full video tutorial is available [here](https://www.youtube.com/watch?v=53d6BCiExeg).

### Shopify

1. Sign in to your Shopify backend.
2. [Create a custom app](https://help.shopify.com/it/manual/apps/app-types/custom-apps).
3. Go to **Configuration > Admin API integration** and select the following scopes: `write_order_edits`, `read_order_edits`, `write_orders`, `read_orders`, `read_products`.
4. Install the app to get the API access token and API secret key from **API credentials**.
5. [Create a custom manual payment method](https://help.shopify.com/it/manual/payments/manual-payments#crea-un-metodo-di-pagamento-manuale-personalizzato). 
    - The payment method does not necessarily need to be called "Voucherly", but it must include the word "Voucherly". For example "Buoni Pasto - Paga con Voucherly".
    - Consider enhancing the payment method section by adding a note related to the payment flow. This can help make the process clearer for your customers. For example: 
        - *Ulteriori dettagli*. Dopo aver cliccato "Paga ora", riceverai una mail con le istruzioni per il pagamento.
        - *Istruzioni per il pagamento*. Ti è stata inviata una mail contenente le istruzioni per il pagamento. Clicca sul link ricevuto e completa l'acquisto in modo sicuro su Voucherly.
            
6. Get your Shopify store URL, in the format mydomain.myshopify.com.
7. (optional) By default, the entire amount of the order will be payable with vouchers. To limit payments via vouchers to only certain products, assign a dedicated tag (*Food Product Tag*) to them.

### Voucherly

1. Sign in to your Voucherly dashboard.
2. Go to **Configurazione merchant > Integrazioni** and click on Shopify:
    - Click on ✏️ next to *Parametri*.
    - Edit your settings.
    - Click **Modifica**.


## User guide

### Checkouts
Shopify uses a standard checkout process that doesn’t support external payment methods directly. For this reason, payments with Voucherly are processed outside the checkout flow:
- During checkout, the customer selects Voucherly as the payment method.
- The customer automatically receives an email containing a payment link.
- By clicking the link, the customer is redirected to Voucherly.
- The customer completes the payment on Voucherly.
- After the payment is completed, the Shopify order is automatically marked as paid.
    

:::info support
- Email support@voucherly.it.
- Submit a support request at [voucherly.it/contattaci](https://voucherly.it/contattaci).
- Refer to [Voucherly Shopify](https://voucherly.it/soluzioni/plugin/shopify) for additional info.
:::