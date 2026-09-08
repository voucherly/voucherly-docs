---
sidebar_position: 20
description: "Enable Google Pay on a custom domain with Voucherly: submit your site for Google approval and go live via MultiSafepay, Nexi or Stripe."
keywords:
  - Google Pay
  - custom domain
  - Google Pay Business Console
  - PSP integration
  - Voucherly
  - go live
---


# Google Pay

:::info

- By processing Google Pay payments, you agree to the [Google API Terms of Service](https://payments.developers.google.com/terms/sellertos).
- When integrating Google Pay into your ecommerce platform, you must follow [Google's brand guidelines](https://developers.google.com/pay/api/web/guides/brand-guidelines).
- For more information, see [Google Pay – Overview](https://developers.google.com/pay/api/web/overview).

:::

:::warning
Integration with Google Pay is not a direct integration. A supported PSP is required:

- MultiSafepay
- Nexi
- Stripe

:::

Voucherly complies with all technical and UX standards set by Google Pay. Activation for a custom domain requires Google Pay approval.

:::info
If you don't use a custom domain you don't need this guide. Google Pay can be directly activated in **Impostazioni > Pagamenti > [Gateway di pagamento](https://dashboard.voucherly.it/settings/payment/payment-gateways)** on the Voucherly Dashboard.
:::

## Submit your details for approval

Go to [Google Pay's Business Console](https://pay.google.com/business/console/) and submit your business details and add the websites where you want to enable the Google Pay button.

### Provide your business details

1. Under **Business Profile**, click **Get started**.
1. Complete both the **Business identity** and **Business information** sections
1. Click **Save**.

### Send your website details for approval

:::info
Every website where you want to implement the Google Pay button must be approved.
:::

1. Under **Google Pay API**, click **Create an integration**.
1. Click **Get started**, accept the terms and conditions and click **Continue**
1. Under **Integrate with your website**, click **Add website**.
1. Add the website where you want to integrate **Google Pay direct**.
1. Set the **Google Pay API integration** type to **Gateway**.
1. Upload the requested screenshots for each section of your website. You can activate Google Pay in the Voucherly sandbox environment.
    - See [Payment method screen](/download/google-pay/Payment%20method%20screen.png) or download <a target="_blank" download href="/download/google-pay/Payment method screen.png">here</a>.
    - See [Google Pay API payment screen](/download/google-pay/Google%20Pay%20API%20payment%20screen.png) or download <a target="_blank" download href="/download/google-pay/Google Pay API payment screen.png">here</a>.
1. Click **Save**.

Once all details have been provided and approved, go to **Google Pay API**. In the form, check every box once you have confirmed that all steps have been cleared. Click **Submit for approval**.

## Production environment and Go live

:::warning
You need an active Voucherly account to configure Google Pay in the live environment. If you haven’t done so yet, [activate your account](/guides/start-building/activate-account) by providing your company information.
:::

Once Google approves your website, you can get the merchant ID and merchant name from your [Google Pay Business Console](https://pay.google.com/business/console/).

1. Configure the merchant ID in **Impostazioni > Pagamenti > [Gateway di pagamento](https://dashboard.voucherly.it/settings/payment/payment-gateways)** on the Voucherly Dashboard. Use live environment.
1. Depending on your PSP, additional steps or configurations may be required. Visit the reference documentation for more information.

Now you're ready to accept Google Pay with Voucherly!
