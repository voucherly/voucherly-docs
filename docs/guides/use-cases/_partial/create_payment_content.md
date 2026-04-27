<>
    :::info
    Refer to the [Create Payment API](/api/webapi/create-payment) for detailed functionality and usage.
    :::


    You can also create a Payment for an existing customer, allowing you to prefill the checkout form with their contact details and unify their purchase history. A Payment represents the experience your customer sees when redirected to the payment form. You can configure it with options such as:

    - **Lines**. Specify the items to charge for. For each item, the `product.isFood` field determines whether it can be paid with vouchers.
    - **Discounts**. Define the discounts applied to cart.

    Ensure you set `redirectOkUrl` to the URL where the customer is redirected after successful payment. You can also provide a `redirectKoUrl` where the customer is redirected if they cancel the payment process.

    :::info
    Payments expire 24 hours after creation by default.
    :::
</>