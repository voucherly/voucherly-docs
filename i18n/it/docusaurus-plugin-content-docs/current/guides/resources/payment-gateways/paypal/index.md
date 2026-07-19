---
slug: /guide/risorse/gateway-di-pagamento/paypal
title: PayPal
sidebar_position: 30
description: "Ottieni client ID e client secret di PayPal dalla PayPal Developer Dashboard e configurali in Voucherly per i pagamenti Sandbox e Live."
keywords:
  - PayPal
  - client ID
  - client secret
  - account PayPal business
  - Sandbox
  - Voucherly
---


# Come ottenere client ID e client secret di PayPal

:::warning
Devi utilizzare un account PayPal business.
:::

1. Seleziona [Accedi alla Dashboard](https://developer.paypal.com/dashboard/) ed effettua il login o registrati.
1. Seleziona **Apps & Credentials**.
![Dashboard business PayPal](go-to-app.png)
1. Scegli il tuo ambiente (usa Sandbox per i pagamenti di test) e clicca **Create App** (oppure usa la Default Application).
![Pagina App & Credentials](sandbox-create.png)
1. Copia il client ID e il client secret della tua app.
![Copia client ID e client secret](copy-client-keys.png)
1. Configura questi parametri in **Impostazioni > Pagamenti > [Gateway di pagamento](https://dashboard.voucherly.it/settings/payment/payment-gateways)** nella Dashboard di Voucherly. Utilizza l'ambiente corretto.


:::tip
- Ottieni chiavi diverse per Sandbox e Live. Non confonderle.
- Mantieni privato il tuo Client Secret. Non condividerlo mai pubblicamente.
- Se qualcosa non funziona, ricontrolla l'ambiente e le credenziali.
:::
