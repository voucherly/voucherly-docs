---
sidebar_position: 4
description: "Implement Voucherly's server-to-server (S2S) callback to reliably receive payment results, handle retries and prevent payment loss."
keywords:
  - Voucherly S2S callback
  - server-to-server
  - webhook
  - payment notification
  - callback retry
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Callback S2S

Server-to-Server (S2S) communication occurs between Voucherly's server and the merchant's server at the end of a checkout phase to notify the merchant about the payment result.

We recommend using it, as not doing so could lead to missed payments or mishandling of payment information.

## Prerequisites

You must set a webhook endpoint, which is a URL that:

- Doesn't include port numbers.
- Is publicly accessible, or has Voucherly on your allow list.
- Uses HTTPS - We don't accept HTTP for security reasons.

## Development Guide

### 1. Configure your endpoint

The merchant's endpoint URL must be specified when creating the payment via the [Create Payment API](/api/webapi/create-payment).

When the customer leaves the Voucherly Checkout page after a successful payment Voucherly attempts to contact the merchant's server before redirecting the customer to the merchant's website.

Merchants need to configure an endpoint that accepts a POST request with a JSON body containing a subset of the Payment properties.

:::info
Voucherly ensures that the callback is delivered synchronously. You can rely on this mechanism with confidence.
If your server encounters an error during callback handling, Voucherly will automatically cancel and refund the payment to prevent inconsistencies.
:::

### 2. Handle callbacks

#### Request

- **Id** *(string)*  
  Unique identifier of the payment.  
- **Tenant** *(string)*  
  Indicates the environment: *live* or *sand*.  
- **Mode** *(string)*  
  The mode of the payment: `Payment` or `Wallet`.  
- **ReferenceId** *(string)*  
  A unique string to reference the payment (e.g., customer ID, cart ID) for reconciliation with internal systems.  
- **MerchantId** *(string)*  
  The merchant's identifier.  
- **CustomerId** *(string)*  
  The ID of the customer for this payment.  
- **TotalAmount** *(long)*  
  The total amount before discounts.  
- **DiscountAmount** *(long)*  
  The discounted amount.  
- **FinalAmount** *(long)*  
  The final amount, calculated as `TotalAmount` - `DiscountAmount`.  
- **PaidAmount** *(long)*  
  The amount actually paid.  
- **PaidVoucherAmount** *(long)*  
  The portion of the payment paid using vouchers.  
- **Amount** *(long)*  
  The net amount of this payment.  
- **Status** *(string)*  
  The current status of the payment: `Requested`, `Paid`, `Confirmed`, `Refunded`, `Cancelled`, `Voided`, or `Expired`.  

Below is an example of the S2S request body sent by Voucherly.

```json
{
    "id": "pay_7orq17rP3Kx",
    "tenant": "sand",
    "mode": "Payment",
    "referenceId": "eb8f57f8-241b-4142-b7b0-d308d724541a",
    "merchantId": "7C9E6679-7425-40DE-944B-E07FC1F90AE7",
    "customerId": "cs_XR6jxrbJAqM",
    "totalAmount": 750,
    "discountAmount": 50,
    "finalAmount": 700,
    "paidAmount": 700,
    "paidVoucherAmount": 0,
    "amount": 700,
    "status": "Paid"
}
```

:::warning
Since the merchant S2S endpoint does not require any authentication setup, it is recommended to call the [Get Payment API](/api/webapi/retrieve-payment) to validate that the request originates from Voucherly. This API provides all the necessary information about the payment.
:::

#### Response

The merchant server must respond with an HTTP `200 OK` status code and a JSON body in the following format:

- **Ok** *(bool)*  
  Indicates whether the S2S request was successfully processed by the merchant server.
- **OrderId** *(string?)*  
  The unique identifier of the order in the merchant's system.
- **Stop** *(bool?)*  
  If true, Voucherly will not make further attempts to call the callback endpoint, regardless of the response status or the `Ok` field.
- **error** *(string?)*  
  Merchant error message. Useful only for investigation purposes.

```json
{
    "ok": true,
    "orderId": "<order_id>"
}
```

Until we receive an expected response we resend the notification up to 3 times.

:::warning
If the issue persists, the payment will be cancelled, and all transactions will be refunded.
:::

If the error is *handled* and you are not interested in a retry, you can specify `stop` as `true`.

```json
{
    "ok": false,
    "stop": true,
    "error": "An error occurred and I'm not interested in a retry"
}
```

### Multiple callbacks and Wallet payments

Callbacks are sent every time a user completes a checkout flow successfully. In certain scenarios, multiple callbacks may occur.

For example, if the payment initiated by the merchant is in **Payment** mode, and the customer decides to charge their wallet during the process, Voucherly handles this wallet charge as a separate payment. This separate payment is linked to the original merchant-initiated payment using the `ParentPaymentId` property and is assigned the **Wallet** mode.

For more details, refer to the [Charge Wallet](/guides/use-cases/charge-wallet) use case.

:::warning
Voucherly reserves the right to call the callback endpoint in the future for every payment status update. Ensure your endpoint is robust and capable of processing multiple callback attempts seamlessly.
:::

### Callback and Direct payments

When working with **Direct payments**, such as those initiated by specifying  `customerPaymentMethodId` or `selectedPaymentGateway` in the [Create Payment API](/api/webapi/create-payment) request, you can always rely on the server-to-server (S2S) callback to trigger your internal processing logic.

It is crucial to understand that a `Confirmed` or `Paid` status does not invariably guarantee successful processing of the callback by your system. In scenarios where the callback fails to process successfully, despite the payment being technically confirmed, **Voucherly will automatically detect the failure and initiate a refund shortly thereafter**. To identify such occurrences, you must inspect the `closeCheckout.success` property within the API response. A `false` value for this property indicates a callback failure.

Here is an example of such a case — a payment marked as `Confirmed` but whose callback failed:

```json
{
    "id": "my-payment-id-1",
    "tenant": "live",
    "mode": "Payment",
    "customerId": "my-customer-id-1",
    [...]
    "checkoutUrl": "https://example.voucherly.it/checkout",
    "callbackUrl": "https://api.myecommerce.com/webhook/payment",
    "closeCheckout": {
        "success": false,
        "date": "2025-01-01T10:00:00.0000000+02:00",
        "errorReason": "Payment.Callback"
    },
    "callback": {
        "success": false,
        "date": "2025-01-01T10:00:00.0000000+02:00"
    },
    "status": "Confirmed",
    [...]
}
```

:::warning
The `status` field alone is not sufficient to determine the final outcome of a direct payment. Always check `closeCheckout.success` to ensure that the callback was processed correctly by your system.
:::

## Why?  Payment loss! {#why}

As previously mentioned, every payment should be handled by callback.
If the callback is not properly handled, it can lead to potential payment losses, especially in e-commerces.

Relying only on the Voucherly's redirection to your website for payment confirmation is not recommended.

To illustrate this further, consider the following scenario:

1. During the checkout process, the user chooses Voucherly as their payment method.
1. The user is redirected to Voucherly Checkout page and pay.
1. The user closes their web browser before being redirected to merchant's website.
1. In this scenario, while Voucherly effectively processes the transaction, failure to appropriately manage callbacks on the e-commerce side can lead to the incorrect generation of an order.
