---
slug: /guide/informazioni/risorse/ciclo-di-vita-dei-pagamenti
sidebar_position: 1
description: "Scopri come funzionano i pagamenti Voucherly: autorizzazione e capture, processo two-step e l'elenco completo degli stati di pagamento e transazione."
keywords:
  - ciclo di vita del pagamento
  - autorizzazione e capture
  - stati del pagamento
  - stati della transazione
  - pagamento two-step
  - Voucherly
---

# Come funzionano i pagamenti

### Scopri come funzionano i pagamenti all'interno del flusso di pagamento

In Voucherly, un pagamento è un'entità logica che gestisce l'esperienza di checkout dell'utente. Ogni pagamento può includere più transazioni, dove ogni transazione rappresenta un tentativo di pagamento tramite uno specifico gateway di pagamento.

In genere, l'elaborazione dei pagamenti di Voucherly segue un approccio two-step (in due fasi):

- **Autorizzazione**. Dopo che il cliente ha fornito i propri dati di pagamento, il sistema verifica la disponibilità dei fondi e li mette in sospeso.
- **Capture**. I fondi trattenuti vengono quindi prelevati dal conto del cliente, elaborati e trasferiti sul conto del merchant.

Questo processo garantisce un flusso di pagamento sicuro e affidabile.

Separare l'autorizzazione e la capture è utile quando sono necessarie azioni aggiuntive tra la conferma della capacità di pagare del cliente e l'incasso del pagamento. Ad esempio, se vendi articoli con disponibilità limitata, potresti dover verificare che l'articolo sia ancora disponibile prima di catturare il pagamento e completare l'ordine. Puoi seguire questo flusso di lavoro:

1. Verifica che Voucherly abbia autorizzato il metodo di pagamento del cliente.
2. Controlla il tuo sistema di gestione del magazzino per verificare che l'articolo sia ancora disponibile.
3. Aggiorna il tuo sistema di magazzino per registrare che l'articolo è stato acquistato.
4. Esegui la capture del pagamento del cliente.
5. Comunica al cliente sulla pagina di conferma se l'acquisto è andato a buon fine.

Consulta [Separare autorizzazione e conferma](/guide/pagamenti-online/hosted-checkout#separare-autorizzazione-e-conferma) per informazioni più tecniche.

:::warning
I gateway di pagamento dei buoni pasto non supportano il processo two-step, e nemmeno il wallet, la quota prepagata, Satispay scelto tra i buoni pasto e alcuni provider — tra cui SumUp e Adyen. Le loro transazioni vengono catturate al checkout, quindi un Payment pagato solo con questi è `Confirmed` appena il cliente paga, mentre un Payment pagato con carta, PayPal o Satispay scelto tra i pagamenti digitali resta `Paid` finché non lo confermi. La tua integrazione dovrebbe leggere lo `status` del Payment invece di dedurlo dal metodo di pagamento.
:::

:::tip
Puoi definire il comportamento predefinito in **Impostazioni > Pagamenti > [Gateway di pagamento](https://dashboard.voucherly.it/settings/payment/payment-gateways) > Contabilizzazione automatica**. Quando è abilitata, tutte le transazioni vengono catturate automaticamente al termine di un pagamento.
:::

### Quando un Payment si chiude {#completion-mode}

Un Payment può essere pagato con più di una Transaction — un buono pasto per una parte dell'importo, una carta per il resto. `completionMode`, impostato in [Create a Payment](/api/webapi/create-payment), decide quando il Payment smette di chiedere altro:

- **Standard** (default). Il Payment si chiude quando l'intero importo è coperto. Dopo una Transaction parziale il checkout chiede l'importo residuo con un altro metodo di pagamento.
- **Partial**. Il Payment si chiude con la prima Transaction riuscita, qualunque importo copra, e il residuo non viene incassato. Usalo quando il resto si salda altrove — alla cassa, o con un Payment successivo.
- **AnyTransaction**. Come `Partial`.

### Stati del Payment {#payment-statuses}

I Payment hanno un campo `status` che riflette gli stati delle relative Transaction.

- **Requested**. È stato creato un Payment ma non esiste ancora alcuna Transaction.
- **Paid**. Il cliente ha completato con successo il checkout. Almeno una Transaction è nello stato `Paid` e attende il completamento.
- **Confirmed**. Il Payment è andato a buon fine e tutte le Transaction sono state confermate.
- **Refunded**. Tutte le Transaction sono state rimborsate o annullate.
- **Cancelled**. Tutte le Transaction sono state annullate.
- **Voided**. Il Payment è stato invalidato (voided) mentre era ancora `Requested`, dal cliente durante il checkout o da te con [Void a Payment](/api/webapi/void-payment). Tutte le Transaction sono state invalidate.
- **Expired**. Il Payment è scaduto.

In breve: un Payment passa da `Requested` a `Paid` quando il cliente completa il checkout e a `Confirmed` quando i fondi vengono catturati. [Void a Payment](/api/webapi/void-payment) funziona solo su un Payment `Requested`; una volta `Paid` o `Confirmed`, la strada a ritroso è [Refund a Payment](/api/webapi/refund-payment), che annulla le autorizzazioni non ancora catturate e rimborsa quelle catturate.

### Stati della Transaction

Lo stato di una Transaction è determinato dal campo `status`.

- **Requested**. È stato creato un nuovo oggetto Transaction ma non è ancora stato pagato.
- **NextAction**. Il cliente deve ancora completare un passaggio richiesto dal gateway di pagamento prima che la Transaction possa essere pagata.
- **Paid**. La Transaction è stata autorizzata. I fondi restano bloccati fino alla conferma ([Confirm Payment API](/api/webapi/confirm-payment)) o allo scadere dell'intervallo di tempo definito dalla configurazione del gateway di pagamento.
- **Confirmed**. La Transaction è stata catturata (capture). I fondi precedentemente bloccati sono stati trasferiti sul conto del merchant.
- **Refunded**. Una Transaction nello stato `Confirmed` è stata completamente rimborsata.
- **RefundedPartially**. È stata rimborsata una parte dell'importo di una Transaction `Confirmed`; il resto può ancora essere rimborsato.
- **Cancelled**. Una Transaction nello stato `Paid` è stata annullata, sbloccando i fondi.
- **Failed**. Il gateway di pagamento non è riuscito a elaborare la Transaction.
- **Voided**. Una Transaction `Paid` è stata invalidata (voided) a causa di un errore o dell'annullamento del pagamento da parte del cliente.
- **Expired**. La Transaction è scaduta.
- **Reversed**. Una Transaction `Paid` è stata annullata durante il checkout, prima della chiusura del Payment, e non concorre all'importo pagato.
- **ImpossibleRefund**. Non è stato possibile elaborare un rimborso per la Transaction. È comune per i gateway di pagamento dei buoni pasto.
