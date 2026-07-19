---
sidebar_position: 15
description: "Accept Satispay with Voucherly in a single integration that also handles meal vouchers and Fringe Benefit: create a store, connect its activation code, go live."
keywords:
  - Satispay
  - Satispay Business
  - meal vouchers
  - Fringe Benefit
  - activation code
  - Voucherly
---


# Satispay

Voucherly integrates Satispay with a **single integration** that accepts, in the same transaction and transparently:

- **Satispay** — the standard digital payment.
- **Buoni Pasto** (meal vouchers).
- **Fringe Benefit** (welfare / fringe benefit).

You don't configure these separately: if your Satispay business is enabled for meal vouchers or welfare benefit, they simply work alongside standard Satispay. Voucherly reads back how each payment is split (digital / meal voucher / fringe) from Satispay.

Activation only requires you to create a Satispay **store** and connect its activation code to Voucherly.


## Become a partner

To accept Satispay with Voucherly you need a **Satispay Business** account and at least one **store** (*negozio*).

1. Sign in to [dashboard.satispay.com](https://dashboard.satispay.com) and create a store — see [Negozi](https://support.satispay.com/it/articles/negozi).
   - Choose **E-commerce web** for a single online store.
   - Choose **Punto vendita fisico** for a physical location.
2. Get the store's **activation code** — see [Codice di attivazione](https://support.satispay.com/it/articles/codice-di-attivazione). You will paste this code into Voucherly.

:::info
Each Satispay store has its own activation code. One store = one activation code = one payment account in Voucherly. If you run more than one location, create one store per location and see [Per-store configuration](./per-store-configuration.md).
:::


## Configuration

Configure Satispay in **Impostazioni > Pagamenti > [Gateway di pagamento](https://dashboard.voucherly.it/settings/payment/payment-gateways)** on the Voucherly Dashboard:

1. Create a new Satispay payment account and give it a name that identifies the store.
2. Set the parameters below and save.

| Parameter | Value |
|-|-|
| **Environment** | *Produzione* for live payments, *Staging* for testing. |
| **Token** | The store **activation code** from your Satispay Business dashboard. |

That's it: Voucherly generates the signing keys and the `KeyId` automatically and validates the credentials. No other value needs to be entered by hand.

:::warning
The activation code is single-use and tied to one store. If validation fails, generate a new activation code from the Satispay dashboard and paste it again.
:::

### Multiple locations

For a chain, or when Satispay is already activated separately for each shop, create **one payment account per store** and assign each one to its location. See **[Per-store configuration](./per-store-configuration.md)**.


## Meal vouchers & Fringe Benefit

Accepting **Buoni Pasto** and **Fringe Benefit** through Satispay does not require any extra setup in Voucherly — the same integration handles them.

- If your Satispay business is **already enabled** for meal vouchers / welfare benefit, they work right away.
- If you want to **enable** them, this depends on Satispay, not on Voucherly: contact **Satispay support** to request the activation.

:::info
Reach out via the [Satispay contacts page](https://www.satispay.com/it-it/contatti/). See also the merchant guide [Buoni Pasto Satispay per il tuo negozio](https://www.satispay.com/it-it/blog/welfare-benefits/configurare-satispay-accettare-buoni-pasto-nei-negozi/). On the Voucherly side everything is transparent — once your Satispay business is enabled, no configuration change is needed.
:::


## Go live

Once the account is configured with the *Produzione* environment and validated, you're ready to accept Satispay — including Buoni Pasto and Fringe Benefit — with Voucherly!
