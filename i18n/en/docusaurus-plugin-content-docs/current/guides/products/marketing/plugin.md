---
title: Marketing plugin reference
sidebar_label: Marketing plugin
sidebar_position: 1
description: "Reference of the Voucherly Marketing plugin: how to include it, init and its options, the cart, the payment, the events on window, the recognized customer and consent."
keywords:
  - Marketing plugin
  - VoucherlyMarketing
  - website popups
  - cart upselling
  - loadVoucherlyMarketing
  - JavaScript reference
---

# Marketing plugin reference

The Marketing plugin shows on your website the popups of the funnels you build in the Dashboard, under **Marketing › Funnel**: popups on pages, upselling on the cart, threshold rewards. It exposes a single global object, `VoucherlyMarketing`, described here. Amounts are always integers in cents.

The plugin answers only from the domains of your site: add them under **Impostazioni › Marketing e CRM › Siti**, where you also find the publishable key and the identity secret.

## Including the plugin

```html
<script src="https://js.voucherly.it/marketing/v1/voucherly-marketing.js" async></script>
```

The script is asynchronous: listen to `voucherly:ready` before the tag, or check that `window.VoucherlyMarketing` exists.

```html
<script>
    window.addEventListener("voucherly:ready", () => {
        const marketing = VoucherlyMarketing.init("pk_live_…");
    });
</script>
```

Without code, the key can go in the script address, and the plugin starts by itself with the default options:

```html
<script src="https://js.voucherly.it/marketing/v1/voucherly-marketing.js?key=pk_live_…" async></script>
```

Or, with npm, through the second entry point of the loader package, from version 2.2.0:

```sh
npm install @voucherly/voucherly-js
```

```js
import { loadVoucherlyMarketing } from "@voucherly/voucherly-js/marketing";

const VoucherlyMarketing = await loadVoucherlyMarketing();
const marketing = VoucherlyMarketing.init("pk_live_…");
```

`loadVoucherlyMarketing()` injects the script once, and resolves with `null` where there is no `window`, so it is safe to call during server-side rendering.

## Starting the plugin

`VoucherlyMarketing.init(publishableKey, options)` returns the instance and never throws: with a secret key or an invalid key it logs an error in the console and returns an instance that does nothing. A second `init` returns the same instance.

| Option | Type | Description |
| --- | --- | --- |
| `pages` | `"auto"` \| `"manual"` | With `auto`, the default, the plugin declares every page and every history change by itself; with `manual` you declare them with `page()` |
| `locale` | `string` | The language of the popup texts; otherwise that of `<html lang>` |
| `user` | `{ id, hash }` | The customer who signed in: see [Recognized customer](#recognized-customer) |

## Instance methods

| Method | Description |
| --- | --- |
| `page({ type })` | Declares the page, with a type such as `home`, `product_list`, `product`, `cart` or `checkout` |
| `cart({ lines, coupons })` | The whole cart, at every change: see [The cart](#the-cart) |
| `cartOpened()` | The cart drawer opened |
| `checkoutStarted()` | The customer pressed the button to pay: see [The payment](#the-payment) |
| `consent({ analytics, personalization, marketing })` | The visitor's choices on your cookie banner |
| `identify({ id, hash })` | The customer who signs in with the page open; `identify(null)` when they sign out |
| `values({ name: value })` | Values of your site for the labels and the `{{name}}` placeholders of the popups |
| `track(name)` | An event of your site, sent only when a funnel refers to it |
| `context({ store, mode })` | The store and the mode of the visit: `delivery`, `pickup` or `table` |
| `sessionId()` | The session ID (`vses_…`), or `null` |
| `on(name, handler)` | Listens to an event without the `voucherly:` prefix; returns the function that detaches it |
| `destroy()` | Turns the plugin off on the page |

## The cart

Pass the whole cart at every change, not the differences:

```js
marketing.cart({
    lines: [
        { product: "prod_…", quantity: 2, price: 850 },
        { product: "lunch-menu", quantity: 1, price: 1200, items: [{ product: "prod_…", quantity: 1 }] },
    ],
    coupons: ["PRANZO10"],
});
```

| Line field | Description |
| --- | --- |
| `product` | The code of the product in your system (the external code in the Voucherly catalog), or its `prod_` ID |
| `quantity` | The units of the line |
| `price` | The unit price in cents, before coupons. Pass it only when your site sets the price: without it, the Voucherly catalog price applies |
| `items` | For a bundle, the products inside it, summed over its units |

`coupons` are the codes of the coupons your site applied to the cart.

## The payment

`checkoutStarted()` returns a promise that is never rejected: go to the payment when it settles. It settles at once when no popup starts from the payment, when the visitor leaves the popup, and after 2 seconds at most if the popup does not show.

```js
payButton.addEventListener("click", async () => {
    await marketing.checkoutStarted();
    goToPayment();
});
```

When you create the Payment, put the session ID in its metadata, with the key `voucherly_marketing_session`: the Dashboard then counts the orders that came after a popup, and the lines added by an upselling.

```js
const metadata = { voucherly_marketing_session: marketing.sessionId() };
```

## Events on window

Every event has the `voucherly:` prefix and carries its data in `event.detail`. The events that ask your site to act are closed with `event.detail.resolve(result)`, true when you did it: without an answer within 8 seconds they count as failed.

| Event | When | What you do |
| --- | --- | --- |
| `voucherly:ready` | The script loaded | Call `init` |
| `voucherly:offer-show` | A popup is about to show | You can give it up with `preventDefault()` or postpone it with `detail.defer(promise)` |
| `voucherly:offer-shown` | The popup showed | — |
| `voucherly:offer-exit` | The visitor chose an exit (`exit`, `element`) | — |
| `voucherly:add-to-cart` | The visitor pressed «Aggiungi» (`product`, `productId`, `quantity`) | Add the line, call `resolve`, then `cart()` |
| `voucherly:set-quantity` | The visitor changed the quantity of a proposed product (absolute `quantity`, zero to remove the line) | Bring the line to that quantity, call `resolve`, then `cart()` |
| `voucherly:open-product` | The visitor pressed «Scegli» on a product with options | Open the product page |
| `voucherly:product-info` | The visitor pressed the «i» of a product | You can open your own sheet with `preventDefault()`, and call `detail.resolve()` when it closes |
| `voucherly:apply-coupon` | The visitor accepted a reward (`code`) | Your server validates and applies the coupon; call `resolve`, then `cart()` |
| `voucherly:remove-coupon` | The cart no longer earns the reward (`code`) | Remove the coupon, call `resolve`, then `cart()` |
| `voucherly:navigate` | The plugin is about to change page (`url`) | A site with its own routing calls `preventDefault()` and navigates with its router |
| `voucherly:identity-rejected` | The hash does not prove the customer ID | The visitor stays anonymous; you can pass a new hash with `identify` |
| `voucherly:error` | A request failed (`code`, `status`) | — |

Cancel in a synchronous listener.

```js
window.addEventListener("voucherly:add-to-cart", async (event) => {
    const added = await myCart.add(event.detail.product, event.detail.quantity);
    event.detail.resolve(added);
    marketing.cart(myCart.toVoucherly());
});
```

## Recognized customer

When a customer signed in to your site, pass the plugin their ID in your system and the hash your server computes for it: the HMAC-SHA256 keyed with the identity secret of the site over the ID, both in UTF-8, written as 64 hex characters. The ID is the `referenceId` of the Customer in Voucherly: a customer with the same `referenceId` is the same customer.

```js
// On your server: the secret must never reach the page.
import { createHmac } from "node:crypto";

const hash = createHmac("sha256", process.env.VOUCHERLY_IDENTITY_SECRET).update(user.id, "utf8").digest("hex");
```

```js
// In the page.
const marketing = VoucherlyMarketing.init("pk_live_…", { user: { id: user.id, hash } });
```

An ID without a hash, or with a wrong one, does not count: the visitor stays anonymous, and the plugin emits `voucherly:identity-rejected`. If you regenerate the secret in the Dashboard, every hash computed with the old one stops working.

## Consent

Consent is collected by the cookie banner of your site. The plugin reads it in this order:

1. from your declaration, `consent({ analytics, personalization, marketing })`, which wins over everything and can be called with the page open. A purpose you leave out counts as refused;
2. from IAB TCF v2.2;
3. from Google Consent Mode v2, in the `consent` commands of the `dataLayer`.

Without any signal it means «no consent»: the plugin still shows the popups that use only the current visit.

## Content Security Policy

If your site uses a Content Security Policy, allow `js.voucherly.it` in `script-src`, `api.voucherly.it` in `connect-src`, and the host of the popup images and videos in `img-src` and `media-src`: you find it under **Impostazioni › Marketing e CRM › Siti**.

## Versioning

The `marketing/v1/` script receives backward-compatible updates at the same address, with no change to your integration. An incompatible change will ship at a new address, `marketing/v2/`, and `v1` will keep working.

| `@voucherly/voucherly-js` | Marketing plugin |
| --- | --- |
| `2.2.0` and later | `https://js.voucherly.it/marketing/v1/voucherly-marketing.js` |
