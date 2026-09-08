---
sidebar_position: 4
description: "Test data for the Voucherly sandbox: the codes of the Demo Voucherly meal vouchers, the test cards, and how to simulate a failed payment, a failed confirmation or a failed refund."
keywords:
  - test data
  - sandbox
  - Demo Voucherly
  - test cards
  - meal vouchers
  - Voucherly
---

# Test data

In the sandbox environment nothing is charged: the gateways you enable there run against the test systems of the providers, or against Demo Voucherly, a gateway that exists only to let you rehearse every outcome. Use the `sk_sand_` key on your server and, with [Voucherly Components](/guides/online-payments/components), the `pk_sand_` key on your page: the sandbox gateways are configured in **Impostazioni > Pagamenti > [Gateway di pagamento](https://dashboard.voucherly.it/settings/payment/payment-gateways)** with the test toggle on.

## Demo Voucherly

Demo Voucherly simulates a meal voucher. The customer types a seven-digit code where the **first three digits choose the outcome** and the **last four are the amount in cents**: `4201200` pays 12,00 €, `4200750` pays 7,50 €.

| Prefix | Payment | Confirmation | Refund |
| --- | --- | --- | --- |
| `420` | succeeds | succeeds | succeeds |
| `777` | succeeds | succeeds | fails: the transaction ends in `ImpossibleRefund` |
| `069` | succeeds | fails: the transaction has expired when you confirm it | — |
| `619` | succeeds | fails with a gateway error | fails with a gateway error |
| `090` | fails with a payment error | — | — |
| anything else | rejected as an invalid code | — | — |

Like every meal voucher, Demo Voucherly is captured at checkout: a Payment paid only with it lands directly in `Confirmed`, and you never call [Confirm a Payment](/api/webapi/confirm-payment) for it. It can also pay part of a Payment — `4200500` on a 17,00 € Payment leaves 12,00 € to cover with another method — which is the way to test partial payments.

## Cards

The card gateway of the sandbox accepts these test cards, with any future expiry date and any three-digit CVC:

| Card number | Outcome |
| --- | --- |
| `4242 4242 4242 4242` | succeeds without authentication |
| `4000 0025 0000 3155` | asks for 3-D Secure authentication, then succeeds |
| `4000 0000 0000 9995` | declined for insufficient funds |
| `4000 0000 0000 0002` | declined |

Card transactions are authorized at checkout and captured when you confirm the Payment, unless it was created with `isAutoConfirm: true`: after a card payment the Payment is `Paid` until you call [Confirm a Payment](/api/webapi/confirm-payment). See [How Payments work](/guides/about/resources/payments-lifecycle).

## Other gateways

MultiSafepay, PayPal, Satispay and the other providers use their own test environments and test accounts when the sandbox toggle is on. The credentials and the test instruments are those documented by each provider; the ones Voucherly configures by default for the sandbox are shown in the gateway settings of the Dashboard.

:::tip
For most integrations, Demo Voucherly plus one card gateway are enough to rehearse every case that matters: a full payment, a partial payment completed with a second method, a declined payment, a failed confirmation and a failed refund.
:::
