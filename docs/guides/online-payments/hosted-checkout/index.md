---
sidebar_position: 1
description: "Accept online payments with the hosted Voucherly Checkout: create a Payment, redirect the customer, handle the S2S callback and show a success page."
keywords:
  - online payments
  - hosted checkout
  - Voucherly Checkout
  - ecommerce integration
  - Create Payment API
  - S2S callback
---

import Accordion from '@site/src/components/Accordion';
import PrefillCustomerTitle from './../../_partial/prefill_customer_title.md';
import PrefillCustomerContent from './../../_partial/prefill_customer_content.md';
import CreatePaymentContent from './../../_partial/create_payment_content.md';
import RedirectUrlContent from './../../_partial/redirect_url_content.md';

# Hosted checkout

Use a prebuilt checkout page, hosted by Voucherly, to start accepting online payments: your site creates a Payment and redirects the customer to it.

:::info Other ways to accept online payments
A payment form embedded in your own page, a checkout built on your own gateway selector, or a plugin for your e-commerce platform: see [Online payments](/guides/online-payments) to choose.
:::

## Quick Guide

Let’s walk through a simple example of integrating the payment flow from scratch.

### 1. Redirect your customer to Voucherly Checkout

The simplest and preferred way to integrate Voucherly is to use Voucherly Checkout as a single checkout page for all your Payment gateways.

Add a checkout button to your website that calls a server-side endpoint to create a Payment in Voucherly.

![Hosted checkout flow](./hosted_checkout.svg)

<CreatePaymentContent />

**Example request**

```json
{
    "mode": "Payment",
    "customerEmail": "mario.rossi@voucherly.it",
    "customerFirstName": "Mario",
    "customerLastName": "Rossi",
    "redirectOkUrl": "https://{{redirect_host}}/payment/success",
    "redirectKoUrl": "https://{{redirect_host}}/payment/error",
    "callbackUrl": "https://{{s2s_host}}/webhook/payment",
    "country": "IT",
    "lines": [
        {
            "quantity": 2,
            "unitAmount": 250,
            "unitDiscountAmount": 10,
            "discountAmount": 0,
            "product": {
                "externalId": "SKU-MUFFIN-001",
                "name": "Muffin al Cioccolato",
                "image": "https://cdn.trovaricetta.com/photo/2016/10/07/1771032/b/muffin-al-cioccolato-facilissimi.jpg",
                "isFood": true
            }
        }
    ],
    "discounts": [
        {
            "discountName": "Coupon",
            "discountDescription": "",
            "amount": 200
        }
    ]
}
```

After creating a Payment, redirect your customer to the `checkoutUrl` returned in the response.

:::tip QR code

When the consumer is physically purchasing in a Brick & Mortar store with a screen facing them, you can display the `checkoutUrl` as a QR code.

:::

**Example response**

```json
{
    "id": "my-payment-id-1",
    "tenant": "live",
    "mode": "Payment",
    "customerId": "my-customer-id-1",
    [...]
    "checkoutUrl": "https://example.voucherly.it/checkout",
    "status": "Requested",
    [...]
}
```

### 2. Handle before-redirect Callback S2S

Voucherly sends a callback when a customer successfully completes a Payment. This callback can be used to:

- Send an order confirmation email to your customer.
- Record the sale in a database.
- Initiate a shipping workflow.

It's highly recommended to listen for this callback instead of relying solely on the customer being redirected back to your website. Triggering actions only from your Checkout landing page can be unreliable.

Voucherly sends the callback to the endpoint specified as `callbackUrl` in the [Create Payment API](/api/webapi/create-payment) request.

Learn more in our [Callback S2S](/api/general/best-practices/s2s) guide.

:::warning
Make sure your endpoint processes callbacks correctly. Failure to do so may lead to payment cancellations and refunds.
:::

### 3. Show a success page

<RedirectUrlContent />

## Next steps

<Accordion>
    <PrefillCustomerTitle />
    <PrefillCustomerContent />
</Accordion>

<Accordion>
    <>
        ### Separate authorization and confirm
    </>
    <>
        :::tip
        Please refer to [How Payments work](/guides/about/resources/payments-lifecycle) for a complete guide on how payments work in Voucherly.
        :::

        Voucherly supports two-step card payments, allowing you to first authorize a card and capture the funds later. When Voucherly authorizes a payment, the card issuer guarantees the funds and places a hold for the payment amount on the customer’s card. You then have a specified timeframe to capture the funds (depending on the card, usually 5 days). If the payment is not captured before the authorization expires, the payment is canceled, and the issuer releases the held funds.

        To enable this process, set the `isAutoConfirm` parameter to `false` when creating the Payment. This instructs Voucherly to authorize the amount on the customer’s card without capturing it immediately.

        :::warning
        If no value is specified, the default behavior defined in **Attività > Checkout > Contabilizzazione automatica**  will be applied.
        :::

        To confirm a payment, you can use either the Dashboard or the [Confirm Payment API](/api/webapi/confirm-payment).

        If the order cannot be fulfilled or the customer cancels before shipment, use the [Refund Payment API](/api/webapi/refund-payment). Voucherly will:
        - Automatically cancel transactions in the `PAID` status.
        - Refund transactions in the `Confirmed` status.
    </>
</Accordion>
