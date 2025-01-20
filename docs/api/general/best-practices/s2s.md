---
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Callback S2S

Server-to-Server (S2S) communication occurs between Voucherly's server and the merchant's server at the end of a checkout phase to notify the merchant about the payment result.

We recommend using it, as not doing so could lead to missed payments or mishandling of payment information.

## Prerequisites

You must set a webhook endpoint, which is a URL that:
- Doesn't include port numbers.
- Is publicly accessible, or has MultiSafepay on your allow list.
- Uses HTTPS - We don't accept HTTP for security reasons.

## Development Guide

### 1. Configure your endpoint

The merchant's endpoint URL must be specified when creating the payment via the [Create Payment API](/api/webapi/create-payment).

When the customer leaves the Voucherly Checkout page after a successfull payment Voucherly attempts to contact the merchant's server before redirecting the customer to the merchant's website.

Merchants need to configure an endpoint that accepts a POST request with a JSON body containing a subset of the Payment properties.

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
    "tenant": "sand"
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
    "status": "Paid",
}
```
:::warning
Since the merchant S2S endpoint does not require any authentication setup, it is recommended to call the [Get Payment API](/api/webapi/get-payment) to validate that the request originates from Voucherly. This API provides all the necessary information about the payment.
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
  Merchant error message. Usefull only for investigation purposes. 

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


## Why?  Payment loss! {#why}

As previously mentioned, every payment should be handled by callback.
If the callback is not properly handled, it can lead to potential payment losses, especially in e-commerces.

Relying only on the Voucherly's redirection to your website for payment confirmation is not recommended.

To illustrate this further, consider the following scenario:

1. During the checkout process, the user chooses Voucherly as their payment method.
1. The user is redirected to Voucherly Checkout page and pay.
1. The user closes their web browser before being redirected to merchant's website.
1. In this scenario, while Voucherly effectively processes the transaction, failure to appropriately manage callbacks on the e-commerce side can lead to the incorrect generation of an order.


