---
sidebar_position: 2
---

# Integration Process

The steps below will guide you on how to integrate your platform with our APIs.

## Configuration Steps

### 1. Create a Sandbox account
Visit the [Dashboard][dashboard] and register a new account.  
Verify your email address by clicking the link sent to your inbox.

### 2. Obtain API Keys
In the **[Sviluppatori](https://dashboard.voucherly.it/Developer/ApiKey)** section, you will find both private and public keys.  
Use the private key to authenticate API calls, as explained in [API Authentication](/api/authentication).  

The public key is intended for frontend API calls, allowing only payment creation.

### 3. Enable Payment Gateways
Activate payment gateways in **Configurazione merchant > [Gateway di pagamento](https://dashboard.voucherly.it/Merchant/PaymentGateways)**.

Voucher payments often require supplementation with a *standard* transaction, such as a card payment. Therefore, activating at least one non-voucher payment gateway is strongly recommended.

### 4. Check how [Voucherly APIs work](/guides/introduction/overview)

### 5. Let's start
Define what's your [use case](/guides/use-cases), then the payment flow that suits you best and finally integrate the related APIs

[dashboard]: https://dashboard.voucherly.it/