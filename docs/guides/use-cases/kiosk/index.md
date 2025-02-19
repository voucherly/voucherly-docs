---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Accordion from '@site/src/components/Accordion';
import PrefillCustomerTitle from './../_partial/prefill_customer_title.md';
import PrefillCustomerContent from './../_partial/prefill_customer_content.md';
import GatewayFlowContent from './../_partial/gateway_flow_content.md';
import CreatePaymentContent from './../_partial/create_payment_content.md';
import RedirectUrlContent from './../_partial/redirect_url_content.md';

# Kiosk

Use Voucherly's Kiosk integration to process payments directly through self-service kiosks.

:::warning Hardware requirements
The kiosk must have:
- An internet connection.
- A display toward the user.
:::


## Quick Guide

Let’s walk through a simple example of integrating the payment flow for a kiosk.

:::info
This integration is designed to dynamically generate a QR code, enabling users to effortlessly scan it with their mobile devices and complete the payment process seamlessly.
:::

### 1. Display QR Code

You can use Voucherly as an intermediary to manage all your payments or integrate it as an additional payment method alongside your existing ones.

Add a checkout button to your kiosk and create a Payment in Voucherly.

![Kiosk flow](./kiosk.svg)

<CreatePaymentContent />

**Example request**

```json
{
    "mode": "Payment",
    "customerEmail": "mario.rossi@voucherly.it",
    "customerFirstName": "Mario",
    "customerLastName": "Rossi",
    "redirectOkUrl": "https://{redirect_host}}/payment/success",
    "redirectKoUrl": "https://{{redirect_host}}/payment/error",
    "country": "IT",
    "lines": [
        {
            "quantity": 2,
            "unitAmount": 250,
            "unitDiscountAmount": 10,
            "discountAmount": 0,
            "productName": "Muffin al Cioccolato",
            "productImage": "https://cdn.trovaricetta.com/photo/2016/10/07/1771032/b/muffin-al-cioccolato-facilissimi.jpg",
            "isFood": true
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

After creating the Payment, display the `checkoutUrl` returned in the response as a QR code on the kiosk screen.
Customers can scan the QR code using their mobile devices to access the payment page and complete the transaction.

:::tip
You can use a library like [qrcode.js](https://davidshimjs.github.io/qrcodejs/) or a server-side QR code generator to create and display the QR code.
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



### 2. Wait for payment completion

Since the kiosk doesn't allow incoming internet connections, the [Callback S2S](/api/general/best-practices/s2s/) mechanism may not be practical. 
Instead, you can use [Get Payment API](/api/webapi/get-payment/) with the `Voucherly-Wait-Time` header for long polling.

If the kiosk is offline but communicates via a server the [Callback S2S](/api/general/best-practices/s2s/) mechanism should be used. Long polling remains a valid approach for updating the kiosk interface.

 Once the payment is closed, any additional operations should be handled:
- Print receipts.
- Update local databases.
- Enable hardware (e.g. Open a locker).

:::tip
A Payment should not be considered closed if its status is `REQUESTED`.\
Please refer to the [Understanding payment resource](/guides/resources/understanding-payments/#payment-statuses) for more information about payment statuses.
:::

:::warning
After 10 minutes, it is recommended to stop the process and consider the payment cancelled. Continuing indefinitely may lead to unnecessary resource usage and delays in handling the transaction.
:::



### 3. Show a success page

#### Mobile device 

<RedirectUrlContent />

#### Kiosk

After the customer completes the payment on the Voucherly Checkout page, they can close their mobile device and seamlessly continue their order experience directly at the kiosk.

You are free to manage this phase independently, aligning with the best practices of your company.


## Next steps

<Accordion>
    <PrefillCustomerTitle />
    <PrefillCustomerContent />
</Accordion>

<Accordion>
    <>
        ### Display payment gateways
    </>
    <>
        :::info
        Please refer to [Online payment use case](./../ecommerce?flow=gateway) for a complete example.
        :::
        <GatewayFlowContent />
    </>
</Accordion>