---
slug: /guide/integrazioni/plugin-e-commerce/prestashop
sidebar_position: 2
description: "Installa e configura il plugin gratuito Voucherly per PrestaShop: setup, configurazione API key, rimborsi e compatibilità con il checkout del tuo store."
keywords:
  - Voucherly PrestaShop
  - plugin PrestaShop
  - pagamento PrestaShop
  - buoni pasto
  - API key
  - rimborsi
---

# PrestaShop

Manuale tecnico del plugin gratuito di Voucherly per la piattaforma e-commerce PrestaShop.

## Prerequisiti

- Leggi **[Come iniziare con un account Voucherly](/guide/introduzione/per-iniziare)**.
- **PrestaShop** dalla 1.7 fino alla 8.
- **PHP** 5.6 o superiore.

## Download

- Da [Github](https://github.com/voucherly/voucherly-prestashop) (clicca [qui](https://github.com/voucherly/voucherly-prestashop/releases/latest/download/voucherly-prestashop.zip) per scaricare l'ultima release).

## Installazione

:::warning
Ti consigliamo di installare prima il plugin in un ambiente di test, seguendo la procedura di installazione di PrestaShop. Crea sempre un backup.
:::

1. Clicca il pulsante **Download** qui sopra.
2. Accedi al backend di PrestaShop.
3. Vai su **Modules > Module manager > Upload a module**.
4. Clicca **Browse file**.
5. Carica il file `voucherly-prestashop.zip`.
6. Vai su **Configure** e svuota la cache.

## Configurazione

1. Accedi alla Dashboard.
1. Vai su **Sviluppatori > [API keys](https://dashboard.voucherly.it/Developer/ApiKey)**:
   - Ottieni la tua secret key (chiave segreta).
1. Accedi al backend di PrestaShop.
1. Vai su **Payment > Payment Methods > Voucherly (Configure)**:
   - Inserisci la tua API key.
   - Modifica le tue impostazioni.
   - Clicca **Save**.
1. Vai su **International > Locations > Countries**:
   - Abilita il tuo Paese
1. Vai su **Payment > Preferences > Country restrictions**:
    - Abilita Voucherly per i paesi di tuo interesse.
    - Clicca **Save**.

## Guida all'uso

### Rimborsi

Puoi effettuare rimborsi completi direttamente dalla dashboard di PrestaShop.

1. Vai su **Orders** e seleziona il tuo ordine.
2. Vai alla sezione **Voucherly** sotto quella Payment.
3. Clicca il link **Refund section**.
4. Clicca **Refund**.

### Checkout

Il plugin supporta il checkout di PrestaShop ed è compatibile con la maggior parte dei temi premium, a meno che tu non abbia un checkout personalizzato.

### Aggiornamenti

Puoi aggiornare il plugin dal tuo backend e dal marketplace del CMS, oppure via SFTP.

:::warning
Assicurati di avere un backup del tuo ambiente di produzione e di testare il plugin in un ambiente di staging.
:::

:::info support

- Scrivi a support@voucherly.it.
- Crea una issue tecnica su [GitHub](https://github.com/voucherly/voucherly-prestashop/issues/new).
- Invia una richiesta di supporto su [voucherly.it/contattaci](https://voucherly.it/contattaci).
- Consulta [Voucherly PrestaShop](https://voucherly.it/soluzioni/plugin/prestashop) per ulteriori informazioni.
:::
