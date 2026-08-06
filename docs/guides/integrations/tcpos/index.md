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

:::note Available in sandbox
The integration is currently available in the **sandbox** environment. It will reach production at the end of the pilot phase: until then the TCPOS row does not appear in the Integrazioni page of a production account.
:::

## Prerequisites

- Read **[Getting started with a Voucherly account](/guides/intro/getting-started)**.
- Your TCPOS installation includes the **TCPOS.WebHook** module.
- **TCPOS.WebHook is reachable from Voucherly's servers.** Activating the integration is what registers the subscription on your cash register, so the connection has to work in that direction too — not only from your installation towards us. Whoever administers your TCPOS needs to publish the module on an address we can reach, with a valid certificate if it is served over HTTPS.
- **If WOnD authentication is enabled** on your TCPOS.WebHook, the credentials of a WOnD user. It is disabled by default, and it is enabled by configuring a WOnD server in the module's `appsettings.json`. Ask for a dedicated user with the least privileges that still allows managing webhooks: those credentials are stored in Voucherly.
- Your stores are already connected to the corresponding cash register shops. Each Voucherly store must be linked to the shop it belongs to, otherwise the notifications arrive and Voucherly cannot tell which store they refer to.
- Your product catalogue is already synchronised from the cash register. Voucherly matches locked items to your products through the codes the synchronisation writes: a product that was never synchronised cannot be matched.

## Configuration

### Voucherly

1. Sign in to the Dashboard.
2. Go to **Impostazioni** > **Attività** > **[Integrazioni](https://dashboard.voucherly.it/merchant/integrations)** and click on TCPOS.
3. Expand the TCPOS row, open the parameters and fill in the **address of your TCPOS.WebHook** — the full URL including the port, for example `https://wond.yourdomain.it:9797`. Fill in the WOnD user and password only if authentication is enabled on your installation.
4. Click **Attiva**. This is the step that registers the subscription on your cash register: Voucherly calls TCPOS.WebHook and asks it to send the article saleability notifications to its own address.

:::warning
If the registration fails, the integration is **not** activated and the Dashboard tells you why: wrong address, service unreachable, or rejected credentials. There is no half-activated state — "Attivato" always means the subscription exists on your cash register.
:::

Once activated, the accordion also shows the **URL registered on TCPOS.WebHook**. There is nothing to do with it: it is there so that you and our support can compare it with what you see on your TCPOS.

### TCPOS

Two things remain on the side of whoever administers your TCPOS installation, and neither can be done through the API:

1. Set `ordersNotificationLegacyMode: false` in the TCPOS.WebHook `appsettings.json`, then restart the service.
2. Make the module reachable from Voucherly, and create the WOnD user if authentication is enabled.

:::warning
Without `ordersNotificationLegacyMode: false` the notifications are never sent, and **no error is reported anywhere** — neither on TCPOS nor on Voucherly. The subscription is registered and everything looks healthy. If nothing happens after locking an item, this is the first thing to check.
:::

:::caution
Do not change the WOnD user after activating. TCPOS only shows each user the webhooks they created: with different credentials Voucherly no longer sees the subscription it registered, would create a duplicate, and could not remove the first one. If the credentials have to change, deactivate the integration first and activate it again afterwards.
:::

## How it works

The cash register does not notify the instant an item is locked: TCPOS.WebHook checks for events to send at a fixed interval, 30 seconds by default, set in its `appsettings.json`. Expect a delay of that order between locking an item at the till and the product disappearing from Voucherly.

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
| Activation fails | the address is wrong, the service is not reachable from Voucherly, or the credentials were rejected. The message says which one |
| The **Attiva** button is greyed out | the address of TCPOS.WebHook has not been filled in yet |
| The change arrives, but late | normal: TCPOS.WebHook sends events at an interval, 30 seconds by default. Whoever administers your TCPOS can shorten it |
| You lock an item at the cash register and nothing changes in Voucherly | `ordersNotificationLegacyMode` is still `true`, or the subscription was removed on the TCPOS side after activation |
| Everything worked, then stopped after a change on the TCPOS side | the subscription may have been removed. Open the parameters and use **Aggiorna**: it registers it again |
| A whole store never updates | that store is not linked to the shop the notifications refer to |
| Some items get blocked, others never do | the items that never get blocked were not synchronised from the cash register, so Voucherly has nothing to match them to |
| A product stays blocked after you restocked it | the lock is still on at the cash register: it is released there, not from the Dashboard |

:::info support

- Email support@voucherly.it.
- Submit a support request at [voucherly.it/contattaci](https://voucherly.it/contattaci).
:::
