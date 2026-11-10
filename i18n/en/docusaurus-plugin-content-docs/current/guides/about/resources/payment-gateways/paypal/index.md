---
title: PayPal
sidebar_position: 30
description: "Get your PayPal client ID and client secret from the PayPal Developer Dashboard and configure them in Voucherly for Sandbox and Live payments."
keywords:
  - PayPal
  - client ID
  - client secret
  - PayPal business account
  - Sandbox
  - Voucherly
---


# How to get PayPal client ID and client secret

:::warning
You must use a PayPal business account.
:::

1. Select [Log in to Dashboard](https://developer.paypal.com/dashboard/) and log in or sign up.
1. Select **Apps & Credentials**.
![PayPal business Dashboard](go-to-app.png)
1. Choose your environment (use Sandbox for test payments) and click **Create App** (or use the Default Application).
![App & Credentials page](sandbox-create.png)
1. Copy the client ID and client secret for your app.
![Copy client ID and client secret](copy-client-keys.png)
1. Configure these parameters in **Impostazioni > Pagamenti > [Gateway di pagamento](https://dashboard.voucherly.it/settings/payment/payment-gateways)** on the Voucherly Dashboard. Use the correct environment.

:::tip

- You get different keys for Sandbox and Live. Don’t mix them up.
- Keep your Client Secret private. Never share it publicly.
- If something doesn’t work, double-check the environment and credentials.

:::

## Enable Transaction Search for Treasury

Treasury reads your PayPal withdrawals to your bank, the payments they contain and the fee PayPal withheld on each one. It uses the same client ID and client secret you configured above, but PayPal only allows it once **Transaction Search** is enabled on that app. Until then, the gateway account shows that the credential cannot read payouts.

1. Select [Log in to Dashboard](https://developer.paypal.com/dashboard/) and log in with your PayPal business account.
1. Select **Apps & Credentials** and switch to **Live**.
1. Open the app whose client ID and client secret you saved in Voucherly.
1. In the **Features** section, select **Transaction search**.
1. Save the changes.

:::info

- PayPal can take up to 9 hours to grant access after you enable it. Treasury retries on its own several times a day, so you don't need to do anything else.
- Your client ID and client secret don't change: there is nothing to update in the Voucherly Dashboard.
- Payments keep working as before. Transaction Search only lets Voucherly read your transactions; it cannot move money.

:::
