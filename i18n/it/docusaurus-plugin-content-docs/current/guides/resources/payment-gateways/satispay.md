---
slug: /guide/risorse/gateway-di-pagamento/satispay
sidebar_position: 15
description: "Accetta Satispay con Voucherly in un'unica integrazione che gestisce anche buoni pasto e Fringe Benefit: crea un negozio, collega il codice di attivazione, vai live."
keywords:
  - Satispay
  - Satispay Business
  - buoni pasto
  - Fringe Benefit
  - codice di attivazione
  - Voucherly
---


# Satispay

Voucherly integra Satispay con un'**unica integrazione** che accetta, nella stessa transazione e in modo trasparente:

- **Satispay** — il pagamento digitale standard.
- **Buoni Pasto**.
- **Fringe Benefit** (welfare / benefit aziendale).

Non devi configurarli separatamente: se la tua utenza Satispay Business è abilitata ai buoni pasto o al welfare, funzionano semplicemente insieme al Satispay standard. Voucherly recupera da Satispay come viene suddiviso ogni pagamento (digitale / buono pasto / benefit).

L'attivazione richiede solo di creare un **negozio** Satispay e collegare il suo codice di attivazione a Voucherly.


## Diventa partner

Per accettare Satispay con Voucherly ti servono un account **Satispay Business** e almeno un **negozio**.

1. Accedi a [dashboard.satispay.com](https://dashboard.satispay.com) e crea un negozio — vedi [Negozi](https://support.satispay.com/it/articles/negozi).
   - Scegli **E-commerce web** per un singolo negozio online.
   - Scegli **Punto vendita fisico** per una sede fisica.
2. Ottieni il **codice di attivazione** del negozio — vedi [Codice di attivazione](https://support.satispay.com/it/articles/codice-di-attivazione). Incollerai questo codice in Voucherly.

:::info
Ogni negozio Satispay ha il proprio codice di attivazione. Un negozio = un codice di attivazione = un account di pagamento in Voucherly. Se gestisci più di un punto vendita, crea un negozio per ogni punto vendita e consulta [Configurazione per punto vendita](/guide/risorse/gateway-di-pagamento/configurazione-per-punto-vendita).
:::


## Configurazione

Configura Satispay in **Impostazioni > Pagamenti > [Gateway di pagamento](https://dashboard.voucherly.it/settings/payment/payment-gateways)** nella Dashboard di Voucherly:

1. Crea un nuovo account di pagamento Satispay e assegnagli un nome che identifichi il negozio.
2. Imposta i parametri seguenti e salva.

| Parametro | Valore |
|-|-|
| **Ambiente** | *Produzione* per i pagamenti in produzione, *Staging* per i test. |
| **Token** | Il **codice di attivazione** del negozio dalla tua dashboard Satispay Business. |

È tutto: Voucherly genera automaticamente le chiavi di firma e il `KeyId` e valida le credenziali. Non è necessario inserire manualmente alcun altro valore.

:::warning
Il codice di attivazione è monouso e legato a un singolo negozio. Se la validazione fallisce, genera un nuovo codice di attivazione dalla dashboard Satispay e incollalo di nuovo.
:::

### Punti vendita multipli

Per una catena, o quando Satispay è già attivato separatamente per ogni negozio, crea **un account di pagamento per ogni negozio** e assegna ciascuno al proprio punto vendita. Vedi **[Configurazione per punto vendita](/guide/risorse/gateway-di-pagamento/configurazione-per-punto-vendita)**.


## Buoni pasto & Fringe Benefit

Accettare **Buoni Pasto** e **Fringe Benefit** tramite Satispay non richiede alcuna configurazione aggiuntiva in Voucherly — la stessa integrazione li gestisce.

- Se la tua utenza Satispay Business è **già abilitata** ai buoni pasto / welfare, funzionano immediatamente.
- Se vuoi **abilitarli**, questo dipende da Satispay, non da Voucherly: contatta il **supporto Satispay** per richiedere l'attivazione.

:::info
Contattali tramite la [pagina contatti di Satispay](https://www.satispay.com/it-it/contatti/). Consulta anche la guida per i merchant [Buoni Pasto Satispay per il tuo negozio](https://www.satispay.com/it-it/blog/welfare-benefits/configurare-satispay-accettare-buoni-pasto-nei-negozi/). Sul lato Voucherly è tutto trasparente — una volta abilitata la tua utenza Satispay Business, non è necessaria alcuna modifica alla configurazione.
:::


## Go live

Una volta configurato l'account con l'ambiente *Produzione* e validato, sei pronto ad accettare Satispay — inclusi buoni pasto e Fringe Benefit — con Voucherly!
