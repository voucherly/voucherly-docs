---
sidebar_position: 5
description: "Manage registered customers with Voucherly to streamline checkout, reuse saved payment methods and simplify payment reconciliation."
keywords:
  - Voucherly customer management
  - customerId
  - saved payment methods
  - checkout
  - reconciliation
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Accordion from '@site/src/components/Accordion';

# Manage customer

Proper customer management is not only a technical best practice but also essential for enhancing the user experience, streamlining operations, and driving business success.

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

Since you've provided a `customerId` in your initial request, the payment will automatically reference the corresponding existing Customer for the Payment.

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

        If you use a custom integration, please refer to the [Custom integration](/guides/online-payments/custom-integration) for a complete example.

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

## Use your own IDs {#reference-id}

You don't have to store the Voucherly `customerId`. Send the ID the customer has in your system as `customer.referenceId`: the Payment goes to the Customer with that reference, and creates it on the first Payment.

```json
{
    "mode": "Payment",
    [...]
    "customer": {
        "referenceId": "user-4821",
        "email": "mario.rossi@voucherly.it",
        "firstName": "Mario",
        "lastName": "Rossi"
    },
    [...]
}
```

A reference is unique among your Customers in each environment. You can also set it when you create or update a Customer, and find the Customer with `GET /v1/customers?referenceId=user-4821`. Giving a Customer a reference another Customer already has fails with `409 Conflict` and code `REFERENCE_ID_ALREADY_EXISTS`, and `customerId` in the response is the Customer that has it.

## Companies {#companies}

When your customers order as employees of a company, send the company with the Payment. Voucherly finds it by the ID it has in your system, so there is nothing to create in advance.

```json
{
    "mode": "Payment",
    [...]
    "customer": {
        "referenceId": "user-4821",
        "email": "mario.rossi@voucherly.it"
    },
    "company": {
        "referenceId": "company-318",
        "name": "Acme Srl",
        "joinCode": "ACME01"
    },
    [...]
}
```

- When no Company has `company.referenceId`, the Payment creates it with `name` and `joinCode`. A `joinCode` that is missing, is not 6 characters long or is used by another Company is replaced by one Voucherly generates: the Payment never fails because of it.
- When the Company exists with another `name`, the Payment renames it. The name in your system wins.
- `company` and `companyId` are alternatives: send one of them.

The Customer of the Payment then joins the Company and stays in it for the next Payments, however you identify it: by `customerId`, by `customer.referenceId` or by a verified email or phone.

| The Customer | What happens |
| --- | --- |
| is new | It is created in the Company. |
| has no Company | It joins the Company. |
| is already in the Company | Nothing changes. |
| is in another Company | It moves to the new Company, as when the person changes employer in your system. |

The same applies when you send `companyId` instead of `company`.

Outside Payments, keep the Company in step with your system: set `referenceId` when you create it, change `name`, `joinCode` or `referenceId` with `POST /v1/companys/{idOrCode}`, and find it with `GET /v1/companys?referenceId=company-318`. A `joinCode` or a `referenceId` another Company already has fails with `409 Conflict` and code `JOIN_CODE_ALREADY_EXISTS` or `REFERENCE_ID_ALREADY_EXISTS`, and `companyId` in the response is the Company that has it.

## Why? Benefits! {#why}

- **Streamline Checkout**.
  - Prefill customer details like name and email, reducing manual input.
  - Save customer preferences and payment methods for quicker future checkouts.
  - Reduce friction. For example, Payment gateways like Edenred use Single Sign-On (SSO). Voucherly can maintain active sessions, improving the purchase flow.
- **Simplified Reconciliation**. Associating every payment with a customer enables clear transaction tracking. This is particularly useful for managing refunds, sales analysis and accounting audits.
