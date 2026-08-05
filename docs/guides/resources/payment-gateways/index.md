---
sidebar_position: 2
description: "The payment gateways available in Voucherly, including meal vouchers, cards and wallets, with support for two-step processing and partial refunds."
keywords:
  - payment gateways
  - meal vouchers
  - two-step payment
  - partial refund
  - Voucherly Wallet
  - supported gateways
---

import IframeWindow from '@site/src/components/BrowserWindow/IframeWindow';

# Payment gateways

## List of available Payment gateways

| Id | Name | Meal voucher | 2-step process | Partial refundable |
|-|-|-|-|-|
| **ADYEN**             | Adyen             |   |   | V |
| **AMZNPAY**           | Amazon Pay        |   | V | V |
| **APLPAY**            | Apple Pay         |   | V |   |
| **CARDVOU**           | Card Voucherly    |   | V | V |
| **DAYCLK**            | DayClick          | V |   |   |
| **[EDENRED](edenred)**| Edenred           | V |   |   |
| **FABRICK**           | Fabrick           |   | V | V |
| **[FAKEVOU](#demo)**  | Demo Voucherly    | V |   | V |
| **FLOA**              | Floa              |   | V | V |
| **[GPAY](google-pay)**| Google Pay        |   | V |   |
| **KLARNA**            | Klarna            |   | V | V |
| **LUNCHGM**           | LunchGM           | V |   |   |
| **MLTSFPY**           | MultiSafepay      |   | V | V |
| **MOLLIE**            | Mollie            |   | V | V |
| **NEXI**              | Nexi              |   | V | V |
| **NUMIA**             | Numia             |   | V | V |
| **NUVEI**             | Nuvei             |   | V | V |
| **[PAYPAL](paypal)**  | PayPal            |   | V | V |
| **PELLEGR**           | Pellegrini        | V |   |   |
| **PHEY**              | Worldline         |   | V | V |
| **PLUXEE**            | Pluxee            | V |   |   |
| **PREPAID**           | Prepaid           |   |   | V |
| **[SATISPY](satispay)**| Satispay         | V |   | V |
| **SCALAPY**           | Scalapay          |   | V | V |
| **SODEXO**            | Sodexo            | V |   |   |
| **STANCER**           | Stancer           |   | V | V |
| **STRIPE**            | Stripe            |   | V | V |
| **SUMUP**             | SumUp             |   |   | V |
| **UPDAY**             | UpDay             | V |   |   |
| **VIVA**              | Viva Wallet       |   | V | V |
| **[WALLET](#wallet)** | Wallet            | V |   | V |
| **YESTCKT**           | Yes!Ticket        | V |   |   |

:::info
**Meal voucher** means that the gateway can settle part of the payment with meal voucher funds, which are only usable on the food portion of the order.

**2-step process** means that the transaction is authorised first and captured in a separate step. Gateways without it capture the funds directly at checkout.

**Partial refundable** means that a transaction in the `Confirmed` status can be refunded for an amount lower than the `ConfirmedAmount`.
:::

:::note
**Apple Pay** and **Google Pay** are wallets, not standalone gateways: they are offered on top of an already configured gateway. Apple Pay runs on MultiSafepay and SumUp; Google Pay runs on Fabrick, MultiSafepay, Nexi and SumUp. Refund and capture behaviour follows the underlying gateway.

**Sodexo** and **Pluxee** are two distinct gateways and coexist, despite Sodexo's commercial rebranding to Pluxee. Activating one does not activate the other.
:::

### Demo Voucherly {#demo}

The Demo Voucherly is a virtual payment gateway provided by Voucherly that you can use for testing purposes.

### Wallet

The Wallet is a virtual payment gateway provided by Voucherly that enables customers to pay in advance and load *credit*. For future purchases, customers can conveniently use the Wallet to pay for food items without interacting with meal voucher Payment gateways again.

An additional advantage of the Wallet is its flexibility — it eliminates the limitation of meal vouchers with fixed values, giving customers greater freedom in how they use their funds.

:::warning
To use the Wallet, the merchant's website must store the Voucherly customer ID, which is created when a customer makes their first payment. This ID must be included in all subsequent payments.

Learn more in our [Manage customer](/api/general/best-practices/customer) guide.
:::

<!-- ## Fallback Payment Gateway
To enhance the reliability and availability of the service, merchants can configure a fallback payment gateway for each non-voucher gateway via the Dashboard. This ensures that if a payment gateway error is detected during the process (e.g., temporary unavailability), users can still complete their payment. -->

<!-- 
## Configuration Guide
Below are short guides on configuring payment gateways to make them compatible with Voucherly (e.g., Voucherly S2S endpoint, payment types, etc.). No specific configuration is required for gateways not listed here.

### Vouchers Payment Gateways
No specific configuration is necessary for voucher payment gateways. Refer to the developer's website of the respective payment gateway for instructions.

### Adyen
<IframeWindow url="https://scribehow.com/embed/Adyen_Configuration__d72fy6uYRFaiDPuSsYDIWA" height="640" />

### Axerve
<IframeWindow url="https://scribehow.com/embed/Axerve_Configuration__bamVVC4vTf-4dDvMUOGAWw" height="640" />

### Nexi
<IframeWindow url="https://scribehow.com/embed/Nexi_Configuration__IgK5HJpDTP-zyFG2BryGAw" height="640" />

### PayPal
<IframeWindow url="https://scribehow.com/embed/PayPal_configuration__V4wNn2Z4TOWF_HMzl8DVOA" height="640" />

### Stripe
<IframeWindow url="https://scribehow.com/embed/Stripe_Configuration__AU0YOKBDQcSx_i1cQo2Y4Q" height="640" /> 
-->
