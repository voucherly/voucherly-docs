---
title: Voucherly.js reference
sidebar_label: Voucherly.js reference
sidebar_position: 2
description: "Reference of Voucherly.js: how to include it, the options of the Payment and Express Checkout Components, the callbacks and their payloads, methods, errors and versioning."
keywords:
  - Voucherly.js
  - Voucherly Components
  - JavaScript reference
  - Voucherly.init
  - appearance
  - callbacks
  - embedded payment form
---

# Voucherly.js reference

Voucherly.js is the library that renders [Voucherly Components](./index.md) on your page. It exposes a single global, `Voucherly`, described here. Amounts are always integers in cents.

## Including Voucherly.js

```html
<script src="https://checkout.voucherly.it/embed/v1/voucherly.js"></script>
```

Or, with npm, through the loader package:

```sh
npm install @voucherly/voucherly-js
```

```js
import { loadVoucherly } from "@voucherly/voucherly-js";

const Voucherly = await loadVoucherly();
```

`loadVoucherly()` injects the script once — later calls share the same promise — and resolves with the `Voucherly` global. It resolves with `null` where there is no `window`, so it can be called during server-side rendering. The package contains the loader and the TypeScript types, not Voucherly.js itself.

Load Voucherly.js from `checkout.voucherly.it` only: do not bundle it and do not serve a copy from your own domain.

### Versioning

The version is the segment in the path, `v1`. A version receives backward-compatible updates continuously — new payment methods, fixes, improvements — without any change to your integration; the file is cached by browsers for five minutes, so an update reaches your customers within minutes. A change that would break an existing integration ships on a new path, `/embed/v2/`, and the previous version keeps working.

Each major version of the npm package loads one version of Voucherly.js; the two numbers are independent, and this table is the mapping:

| `@voucherly/voucherly-js` | Voucherly.js |
| --- | --- |
| `2.x` | `https://checkout.voucherly.it/embed/v1/voucherly.js` |

## Voucherly.init(options, componentOptions)

Renders the Payment Component in the container. Calling it again replaces the component.

```js
Voucherly.init({
    publicKey: "pk_live_…",
    paymentId: "pay_…",
    containerId: "voucherly-payment",
    onPaymentComplete: function (event) { /* … */ },
}, {
    appearance: { variables: { colorPrimary: "#0f766e" } },
    showSubmitButton: true,
});
```

### options

The same object is accepted by `Voucherly.init` and `Voucherly.initExpress`.

| Parameter | Type | Description |
| --- | --- | --- |
| `publicKey` | `string` (**required**) | The publishable key of your merchant account, `pk_live_…` or `pk_sand_…`. It decides the environment: a `pk_sand_` key renders sandbox Payments, a `pk_live_` key renders live ones. A secret key (`sk_`) or a restricted key (`rk_`) throws. |
| `paymentId` | `string` (**required**) | The `id` of the Payment created with [Create a Payment](/api/webapi/create-payment), `pay_…`. The Payment must belong to the merchant of the key. |
| `containerId` | `string` (**required**) | The `id` of the element the component is rendered into. Its content is replaced. |
| `returnUrl` | `string` | The page the customer lands on after a redirect-based payment method. Defaults to the current URL of the page. Must be an absolute URL of your site, and that page must mount the component with the same `paymentId`. |
| `onReady` | `function` | See [Callbacks](#callbacks). |
| `onResize` | `function` | |
| `onPaymentComplete` | `function` | |
| `onPartialPayment` | `function` | |
| `onPaymentError` | `function` | |
| `onRedirect` | `function` | |

### componentOptions

| Parameter | Type | Description |
| --- | --- | --- |
| `appearance.variables` | `object` | Colours, fonts and radius of the component. See [Appearance](#appearance). |
| `wallets.applePay` | `"auto"` \| `"never"` | `auto` (default) shows Apple Pay if the customer's browser can pay with it. `never` hides it. |
| `wallets.googlePay` | `"auto"` \| `"never"` | `auto` (default) shows Google Pay if the customer's browser can pay with it. `never` hides it. |
| `showSubmitButton` | `boolean` | Whether the component shows its own pay button. Default `true`. With `false`, submit the form from your page with [`Voucherly.submit()`](#voucherlysubmit). |

Apple Pay and Google Pay also need a gateway with wallet support enabled on your account. When the Express Checkout Component is on the same page, the Payment Component does not show them, whatever `wallets` says: they are already in the express row.

## Voucherly.initExpress(options, componentOptions)

Renders the Express Checkout Component: the buttons of the payment methods that complete the Payment in one gesture. Takes the same `options` as `Voucherly.init` and its own `componentOptions`.

```js
Voucherly.initExpress({
    publicKey: "pk_live_…",
    paymentId: "pay_…",
    containerId: "voucherly-express",
    onPaymentComplete: function (event) { /* … */ },
}, {
    buttonHeight: 48,
    buttonType: { applePay: "buy", googlePay: "buy" },
    paymentMethods: { wallet: "auto", prepaid: "auto" },
});
```

### componentOptions

| Parameter | Type | Description |
| --- | --- | --- |
| `appearance.variables` | `object` | See [Appearance](#appearance). |
| `buttonHeight` | `number` | Height of the Apple Pay and Google Pay buttons, in pixels. |
| `buttonType.applePay` | `string` | Label of the Apple Pay button: `"buy"` (default), `"pay"`, `"plain"` or another type supported by Apple Pay. |
| `buttonType.googlePay` | `string` | Label of the Google Pay button: `"buy"` (default), `"pay"`, `"plain"` or another type supported by Google Pay. |
| `paymentMethods.wallet` | `"always"` \| `"auto"` \| `"never"` | The personal credit of the customer. `always` (default) shows it whenever the customer has credit, `auto` only when the credit covers the whole remaining amount, `never` hides it. |
| `paymentMethods.prepaid` | `"always"` \| `"auto"` \| `"never"` | The prepaid quota of the customer, with the same values. |
| `paymentMethods.applePay` | `"auto"` \| `"never"` | `auto` (default) shows the Apple Pay button if the customer's browser can pay with it. `never` hides it. |
| `paymentMethods.googlePay` | `"auto"` \| `"never"` | `auto` (default) shows the Google Pay button if the customer's browser can pay with it. `never` hides it. |

## Appearance

`appearance.variables` maps to the CSS custom properties of the component. Every value is a CSS value, passed as a string.

| Variable | Default | Applies to |
| --- | --- | --- |
| `colorPrimary` | `#5C59F2` | Pay button, selected method, focus ring |
| `colorPrimaryHover` | `#4a47d9` | Pay button on hover |
| `colorPrimaryText` | `#ffffff` | Text on the primary colour |
| `colorText` | `#1a1a1a` | Text |
| `colorTextMuted` | `#6b7280` | Secondary text and hints |
| `colorBackground` | `#ffffff` | Background of the component |
| `colorBorder` | `#e0e0e0` | Borders of methods and inputs |
| `colorDanger` | `#dc3545` | Error messages |
| `borderRadius` | `0.5rem` | Radius of cards, inputs and buttons |
| `fontFamily` | `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif` | Text |
| `fontFamilyHeading` | same as `fontFamily` | Headings |
| `fontSize` | `14px` | Base font size |

The component sets these on load; to change them later, use [`Voucherly.configure`](#voucherlyconfigurename-options). `fontFamily` can only name fonts installed on the customer's device: the component cannot load the web fonts of your page, so end the stack with a generic family.

## Callbacks

Every callback is optional. They are passed in `options` and receive plain objects.

### onReady(event)

The component is rendered and interactive.

| Field | Type | Description |
| --- | --- | --- |
| `height` | `number` | Height of the component in pixels, already applied to its container. |
| `resumed` | `boolean` | `true` when the component is loading again after the customer came back from a redirect-based payment method. |

### onResize(height)

The height of the component changed, for instance when the customer opened a payment method. Voucherly.js applies the new height itself, frame by frame during the animations of the form; the callback is called once, with the final height, when the height has settled. Use it only if your layout needs to react.

### onPaymentComplete(event)

The Payment is fully paid. Confirm it from your server before fulfilling the order.

| Field | Type | Description |
| --- | --- | --- |
| `success` | `boolean` | Always `true`. |
| `paymentId` | `string` | The Payment. |
| `amount` | `number` | The total paid, in cents. Absent when the component resumes after a redirect. |
| `status` | `string` | The status of the Payment: `Confirmed` when the method captures at checkout or the Payment has `isAutoConfirm`, `Paid` when it still needs [Confirm a Payment](/api/webapi/confirm-payment). Absent when the component resumes after a redirect. |

### onPartialPayment(event)

A transaction was paid but the Payment is not closed yet, typically after a meal voucher that covers part of the amount. The component reloads on its own and asks for the remaining amount.

| Field | Type | Description |
| --- | --- | --- |
| `paymentId` | `string` | The Payment. |
| `paidAmount` | `number` | The amount paid so far, in cents. |
| `remainingAmount` | `number` | The amount still to pay, in cents. |
| `transactionId` | `string` | The transaction just paid. |
| `gatewayName` | `string` | The name of the payment gateway of the transaction. |

### onPaymentError(event)

A transaction failed, the Payment was closed without success, or the component could not be rendered. The component stays usable after a failed transaction: the customer can retry with another method. The fields depend on what happened, and all of them are optional.

| Field | Type | Description |
| --- | --- | --- |
| `paymentId` | `string` | The Payment. |
| `error` | `object` | The error of the failed transaction, the same object as `transactions[].error` in [Retrieve a Payment](/api/webapi/retrieve-payment): `code` (`Declined`, `Cancelled`, `Generic`, …) and, when the provider reported one, `externalError` with `message` and `code`. |
| `gatewayName` | `string` | The name of the payment gateway of the failed transaction. |
| `success` | `boolean` | `false` when the Payment was closed without success. |
| `status` | `string` | The status of the Payment when it was closed without success. |
| `message` | `string` | A short description, when the failure happened in the component rather than in a transaction. |
| `code` | `string` | A configuration error: the component was not rendered. See [Errors](#errors). |

### onRedirect(url)

The chosen payment method needs the provider's own page. The default implementation navigates the page with `window.location.href = url`; provide your own to save state first. The navigation must happen at the top level of the page, never in a frame. When the customer comes back, mount the component again with the same `paymentId`: it resumes with `resumed: true` in `onReady` and reports the result.

## Methods

### Voucherly.configure(name, options)

Sends new `componentOptions` to a mounted component. `name` is `"element"` for the Payment Component or `"express"` for the Express Checkout Component; omit it to send the options to both.

```js
Voucherly.configure("element", { showSubmitButton: false });
Voucherly.configure({ appearance: { variables: { colorPrimary: "#b91c1c" } } });
```

### Voucherly.submit()

Submits the Payment Component with the method the customer selected, as its own pay button would. Meant for pages that hide the button with `showSubmitButton: false`.

### Voucherly.destroy()

Removes both components and their listeners.

### Voucherly.destroyComponent(name)

Removes one component, `"element"` or `"express"`.

## Errors

When the component cannot be rendered, `onPaymentError` receives an event with a `code`, and the same code is logged in the browser console. These are integration errors: fix the page rather than showing them to the customer.

| Code | Cause | Fix |
| --- | --- | --- |
| `public_key_required` | No `publicKey` reached the component. | Pass your `pk_` key in `options`. |
| `invalid_public_key` | The key is not a publishable key of an existing account, or has been revoked. | Copy the key from **Sviluppatori > [API keys](https://dashboard.voucherly.it/Developer/ApiKey)**. |
| `public_key_tenant_mismatch` | The environment of the key does not match the one of the Payment. | Create the Payment with the `sk_` key of the same environment as the `pk_` key: sandbox with sandbox, live with live. |
| `payment_not_found` | No Payment with that id belongs to the merchant of the key. | Check the `paymentId`, and that the Payment was created by the same account that owns the key. |
| `merchant_not_active` | The merchant account is not active. | Complete the activation of the account, or contact support. |

Voucherly.js itself throws, at the call of `Voucherly.init` or `Voucherly.initExpress`, when `publicKey`, `paymentId` or `containerId` are missing, when the key is not a `pk_` key, or when the container does not exist in the page.

## Security notes

- The publishable key is not a secret: it is visible in the source of your page. It identifies your account and lets Voucherly check that the Payment belongs to you; it cannot create, read or refund Payments. Those operations need the secret key, on your server.
- The component runs in an iframe served by `checkout.voucherly.it`, isolated from your page with the `sandbox` attribute. Card numbers and the other payment details are entered inside the iframe and never reach your page; your page only receives the events described above.
- Voucherly.js accepts messages only from the origin of the iframe, and the iframe accepts messages only from the origin of the page that mounted it.
- The outcome delivered to your page is meant for the customer experience. What your systems act upon must come from the [S2S callback](/api/general/best-practices/s2s) or from [Retrieve a Payment](/api/webapi/retrieve-payment).
