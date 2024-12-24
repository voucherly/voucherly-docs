---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Accordion from '@site/src/components/Accordion';

# Accept a payment

Use a prebuilt checkout page to start accepting online payments.

<!-- ## Restrict Available Payment Gateways

Merchants can dynamically specify which payment gateways are available for each payment by providing an array of payment gateway IDs in the [Create Payment API](/api/webapi/create-payment) request (see [here](/guides/resources/payment-gateways) for a full list).

If you do not require this feature, leave the `PaymentGateways` field empty and manage gateway activation/deactivation from the Dashboard.

## Wallet Charge During Payment

On the Voucherly Checkout page, if Wallet functionality is enabled, customers can top up their wallet credit to use for current or future payments.

This process is entirely managed by Voucherly and requires no additional integration from the merchant.

If a wallet charge occurs within the payment flow, a new payment object will be created with:
- `Mode` set to `Wallet`.
- `ParentPaymentId` referencing the original payment.

## Complete or Refund a Payment

A payment may consist of multiple transactions across different payment gateways, with varying outcomes (some successful, others not).

As detailed in [this guide](/guides/resources/payments), after the customer completes the payment and is redirected to the merchant's website, successful transactions may have a status of either `PAID` or `CONFIRMED`. This depends on factors like the type of payment gateway or whether [Auto Confirm](/guides/resources/payments#auto-confirm) is enabled.

:::warning
Transactions completed through voucher payment gateways automatically transition to the `CONFIRMED` status.
:::

Merchants must confirm or refund payments. Leaving a payment in the `PAID` status could result in the funds being returned to the customer, depending on the gateway configuration. Always confirm successful payments, for example, when the order is prepared or shipped. -->

## Quick Guide

Let’s walk through a simple example of integrating the payment flow from scratch.

### 1. Redirect your customer to Voucherly Checkout

<Tabs groupId="flow" queryString>
<TabItem value="checkout" label="Hosted checkout">

The simplest and preferred way to integrate Voucherly is to use Voucherly Checkout as a single checkout page for all your Payment gateways.

Add a checkout button to your website that calls a server-side endpoint to create a Payment in Voucherly.

</TabItem>

<TabItem value="gateway" label="Advanced gateway integration">

You can build a custom payments integration by displaying Payment gateway components on your site.

Voucherly offers a [GET Payment gateway API](/api/webapi/get-payment-gateways) to fetch the active and available payment gateways for your merchant account.

Use this to dynamically display specific Payment gateways on your website, instead of generic labels like *Voucherly* or *Pay online*. Once the customer selects a Payment gateway, call a server-side endpoint to create a Payment in Voucherly.

Additionally, Voucherly provides a [GET Customer payment methods API](/api/webapi/get-customer-payment-methods) to retrieve a customer's saved payment methods.
This lets you display their preferred Payment methods upfront, enabling seamless direct charges and further reducing friction during the checkout process.

</TabItem>
</Tabs>


:::info
Refer to the [Create Payment API](/api/webapi/create-payment) for detailed functionality and usage.
:::


You can also create a Payment for an existing customer, allowing you to prefill the checkout form with their contact details and unify their purchase history. A Payment represents the experience your customer sees when redirected to the payment form. You can configure it with options such as:

- **Lines**. Specify the items to charge for. For each item, the `isFood` field determines whether it can be paid with vouchers.
- **Discounts**. Define the discounts applied to cart.

Ensure you set `redirectOkUrl` to the URL of a page on your website where the customer is redirected after successful payment. You can also provide a `redirectKoUrl` for a page on your website where the customer is redirected if they cancel the payment process.

:::info
Payments expire 24 hours after creation by default.
:::


<Tabs groupId="flow" queryString>
<TabItem value="checkout" label="Hosted checkout">

**Example request**

```json
{
    "mode": "Payment",
    "customerEmail": "mario.rossi@voucherly.it",
    "customerFirstName": "Mario",
    "customerLastName": "Rossi",
    "redirectOkUrl": "https://{redirect_host}}/payment/success",
    "redirectKoUrl": "https://{{redirect_host}}/payment/error",
    "callbackUrl": "https://{{s2s_host}}/payment/s2s",
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

</TabItem>

<TabItem value="gateway" label="Advanced gateway integration">

Specify the selected Payment gateway using the `selectedPaymentGateway` parameter or the Customer payment method using the `customerPaymentMethodId` parameter.

**Example request**

```json
{
    "mode": "Payment",
    "selectedPaymentGateway": "GATEWAY",
    "customerPaymentMethodId": "my-customer-method-1",
    "customerEmail": "mario.rossi@voucherly.it",
    "customerFirstName": "Mario",
    "customerLastName": "Rossi",
    "redirectOkUrl": "https://{redirect_host}}/payment/success",
    "redirectKoUrl": "https://{{redirect_host}}/payment/error",
    "callbackUrl": "https://{{s2s_host}}/payment/s2s",
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

</TabItem>
</Tabs>



After creating a Payment, redirect your customer to the `checkoutUrl` returned in the response.


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

It’s important for your customers to see a success or error page after submitting the payment form.

When a customer completes payment on the Voucherly Checkout page, they are redirected to the URLs specified in the [Create Payment API](/api/webapi/create-payment) request:
- If the payment is successful, the customer is redirected to the `redirectOkUrl`.
- If the payment fails, the customer is redirected to the `redirectKoUrl`.

Payment information is passed via the query string:

- **success**. Indicates the Payment result (`OK` for success, `KO` for failure).
- **status**. The status of the Payment.
- **paymentId**. The unique Voucherly identifier for the Payment.
- **referenceId**. The merchant's custom reference ID.
- **amount**. The total paid amount in cents.
- **voucherAmount**. The portion of the paid amount covered by vouchers in cents.
- **walletAmount**. The portion of the paid amount covered by wallet credit in cents.
- **transactions**. The number of transactions involved in the Payment.
- **customerId**. The unique Voucherly identifier for the customer.
- **customerEmail**. The customer's email address.
- **customerFirstName**. The customer's first name.
- **customerLastName**. The customer's last name.
- **tenant**. *live* or *sand*.


## Next steps

<Accordion>
    <>
        ### Prefill customer data
    </>
    <div>
        If you’ve already collected your customer’s information, you can include the `customerEmail`, `customerFirstName`, `customerLastName` parameters when creating the Payment.
    </div>
</Accordion>

<Accordion>
    <>
        ### Separate authorization and confirm
    </>
    <>
        :::tip
        Please refer to [Understanding payments](/guides/resources/understanding-payments) for a complete guide on how payments work in Voucherly.
        :::

        Voucherly supports two-step card payments, allowing you to first authorize a card and capture the funds later. When Voucherly authorizes a payment, the card issuer guarantees the funds and places a hold for the payment amount on the customer’s card. You then have a specified timeframe to capture the funds (depending on the card, usually 5 days). If the payment is not captured before the authorization expires, the payment is canceled, and the issuer releases the held funds.

        To enable this process, set the `isAutoConfirm` parameter to `false` when creating the Payment. This instructs Voucherly to authorize the amount on the customer’s card without capturing it immediately.

        :::warning
        If no value is specified, the default behavior defined in **Configurazione merchant > Checkout > Contabilizzazione automatica**  will be applied.
        :::

        To confirm a payment, you can use either the Dashboard or the [Confirm Payment API](/api/webapi/confirm-payment).

        If the order cannot be fulfilled or the customer cancels before shipment, use the [Refund Payment API](/api/webapi/refund-payment). Voucherly will:
        - Automatically cancel transactions in the `PAID` status.
        - Refund transactions in the `CONFIRMED` status.
    </>
</Accordion>