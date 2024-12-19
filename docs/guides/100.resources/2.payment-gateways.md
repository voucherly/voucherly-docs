---
sidebar_position: 2
---

import IframeWindow from '@site/src/components/BrowserWindow/IframeWindow';

# Payment Gateway

## Wallet
The Wallet is a virtual payment gateway provided by Voucherly that allows customers to load credit from various types of vouchers. For future payments, customers can use the Wallet to pay for food items without needing to interface with voucher payment gateways again.

Another benefit of the Wallet is that it removes the restriction of using meal vouchers with predetermined values, offering more flexibility to customers.

:::warning
To use the Wallet, the merchant's website must manage the storage of the Voucherly customer ID, which is generated the first time a customer makes a payment. This ID must be provided in future payments.
:::

## Fallback Payment Gateway
To enhance the reliability and availability of the service, merchants can configure a fallback payment gateway for each non-voucher gateway via the Dashboard. This ensures that if a payment gateway error is detected during the process (e.g., temporary unavailability), users can still complete their payment.

## List of Available Payment Gateways
| Id             | Name          | Voucher | Partial Refundable | Note                                                 |
|-----------------|---------------|---------|---------------------|-----------------------------------------------------|
| **ADYEN**       | Adyen         |         | ✔️                  | Refunds are asynchronous.                          |
| **AXERVE**      | Axerve        |         | ✔️                  |                                                     |
| **EDENRED**     | Edenred       | ✔️      |                     |                                                     |
| **FAKEVOU**     | Fake Voucherly| ✔️      |                     | Virtual payment gateway for testing purposes.      |
| **MULTISAFEPAY**| MultiSafepay  |         | ✔️                  |                                                     |
| **NEXI**        | Nexi          |         | ✔️                  |                                                     |
| **PAYPAL**      | PayPal        |         |                     |                                                     |
| **PELLEGR**     | Pellegrini    | ✔️      |                     |                                                     |
| **PHEY**        | Phey - Wordline |       | ✔️                  |                                                     |
| **SATISPY**     | Satispay      |         | ✔️                  |                                                     |
| **SODEXO**      | Sodexo Multi  | ✔️      |                     |                                                     |
| **STRIPE**      | Stripe        |         | ✔️                  |                                                     |
| **UPDAY**       | UpDay         | ✔️      |                     |                                                     |
| **WALLET**      | Wallet        | ✔️      | ✔️                  | See *[Wallet](payment-gateways#wallet)* for details.|

:::info
**Partial refundable** means that a transaction in the `CONFIRMED` status can be refunded for an amount lower than the `ConfirmedAmount`.
:::

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
