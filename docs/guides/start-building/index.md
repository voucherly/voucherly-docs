---
sidebar_label: Overview
sidebar_position: 0
description: "Step-by-step guide to integrate your platform with Voucherly: create a sandbox account, get API keys, enable payment gateways and go live."
keywords:
  - voucherly getting started
  - api keys
  - sandbox account
  - payment gateways
  - integration
  - go live
---

# Getting started

The instructions below will guide you on how to integrate your platform with our APIs.

## Configuration

### 1. Create a Sandbox account

Visit the [Dashboard][dashboard] and register a new account.  
Verify your email address by clicking the link sent to your inbox.

### 2. Obtain API keys

In the **[Sviluppatori](https://dashboard.voucherly.it/Developer/ApiKey)** section, you will find both secret and publishable keys.  
Use the secret key to authenticate API calls, as explained in [API Authentication](/api/webapi/voucherly-api#authentication).  

The publishable key is meant for the browser: it initializes [Voucherly Components](/guides/online-payments/components), the payment form embedded in your page. It cannot call the API.

### 3. Enable Payment gateways

Activate payment gateways in **Impostazioni > Pagamenti > [Gateway di pagamento](https://dashboard.voucherly.it/settings/payment/payment-gateways)**.

Voucher payments often require supplementation with a *standard* transaction, such as a card payment. Therefore, activating at least one non-voucher payment gateway is strongly recommended.

:::tip
For sandbox testing, we recommend activating Demo Voucherly and MultiSafepay. These are sufficient to replicate all payment behaviors.\
Please refer to the [Payment gateways resource](/guides/about/resources/payment-gateways/) for more information about payment gateways.
:::

### 4. Let's start

Make your first API call with the [Quickstart](/guides/start-building/start-developing/quickstart), then pick the integration that suits you in [Online payments](/guides/online-payments):

- **E-commerce plugins** — developed in-house for PrestaShop, WooCommerce and Shopify, they require minimal or no development effort and let you start testing immediately.
- **Hosted checkout** — your server creates a Payment and redirects the customer to a page hosted by Voucherly.
- **Voucherly Components** — the payment form rendered inside your own page.
- **Custom integration** — your own gateway selector on top of the REST API, for full control over the payment flow.

Selling in person, from a kiosk or a vending machine, is covered in [In-person payments](/guides/in-person-payments).

### 5. Before going live

To start processing real transactions, we need to verify and approve your merchant account information.

1. [Activate your account](/guides/start-building/activate-account) providing information about your company.
1. Ensure your website aligns with [Website checklist](/guides/start-building/start-developing/website-checklist).

Once submitted, we will perform know your customer (KYC) checks. If approved, your account will go live.

[dashboard]: https://dashboard.voucherly.it/
