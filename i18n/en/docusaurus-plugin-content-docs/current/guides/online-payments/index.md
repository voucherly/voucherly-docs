---
sidebar_position: 0
title: Online payments
sidebar_label: Overview
description: "Choose how to accept online payments with Voucherly: hosted checkout, Voucherly Components in your page, a custom integration on your own gateway selector, or an e-commerce plugin."
keywords:
  - online payments
  - hosted checkout
  - Voucherly Components
  - custom integration
  - e-commerce plugins
  - meal vouchers online
---

# Online payments

Every way to accept an online payment with Voucherly starts the same way — your server creates a Payment with the API — and differs in what the customer sees next. Pick the one that fits how much of the checkout you want to own.

| | Where the customer pays | What you build | Best for |
| --- | --- | --- | --- |
| **[Hosted checkout](./hosted-checkout/index.md)** | On a page hosted by Voucherly, with every payment method of your account | A button that creates the Payment and redirects | Getting live fast, with no frontend work |
| **[Voucherly Components](./components/index.md)** | Inside your page, in a payment form rendered by Voucherly.js | The Payment, a container and a few callbacks | A checkout that stays on your site, without handling payment data |
| **[Custom integration](./custom-integration/index.md)** | On the page of the gateway they picked on your site | Your own gateway selector on top of the API | Full control over how methods are presented |
| **[E-commerce plugins](./ecommerce-plugins/index.md)** | On the hosted checkout, wired by the plugin | Nothing: install and configure | WooCommerce, PrestaShop and Shopify stores |

Whatever you choose, the outcome reaches your server the same way: the [S2S callback](/api/general/best-practices/s2s) and the [Retrieve a Payment](/api/webapi/retrieve-payment) API. Two-step payments, saved payment methods and the rest of the [payment lifecycle](/guides/about/resources/payments-lifecycle) work with all of them.

Selling in person — a kiosk, a vending machine — is covered in [In-person payments](/guides/in-person-payments); paying at the table in a restaurant is a Voucherly product of its own, [Pay at table](/guides/products/pay-at-table).
