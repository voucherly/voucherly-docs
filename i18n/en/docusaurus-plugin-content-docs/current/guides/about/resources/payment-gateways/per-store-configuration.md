---
sidebar_position: 5
description: "Assign the right payment gateway account to each location in Voucherly using payment accounts, payment configurations and the default configuration fallback."
keywords:
  - per-store configuration
  - payment accounts
  - payment configuration
  - multi-location
  - chain
  - Voucherly
---

# Per-store configuration

Voucherly lets you decide **which payment gateway account is used by each of your locations**. This is useful when you run more than one store, or when the same gateway (e.g. Satispay or Edenred) is activated separately for each location.

The model has three levels:

- **Payment account** — a single activation of a gateway (for example one Satispay store, or one Edenred MID). It holds the credentials you enter in the Dashboard.
- **Payment configuration** — a named bundle of one or more payment accounts. Every merchant has a **default configuration** that applies automatically to all locations without a specific one.
- **Location** (*Sede*) — a point of sale. Each location can be assigned a payment configuration.

:::info
A **Location** is never linked to a payment account directly. It points to a **payment configuration**, which in turn contains one or more accounts. Change the configuration assigned to a location to change which accounts that location uses.
:::

## Single location

If you have a single store (for example one e-commerce), you don't need to configure anything per location:

1. Create one payment account for the gateway in **Impostazioni > Pagamenti > [Account di pagamento](https://dashboard.voucherly.it/settings/payment/payment-accounts)**.
2. Keep it in the **default configuration**.

The default configuration is applied automatically, so payments will use that account.

## Multiple locations / chain

If you run several locations — or the gateway is activated separately per location (for example one Satispay store code per shop, or a different Edenred MID per shop) — create **one payment account per activation** and assign each account to the right location:

1. In **Impostazioni > Pagamenti > [Account di pagamento](https://dashboard.voucherly.it/settings/payment/payment-accounts)**, create one account for each activation (give each a name that identifies the location).
2. Group the accounts into **[payment configurations](https://dashboard.voucherly.it/settings/payment/payment-gateways)** (one configuration per location, or per group of locations that share the same account).
3. Assign each configuration to its location, in one of two ways:
   - From the location: **Impostazioni > [Sedi](https://dashboard.voucherly.it/settings/store)** → open the location → field *"Configurazione di pagamento"*.
   - From the configuration: *"Gestisci configurazione"* → field *"Punti vendita assegnati"*.

:::tip
The **default configuration** stays the fallback: any location you don't assign explicitly keeps using it.
:::
