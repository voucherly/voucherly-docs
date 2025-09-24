import DocCardList from '@theme/DocCardList';

# Getting started

The instructions below will guide you on how to integrate your platform with our APIs.

## Configuration

### 1. Create a Sandbox account
Visit the [Dashboard][dashboard] and register a new account.  
Verify your email address by clicking the link sent to your inbox.

### 2. Obtain API Keys
In the **[Sviluppatori](https://dashboard.voucherly.it/Developer/ApiKey)** section, you will find both private and public keys.  
Use the private key to authenticate API calls, as explained in [API Authentication](/api/webapi/voucherly-api#authentication).  

The public key is intended for frontend API calls, allowing only payment creation.

### 3. Enable Payment gateways
Activate payment gateways in **Attività > [Gateway di pagamento](https://dashboard.voucherly.it/merchant/payment-gateways)**.

Voucher payments often require supplementation with a *standard* transaction, such as a card payment. Therefore, activating at least one non-voucher payment gateway is strongly recommended.

:::tip
For sandbox testing, we recommend activating Demo Voucherly and MultiSafepay. These are sufficient to replicate all payment behaviors.\
Please refer to the [Payment gateways resource](/guides/resources/payment-gateways/) for more information about payment gateways.
:::

### 4. Let's start
Define what's the [integration](/guides/integrations) that suits you best and your [use case](/guides/use-cases).

#### E-commerce plugins

Voucherly's e-commerce plugins, developed in-house, require minimal or no development effort and allow you to start testing immediately. We offer a wide range of plugins and apps to integrate with platforms like PrestaShop, WooCommerce and Shopify.

Full guidance: [E-commerce plugins](/guides/integrations/ecommerce-plugins/).

#### API integration

Voucherly's e-commerce plugins, developed in-house, require minimal or no development effort and allow you to start testing immediately. We offer a wide range of plugins and apps to integrate with platforms like PrestaShop, WooCommerce and Shopify.

Full guidance: [API integration](/guides/integrations/api/).

### 5. Before going live

To start processing real transactions, we need to verify and approve your merchant account information.

1. [Activate your account](/guides/intro/getting-started/activate-account) providing information about your company.
1. Ensure your website aligns with [Website checklist](/guides/intro/getting-started/website-checklist).

Once submitted, we will perform know your customer (KYC) checks. If approved, your account will go live.


[dashboard]: https://dashboard.voucherly.it/