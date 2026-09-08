---
sidebar_position: 1
description: "Understand how Voucherly Payments work: authorization and capture, two-step processing, and the full list of Payment and Transaction statuses."
keywords:
  - payment lifecycle
  - authorization and capture
  - payment statuses
  - transaction statuses
  - two-step payment
  - Voucherly
---

# How Payments work

### Learn how Payments work within the payment flow

In Voucherly, a Payment is a logical entity that manages the user's checkout experience. Each Payment can include multiple Transactions, where each Transaction represents a payment attempt using a specific Payment gateway.

Typically, Voucherly payment processing follows a two-step approach:

- **Authorization**. After the customer provides their payment details, the system verifies the availability of funds and places them on hold.
- **Capture**. The held funds are then withdrawn from the customer’s account, processed, and transferred to the merchant’s account.

This process ensures a secure and reliable payment flow.

Separating authorization and capture is useful when additional actions are needed between confirming a customer's ability to pay and collecting their payment. For example, if you’re selling stock-limited items, you may need to confirm that the item is still available before capturing the payment and completing the order. You can follow this workflow:

1. Confirm that Voucherly has authorized the customer’s payment method.
2. Check your inventory management system to confirm the item is still available.
3. Update your inventory system to reflect that the item has been purchased.
4. Capture the customer’s payment.
5. Notify the customer whether their purchase was successful on the confirmation page.

Please look at [Separate authorization and confirm](/guides/online-payments/hosted-checkout#separate-authorization-and-confirm) for more technical information.

:::warning
Meal voucher Payment gateways do not support two-step process, and neither do the wallet, the prepaid quota and a few providers — Satispay, SumUp and Adyen among them. Their transactions are captured at checkout, so a Payment paid only with them is `Confirmed` as soon as the customer pays, while a Payment paid with a card or PayPal stays `Paid` until you confirm it. Your integration should read the `status` of the Payment rather than assume it from the payment method.
:::

:::tip
You can define the default behaviour in **Impostazioni > Pagamenti > [Gateway di pagamento](https://dashboard.voucherly.it/settings/payment/payment-gateways) > Contabilizzazione automatica**. When enabled, all transactions are automatically captured at the end of a payment.
:::

### When a Payment closes {#completion-mode}

A Payment can be paid with more than one Transaction — a meal voucher for part of the amount, a card for the rest. `completionMode`, set in [Create a Payment](/api/webapi/create-payment), decides when the Payment stops asking for more:

- **Standard** (default). The Payment closes when the whole amount is covered. After a partial Transaction the checkout asks for the remaining amount with another payment method.
- **Partial**. The Payment closes with the first successful Transaction, whatever it covers, and the remaining amount is not collected. Use it when the rest is settled elsewhere — at the till, or with a later Payment.
- **AnyTransaction**. As `Partial`.

### Payment statuses {#payment-statuses}

Payments have a `status` field that reflects the statuses of their transactions.

- **Requested**. A payment has been created but no transactions exist yet.
- **Paid**. The customer has successfully completed the checkout. At least one transaction is in the `Paid` status and awaits completion.
- **Confirmed**. The payment was successful, and all transactions have been confirmed.
- **Refunded**. All transactions have been refunded or cancelled.
- **Cancelled**. All transactions have been cancelled.
- **Voided**. The Payment was voided while still `Requested`, by the customer during checkout or by you with [Void a Payment](/api/webapi/void-payment). All transactions have been voided.
- **Expired**. The payment has expired.

In short: a Payment moves from `Requested` to `Paid` when the customer completes the checkout and to `Confirmed` when the funds are captured. [Void a Payment](/api/webapi/void-payment) works only on a `Requested` Payment; once it is `Paid` or `Confirmed`, the way back is [Refund a Payment](/api/webapi/refund-payment), which cancels the authorizations not yet captured and refunds the captured ones.

### Transaction statuses

The status of a Transaction is determined by the `status` field.

- **Requested**. A new transaction object has been created but has not yet been paid.
- **Paid**. The transaction has been authorized. Funds are blocked until confirmation occurs ([Confirm Payment API](/api/webapi/confirm-payment)) or the time interval defined by the payment gateway configuration expires.
- **Confirmed**. The transaction has been captured. Funds previously blocked have been transferred to the merchant’s account.
- **Refunded**. A transaction in the `Confirmed` status has been fully refunded.
- **Dropped**. The transaction has been released.
- **Cancelled**. A transaction in the `Paid` status has been cancelled, unlocking the funds.
- **Failed**. The payment gateway failed to process the transaction.
- **Voided**. A `Paid` transaction has been voided due to an error or a customer cancelling the payment.
- **Expired** The transaction has expired.
- **ImpossibleRefund**. A refund could not be processed for the transaction. It's common for meal voucher Payment gateways.
