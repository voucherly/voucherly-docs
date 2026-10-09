---
sidebar_position: 5
description: "Sell variable-weight items with Voucherly: declare the unit of measure, authorize a margin, then confirm each pack at its real weight and amount with pieces."
keywords:
  - variable weight
  - sold by weight
  - preauthorization margin
  - product.unit
  - pieces
  - grocery delivery
---

# Variable-weight items

Some items are ordered by the piece but paid by measure. A pack of plums is "one piece, about 0.75 kg, €1.98/kg", and its price is known only at picking, when that pack weighs 0.65 kg or 0.81 kg.

Voucherly covers this in three steps:

1. **When you create the Payment**, the line declares its unit of measure, and a margin line authorizes more than the estimated total.
2. **When you confirm the Payment**, you send the amount of each pack actually delivered.
3. **On the documents for the customer**, each pack is printed on its own row, with its weight.

This page builds on [Confirm at what you delivered](./payment-confirmation.md), which explains how a confirmation settles the Transactions.

## When you create the Payment {#create}

Declare `product.unit` on every line whose price can change at delivery, and add one line of type `PreauthorizationMargin`:

```json
"lines": [
  {
    "quantity": 2,
    "unitAmount": 149,
    "externalId": "5068138459",
    "product": {
      "externalId": "761703",
      "name": "Susine gialle",
      "lineType": "Food",
      "unit": { "code": "kg", "size": 0.75, "amount": 198 }
    }
  },
  {
    "quantity": 3,
    "unitAmount": 95,
    "externalId": "5068138461",
    "product": {
      "externalId": "120738",
      "name": "Pasta sfoglia rotonda 230 g",
      "lineType": "Food"
    }
  },
  {
    "quantity": 1,
    "unitAmount": 500,
    "product": {
      "name": "Margine peso variabile",
      "lineType": "PreauthorizationMargin"
    }
  }
]
```

### The unit of measure: `product.unit` {#unit}

| Field | What it is |
| --- | --- |
| `code` | The unit of measure, such as `kg` or `l`. Required, at most 10 characters. |
| `size` | The nominal content of one piece, in the unit of `code`, with at most three decimals. |
| `amount` | The price per unit of measure, in cents. |

`product.unit` is **descriptive only**: Voucherly computes no amount from it. `unitAmount` times `quantity` stays what the customer pays at checkout, and the checkout, the Dashboard and the order email show the line as "ca. 0.75 kg · 1.98 €/kg".

The reason is rounding. 1.98 × 0.75 is 1.485, which your till turns into 1.48 or 1.49 depending on how it rounds. If Voucherly did the math again, real orders would come out a cent off, with a receipt that doesn't match the charge. You send the amounts, as your till computes them.

### The margin: `PreauthorizationMargin` {#margin}

The margin line is **authorization capacity, not goods**. The customer authorizes the estimated total plus the margin, and that is the only way to capture more than was ordered when a pack weighs more.

- You choose its amount.
- **It is not food**, so meal vouchers can't pay it: the extra weight goes on the card, even when meal vouchers covered all the food ordered.
- The checkout doesn't list it among the products. It counts towards the total, and an info icon next to the total explains it. Send `product.name` and `product.variant` on the margin line to change the wording of that explanation.
- It is never printed on the documents for the customer.

## When you confirm: `pieces` {#confirm}

Confirm with [`lines`](./payment-confirmation.md#lines), and on each line created with `product.unit` send `pieces`, one per pack delivered:

```json
{
  "lines": [
    {
      "externalId": "5068138459",
      "quantity": 2,
      "pieces": [
        { "finalAmount": 129, "size": 0.65 },
        { "finalAmount": 139, "size": 0.70 }
      ]
    },
    { "externalId": "5068138461", "quantity": 3 }
  ]
}
```

- **A piece is a physical pack.** `quantity` is the number of packs delivered, and `pieces` must have as many entries, otherwise `PIECES_COUNT_MISMATCH`. If one pack of two is missing, send `quantity: 1` and one piece. For a line not delivered at all, send `quantity: 0` without `pieces`.
- **`finalAmount` is the amount charged for that pack**, in cents, net and final: the discount of the line is not applied to it again. The discounts of the Payment still apply to the total, as on any confirmation. With `pieces` a line can cost more than ordered, but its quantity still can't exceed the ordered one.
- **`pieces` only on a line created with `product.unit`**, otherwise `PIECES_NOT_ALLOWED`. This keeps the margin from being used to change the price of a fixed-price item.
- **The ceiling is the authorized amount**: a total higher than what was authorized, margin included, fails with `AMOUNT_EXCEEDS_PAID`.
- **Leave out the margin line**, or send it with quantity `0` and no `pieces`. Anything else fails with `MARGIN_NOT_CONFIRMABLE`. The margin is always released: what the delivered goods don't use of the authorization is voided.
- **`size` is descriptive**, in the unit of `unit.code`, with at most three decimals. It goes on the documents and is never used to compute anything.
- **Each confirmation replaces the previous pieces.** Sending the same line again without `pieces` removes them.

You don't compute the food amount: Voucherly adds up the delivered `Food` lines, pieces included.

In this example the customer authorized €10.83 (€2.98 of plums, €2.85 of pastry and €5.00 of margin). The confirmation collects €5.53: €1.29 and €1.39 for the plums, €2.85 for the pastry. The remaining €5.30 of the authorization is released.

After the confirmation, the line carries `confirmedQuantity` and `confirmedFinalAmount` (the number and the sum of the pieces) and `confirmedPieces`, the pieces as you sent them. `confirmedFinalAmount` may be higher than the `finalAmount` ordered.

## What the customer sees {#documents}

On the receipt each pack is a row of its own, with its weight in the description: "Susine gialle 0.65 kg" at €1.29, "Susine gialle 0.7 kg" at €1.39. Packs with the same weight and the same amount are merged into one row.

A single row "1.35 kg at €1.98/kg" can't work, because the arithmetic doesn't allow it:

| | |
| --- | --- |
| 0.65 kg × €1.98 | 1.287 → **€1.29** |
| 0.70 kg × €1.98 | 1.386 → **€1.39** |
| charged | **€2.68** |
| 1.35 kg × €1.98 | 2.673 → **€2.67** |

A receipt computes each row as quantity × price, so one row of 1.35 kg can't print €2.68. Voucherly never multiplies weight by price: it prints the amounts you charged.

## Confirming without pieces {#amounts}

The [confirmation at an amount](./payment-confirmation.md#amounts), with `finalAmount` and `foodAmount`, works here too: Voucherly captures up to that amount and releases the rest of the margin. The lines aren't touched, so the receipt starts from the ordered prices and brings its total down to what was collected, spreading the difference across the rows. The total is right, but the receipt doesn't say which pack weighed less. To get a receipt that describes the goods delivered, send the pieces.

## What is not covered {#limits}

**Substituting** an item with a different one is not supported. A piece can carry a different amount, but the receipt would still print the name of the item ordered.
