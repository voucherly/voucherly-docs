---
slug: /guide/risorse/gateway-di-pagamento/google-pay
sidebar_position: 20
description: "Abilita Google Pay su un dominio personalizzato con Voucherly: invia il tuo sito all'approvazione di Google e vai live tramite MultiSafepay, Nexi o Stripe."
keywords:
  - Google Pay
  - dominio personalizzato
  - Business Console Google Pay
  - integrazione PSP
  - Voucherly
  - go live
---


# Google Pay

:::info

- Elaborando i pagamenti Google Pay, accetti i [Termini di servizio delle API Google](https://payments.developers.google.com/terms/sellertos).
- Quando integri Google Pay nella tua piattaforma e-commerce, devi rispettare le [linee guida del brand di Google](https://developers.google.com/pay/api/web/guides/brand-guidelines).
- Per maggiori informazioni, consulta [Google Pay – Overview](https://developers.google.com/pay/api/web/overview).

:::

:::warning
L'integrazione con Google Pay non è un'integrazione diretta. È necessario un PSP supportato:

- MultiSafepay
- Nexi
- Stripe

:::

Voucherly rispetta tutti gli standard tecnici e di UX definiti da Google Pay. L'attivazione per un dominio personalizzato richiede l'approvazione di Google Pay.

:::info
Se non utilizzi un dominio personalizzato non hai bisogno di questa guida. Google Pay può essere attivato direttamente in **Impostazioni > Pagamenti > [Gateway di pagamento](https://dashboard.voucherly.it/settings/payment/payment-gateways)** nella Dashboard di Voucherly.
:::

## Invia i tuoi dati per l'approvazione

Vai alla [Business Console di Google Pay](https://pay.google.com/business/console/), invia i dati della tua attività e aggiungi i siti web su cui vuoi abilitare il pulsante Google Pay.

### Fornisci i dati della tua attività

1. In **Business Profile**, clicca **Get started**.
1. Completa entrambe le sezioni **Business identity** e **Business information**
1. Clicca **Save**.

### Invia i dati del tuo sito web per l'approvazione

:::info
Ogni sito web su cui vuoi implementare il pulsante Google Pay deve essere approvato.
:::

1. In **Google Pay API**, clicca **Create an integration**.
1. Clicca **Get started**, accetta i termini e le condizioni e clicca **Continue**
1. In **Integrate with your website**, clicca **Add website**.
1. Aggiungi il sito web su cui vuoi integrare **Google Pay direct**.
1. Imposta il tipo di **Google Pay API integration** su **Gateway**.
1. Carica gli screenshot richiesti per ogni sezione del tuo sito web. Puoi attivare Google Pay nell'ambiente sandbox di Voucherly.
    - Vedi [Payment method screen](/download/google-pay/Payment%20method%20screen.png) o scaricalo <a target="_blank" download href="/download/google-pay/Payment method screen.png">qui</a>.
    - Vedi [Google Pay API payment screen](/download/google-pay/Google%20Pay%20API%20payment%20screen.png) o scaricalo <a target="_blank" download href="/download/google-pay/Google Pay API payment screen.png">qui</a>.
1. Clicca **Save**.

Una volta forniti e approvati tutti i dati, vai su **Google Pay API**. Nel modulo, spunta ogni casella dopo aver verificato che tutti i passaggi siano stati completati. Clicca **Submit for approval**.

## Ambiente di produzione e Go live

:::warning
Hai bisogno di un account Voucherly attivo per configurare Google Pay nell'ambiente di produzione. Se non l'hai ancora fatto, [attiva il tuo account](/guide/introduzione/per-iniziare/attiva-account) fornendo le informazioni della tua azienda.
:::

Una volta che Google ha approvato il tuo sito web, puoi ottenere il merchant ID e il merchant name dalla tua [Business Console di Google Pay](https://pay.google.com/business/console/).

1. Configura il merchant ID in **Impostazioni > Pagamenti > [Gateway di pagamento](https://dashboard.voucherly.it/settings/payment/payment-gateways)** nella Dashboard di Voucherly. Utilizza l'ambiente di produzione.
1. A seconda del tuo PSP, potrebbero essere necessari passaggi o configurazioni aggiuntivi. Consulta la documentazione di riferimento per maggiori informazioni.

Ora sei pronto ad accettare Google Pay con Voucherly!
