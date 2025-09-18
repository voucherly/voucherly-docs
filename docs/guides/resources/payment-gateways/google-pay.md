---
sidebar_position: 2
---


# Google Pay

:::info
- By processing Google Pay payments, you agree to the [Google API Terms of Service](https://payments.developers.google.com/terms/sellertos).
- When integrating Google Pay into your ecommerce platform, you must follow [Google's brand guidelines](https://developers.google.com/pay/api/web/guides/brand-guidelines).
- For more information, see [Google Pay – Overview](https://developers.google.com/pay/api/web/overview).
:::

Voucherly complies with all technical and UX standards set by Google Pay. Activation requires Google Pay approval.

:::warning
Integration with Google Pay is not a direct integration. A supported PSP is required:
- MultiSafepay
- Nexi
- Stripe
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
1. Upload the requested screenshots for each section of your website. You can active Google Pay in Voucherly sandbox environment.
1. Click **Save**.

Once all details have been provided and approved, go to **Google Pay API**. In the form, check every box once you have confirmed that all steps have been cleared. Click **Submit for approval**.

## Production environment and Go live

:::warning
You need an active Voucherly account to configure Google Pay in the live environment. If you haven’t done so yet, [activate your account](/guides/intro/getting-started/activate-account) by providing your company information.
:::

Once Google approves your website, you can get the merchant ID and merchant name from your [Google Pay Business Console](https://pay.google.com/business/console/).

1. Configure the Merchant ID in **Attività > [Gateway di pagamento](https://dashboard.voucherly.it/Merchant/PaymentGateways)** on the Voucherly Dashboard. Use live environment.
1. Depending on your PSP, additional steps or configurations may be required. Visit the reference documentation for more information.


Now you're ready to accept Google Pay with Voucherly!
