---
sidebar_position: 3
description: "Connect Voucherly to Shopify: create a custom app, configure API scopes and a manual payment method to accept meal vouchers via asynchronous checkout."
keywords:
  - Voucherly Shopify
  - Shopify plugin
  - Shopify payment
  - custom app
  - meal vouchers
  - manual payment method
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
2. If necessary, [allow custom app development](https://help.shopify.com/it/manual/apps/app-types/custom-apps#enable-custom-app-development).
    - Go to **Settings > Apps and sales channels**
    - Click **Develop apps**.
    - Click **Allow custom app development**.
    - Read the warning and information provided, and then click **Allow custom app development**.
3. [Create a custom app](https://help.shopify.com/it/manual/apps/app-types/custom-apps).
    - Go to **Settings > Apps and sales channels**
    - Click **Develop apps**.
    - Click **Create a custom app**.
    - In the modal window, enter the **App name** and select an **App developer**. The app developer can be the store owner, or any staff or collaborator account with the Develop apps permission.
    - Click **Create app**.
4. Select API scopes.
    - Go to **Configuration > Admin API integration**.
    - Click **Configure**.
    - Select the following scopes: `write_order_edits`, `read_order_edits`, `write_orders`, `read_orders`, `read_products`.
    - Click **Save**.
5. Install the app to get the API access token and API secret key from **API credentials**.
    - Go to **API credentials**.
    - Click **Install app**.
    - Reveal and copy *Admin API access token*.
    - Copy *API key*.
    - Copy *API secret key*.
6. [Create a custom manual payment method](https://help.shopify.com/it/manual/payments/manual-payments#crea-un-metodo-di-pagamento-manuale-personalizzato).
    - Go to **Settings > Payments**.
    - In the **Manual payment methods** section, select **Create custom payment method**.
    - In **Custom payment method name**, enter the name of your payment method. The payment method does not necessarily need to be called "Voucherly", but it must include the word "Voucherly". For example *Buoni Pasto - Paga con Voucherly*.
    - Consider enhancing the payment method section by adding a note related to the payment flow. This can help make the process clearer for your customers. For example:
        - In **Additional details**, *Dopo aver cliccato "Paga ora", riceverai una mail con le istruzioni per il pagamento*.
        - In **Payment instructions**, *Ti è stata inviata una mail contenente le istruzioni per il pagamento. Clicca sul link ricevuto e completa l'acquisto in modo sicuro su Voucherly*.

7. Go to **Settings > Domains** and get your Shopify store URL, in the format mydomain.myshopify.com.
8. (optional) By default, the entire amount of the order will be payable with vouchers. To limit payments via vouchers to only certain products, assign a dedicated tag (*Food Product Tag*) to them.

### Voucherly

1. Sign in to the Dashboard.
2. Go to **Impostazioni** > **Attività** > **[Integrazioni](https://dashboard.voucherly.it/merchant/integrations)** and click on Shopify:
    - Click on ⚙️ next to *Parametri*.
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
