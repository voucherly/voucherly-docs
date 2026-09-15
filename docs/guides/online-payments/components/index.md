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

Voucherly Components let you accept payments **inside your own checkout page**, without sending the customer to the Voucherly Checkout. You add a small JavaScript library, Voucherly.js, and mount a component in a container of your page: Voucherly renders the payment form there, with every payment method enabled on your account — cards, meal vouchers, Apple Pay, Google Pay, personal credit and prepaid quota — and, once the payment is over, takes the customer to your result page.

:::info Looking for the hosted checkout?
If you prefer to redirect your customer to a page hosted by Voucherly, follow [Hosted checkout](/guides/online-payments/hosted-checkout) instead. The server-side part is the same: both start by creating a Payment.
:::

Two components are available:

- **Payment Component** — the full payment form: an accordion with the available payment methods, the meal voucher flows, saved payment methods and the pay button. It is rendered inside your page, or in a popup window over it.
- **Express Checkout Component** — a row of one-click buttons (Apple Pay, Google Pay, personal credit, prepaid quota) to place above your form, for customers who want to pay in one gesture.

By the end of this guide, you'll know how to:

- Create a Payment on your server and render it in your page
- Take the customer to your result page, or handle the result without leaving your page
- Support payment methods that redirect the customer to a provider
- Choose between the inline component and the popup
- Customize the look of the components to match your site

## How it works

1. **Your server creates a Payment** with the [Create a Payment](/api/webapi/create-payment) API and your secret key (chiave segreta), exactly as for the hosted checkout, and passes the Payment id to your page.
2. **Your page loads Voucherly.js** and mounts a component with your publishable key (chiave pubblicabile) and the Payment id. The component runs in an iframe served by `checkout.voucherly.it`, or in a popup window on the Voucherly checkout: the customer's payment details are collected there and never reach your page.
3. **The customer pays.** Cards, meal vouchers and wallets are handled inside the component. Payment methods that need the provider's own page, such as PayPal or Satispay, navigate the whole page and bring the customer back to yours — or, in a popup, stay inside the popup.
4. **The customer lands on your result page.** When the Payment closes, Voucherly.js sends your page to the `redirectOkUrl` or the `redirectKoUrl` of the Payment, as the hosted checkout does. If your page must stay where it is, `redirect: "if_required"` delivers the outcome to your callbacks instead.
5. **Voucherly notifies your server** through the S2S callback and the API. Your server is the source of truth for fulfilling the order.

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

`redirectOkUrl` and `redirectKoUrl` are your result pages: when the Payment closes, Voucherly.js sends the customer to the first if the Payment was paid and to the second otherwise. They are the same URLs the hosted checkout uses, with the same query string.

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

Add a container to your page and call `Voucherly.init` with your publishable key and the Payment id.

```html
<div id="voucherly-payment"></div>

<script>
    Voucherly.init({
        publicKey: "pk_sand_…",
        paymentId: "pay_4vZz3m9kQ1x",
        containerId: "voucherly-payment",
    });
</script>
```

That is all the page needs: the component shows the payment methods, reports failed attempts to the customer, and when the Payment closes Voucherly.js takes the customer to your `redirectOkUrl` or `redirectKoUrl`.

The component sizes itself to its content and grows or shrinks as the customer moves through the form: give the container the width you want and leave the height to the component.

### 4. Handle the result

When the Payment closes, Voucherly.js sends your page to the result page of the Payment:

- the `redirectOkUrl` when the Payment was paid;
- the `redirectKoUrl` when it was closed without success, for instance because it expired or the customer cancelled it.

The outcome travels in the query string, with the same parameters as the [hosted checkout](/guides/online-payments/hosted-checkout#3-show-a-success-page): `success` (`OK` or `KO`), `status`, `paymentId`, `referenceId`, `amount`, `customerId` and `tenant`. Your result page reads `paymentId`, checks the Payment from your server and shows the customer what happened.

:::warning Confirm the payment from your server
The query string and the callbacks tell your page what the customer saw, not what your systems recorded, and anybody can type a URL with `success=OK`. Before fulfilling the order, check the Payment status with [Retrieve a Payment](/api/webapi/retrieve-payment) or wait for the [S2S callback](/api/general/best-practices/s2s) on the `callbackUrl` you passed when creating it. A browser can be closed, a script can be tampered with, a callback can be lost: the server-side status is the only one to trust.
:::

While the Payment is still open, the component keeps reporting to your page through callbacks, whatever happens at the end:

| Callback | When | What to do |
| --- | --- | --- |
| `onPaymentPartialComplete` | A transaction was paid but an amount remains, typically after meal vouchers. | Nothing: the component reloads and asks for the remaining amount. Update your totals if you show them. |
| `onPaymentError` | A transaction failed, or the component could not be rendered. | Nothing for a failed transaction: the component shows the message and the customer can retry. A `code` is an integration error to fix. |

A Payment that is already closed when you mount the component — the customer reloads the checkout after paying, or comes back to it — is never redirected: `onPaymentComplete` or `onPaymentError` fires instead. So the page that mounts the component can also be your result page without sending the customer round in circles.

#### Stay on your page: `redirect: "if_required"`

If your page must not be left at the end of the payment — a single-page application that shows its own confirmation, for instance — pass `redirect: "if_required"`. The page stays where it is, and the outcome reaches your callbacks:

```js
Voucherly.init({
    publicKey: "pk_sand_…",
    paymentId: "pay_4vZz3m9kQ1x",
    containerId: "voucherly-payment",
    redirect: "if_required",
    onPaymentComplete: function (event) {
        // The customer paid: confirm the outcome from your server, then show your confirmation.
    },
    onPaymentError: function (event) {
        // With success: false the Payment was closed without success; otherwise a transaction failed and the customer can retry.
    },
});
```

| Callback | When | What to do |
| --- | --- | --- |
| `onPaymentComplete` | The Payment is fully paid. | Confirm from your server, then move the customer on. |
| `onPaymentError` with `success: false` | The Payment was closed without success. | Show a message, and create a new Payment if the customer wants to try again. |

Your page is still left when a payment method needs it: inline, a redirect-based method navigates the page to the provider and back. The `event` of `onPaymentComplete` carries the `paymentId`, the `amount` paid in cents and the `status` of the Payment. The full payload of every callback, and what `redirect` changes, are in the [reference](./reference.md#redirect-after-the-payment).

#### `Paid` or `Confirmed`: what you find after the payment

A Payment goes from `Requested` to `Paid` when the customer completes the checkout, and to `Confirmed` when the funds are captured — the [payment lifecycle](/guides/about/resources/payments-lifecycle) describes every status. Which of the two you find on your result page, or after `onPaymentComplete`, depends on the payment method and on the Payment:

- Meal vouchers, personal credit, prepaid quota and some providers — Satispay, SumUp, Adyen among them — capture at checkout: the Payment lands directly in `Confirmed`.
- Cards, PayPal and the other two-step providers only authorize: the Payment stays `Paid` until you call [Confirm a Payment](/api/webapi/confirm-payment), or until the authorization expires and the funds are released.
- With `isAutoConfirm: true` in [Create a Payment](/api/webapi/create-payment), Voucherly confirms every transaction as soon as the customer pays, and the Payment is `Confirmed` whatever the method. Without it, the default set in **Impostazioni > Pagamenti > Gateway di pagamento > Contabilizzazione automatica** applies.

Do not write code that reasons per provider: read the `status` from your server and, if it is `Paid`, confirm it — or create the Payment with `isAutoConfirm: true` if you have nothing to check between the authorization and the capture. A `Paid` Payment left alone is money you have not collected.

### 5. Redirect-based payment methods

Some payment methods — PayPal, Satispay, Scalapay, Klarna, meal vouchers with the issuer's login such as Edenred and Pluxee — need the provider's own page. When the customer picks one in the inline component, Voucherly.js navigates **the whole page**, not the iframe, to the provider; once the customer is done, the provider sends them back to the URL of your page, with a few query parameters that Voucherly.js consumes and removes from the address bar. In [popup mode](#inline-or-popup) none of this happens: the provider's page opens inside the popup, and your page is never left.

For the round trip to work inline, your page must be able to render the component again after a reload:

- **Keep the Payment id retrievable** — in your server session, or in a query parameter of your own: Voucherly.js preserves your parameters and strips only its own. When the page loads again, call `Voucherly.init` with the same `paymentId`: the component resumes where the customer left and `onReady` receives `resumed: true`. If the Payment closed at the provider, Voucherly.js then takes the customer to your result page — or, with `redirect: "if_required"`, fires `onPaymentComplete` or `onPaymentError`.
- **If the customer should come back to a different page**, pass it as `returnUrl`. It must be an absolute `https` URL of your site, and that page must mount the component too. `returnUrl` is where the customer resumes paying, not your result page: that is always the `redirectOkUrl` or `redirectKoUrl` of the Payment.
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
    };

    Voucherly.initExpress(Object.assign({ containerId: "voucherly-express" }, options), {
        paymentMethods: { wallet: "auto", prepaid: "auto" },
    });

    Voucherly.init(Object.assign({ containerId: "voucherly-payment" }, options));
</script>
```

The two components share the same Payment and the same session, so a payment started in one is reflected in the other, and the result is handled once whichever component closes the Payment: pass both the same `redirect` and the same callbacks, as the shared `options` above do. Apple Pay and Google Pay appear only on devices and browsers that can pay with them, and only if a gateway with wallet support is enabled on your account; personal credit and prepaid quota appear according to `paymentMethods`, where `auto` shows them only when they cover the whole remaining amount — an express button that leaves the customer with a residual to pay defeats its purpose.

While the Express Checkout Component is mounted, the Payment Component hides whatever the express row already shows: its Apple Pay and Google Pay rows, and personal credit and prepaid quota when the express row shows them. Each method is offered once, and the form keeps the rest — with `paymentMethods.prepaid: "auto"`, a prepaid quota that does not cover the remaining amount stays out of the express row and in the form. You do not need to set anything on the Payment Component for this.

## Inline or popup

By default the Payment Component is rendered inline, inside your page, in an iframe. It can also open in a **popup window** over your page: your page shows only its own pay button, and the customer pays in the Voucherly checkout page.

```html
<button id="pay-button">Pay</button>

<script>
    Voucherly.init({
        displayMode: "popup",
        publicKey: "pk_sand_…",
        paymentId: "pay_4vZz3m9kQ1x",
        onPopupClosed: function () {
            // The window is gone, not necessarily the payment: keep the pay button available.
        },
    });

    document.getElementById("pay-button").addEventListener("click", function () {
        Voucherly.submit();
    });
</script>
```

`Voucherly.submit()` opens the popup, so it must run directly in the click handler of your button: browsers block a popup opened outside a user gesture, and in that case `onPaymentError` receives `popup_blocked`. While the popup is open, Voucherly.js dims your page with a button to bring the popup back to the front; pass `overlay: false` to handle that yourself.

When the Payment closes — the customer paid, or cancelled from the popup — the popup closes by itself and your page goes to the `redirectOkUrl` or `redirectKoUrl` of the Payment, exactly as inline. The overlay stays until the popup is gone, so your page is never uncovered with the popup still on top. With `redirect: "if_required"` your page stays, and the callbacks fire instead.

| | Inline | Popup |
| --- | --- | --- |
| Where the customer pays | Inside your page | In a Voucherly window over your page |
| Look | Customizable with `appearance` | The Voucherly checkout page |
| Redirect-based methods | Navigate your whole page and come back to it | Stay inside the popup: your page never reloads |
| When the Payment closes | The customer goes to your result page, or the callbacks fire with `if_required` | The popup closes, then the same as inline |
| What your page must handle | Mounting the component again after a redirect | Keeping the pay button available if the popup is closed |
| Mobile | Inside your page | Opens as a new tab |

Choose the popup when your page cannot be reloaded in the middle of a payment — a single-page application with a cart held in memory, a flow that is hard to resume — or when you do not want to host the form. Choose the iframe when the form must be part of your page.

`redirect` and the callbacks work the same way in both modes, except `onReady`, `onResize` and `onRedirect`, which the popup does not call. **Closing the popup does not cancel the payment**: `onPopupClosed` tells you the window is gone, but the customer may have paid already, and the outcome — the redirect or the callbacks — can still arrive. The Express Checkout Component is always rendered inside your page, and can sit next to a Payment Component in popup mode. Details are in the [reference](./reference.md#popup-mode).

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
connect-src https://checkout.voucherly.it;
```

`connect-src` is needed in popup mode, where Voucherly.js reads the status of the Payment from `checkout.voucherly.it` while the popup is open.

## Test the integration

Use your `pk_sand_` key on the page and your `sk_sand_` key on the server: the Payment is created in the sandbox environment and the component shows the gateways you enabled there, with their test credentials. The environment is read from the key, so the same page works in production once you swap the keys. The codes of the Demo Voucherly meal vouchers and the test cards are in [Test data](/guides/start-building/start-developing/test-data).

Check at least these cases before going live:

- a payment completed inside the component, and the customer landing on your `redirectOkUrl`, where your server finds the Payment `Paid` or `Confirmed`;
- a payment with a redirect-based method, and the component resuming on your page before the customer lands on your result page;
- a meal voucher payment that covers part of the amount, followed by a card payment for the rest;
- in popup mode, a redirect-based method completed inside the popup, a payment cancelled from the popup and the customer landing on your `redirectKoUrl`, and a popup closed before paying and opened again;
- with `redirect: "if_required"`, `onPaymentComplete` and `onPaymentError` reaching your page instead of the redirect;
- the S2S callback received by your server for each of them.

## Go live

Replace the sandbox keys with the live ones, on the page and on the server, and go through the [go-live checklist](/guides/start-building/start-developing/go-live-checklist).

:::info support

- Email support@voucherly.it.
- Submit a support request at [voucherly.it/contattaci](https://voucherly.it/contattaci).
:::
