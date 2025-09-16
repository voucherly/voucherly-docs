<>
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
    - **customerId**. The unique Voucherly identifier for the customer.
    - **tenant**. *live* or *sand*.
</>