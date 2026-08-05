---
title: TCPOS
sidebar_position: 6
description: "Connect TCPOS to Voucherly: register the saleability webhook so the items your cash register runs out of stop being offered in that store."
keywords:
  - Voucherly TCPOS
  - TCPOS integration
  - cash register availability
  - sold out products
  - saleability webhook
  - POS integration
---

# TCPOS

When your staff runs out of a product, they lock it at the cash register — by hand, or because the counter reached zero. Without this integration Voucherly does not know, keeps offering the product, and takes payment for something the cash register then refuses.

This integration closes that gap: TCPOS tells Voucherly that something changed, Voucherly reads the complete list of locked items back from the cash register, and stops offering those products in that store.

:::info
Voucherly never trusts the notification alone: it always reads the full list back from the cash register. This means a lost notification cannot leave the two systems out of sync — the next one puts everything back in agreement.
:::

## Prerequisites

- Read **[Getting started with a Voucherly account](/guides/intro/getting-started)**.
- Your TCPOS installation includes the **TCPOS.WebHook** module.
- Your stores are already connected to the corresponding cash register shops. Each Voucherly store must be linked to the shop it belongs to, otherwise the notifications arrive and Voucherly cannot tell which store they refer to.
- Your product catalogue is already synchronised from the cash register. Voucherly matches locked items to your products through the codes the synchronisation writes: a product that was never synchronised cannot be matched.

## Configuration

### Voucherly

1. Sign in to the Dashboard.
2. Go to **Impostazioni** > **Attività** > **[Integrazioni](https://dashboard.voucherly.it/merchant/integrations)** and click on TCPOS.
3. Click **Attiva**.
4. Expand the TCPOS row and copy the **webhook URL**. It is specific to your account and to the environment you are in: the sandbox URL and the production one are different, and they are not interchangeable.

### TCPOS

Hand the webhook URL to whoever administers your TCPOS installation. On their side:

1. Register the URL as the destination of the article saleability notifications on **TCPOS.WebHook**.
2. Set `ordersNotificationLegacyMode: false`.

:::warning
Without `ordersNotificationLegacyMode: false` the notifications are never sent, and **no error is reported anywhere** — neither on TCPOS nor on Voucherly. If nothing happens after locking an item, this is the first thing to check.
:::

## How it works

### Two independent controls

A product is offered only when **both** agree:

| Control | Who sets it | Where |
|---|---|---|
| Availability | you | Dashboard, on the product page, per store |
| Locked at the cash register | the cash register | automatically, not editable from the Dashboard |

Your own availability switch stays yours: you can still turn a product off for a store for a reason the cash register knows nothing about, such as a recipe you are not serving today. And the cash register cannot turn something back on that you deliberately turned off.

The reverse holds too: while an item is locked at the cash register the product is not offered, even with your switch on. On stock, the cash register is right — so a product locked there is unlocked **at the cash register**, not from the Dashboard.

### What you see in the Dashboard

On the product page, in the store grid, a **Bloccato in cassa** badge appears next to the availability switch for the stores where the cash register has locked that product. The switch stays editable: it controls your decision, not the cash register's.

### Scope

Availability per store governs the products Voucherly offers in that store, including the suggestions shown during pay-at-table. It does not restrict an online catalogue: if you also sell through an e-commerce site, an item locked at the cash register can still be ordered there.

## Troubleshooting

| What you see | What it usually means |
|---|---|
| You lock an item at the cash register and nothing changes in Voucherly | `ordersNotificationLegacyMode` is still `true`, or the webhook URL was not registered — or was registered on the wrong environment |
| A whole store never updates | that store is not linked to the shop the notifications refer to |
| Some items get blocked, others never do | the items that never get blocked were not synchronised from the cash register, so Voucherly has nothing to match them to |
| A product stays blocked after you restocked it | the lock is still on at the cash register: it is released there, not from the Dashboard |

:::info support

- Email support@voucherly.it.
- Submit a support request at [voucherly.it/contattaci](https://voucherly.it/contattaci).
:::
