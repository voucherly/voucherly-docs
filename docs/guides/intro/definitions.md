---
sidebar_position: 3
description: "Key Voucherly terms and concepts: merchant, user, customer, payment, payment gateway, wallet and payment method."
keywords:
  - voucherly definitions
  - merchant
  - customer
  - payment gateway
  - wallet
  - payment method
---

# Definitions

This section defines the key terms and concepts used in Voucherly to help you better understand the guides and system functionality.

## Concepts and Terms

### Merchant
The business owner of an online shop integrating Voucherly. It is the entity to which invoices are addressed.

### User
An individual, typically a merchant's employee, who can access and manage the merchant account via the Dashboard. Users can view data, adjust settings, and perform operations.

A single user may have access to multiple merchants.

### Customer
The individual making purchases on the merchant's website and paying through Voucherly.

Each customer in Voucherly is assigned a unique ID that enables access to their wallet and allows saving and reusing payment methods.

### Payment
The entity representing a customer's payment action. A payment must be created via API each time a customer intends to make a payment. Voucherly generates a session where the customer is redirected to select payment gateways and finalize the process.

A payment includes multiple transactions, each representing a payment attempt through a specific gateway.

Refer to the [How Payments work](/guides/resources/payments-lifecycle) guide for a detailed explanation.

### Payment Gateway
An external service that Voucherly uses to authorize and process transactions.

Payment gateways can be activated or deactivated from the Dashboard after entering the necessary credentials obtained through agreements between the merchant and the gateway provider.

Refer to the [Payment gateways](/guides/resources/payment-gateways) guide for a detailed explanation.

### Wallet
A digital wallet that enhances the purchasing experience by eliminating the need to enter payment data for each transaction. When enabled via the Dashboard, customers can top up their wallets and use the credit for future purchases.

Wallets support voucher-based reloading, and the credit can only be used for products eligible for voucher payments.

For more details, see [here](/guides/resources/payment-gateways#wallet).

### Payment Method
The instrument used by the customer within a payment gateway to execute a transaction.