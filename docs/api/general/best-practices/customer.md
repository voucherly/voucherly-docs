---
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Accordion from '@site/src/components/Accordion';

# Manage customer

Proper customer management is not only a technical best practice but also essential for enhancing user experience, streamline operations, and driving business success. 

This guide explains how and why to use registered customers with Voucherly.

## Development Guide

### 1. Prepare your request



<Tabs groupId="payment" queryString>
<TabItem value="first" label="First payment">

When creating a Payment, include the customer details.

**Example Request**

```json
{
    "mode": "Payment",
    [...]
    "customerEmail": "mario.rossi@voucherly.it",
    "customerFirstName": "Mario",
    "customerLastName": "Rossi",
    [...]
}
```

</TabItem>

<TabItem value="next" label="Next payment">

Before creating a Payment retrieve the Voucherly `customerId`. Then include it as part of the request payload to ensure proper processing

**Example Request**

```json
{
    "mode": "Payment",
    [...]
    "customerId": "my-customer-id-1",
    [...]
}
```

You can also pass the customer details to update them.

**Example Request**

```json
{
    "mode": "Payment",
    [...]
    "customerId": "my-customer-id-1",
    "customerEmail": "mario.rossi@voucherly.it",
    "customerFirstName": "Mario Luigi",
    "customerLastName": "Rossi",
    [...]
}
```


</TabItem>
</Tabs>

### 2. Handle the response

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

<Tabs groupId="payment" queryString>
<TabItem value="first" label="First payment">

If you haven't provided a `customerId` in your initial request, you should:
- Extract the `customerId` from the response.
- Save it to your database.
- Include it in subsequent requests for the same customer.

</TabItem>

<TabItem value="next" label="Next payment">

Since you've provided a `customerId` in your initial request, will automatically reference the corresponding existing Customer for the Payment.

No further action is required on your part.


</TabItem>
</Tabs>

<Accordion>
    <>
        ### Retrieve Customer Payment Methods
    </>
    <>
        
        Use the `GET Customer Payment Methods API` to fetch a customer's saved payment methods. This functionality can be used to:
        - Display the saved payment methods in the customer's profile page.
        - Reduce checkout time and increase conversion rates by offering direct access to the customer's preferred payment methods. 


        The Voucherly Checkout automatically displays all saved payment methods for the user. Therefore, there is no need to pre-display them in advance, as the checkout process already ensures a seamless and efficient user experience.

        If you use a custom integration, please refer to the [Online payment use case](/guides/use-cases/ecommerce/?flow=gateway) for a complete example.

        #### Custom integration workflow

        - Retrieve saved payment methods.
        - Display them on your website.
        - Use `customerPaymentMethodId` to preselect the customer’s preferred payment method when creating the Payment.

        **Example Request**

        ```json
        {
            "mode": "Payment",
            [...]
            "customerId": "my-customer-id-1",
            "customerPaymentMethodId": "my-customer-method-1",
            [...]
        }
        ```
    </>
</Accordion>



## Why? Benefits! {#why}

- **Streamline Checkout**.
   - Prefill customer details like name and email, reducing manual input.
   - Save customer preferences and payment methods for quicker future checkouts.
   - Reduce friction. For example, Payment gateways like Edenred use Single Sign-On (SSO). Voucherly can maintain active sessions, improving the purchase flow.
- **Simplified Reconciliation**. Associating every payment with a customer enables clear transaction tracking. This is particularly useful for managing refunds, sales analysis and accounting audits.