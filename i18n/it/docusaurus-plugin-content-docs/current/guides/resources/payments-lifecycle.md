---
slug: /guide/risorse/ciclo-di-vita-dei-pagamenti
sidebar_position: 1
description: "Scopri come funzionano i pagamenti Voucherly: autorizzazione e capture, processo a due fasi e l'elenco completo degli stati di pagamento e transazione."
keywords:
  - ciclo di vita del pagamento
  - autorizzazione e capture
  - stati del pagamento
  - stati della transazione
  - pagamento a due fasi
  - Voucherly
---

# Come funzionano i pagamenti

### Scopri come funzionano i pagamenti all'interno del flusso di pagamento.

In Voucherly, un pagamento è un'entità logica che gestisce l'esperienza di checkout dell'utente. Ogni pagamento può includere più transazioni, dove ogni transazione rappresenta un tentativo di pagamento tramite uno specifico gateway di pagamento.

In genere, l'elaborazione dei pagamenti di Voucherly segue un approccio in due fasi:

- **Autorizzazione**. Dopo che il cliente ha fornito i propri dati di pagamento, il sistema verifica la disponibilità dei fondi e li mette in sospeso.
- **Cattura**. I fondi trattenuti vengono quindi prelevati dal conto del cliente, elaborati e trasferiti sul conto del merchant.

Questo processo garantisce un flusso di pagamento sicuro e affidabile.

Separare l'autorizzazione e la cattura è utile quando sono necessarie azioni aggiuntive tra la conferma della capacità di pagare del cliente e l'incasso del pagamento. Ad esempio, se vendi articoli con disponibilità limitata, potresti dover verificare che l'articolo sia ancora disponibile prima di catturare il pagamento e completare l'ordine. Puoi seguire questo flusso di lavoro:

1. Verifica che Voucherly abbia autorizzato il metodo di pagamento del cliente.
2. Controlla il tuo sistema di gestione del magazzino per verificare che l'articolo sia ancora disponibile.
3. Aggiorna il tuo sistema di magazzino per registrare che l'articolo è stato acquistato.
4. Cattura il pagamento del cliente.
5. Comunica al cliente sulla pagina di conferma se l'acquisto è andato a buon fine.

Consulta [Separare autorizzazione e conferma](/guide/casi-duso/e-commerce#separare-autorizzazione-e-conferma) per informazioni più tecniche.

:::warning
I gateway di pagamento dei buoni pasto non supportano il processo a due fasi.
:::

:::tip
Puoi definire il comportamento predefinito in **Impostazioni > Pagamenti > [Gateway di pagamento](https://dashboard.voucherly.it/settings/payment/payment-gateways) > Contabilizzazione automatica**. Quando è abilitata, tutte le transazioni vengono catturate automaticamente al termine di un pagamento.
:::

### Stati del pagamento {#payment-statuses}

I pagamenti hanno un campo `status` che riflette gli stati delle relative transazioni.

- **Requested**. È stato creato un pagamento ma non esiste ancora alcuna transazione.
- **Paid**. Il cliente ha completato con successo il checkout. Almeno una transazione è nello stato `Paid` e attende il completamento.
- **Confirmed**. Il pagamento è andato a buon fine e tutte le transazioni sono state confermate.
- **Refunded**. Tutte le transazioni sono state rimborsate o annullate.
- **Cancelled**. Tutte le transazioni sono state annullate.
- **Voided**. L'utente ha annullato il pagamento durante il checkout. Tutte le transazioni sono state invalidate (voided).
- **Expired**. Il pagamento è scaduto.

### Stati della transazione

Lo stato di una transazione è determinato dal campo `status`.

- **Requested**. È stato creato un nuovo oggetto transazione ma non è ancora stato pagato.
- **Paid**. La transazione è stata autorizzata. I fondi restano bloccati fino alla conferma ([Confirm Payment API](/api/webapi/confirm-payment)) o allo scadere dell'intervallo di tempo definito dalla configurazione del gateway di pagamento.
- **Confirmed**. La transazione è stata catturata (capture). I fondi precedentemente bloccati sono stati trasferiti sul conto del merchant.
- **Refunded**. Una transazione nello stato `Confirmed` è stata completamente rimborsata.
- **Dropped**. La transazione è stata rilasciata.
- **Cancelled**. Una transazione nello stato `Paid` è stata annullata, sbloccando i fondi.
- **Failed**. Il gateway di pagamento non è riuscito a elaborare la transazione.
- **Voided**. Una transazione `Paid` è stata invalidata (voided) a causa di un errore o dell'annullamento del pagamento da parte del cliente.
- **Expired** La transazione è scaduta.
- **ImpossibleRefund**. Non è stato possibile elaborare un rimborso per la transazione. È comune per i gateway di pagamento dei buoni pasto.
