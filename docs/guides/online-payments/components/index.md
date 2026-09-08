---
title: Voucherly Components
sidebar_label: Integration guide
sidebar_position: 1
description: "Embed the Voucherly payment form in your own checkout page with Voucherly.js: cards, meal vouchers, Apple Pay and Google Pay without redirecting your customer."
keywords:
  - Voucherly Components
  - Voucherly.js
  - embedded checkout
  - payment form
  - meal vouchers
  - Apple Pay
  - Google Pay
  - publishable key
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Voucherly Components

## Introduction

Voucherly Components let you accept payments **inside your own checkout page**, without sending the customer to the Voucherly Checkout. You add a small JavaScript library, Voucherly.js, and mount a component in a container of your page: Voucherly renders the payment form there, with every payment method enabled on your account — cards, meal vouchers, Apple Pay, Google Pay, personal credit and prepaid quota — and tells your page when the payment is done.

:::info Looking for the hosted checkout?
If you prefer to redirect your customer to a page hosted by Voucherly, follow [Hosted checkout](/guides/online-payments/hosted-checkout) instead. The server-side part is the same: both start by creating a Payment.
:::

Two components are available:

- **Payment Component** — the full payment form: an accordion with the available payment methods, the meal voucher flows, saved payment methods and the pay button.
- **Express Checkout Component** — a row of one-click buttons (Apple Pay, Google Pay, personal credit, prepaid quota) to place above your form, for customers who want to pay in one gesture.

By the end of this guide, you'll know how to:

- Create a Payment on your server and render it in your page
- Handle the result of the payment, including partial payments with meal vouchers
- Support payment methods that redirect the customer to a provider
- Customize the look of the components to match your site

## How it works

1. **Your server creates a Payment** with the [Create a Payment](/api/webapi/create-payment) API and your secret key (chiave segreta), exactly as for the hosted checkout, and passes the Payment id to your page.
2. **Your page loads Voucherly.js** and mounts a component with your publishable key (chiave pubblicabile) and the Payment id. The component runs in an iframe served by `checkout.voucherly.it`: the customer's payment details are collected there and never reach your page.
3. **The customer pays.** Cards, meal vouchers and wallets are handled inside the component. Payment methods that need the provider's own page, such as PayPal or Satispay, navigate the whole page and bring the customer back to yours.
4. **Voucherly notifies your page** through the callbacks you passed to the component, **and your server** through the S2S callback and the API. Your server is the source of truth for fulfilling the order.

## Prerequisites

- Read **[Getting started with a Voucherly account](/guides/start-building)**.
- Your secret key and publishable key from **Sviluppatori > [API keys](https://dashboard.voucherly.it/Developer/ApiKey)**. Use the `sk_sand_` and `pk_sand_` pair while you develop.
- At least one payment gateway enabled in **Impostazioni > Pagamenti > [Gateway di pagamento](https://dashboard.voucherly.it/settings/payment/payment-gateways)**.
- A page served over **HTTPS**. Apple Pay, Google Pay and the payment providers only work on secure origins.

## Quick guide

### 1. Create a Payment

From your server, call [Create a Payment](/api/webapi/create-payment) with your secret key. Keep the `id` of the response: your page needs it to mount the component.

**Example request**

```json
{
    "mode": "Payment",
    "customerEmail": "mario.rossi@voucherly.it",
    "customerFirstName": "Mario",
    "customerLastName": "Rossi",
    "redirectOkUrl": "https://{{redirect_host}}/payment/success",
    "redirectKoUrl": "https://{{redirect_host}}/payment/error",
    "callbackUrl": "https://{{callback_host}}/voucherly/callback",
    "country": "IT",
    "lines": [
        {
            "quantity": 2,
            "unitAmount": 250,
            "product": {
                "externalId": "SKU-MUFFIN-001",
                "name": "Muffin al Cioccolato",
                "isFood": true
            }
        }
    ]
}
```

**Example response**

```json
{
    "id": "pay_4vZz3m9kQ1x",
    "status": "Requested",
    "amount": 500,
    "checkoutUrl": "https://example.voucherly.it/checkout",
    [...]
}
```

`redirectOkUrl` and `redirectKoUrl` are required by the API, but with Voucherly Components the customer stays on your page: they are used only if somebody opens the `checkoutUrl` directly.

:::warning Keep the secret key on your server
Never send your `sk_` key to the browser. Voucherly.js refuses it, and anyone reading your page source could use it to operate your account.
:::

### 2. Include Voucherly.js

<Tabs groupId="install" queryString>
<TabItem value="script" label="Script tag">

Add the script to the page where the customer pays:

```html
<script src="https://checkout.voucherly.it/embed/v1/voucherly.js"></script>
```

</TabItem>
<TabItem value="npm" label="npm">

Install the loader and call `loadVoucherly()`: it injects the script and resolves with the `Voucherly` object once it is available.

```sh
npm install @voucherly/voucherly-js
```

```js
import { loadVoucherly } from "@voucherly/voucherly-js";

const Voucherly = await loadVoucherly();
```

The package ships TypeScript types for every option and event described in this guide.

</TabItem>
</Tabs>

Always load Voucherly.js from `checkout.voucherly.it`: do not bundle it and do not host a copy. The file on `/embed/v1/` receives backward-compatible updates without any change on your side — new payment methods included — and an incompatible change would ship on a new path, never on `v1`. See [Versioning](./reference.md#versioning).

### 3. Mount the Payment Component

Add a container to your page and call `Voucherly.init` with your publishable key, the Payment id and the callbacks you want to handle.

```html
<div id="voucherly-payment"></div>

<script>
    Voucherly.init({
        publicKey: "pk_sand_…",
        paymentId: "pay_4vZz3m9kQ1x",
        containerId: "voucherly-payment",
        onPaymentComplete: function (event) {
            // The customer paid: confirm the outcome from your server, then show your success page.
            window.location.href = "/order/confirmed";
        },
        onPaymentError: function (event) {
            // Show a message and let the customer try again with another method.
        },
    });
</script>
```

The component sizes itself to its content and grows or shrinks as the customer moves through the form: give the container the width you want and leave the height to the component.

### 4. Handle the result

The Payment Component reports what happens through callbacks. The three that matter for your order flow are:

| Callback | When | What to do |
| --- | --- | --- |
| `onPaymentComplete` | The Payment is fully paid. | Confirm from your server, then move the customer on. |
| `onPartialPayment` | A transaction was paid but an amount remains, typically after meal vouchers. | Nothing: the component reloads and asks for the remaining amount. Update your totals if you show them. |
| `onPaymentError` | A transaction failed, or the component could not be rendered. | Show a message; the customer can retry inside the component. |

:::warning Confirm the payment from your server
The callbacks tell your page what the customer saw, not what your systems recorded. Before fulfilling the order, check the Payment status with [Retrieve a Payment](/api/webapi/retrieve-payment) or wait for the [S2S callback](/api/general/best-practices/s2s) on the `callbackUrl` you passed when creating it. A browser can be closed, a script can be tampered with, a callback can be lost: the server-side status is the only one to trust.
:::

The `event` of `onPaymentComplete` carries the `paymentId`, the `amount` paid in cents and the `status` of the Payment. The full payload of every callback is in the [reference](./reference.md#callbacks).

### 5. Redirect-based payment methods

Some payment methods — PayPal, Satispay, Scalapay, Klarna, meal vouchers with the issuer's login such as Edenred and Pluxee — need the provider's own page. When the customer picks one, Voucherly.js navigates **the whole page**, not the iframe, to the provider; once the customer is done, the provider sends them back to the URL of your page, with a few query parameters that Voucherly.js consumes and removes from the address bar.

For this round trip to work, your page must be able to render the component again after a reload:

- **Keep the Payment id retrievable** — in your server session, or in a query parameter of your own: Voucherly.js preserves your parameters and strips only its own. When the page loads again, call `Voucherly.init` with the same `paymentId`: the component resumes where the customer left, `onReady` receives `resumed: true`, and `onPaymentComplete` or `onPaymentError` fires with the result.
- **If the customer should come back to a different page**, pass it as `returnUrl`. It must be an absolute `https` URL of your site, and that page must mount the component too.
- **If you want to control the navigation**, pass `onRedirect`. The default is `window.location.href = url`; a single-page application can use it to save its state first. Never open the URL inside a frame: providers refuse it.

## Express Checkout Component

The Express Checkout Component is a row of buttons for the payment methods that close the Payment in a single gesture. Mount it in its own container, above your checkout form, with `Voucherly.initExpress`:

```html
<div id="voucherly-express"></div>
<div id="voucherly-payment"></div>

<script>
    var options = {
        publicKey: "pk_sand_…",
        paymentId: "pay_4vZz3m9kQ1x",
        onPaymentComplete: function (event) { /* … */ },
        onPaymentError: function (event) { /* … */ },
    };

    Voucherly.initExpress(Object.assign({ containerId: "voucherly-express" }, options), {
        paymentMethods: { wallet: "auto", prepaid: "auto" },
    });

    Voucherly.init(Object.assign({ containerId: "voucherly-payment" }, options));
</script>
```

The two components share the same Payment and the same session, so a payment started in one is reflected in the other. Apple Pay and Google Pay appear only on devices and browsers that support them, and only if a gateway with wallet support is enabled on your account; personal credit and prepaid quota appear according to `paymentMethods`, where `auto` shows them only when they cover the whole remaining amount — an express button that leaves the customer with a residual to pay defeats its purpose.

## Customize the appearance

Both components accept an `appearance` object with the colours, fonts and radius of your site:

```js
Voucherly.init(options, {
    appearance: {
        variables: {
            colorPrimary: "#0f766e",
            colorText: "#111827",
            borderRadius: "4px",
            fontFamily: "Inter, system-ui, sans-serif",
        },
    },
});
```

The full list of variables and their defaults is in the [reference](./reference.md#appearance). To place the pay button somewhere else in your page, hide the one of the component with `showSubmitButton: false` and call `Voucherly.submit()` from your own button.

## Content Security Policy

If your site sends a `Content-Security-Policy` header, allow Voucherly.js and its iframe:

```text
script-src https://checkout.voucherly.it;
frame-src https://checkout.voucherly.it;
```

## Test the integration

Use your `pk_sand_` key on the page and your `sk_sand_` key on the server: the Payment is created in the sandbox environment and the component shows the gateways you enabled there, with their test credentials. The environment is read from the key, so the same page works in production once you swap the keys.

Check at least these cases before going live:

- a payment completed inside the component, and `onPaymentComplete` reaching your page;
- a payment with a redirect-based method, and the component resuming on your page with the result;
- a meal voucher payment that covers part of the amount, followed by a card payment for the rest;
- the S2S callback received by your server for each of them.

## Go live

Replace the sandbox keys with the live ones, on the page and on the server, and go through the [go-live checklist](/guides/start-building/start-developing/go-live-checklist).

:::info support

- Email support@voucherly.it.
- Submit a support request at [voucherly.it/contattaci](https://voucherly.it/contattaci).
:::
