---
slug: /guide/informazioni/risorse/peso-variabile
sidebar_position: 5
description: "Vendi prodotti a peso variabile con Voucherly: dichiara l'unità di misura, autorizza un margine e conferma ogni confezione al suo peso reale con pieces."
keywords:
  - peso variabile
  - prodotti a peso
  - margine di preautorizzazione
  - product.unit
  - pieces
  - spesa online
---

# Prodotti a peso variabile

Alcuni prodotti si ordinano a pezzi ma si pagano a misura. Una confezione di susine è "un pezzo, circa 0,75 kg, 1,98 €/kg", e il suo prezzo si conosce solo al picking, quando quella confezione pesa 0,65 kg oppure 0,81 kg.

Voucherly gestisce questo caso in tre passaggi:

1. **Quando crei il Payment**, la riga dichiara la sua unità di misura, e una riga di margine autorizza più del totale stimato.
2. **Quando confermi il Payment**, mandi l'importo di ogni confezione consegnata davvero.
3. **Sui documenti per il cliente**, ogni confezione è stampata su un rigo suo, con il suo peso.

Questa pagina si appoggia a [Conferma quello che hai consegnato](./payment-confirmation.md), che spiega come una conferma chiude le transazioni.

## Quando crei il Payment {#create}

Dichiara `product.unit` su ogni riga il cui prezzo può cambiare alla consegna, e aggiungi una riga di tipo `PreauthorizationMargin`:

```json
"lines": [
  {
    "quantity": 2,
    "unitAmount": 149,
    "externalId": "5068138459",
    "product": {
      "externalId": "761703",
      "name": "Susine gialle",
      "lineType": "Food",
      "unit": { "code": "kg", "size": 0.75, "amount": 198 }
    }
  },
  {
    "quantity": 3,
    "unitAmount": 95,
    "externalId": "5068138461",
    "product": {
      "externalId": "120738",
      "name": "Pasta sfoglia rotonda 230 g",
      "lineType": "Food"
    }
  },
  {
    "quantity": 1,
    "unitAmount": 500,
    "product": {
      "name": "Margine peso variabile",
      "lineType": "PreauthorizationMargin"
    }
  }
]
```

### L'unità di misura: `product.unit` {#unit}

| Campo | Cos'è |
| --- | --- |
| `code` | L'unità di misura, come `kg` o `l`. Obbligatorio, al massimo 10 caratteri. |
| `size` | Il contenuto nominale di un pezzo, nell'unità di `code`, con al massimo tre decimali. |
| `amount` | Il prezzo per unità di misura, in centesimi. |

`product.unit` è **solo descrittivo**: Voucherly non ne ricava nessun importo. `unitAmount` per `quantity` resta quanto il cliente paga al checkout, e il checkout, la Dashboard e l'email d'ordine mostrano la riga come "ca. 0.75 kg · 1.98 €/kg".

Il motivo è l'arrotondamento. 1,98 × 0,75 fa 1,485, che la tua cassa trasforma in 1,48 o 1,49 a seconda di come arrotonda. Se Voucherly rifacesse il conto, su ordini veri uscirebbe un centesimo di scarto, con uno scontrino che non torna con l'addebito. Gli importi li mandi tu, come li calcola la tua cassa.

### Il margine: `PreauthorizationMargin` {#margin}

La riga di margine è **capienza dell'autorizzazione, non merce**. Il cliente autorizza il totale stimato più il margine, ed è l'unico modo per catturare più dell'ordinato quando una confezione pesa di più.

- L'importo lo scegli tu.
- **Non è food**, quindi i buoni pasto non possono pagarlo: il peso in più va sulla carta, anche quando i buoni pasto hanno coperto tutto il food ordinato.
- Il checkout non lo elenca fra i prodotti. Conta nel totale, e un'icona informativa accanto al totale lo spiega. Manda `product.name` e `product.variant` sulla riga di margine per cambiare il testo di quella spiegazione.
- Non viene mai stampato sui documenti per il cliente.

## Quando confermi: `pieces` {#confirm}

Conferma con [`lines`](./payment-confirmation.md#lines), e su ogni riga creata con `product.unit` manda `pieces`, uno per ogni confezione consegnata:

```json
{
  "lines": [
    {
      "externalId": "5068138459",
      "quantity": 2,
      "pieces": [
        { "finalAmount": 129, "size": 0.65 },
        { "finalAmount": 139, "size": 0.70 }
      ]
    },
    { "externalId": "5068138461", "quantity": 3 }
  ]
}
```

- **Un piece è una confezione fisica.** `quantity` è il numero di confezioni consegnate, e `pieces` deve avere altrettanti elementi, altrimenti `PIECES_COUNT_MISMATCH`. Se manca una confezione su due, manda `quantity: 1` e un solo piece. Per una riga non consegnata affatto, manda `quantity: 0` senza `pieces`.
- **`finalAmount` è l'importo addebitato per quella confezione**, in centesimi, netto e definitivo: lo sconto di riga non gli viene riapplicato. Gli sconti del Payment si applicano comunque al totale, come in ogni conferma. Con `pieces` una riga può costare più dell'ordinato, ma la sua quantità non può comunque superare quella ordinata.
- **`pieces` solo su una riga creata con `product.unit`**, altrimenti `PIECES_NOT_ALLOWED`. Così il margine non può servire a cambiare il prezzo di un prodotto a prezzo fisso.
- **Il tetto è l'importo autorizzato**: un totale più alto dell'autorizzato, margine compreso, restituisce `AMOUNT_EXCEEDS_PAID`.
- **Ometti la riga di margine**, oppure mandala con quantità `0` e senza `pieces`. Qualsiasi altra cosa restituisce `MARGIN_NOT_CONFIRMABLE`. Il margine viene sempre rilasciato: quanto dell'autorizzazione non serve alla merce consegnata viene invalidato.
- **`size` è descrittivo**, nell'unità di `unit.code`, con al massimo tre decimali. Finisce sui documenti e non entra mai in nessun calcolo.
- **Ogni conferma sostituisce i pieces precedenti.** Rimandare la stessa riga senza `pieces` li cancella.

L'importo food non lo calcoli tu: Voucherly somma le righe `Food` consegnate, pieces compresi.

In questo esempio il cliente ha autorizzato 10,83 € (2,98 € di susine, 2,85 € di pasta sfoglia e 5,00 € di margine). La conferma incassa 5,53 €: 1,29 € e 1,39 € per le susine, 2,85 € per la pasta sfoglia. I restanti 5,30 € dell'autorizzazione vengono rilasciati.

Dopo la conferma la riga riporta `confirmedQuantity` e `confirmedFinalAmount` (il numero e la somma dei pieces) e `confirmedPieces`, i pieces come li hai mandati. `confirmedFinalAmount` può superare il `finalAmount` ordinato.

## Cosa vede il cliente {#documents}

Sullo scontrino ogni confezione è un rigo a sé, con il peso nella descrizione: "Susine gialle 0.65 kg" a 1,29 €, "Susine gialle 0.7 kg" a 1,39 €. Le confezioni con lo stesso peso e lo stesso importo vengono unite in un solo rigo.

Un rigo unico "1,35 kg a 1,98 €/kg" non può funzionare, perché l'aritmetica non lo consente:

| | |
| --- | --- |
| 0,65 kg × 1,98 € | 1,287 → **1,29 €** |
| 0,70 kg × 1,98 € | 1,386 → **1,39 €** |
| addebitato | **2,68 €** |
| 1,35 kg × 1,98 € | 2,673 → **2,67 €** |

Lo scontrino calcola ogni rigo come quantità × prezzo, quindi un solo rigo da 1,35 kg non può stampare 2,68 €. Voucherly non moltiplica mai il peso per il prezzo: stampa gli importi che hai addebitato.

## Confermare senza i pieces {#amounts}

La [conferma a importo](./payment-confirmation.md#amounts), con `finalAmount` e `foodAmount`, funziona anche qui: Voucherly cattura fino a quell'importo e rilascia il resto del margine. Le righe non vengono toccate, quindi lo scontrino parte dai prezzi ordinati e riporta il totale a quanto incassato, ripartendo la differenza sui righi. Il totale è giusto, ma lo scontrino non dice quale confezione pesava meno. Per avere uno scontrino che descrive la merce consegnata, manda i pieces.

## Cosa non è gestito {#limits}

La **sostituzione** di un prodotto con un altro non è supportata. Un piece può avere un importo diverso, ma lo scontrino stamperebbe comunque il nome del prodotto ordinato.
