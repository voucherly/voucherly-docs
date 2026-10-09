---
sidebar_position: 4
description: "Confirm a Voucherly Payment at the quantities or amounts actually delivered: what gets captured, voided or refunded, and how refundMode handles meal vouchers."
keywords:
  - confirm payment
  - partial capture
  - delivered quantities
  - refundMode
  - meal vouchers
  - order adjustment
---

# Confirm at what you delivered

When an order is picked after the customer pays, what you deliver is not always what was ordered: an item is out of stock, a pack weighs less. With [Confirm a Payment](/api/webapi/confirm-payment) you tell Voucherly what you actually delivered, and Voucherly works out what to do on each Transaction: how much to capture, which authorizations to void and what to give back.

You don't need to know how the customer paid. Which gateways can capture partially, and how the amount splits between meal vouchers and the rest, is Voucherly's job.

**A confirmation accounts, it does not rewrite the order.** The lines, the discounts and the `amount` of the Payment keep describing what was ordered. What was collected is in separate fields, described in [What you find after the confirmation](#result).

## When you can confirm {#when}

Only a Payment in the `Paid` status can be confirmed. Meal vouchers, the wallet, the prepaid quota, Satispay, SumUp and Adyen are captured at checkout, so a Payment paid only with them is already `Confirmed` when the customer pays (see [How Payments work](./payments-lifecycle.md#payment-statuses)). Confirming it again fails with `409`. To give money back on a `Confirmed` Payment, use [Refund a Payment](/api/webapi/refund-payment).

A Payment paid partly with meal vouchers and partly by card stays `Paid` until you confirm it: the card is authorized and waiting for you.

## Four ways to confirm {#four-ways}

The request body takes **at most one** of these. Combining them fails with `VALIDATION_ERROR`.

| You send | What happens |
| --- | --- |
| Nothing (`{}`) | Every authorization is captured in full. |
| `transactions` | You choose which Transactions to capture, and for how much. See [Confirm a Payment](/api/webapi/confirm-payment). |
| `lines` | The quantities delivered, line by line. Voucherly adds them up and settles the Transactions on that amount. |
| `finalAmount` and `foodAmount` | The amounts to confirm, without the detail of the lines. |

With `lines` or with the amounts you can also send `refundMode`, which decides whether and how money already captured is given back. See [Giving back money already captured](#refund-mode).

All amounts are in cents.

## Confirm the quantities delivered {#lines}

Send **every line of the Payment** with the quantity delivered, and `0` for a line not delivered at all:

```json
{
  "lines": [
    { "externalId": "5068138461", "quantity": 3 },
    { "externalId": "5068138462", "quantity": 0 }
  ],
  "refundMode": "Credit"
}
```

- **A missing line is an error, not a zero.** It fails with `LINES_MISMATCH`, so that a line lost by a bug in your integration can't make you collect less without anyone noticing. A line that matches no line of the Payment fails the same way.
- **Delivered can't be more than ordered.** A quantity above the ordered one fails with `QUANTITY_EXCEEDS_ORDERED`. The one way a line can cost more than ordered is a line sold by weight, described in [Variable-weight items](./variable-weight.md).
- **Lines can't be added.** A confirmation removes goods, it doesn't add any.
- **Leave out the `PreauthorizationMargin` line**, if the Payment has one, or send it with quantity `0`. See [Variable-weight items](./variable-weight.md#confirm).

### How lines are paired {#pairing}

Each line you send is paired with a line of the Payment using the identifiers you sent when you [created the Payment](/api/webapi/create-payment):

1. **Your own line reference, `externalId`.** It pairs the line on its own. A value that matches no line fails with `LINES_MISMATCH`: it never falls back to the product.
2. **The product**, when you don't send `externalId`. Send the same identifier you created the line with: `productId` if you used one, otherwise `product.externalId`, otherwise `product.name` and `product.variant`. Matching ignores case. Lines sharing the same product are paired in order of appearance.

Lines can be sent in any order. If two lines of your order can share a product, sending your own `externalId` is the safe choice.

### How the amount is computed {#lines-amount}

Prices stay the ones ordered. Voucherly adds up the delivered lines and applies the discounts:

- a discount on a whole line follows the quantity, in proportion, rounded to the cent;
- the discounts of the Payment apply to the delivered amount: a percentage discount scales with it, a fixed-amount discount stays as it is;
- a `FIXED` discount sets the total, so it keeps the total at its value even when less is delivered. If removing goods must lower what you collect, don't use a `FIXED` discount.

The food amount, the part meal vouchers can pay, is the sum of the delivered `Food` lines.

## Confirm at an amount {#amounts}

When you only know the totals, send them without the lines:

```json
{
  "finalAmount": 9500,
  "foodAmount": 8500
}
```

`finalAmount` is the amount to confirm and must be greater than zero. `foodAmount` is the part of it that meal vouchers can pay: it is required, and can't be higher than `finalAmount`. The lines of the Payment are not touched.

## How Voucherly splits the amount {#split}

Whether it comes from the lines or from the amounts, Voucherly gets a final amount and a food amount, and settles the Transactions on them:

1. **Meal vouchers pay only food.** The share paid with meal vouchers is brought to at most the food amount. If the meal vouchers already captured exceed it, the difference has to be given back. A wallet balance that came from meal vouchers counts as meal vouchers.
2. **The other Transactions cover the rest**, exactly. Authorizations are captured partially or voided, never refunded. If more was already captured than is due, the difference has to be given back.
3. **Nothing is captured beyond what was authorized.** A higher amount fails with `AMOUNT_EXCEEDS_PAID`, and `maximumAmount` in the error tells you the highest amount you can confirm.

For example, an order of €100.00 with €90.00 of food, paid with €60.00 of meal vouchers (captured at checkout) and €40.00 by card (authorized):

| You confirm (final / food) | Card | Meal vouchers |
| --- | --- | --- |
| €95.00 / €85.00 | €35.00 captured, €5.00 released | unchanged |
| €80.00 / €50.00 | €30.00 captured | €10.00 to give back |
| €50.00 / €50.00 | voided | €10.00 to give back |

In the last two rows something has to be given back, so the confirmation needs a `refundMode` that allows it.

A few gateways have constraints of their own. Some capture only the full authorized amount, and some have a minimum amount: a capture left below it fails with `CAPTURE_BELOW_MINIMUM`. A Transaction that mixes meal vouchers with another method, as Satispay or the wallet can, is kept as it stands. When no split adds up, the confirmation fails with `CANNOT_ALLOCATE`.

## Giving back money already captured: `refundMode` {#refund-mode}

`refundMode` is about money **already captured** only. Authorizations are never refunded: they are captured partially or voided.

| Value | What happens |
| --- | --- |
| `NoRefund` | The default. Nothing is given back: if the confirmation would need to, it fails with `REFUND_REQUIRED` and no Transaction is touched. |
| `Gateway` | The money is refunded through the payment gateway. If the gateway's configuration forbids a partial refund, the confirmation fails with `IMPOSSIBLE_PARTIAL_REFUND` before touching any Transaction. |
| `Credit` | The money is credited to the customer's wallet, without calling the gateway. |
| `GatewayOrCredit` | Refunded through the gateway where it allows it, credited to the wallet otherwise, also when the gateway refuses the refund. |

`NoRefund` is the default because a confirmation isn't a refund request: giving money back has to be your explicit choice. The `REFUND_REQUIRED` error tells you how much would go back, in `voucherRefundAmount` (meal vouchers) and `refundAmount` (the rest), so you can decide and send the request again with a `refundMode`.

**A credit keeps the nature of the money it comes from.** A credit coming from meal vouchers can be spent only on food.

[Refund a Payment](/api/webapi/refund-payment) uses the same values, with a different default: `Gateway`, since a refund is already an explicit request. There `NoRefund` is not accepted.

## What you find after the confirmation {#result}

The response is the [Payment](/api/webapi/schemas/payment).

- `amount`, the lines and the discounts are **unchanged**: they still describe the order.
- `confirmedAmount`, `cancelledAmount` and `refundedAmount` tell you what was captured, released or voided, and given back. A wallet credit counts in `refundedAmount`.
- On each line confirmed with `lines`, `confirmedQuantity` and `confirmedFinalAmount` carry the delivered quantity and amount. They are present only when they differ from the order, and never after a confirmation at an amount.

When you read the Payment later with [Retrieve a Payment](/api/webapi/retrieve-payment), add `include=Lines` to get the lines.

The receipt for the customer, the electronic receipt or the non-fiscal one, shows what was delivered and collected: lines delivered at `0` are left out. The order email is sent when the customer pays, so it shows the order.

## Errors and retries {#errors}

On an error the response is a [problem details](/api/general/errors) object, with a `code` and the fields that explain it. You get one error at a time.

| `code` | Status | What it means |
| --- | --- | --- |
| `ALREADY_CONFIRMED`, `INVALID_STATUS` | `409` | The Payment is not `Paid`, or an authorization expired before it could be captured. |
| `QUANTITY_EXCEEDS_ORDERED` | `400` | A quantity is above the ordered one. `line` is the position of the line in your request. |
| `PIECES_NOT_ALLOWED`, `PIECES_COUNT_MISMATCH`, `MARGIN_NOT_CONFIRMABLE` | `400` | See [Variable-weight items](./variable-weight.md#confirm). |
| `LINES_MISMATCH` | `422` | A line of the Payment is missing, or a line sent matches none. |
| `INVALID_AMOUNT` | `422` | Nothing to confirm: nothing was delivered. To give back the whole Payment, refund it. |
| `AMOUNT_EXCEEDS_PAID` | `422` | The amount is higher than what was authorized. See `maximumAmount`. |
| `REFUND_REQUIRED` | `422` | Money already captured would have to go back, and `refundMode` doesn't allow it. |
| `CAPTURE_BELOW_MINIMUM`, `CANNOT_ALLOCATE` | `422` | The amounts can't be split across the Transactions of this Payment. |
| `IMPOSSIBLE_PARTIAL_REFUND`, `IMPOSSIBLE_REFUND`, `INSUFFICIENT_FUNDS` | `422` | The gateway can't give the money back. With the first two you can confirm with `Credit` or `GatewayOrCredit`. |
| `FAILED_DEPENDENCY` | `424` | A payment gateway failed. |

On the errors before the last two rows nothing is captured, voided or given back.

**The Payment stays `Paid` until every operation has succeeded.** Voucherly works through the Transactions in order and may fail halfway, for example when a gateway refuses a refund after the card was already captured. Then the error carries `operations`, the list of what was already done, and the Payment is still `Paid`. **Send the same request again**: Voucherly starts from the current state and does only what is left. Change `refundMode` if the error suggests it, but keep the same lines or amounts.
