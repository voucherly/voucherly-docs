---
sidebar_position: 3
---

# Shopify
Technical manual for Voucherly's free plugin for Shopify e-commerce platform.

## Prerequisites
- **[Voucherly account](/guides/intro/integration-process)**.

## Configuration

A full video tutorial is available [here](https://www.youtube.com/watch?v=53d6BCiExeg).

### Shopify

1. Sign in to your Shopify backend.
2. [Create a custom app](https://help.shopify.com/it/manual/apps/app-types/custom-apps).
3. Go to **Configuration > Admin API integration** and select the following scopes: `write_order_edits`, `read_order_edits`, `write_orders`, `read_orders`, `read_products`.
4. Install the app to get the API access token and API secret key from **API credentials**.
5. [Create a custom manual payment method](https://help.shopify.com/it/manual/payments/manual-payments#crea-un-metodo-di-pagamento-manuale-personalizzato) named "Voucherly"
6. Get your Shopify store URL, in the format mydomain.myshopify.com.
7. (optional) By default, the entire amount of the order will be payable with vouchers. To limit payments via vouchers to only certain products, assign a dedicated tag (*Food Product Tag*) to them.

### Voucherly

1. Sign in to your Voucherly dashboard.
2. Go to **Configurazione merchant > Integrazioni** and click on Shopify:
    - Click on ✏️ next to *Parametri*.
    - Edit your settings.
    - Click **Modifica**.

:::info support
- Email support@voucherly.it.
- Submit a support request at [voucherly.it/contattaci](https://voucherly.it/contattaci).
- Refer to [Voucherly Shopify](https://voucherly.it/soluzioni/plugin/shopify) for additional info.
:::