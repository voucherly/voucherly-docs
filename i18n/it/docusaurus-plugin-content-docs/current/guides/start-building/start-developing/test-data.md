---
slug: /guide/inizia-a-integrare/inizia-a-sviluppare/dati-di-test
sidebar_position: 4
description: "Dati di test per l'ambiente sandbox di Voucherly: i codici dei buoni pasto Demo Voucherly, le carte di test, e come simulare un pagamento fallito, una contabilizzazione fallita o un rimborso fallito."
keywords:
  - dati di test
  - sandbox
  - Demo Voucherly
  - carte di test
  - buoni pasto
  - Voucherly
---

# Dati di test

Nell'ambiente sandbox non viene addebitato nulla: i gateway che attivi lì lavorano contro i sistemi di test dei provider, oppure contro Demo Voucherly, un gateway che esiste solo per farti provare ogni esito. Usa la chiave `sk_sand_` sul tuo server e, con i [Voucherly Components](/guide/pagamenti-online/components), la chiave `pk_sand_` nella tua pagina: i gateway sandbox si configurano in **Impostazioni > Pagamenti > [Gateway di pagamento](https://dashboard.voucherly.it/settings/payment/payment-gateways)** con la modalità test attiva.

## Demo Voucherly

Demo Voucherly simula un buono pasto. Il cliente digita un codice di sette cifre in cui **le prime tre scelgono l'esito** e **le ultime quattro sono l'importo in centesimi**: `4201200` paga 12,00 €, `4200750` paga 7,50 €.

| Prefisso | Pagamento | Contabilizzazione | Rimborso |
| --- | --- | --- | --- |
| `420` | riesce | riesce | riesce |
| `777` | riesce | riesce | fallisce: la transazione finisce in `ImpossibleRefund` |
| `069` | riesce | fallisce: la transazione risulta scaduta quando la confermi | — |
| `619` | riesce | fallisce con un errore del gateway | fallisce con un errore del gateway |
| `090` | fallisce con un errore di pagamento | — | — |
| qualsiasi altro | rifiutato come codice non valido | — | — |

Come ogni buono pasto, Demo Voucherly viene catturato al checkout: un Payment pagato solo con questo arriva direttamente in `Confirmed`, e non chiami mai [Confirm a Payment](/api/webapi/confirm-payment) per lui. Può anche pagare una parte di un Payment — `4200500` su un Payment da 17,00 € lascia 12,00 € da coprire con un altro metodo — ed è il modo per provare i pagamenti parziali.

## Carte

Il gateway carte della sandbox accetta queste carte di test, con una data di scadenza futura qualsiasi e un CVC di tre cifre qualsiasi:

| Numero di carta | Esito |
| --- | --- |
| `4242 4242 4242 4242` | riesce senza autenticazione |
| `4000 0025 0000 3155` | chiede l'autenticazione 3-D Secure, poi riesce |
| `4000 0000 0000 9995` | rifiutata per fondi insufficienti |
| `4000 0000 0000 0002` | rifiutata |

Le transazioni con carta vengono autorizzate al checkout e catturate quando confermi il Payment, a meno che non sia stato creato con `isAutoConfirm: true`: dopo un pagamento con carta il Payment è `Paid` finché non chiami [Confirm a Payment](/api/webapi/confirm-payment). Vedi [Come funzionano i pagamenti](/guide/informazioni/risorse/ciclo-di-vita-dei-pagamenti).

## Altri gateway

MultiSafepay, PayPal, Satispay e gli altri provider usano i propri ambienti e account di test quando la modalità test è attiva. Le credenziali e gli strumenti di test sono quelli documentati da ciascun provider; quelli che Voucherly configura di default per la sandbox sono visibili nelle impostazioni del gateway nella Dashboard.

:::tip
Per la maggior parte delle integrazioni, Demo Voucherly più un gateway carte bastano a provare ogni caso che conta: un pagamento completo, un pagamento parziale completato con un secondo metodo, un pagamento rifiutato, una contabilizzazione fallita e un rimborso fallito.
:::
