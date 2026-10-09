---
slug: /guide/informazioni/risorse/conferma-del-pagamento
sidebar_position: 4
description: "Conferma un pagamento Voucherly alle quantità o agli importi consegnati: cosa viene catturato, invalidato o rimborsato, e come refundMode tratta i buoni pasto."
keywords:
  - conferma pagamento
  - cattura parziale
  - quantità consegnate
  - refundMode
  - buoni pasto
  - rettifica ordine
---

# Conferma quello che hai consegnato

Quando prepari un ordine dopo che il cliente ha pagato, non sempre consegni quello che ha ordinato: un articolo manca, una confezione pesa meno. Con [Confirm a Payment](/api/webapi/confirm-payment) comunichi a Voucherly cosa hai consegnato davvero, e Voucherly decide cosa fare su ogni transazione: quanto catturare (capture), quali autorizzazioni invalidare (void) e cosa restituire.

Non ti serve sapere come ha pagato il cliente. Quali gateway catturano in parte, e come l'importo si divide fra buoni pasto e il resto, lo decide Voucherly.

**La conferma contabilizza, non riscrive l'ordine.** Le righe, gli sconti e l'`amount` del Payment continuano a descrivere l'ordinato. Quanto è stato incassato sta in campi a parte, descritti in [Cosa trovi dopo la conferma](#result).

## Quando puoi confermare {#when}

Puoi confermare solo un Payment nello stato `Paid`. Buoni pasto, wallet, quota prepagata, Satispay, SumUp e Adyen vengono catturati al checkout, quindi un Payment pagato solo con questi è già `Confirmed` quando il cliente paga (vedi [Come funzionano i pagamenti](./payments-lifecycle.md#payment-statuses)). Confermarlo di nuovo restituisce `409`. Per restituire denaro su un Payment `Confirmed`, usa [Refund a Payment](/api/webapi/refund-payment).

Un Payment pagato in parte con buoni pasto e in parte con carta resta `Paid` finché non lo confermi: la carta è autorizzata e aspetta te.

## Quattro modi di confermare {#four-ways}

Il corpo della richiesta accetta **al massimo uno** di questi. Combinarli restituisce `VALIDATION_ERROR`.

| Mandi | Cosa succede |
| --- | --- |
| Niente (`{}`) | Ogni autorizzazione viene catturata per intero. |
| `transactions` | Scegli tu quali transazioni catturare, e per quanto. Vedi [Confirm a Payment](/api/webapi/confirm-payment). |
| `lines` | Le quantità consegnate, riga per riga. Voucherly le somma e chiude le transazioni su quell'importo. |
| `finalAmount` e `foodAmount` | Gli importi da confermare, senza il dettaglio delle righe. |

Con `lines` o con gli importi puoi mandare anche `refundMode`, che decide se e come restituire il denaro già catturato. Vedi [Restituire il denaro già catturato](#refund-mode).

Tutti gli importi sono in centesimi.

## Confermare le quantità consegnate {#lines}

Manda **tutte le righe del Payment** con la quantità consegnata, e `0` per una riga non consegnata affatto:

```json
{
  "lines": [
    { "externalId": "5068138461", "quantity": 3 },
    { "externalId": "5068138462", "quantity": 0 }
  ],
  "refundMode": "Credit"
}
```

- **Una riga mancante è un errore, non uno zero.** Restituisce `LINES_MISMATCH`, così una riga persa per un bug della tua integrazione non può farti incassare meno senza che nessuno se ne accorga. Lo stesso vale per una riga che non corrisponde a nessuna riga del Payment.
- **Il consegnato non può superare l'ordinato.** Una quantità oltre quella ordinata restituisce `QUANTITY_EXCEEDS_ORDERED`. L'unico modo in cui una riga può costare più dell'ordinato è una riga venduta a peso, descritta in [Prodotti a peso variabile](./variable-weight.md).
- **Non puoi aggiungere righe.** La conferma toglie merce, non ne aggiunge.
- **Ometti la riga `PreauthorizationMargin`**, se il Payment ne ha una, oppure mandala con quantità `0`. Vedi [Prodotti a peso variabile](./variable-weight.md#confirm).

### Come vengono abbinate le righe {#pairing}

Ogni riga che mandi viene abbinata a una riga del Payment con gli identificativi che hai usato quando hai [creato il Payment](/api/webapi/create-payment):

1. **Il tuo riferimento di riga, `externalId`.** Abbina la riga da solo. Un valore che non corrisponde a nessuna riga restituisce `LINES_MISMATCH`: non ripiega mai sul prodotto.
2. **Il prodotto**, quando non mandi `externalId`. Manda lo stesso identificativo con cui hai creato la riga: `productId` se l'hai usato, altrimenti `product.externalId`, altrimenti `product.name` e `product.variant`. L'abbinamento non distingue maiuscole e minuscole. Le righe con lo stesso prodotto si abbinano in ordine di comparsa.

Puoi mandare le righe in qualsiasi ordine. Se due righe del tuo ordine possono avere lo stesso prodotto, mandare il tuo `externalId` è la scelta sicura.

### Come si calcola l'importo {#lines-amount}

I prezzi restano quelli ordinati. Voucherly somma le righe consegnate e applica gli sconti:

- uno sconto sull'intera riga segue la quantità, in proporzione, arrotondato al centesimo;
- gli sconti del Payment si applicano all'importo consegnato: uno sconto percentuale scala con esso, uno sconto di importo fisso resta com'è;
- uno sconto `FIXED` fissa il totale, quindi lo mantiene al suo valore anche quando consegni meno. Se togliere merce deve abbassare l'incasso, non usare uno sconto `FIXED`.

L'importo food, la parte che i buoni pasto possono pagare, è la somma delle righe `Food` consegnate.

## Confermare a importo {#amounts}

Quando conosci solo i totali, mandali senza le righe:

```json
{
  "finalAmount": 9500,
  "foodAmount": 8500
}
```

`finalAmount` è l'importo da confermare e deve essere maggiore di zero. `foodAmount` è la parte che i buoni pasto possono pagare: è obbligatorio e non può superare `finalAmount`. Le righe del Payment non vengono toccate.

## Come Voucherly ripartisce l'importo {#split}

Che arrivi dalle righe o dagli importi, Voucherly ottiene un importo finale e un importo food, e chiude le transazioni su questi:

1. **I buoni pasto pagano solo il food.** La quota pagata in buoni pasto si porta al massimo all'importo food. Se i buoni pasto già catturati lo superano, la differenza va restituita. Il saldo del wallet che viene da buoni pasto conta come buoni pasto.
2. **Le altre transazioni coprono il resto**, esattamente. Le autorizzazioni si catturano in parte o si invalidano, mai si rimborsano. Se è stato già catturato più del dovuto, la differenza va restituita.
3. **Non si cattura mai oltre l'autorizzato.** Un importo più alto restituisce `AMOUNT_EXCEEDS_PAID`, e `maximumAmount` nell'errore ti dice l'importo più alto che puoi confermare.

Per esempio, un ordine da 100,00 € con 90,00 € di food, pagato con 60,00 € in buoni pasto (catturati al checkout) e 40,00 € con carta (autorizzati):

| Confermi (finale / food) | Carta | Buoni pasto |
| --- | --- | --- |
| 95,00 € / 85,00 € | 35,00 € catturati, 5,00 € rilasciati | invariati |
| 80,00 € / 50,00 € | 30,00 € catturati | 10,00 € da restituire |
| 50,00 € / 50,00 € | invalidata | 10,00 € da restituire |

Nelle ultime due righe qualcosa va restituito, quindi la conferma ha bisogno di un `refundMode` che lo consenta.

Alcuni gateway hanno vincoli propri. Alcuni catturano solo l'intero importo autorizzato, altri hanno un importo minimo: una cattura che resta sotto il minimo restituisce `CAPTURE_BELOW_MINIMUM`. Una transazione che unisce buoni pasto e un altro metodo, come possono fare Satispay o il wallet, resta com'è. Quando nessuna ripartizione torna, la conferma restituisce `CANNOT_ALLOCATE`.

## Restituire il denaro già catturato: `refundMode` {#refund-mode}

`refundMode` riguarda solo il denaro **già catturato**. Le autorizzazioni non si rimborsano mai: si catturano in parte o si invalidano.

| Valore | Cosa succede |
| --- | --- |
| `NoRefund` | Il default. Non si restituisce niente: se la conferma dovesse farlo, restituisce `REFUND_REQUIRED` e nessuna transazione viene toccata. |
| `Gateway` | Il denaro viene rimborsato tramite il gateway di pagamento. Se la configurazione del gateway non consente un rimborso parziale, la conferma restituisce `IMPOSSIBLE_PARTIAL_REFUND` prima di toccare qualsiasi transazione. |
| `Credit` | Il denaro viene accreditato sul wallet del cliente, senza chiamare il gateway. |
| `GatewayOrCredit` | Rimborso tramite il gateway dove lo consente, accredito sul wallet altrimenti, anche quando il gateway rifiuta il rimborso. |

Il default è `NoRefund` perché una conferma non è una richiesta di rimborso: restituire denaro dev'essere una tua scelta esplicita. L'errore `REFUND_REQUIRED` ti dice quanto tornerebbe indietro, in `voucherRefundAmount` (buoni pasto) e `refundAmount` (il resto), così puoi decidere e rimandare la richiesta con un `refundMode`.

**Un accredito mantiene la natura del denaro da cui nasce.** Un accredito che viene da buoni pasto si può spendere solo sul food.

[Refund a Payment](/api/webapi/refund-payment) usa gli stessi valori, con un default diverso: `Gateway`, perché un rimborso è già una richiesta esplicita. Lì `NoRefund` non è accettato.

## Cosa trovi dopo la conferma {#result}

La risposta è il [Payment](/api/webapi/schemas/payment).

- `amount`, le righe e gli sconti sono **invariati**: descrivono ancora l'ordine.
- `confirmedAmount`, `cancelledAmount` e `refundedAmount` ti dicono quanto è stato catturato, rilasciato o invalidato, e restituito. Un accredito sul wallet conta in `refundedAmount`.
- Su ogni riga confermata con `lines`, `confirmedQuantity` e `confirmedFinalAmount` riportano la quantità e l'importo consegnati. Ci sono solo quando differiscono dall'ordine, e mai dopo una conferma a importo.

Quando rileggi il Payment con [Retrieve a Payment](/api/webapi/retrieve-payment), aggiungi `include=Lines` per avere le righe.

Lo scontrino per il cliente, documento commerciale o ricevuta non fiscale, mostra quanto è stato consegnato e incassato: le righe consegnate a `0` non compaiono. L'email d'ordine parte quando il cliente paga, quindi mostra l'ordine.

## Errori e nuovi tentativi {#errors}

In caso di errore la risposta è un oggetto [problem details](/api/generale/errori), con un `code` e i campi che lo spiegano. Ricevi un errore alla volta.

| `code` | Stato | Cosa significa |
| --- | --- | --- |
| `ALREADY_CONFIRMED`, `INVALID_STATUS` | `409` | Il Payment non è `Paid`, oppure un'autorizzazione è scaduta prima di poter essere catturata. |
| `QUANTITY_EXCEEDS_ORDERED` | `400` | Una quantità supera quella ordinata. `line` è la posizione della riga nella tua richiesta. |
| `PIECES_NOT_ALLOWED`, `PIECES_COUNT_MISMATCH`, `MARGIN_NOT_CONFIRMABLE` | `400` | Vedi [Prodotti a peso variabile](./variable-weight.md#confirm). |
| `LINES_MISMATCH` | `422` | Manca una riga del Payment, oppure una riga mandata non corrisponde a nessuna. |
| `INVALID_AMOUNT` | `422` | Non c'è niente da confermare: non è stato consegnato niente. Per restituire l'intero Payment, rimborsalo. |
| `AMOUNT_EXCEEDS_PAID` | `422` | L'importo supera l'autorizzato. Vedi `maximumAmount`. |
| `REFUND_REQUIRED` | `422` | Andrebbe restituito denaro già catturato, e `refundMode` non lo consente. |
| `CAPTURE_BELOW_MINIMUM`, `CANNOT_ALLOCATE` | `422` | Gli importi non si possono ripartire sulle transazioni di questo Payment. |
| `IMPOSSIBLE_PARTIAL_REFUND`, `IMPOSSIBLE_REFUND`, `INSUFFICIENT_FUNDS` | `422` | Il gateway non può restituire il denaro. Con i primi due puoi confermare con `Credit` o `GatewayOrCredit`. |
| `FAILED_DEPENDENCY` | `424` | Un gateway di pagamento ha avuto un guasto. |

Con gli errori prima delle ultime due righe non viene catturato, invalidato o restituito niente.

**Il Payment resta `Paid` finché ogni operazione non è riuscita.** Voucherly lavora sulle transazioni in sequenza e può fallire a metà, per esempio quando un gateway rifiuta un rimborso dopo che la carta è già stata catturata. In quel caso l'errore riporta `operations`, l'elenco di quanto è già stato fatto, e il Payment è ancora `Paid`. **Rimanda la stessa richiesta**: Voucherly riparte dallo stato attuale e fa solo quello che manca. Cambia `refundMode` se l'errore lo suggerisce, ma tieni le stesse righe o gli stessi importi.
