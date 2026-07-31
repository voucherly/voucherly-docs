---
slug: /guide/introduzione/per-iniziare/attiva-account
sidebar_position: 2
description: "Attiva il tuo account Voucherly di produzione: completa l'onboarding, configura i gateway di pagamento, scegli un piano e imposta il branding."
keywords:
  - attivazione voucherly
  - onboarding
  - account produzione
  - gateway di pagamento
  - abbonamento
  - kyc
---

import Checkbox from '@site/src/components/Checkbox';

# Attiva il tuo account

L'onboarding prevede che Voucherly verifichi e approvi le informazioni inviate dai merchant e dai partner che richiedono un account di produzione (live) per elaborare transazioni reali.

<Checkbox label="Completa l'onboarding" >

Accedi alla [Dashboard](https://dashboard.voucherly.it) e:

1. Fornisci le informazioni di fatturazione in **Attività > [Panoramica](https://dashboard.voucherly.it/Merchant)**.
1. Configura un metodo di pagamento in **Abbonamento e fatturazione > [Metodi di pagamento](https://dashboard.voucherly.it/Billing/PaymentMethod)**.

:::info
Voucherly verificherà i tuoi dati e attiverà il tuo account.
:::

</Checkbox>

<Checkbox label="Configura i gateway di pagamento" >

Vai in **Impostazioni > Pagamenti > [Gateway di pagamento](https://dashboard.voucherly.it/settings/payment/payment-gateways)** e abilita i gateway di pagamento di cui hai bisogno.

:::warning
Per attivare i gateway di pagamento è necessario inserire i parametri di configurazione specifici del merchant. Questi parametri vengono forniti al merchant tramite un accordo diretto con il gateway di pagamento.
:::

:::tip
Consigliamo vivamente di attivare un gateway di pagamento aggiuntivo, come carta di credito, Satispay o PayPal. È essenziale per garantire che i clienti possano sempre completare il pagamento, anche quando non utilizzano i buoni pasto.
:::

</Checkbox>

<Checkbox label="Scegli il piano di abbonamento migliore" >

Seleziona un piano di abbonamento adatto alle tue esigenze.  
Puoi effettuare l'upgrade o il downgrade del piano in qualsiasi momento per adattarlo alle tue necessità in evoluzione.

</Checkbox>

<Checkbox label="Configura il branding" >

Assicurati di configurare le impostazioni di branding del tuo account prima di andare in produzione. Puoi personalizzare:

- Colori personalizzati
- Logo e icona personalizzati
- Dominio personalizzato

:::info
Questa funzionalità è disponibile in base al tuo piano di abbonamento.
:::

</Checkbox>
