---
slug: /guide/pagamenti-online/plugin-e-commerce/shopify
sidebar_position: 3
description: "Collega Voucherly a Shopify: crea un'app personalizzata, configura gli scope API e un metodo di pagamento manuale per accettare buoni pasto."
keywords:
  - Voucherly Shopify
  - plugin Shopify
  - pagamento Shopify
  - app personalizzata
  - buoni pasto
  - metodo di pagamento manuale
---

# Shopify

Manuale tecnico del plugin gratuito di Voucherly per la piattaforma e-commerce Shopify.

:::warning
Shopify non consente l'integrazione diretta di metodi di pagamento esterni all'interno del suo processo di checkout. Pertanto, i pagamenti tramite Voucherly vengono gestiti in modo asincrono. Consulta [Checkout](#checkout) per ulteriori informazioni.
:::

## Prerequisiti

- Leggi **[Come iniziare con un account Voucherly](/guide/inizia-a-integrare)**.

## Configurazione

Un tutorial video completo è disponibile [qui](https://www.youtube.com/watch?v=53d6BCiExeg).

### Shopify

1. Accedi al backend di Shopify.
2. Se necessario, [consenti lo sviluppo di app personalizzate](https://help.shopify.com/it/manual/apps/app-types/custom-apps#enable-custom-app-development).
    - Vai su **Settings > Apps and sales channels**
    - Clicca **Develop apps**.
    - Clicca **Allow custom app development**.
    - Leggi l'avviso e le informazioni fornite, poi clicca **Allow custom app development**.
3. [Crea un'app personalizzata](https://help.shopify.com/it/manual/apps/app-types/custom-apps).
    - Vai su **Settings > Apps and sales channels**
    - Clicca **Develop apps**.
    - Clicca **Create a custom app**.
    - Nella finestra modale, inserisci l'**App name** e seleziona un **App developer**. L'app developer può essere il proprietario del negozio, oppure qualsiasi account staff o collaboratore con il permesso Develop apps.
    - Clicca **Create app**.
4. Seleziona gli scope API.
    - Vai su **Configuration > Admin API integration**.
    - Clicca **Configure**.
    - Seleziona i seguenti scope: `write_order_edits`, `read_order_edits`, `write_orders`, `read_orders`, `read_products`.
    - Clicca **Save**.
5. Installa l'app per ottenere l'API access token e l'API secret key da **API credentials**.
    - Vai su **API credentials**.
    - Clicca **Install app**.
    - Rivela e copia l'*Admin API access token*.
    - Copia l'*API key*.
    - Copia l'*API secret key*.
6. [Crea un metodo di pagamento manuale personalizzato](https://help.shopify.com/it/manual/payments/manual-payments#crea-un-metodo-di-pagamento-manuale-personalizzato).
    - Vai su **Settings > Payments**.
    - Nella sezione **Manual payment methods**, seleziona **Create custom payment method**.
    - In **Custom payment method name**, inserisci il nome del tuo metodo di pagamento. Il metodo di pagamento non deve necessariamente chiamarsi "Voucherly", ma deve includere la parola "Voucherly". Per esempio *Buoni Pasto - Paga con Voucherly*.
    - Valuta di arricchire la sezione del metodo di pagamento aggiungendo una nota relativa al flusso di pagamento. Questo può aiutare a rendere il processo più chiaro per i tuoi clienti. Per esempio:
        - In **Additional details**, *Dopo aver cliccato "Paga ora", riceverai una mail con le istruzioni per il pagamento*.
        - In **Payment instructions**, *Ti è stata inviata una mail contenente le istruzioni per il pagamento. Clicca sul link ricevuto e completa l'acquisto in modo sicuro su Voucherly*.

7. Vai su **Settings > Domains** e ottieni l'URL del tuo negozio Shopify, nel formato mydomain.myshopify.com.
8. (facoltativo) Per impostazione predefinita, l'intero importo dell'ordine sarà pagabile con i buoni. Per limitare i pagamenti tramite buoni solo a determinati prodotti, assegna loro un tag dedicato (*Food Product Tag*).

### Voucherly

1. Accedi alla Dashboard.
2. Vai su **Impostazioni** > **Attività** > **[Integrazioni](https://dashboard.voucherly.it/merchant/integrations)** e clicca su Shopify:
    - Clicca su ⚙️ accanto a *Parametri*.
    - Modifica le tue impostazioni.
    - Clicca **Modifica**.

## Guida all'uso

### Checkout

Shopify utilizza un processo di checkout standard che non supporta direttamente i metodi di pagamento esterni. Per questo motivo, i pagamenti con Voucherly vengono elaborati al di fuori del flusso di checkout:

- Durante il checkout, il cliente seleziona Voucherly come metodo di pagamento.
- Il cliente riceve automaticamente un'email contenente un link di pagamento.
- Cliccando sul link, il cliente viene reindirizzato a Voucherly.
- Il cliente completa il pagamento su Voucherly.
- Una volta completato il pagamento, l'ordine Shopify viene automaticamente contrassegnato come pagato.

:::info support

- Scrivi a support@voucherly.it.
- Invia una richiesta di supporto su [voucherly.it/contattaci](https://voucherly.it/contattaci).
- Consulta [Voucherly Shopify](https://voucherly.it/soluzioni/plugin/shopify) per ulteriori informazioni.
:::
