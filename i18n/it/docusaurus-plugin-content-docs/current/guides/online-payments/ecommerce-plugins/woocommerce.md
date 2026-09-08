---
slug: /guide/pagamenti-online/plugin-e-commerce/woocommerce
sidebar_position: 1
description: "Installa e configura il plugin gratuito Voucherly per WooCommerce: setup WordPress, configurazione API key, rimborsi e supporto ai Checkout Blocks."
keywords:
  - Voucherly WooCommerce
  - plugin WooCommerce
  - pagamento WordPress
  - buoni pasto
  - API key
  - Checkout Blocks
---

# WooCommerce

Manuale tecnico del plugin gratuito di Voucherly per la piattaforma e-commerce WooCommerce.

## Prerequisiti

- Leggi **[Come iniziare con un account Voucherly](/guide/inizia-a-integrare)**.
- **WordPress** 5.0 o superiore.
- **PHP** 5.6 o superiore.

## Download

- Da [Github](https://github.com/voucherly/voucherly-woocommerce) (clicca [qui](https://github.com/voucherly/voucherly-woocommerce/releases/latest/download/voucherly-woocommerce.zip) per scaricare l'ultima release).
- Dal [Marketplace WordPress](https://wordpress.org/plugins/voucherly/).

## Installazione

:::warning
Ti consigliamo di installare prima il plugin in un ambiente di test, seguendo la procedura di installazione di WooCommerce. Crea sempre un backup.
:::

Ci sono due modi per installare il plugin Voucherly:

### 1. Installazione da WordPress

1. Accedi al backend di WooCommerce.
2. Vai su **Plugins > Add new**.
3. Cerca **Voucherly**.
4. Per il plugin Voucherly per WooCommerce, clicca **Install now > Activate**.

### 2. Installazione manuale

1. Clicca il pulsante **Download** qui sopra.
2. Accedi al backend di WooCommerce.
3. Vai su **Plugins > Add new**.
4. Clicca **Browse file**.
5. Carica il file `voucherly-woocommerce.zip`.

## Configurazione

1. Accedi alla Dashboard.
1. Vai su **Sviluppatori > [API keys](https://dashboard.voucherly.it/Developer/ApiKey)**:
   - Ottieni la tua secret key (chiave segreta).
1. Accedi al backend di WooCommerce.
1. Vai su **WooCommerce > Settings > Payments > Voucherly**:
   - Inserisci la tua API key.
   - Modifica le tue impostazioni.
   - Clicca **Save changes**.
1. Vai su **WooCommerce > Settings > Payments**:
   - Abilita Voucherly come metodo di pagamento.

## Guida all'uso

### Rimborsi

Puoi effettuare rimborsi completi direttamente dalla dashboard di WooCommerce.

### Checkout

Il plugin supporta il checkout di WooCommerce ed è compatibile con la maggior parte dei temi premium, a meno che tu non abbia un checkout personalizzato.

#### WooCommerce Checkout Blocks

Puoi usare i Checkout Blocks per WooCommerce per personalizzare il tuo checkout.

### Aggiornamenti

Puoi aggiornare il plugin dal tuo backend e dal marketplace del CMS, oppure via SFTP.

:::warning
Assicurati di avere un backup del tuo ambiente di produzione e di testare il plugin in un ambiente di staging.
:::

:::info support

- Scrivi a support@voucherly.it.
- Crea una issue tecnica su [GitHub](https://github.com/voucherly/voucherly-woocommerce/issues/new).
- Invia una richiesta di supporto su [voucherly.it/contattaci](https://voucherly.it/contattaci).
- Consulta [Voucherly WooCommerce](https://voucherly.it/soluzioni/plugin/woocommerce) per ulteriori informazioni.
:::
