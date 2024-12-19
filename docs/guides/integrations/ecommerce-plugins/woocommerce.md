---
sidebar_position: 1
---

# WooCommerce
Technical manual for Voucherly's free plugin for WooCommerce e-commerce platform.

## Prerequisites
- **[Voucherly account](/guides/introduction/integration-process)**.
- **WordPress** 5.0 or higher.
- **PHP** 5.6 or higher.

## Downlaod
- From [Github](https://github.com/voucherly/voucherly-woocommerce) (click [here](https://github.com/voucherly/voucherly-woocommerce/releases/latest/download/voucherly-woocommerce.zip) to download the latest release).
- From [WordPress Marketplace](https://wordpress.org/plugins/voucherly/).

## Installation

:::warning
We recommend installing the plugin in a test environment first, following the WooCommerce installation procedure. Always create a backup.
:::

There are two ways to install the Voucherly plugin:

### 1. WordPress Installation
1. Sign in to your WooCommerce backend.
2. Go to **Plugins > Add new**.
3. Search for **Voucherly**.
4. For the Voucherly plugin for WooCommerce, click **Install now > Activate**.

### 2. Manual Installation
1. Click the **Download** button above.
2. Sign in to your WooCommerce backend.
3. Go to **Plugins > Add new**.
4. Click **Browse file**.
5. Upload the `voucherly-woocommerce.zip` file.


## Configuration

1. Sign in to your WooCommerce backend.
2. Go to **WooCommerce > Settings > Payments > Voucherly**:
   - Enter your API keys.
   - Edit your settings.
   - Click **Save changes**.
3. Go to **WooCommerce > Settings > Payments**:
   - Enable Voucherly as payment method.
   
## User guide

### Refunds
You can process full refunds directly from the WooCommerce dashboard.

### Checkouts
The plugin supports the WooCommerce checkout and is compatible with most premium themes, unless you have a custom checkout.

#### WooCommerce Checkout Blocks
You can use the Checkout Blocks for WooCommerce to customize your checkout.

### Updates
You can update the plugin in your backend and the CMS marketplace, or via SFTP.

:::warning
Make sure you have a backup of your production environment, and that you test the plugin in a staging environment.
:::

:::info support
- Email support@multisafepay.com.
- Create a technical issue on [GitHub](https://github.com/voucherly/voucherly-woocommerce/issues/new).
- Submit a support request at [voucherly.it/contattaci](https://voucherly.it/contattaci).
- Refer to [Voucherly](https://voucherly.it/soluzioni/plugin/woocommerce) for additional info.
:::