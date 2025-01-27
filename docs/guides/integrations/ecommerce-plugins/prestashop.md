---
sidebar_position: 2
---

# PrestaShop
Technical manual for Voucherly's free plugin for PrestaShop e-commerce platform.

## Prerequisites
- Read **[Getting started with a Voucherly account](/guides/intro/getting-started)**.
- **PrestaShop** 1.7 up to 8.
- **PHP** 5.6 or higher.

## Downlaod
- From [Github](https://github.com/voucherly/voucherly-prestashop) (click [here](https://github.com/voucherly/voucherly-prestashop/releases/latest/download/voucherly-prestashop.zip) to download the latest release).

## Installation

:::warning
We recommend installing the plugin in a test environment first, following the PrestaShop installation procedure. Always create a backup.
:::

<!-- There are two ways to install the Voucherly plugin:

### 1. WordPress Installation
1. Sign in to your PrestaShop backend.
2. Go to **Plugins > Add new**.
3. Search for **Voucherly**.
4. For the Voucherly plugin for PrestaShop, click **Install now > Activate**.

### 2. Manual Installation -->
1. Click the **Download** button above.
2. Sign in to your PrestaShop backend.
3. Go to **Modules > Module manager > Upload a module**.
4. Click **Browse file**.
5. Upload the `voucherly-prestashop.zip` file.
6. Go to **Configure** and clear your cache.


## Configuration

1. Sign in to your Voucherly dashboard.
1. Go to **Sviluppatori > [Chiavi API](https://dashboard.voucherly.it/Developer/ApiKey)**:
   - Get your private key.
1. Sign in to your PrestaShop backend.
1. Go to **Payment > Payment Methods > Voucherly (Configure)**:
   - Enter your API key.
   - Edit your settings.
   - Click **Save**.
1. Go to **International > Locations > Countries**:
   - Enable United Kingdom
1. Go to **Payment > Preferences > Country restrictions**:
    - Enable Voucherly to your relevant countries.
    - Click **Save**.
   
## User guide

### Refunds
You can process full refunds directly from the PrestaShop dashboard.
1. Go to **Orders** and select your order.
2. Go to **Voucherly** section under the Payment one.
3. Click **Refund section** link.
4. Click **Refund**.


### Checkouts
The plugin supports the PrestaShop checkout and is compatible with most premium themes, unless you have a custom checkout.

### Updates
You can update the plugin in your backend and the CMS marketplace, or via SFTP.

:::warning
Make sure you have a backup of your production environment, and that you test the plugin in a staging environment.
:::

:::info support
- Email support@voucherly.it.
- Create a technical issue on [GitHub](https://github.com/voucherly/voucherly-prestashop/issues/new).
- Submit a support request at [voucherly.it/contattaci](https://voucherly.it/contattaci).
- Refer to [Voucherly PrestaShop](https://voucherly.it/soluzioni/plugin/prestashop) for additional info.
:::