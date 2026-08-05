---
slug: /guide/integrazioni/tcpos
title: TCPOS
sidebar_position: 6
description: "Collega TCPOS a Voucherly: registra il webhook di saleability così i prodotti che esaurisci in cassa smettono di essere proposti in quel punto vendita."
keywords:
  - Voucherly TCPOS
  - integrazione TCPOS
  - disponibilità in cassa
  - prodotti esauriti
  - webhook saleability
  - integrazione cassa
---

# TCPOS

Quando il personale esaurisce un prodotto lo blocca in cassa, a mano oppure perché il contatore è arrivato a zero. Senza questa integrazione Voucherly non lo sa, continua a proporre il prodotto e incassa qualcosa che la cassa poi rifiuta.

L'integrazione chiude questa distanza: TCPOS avvisa Voucherly che qualcosa è cambiato, Voucherly rilegge dalla cassa l'elenco completo degli articoli bloccati e smette di proporre quei prodotti in quel punto vendita.

:::info
Voucherly non si fida della singola notifica: rilegge sempre l'elenco completo dalla cassa. Così una notifica persa non può lasciare i due sistemi disallineati — la successiva li rimette d'accordo.
:::

## Prerequisiti

- Leggi **[Come iniziare con un account Voucherly](/guide/introduzione/per-iniziare)**.
- La tua installazione TCPOS comprende il modulo **TCPOS.WebHook**.
- I tuoi punti vendita sono già collegati ai negozi corrispondenti in cassa. Ogni punto vendita Voucherly deve essere associato al negozio a cui appartiene, altrimenti le notifiche arrivano e Voucherly non sa a quale punto vendita si riferiscono.
- Il tuo catalogo prodotti è già sincronizzato dalla cassa. Voucherly aggancia gli articoli bloccati ai tuoi prodotti tramite i codici che scrive la sincronizzazione: un prodotto mai sincronizzato non può essere agganciato.

## Configurazione

### Voucherly

1. Accedi alla Dashboard.
2. Vai su **Impostazioni** > **Attività** > **[Integrazioni](https://dashboard.voucherly.it/merchant/integrations)** e clicca su TCPOS.
3. Clicca **Attiva**.
4. Espandi la riga di TCPOS e copia l'**URL del webhook**. È specifico del tuo account e dell'ambiente in cui ti trovi: l'URL dell'ambiente sandbox e quello di produzione sono diversi e non sono interscambiabili.

### TCPOS

Consegna l'URL del webhook a chi amministra la tua installazione TCPOS. Dal suo lato:

1. Registra l'URL come destinazione delle notifiche di saleability degli articoli su **TCPOS.WebHook**.
2. Imposta `ordersNotificationLegacyMode: false`.

:::warning
Senza `ordersNotificationLegacyMode: false` le notifiche non partono, e **non viene segnalato nessun errore da nessuna parte** — né su TCPOS né su Voucherly. Se dopo aver bloccato un articolo non succede niente, è la prima cosa da controllare.
:::

## Come funziona

### Due controlli indipendenti

Un prodotto viene proposto solo quando **entrambi** sono d'accordo:

| Controllo | Chi lo imposta | Dove |
|---|---|---|
| Disponibilità | tu | Dashboard, nella scheda del prodotto, per punto vendita |
| Bloccato in cassa | la cassa | automaticamente, non modificabile dalla Dashboard |

L'interruttore della disponibilità resta tuo: puoi continuare a disattivare un prodotto per un punto vendita per un motivo che la cassa non conosce, per esempio una ricetta che oggi non servi. E la cassa non può riaccendere qualcosa che hai deliberatamente spento.

Vale anche il contrario: finché un articolo è bloccato in cassa il prodotto non viene proposto, anche con il tuo interruttore attivo. Sulla giacenza la cassa ha ragione, quindi un prodotto bloccato lì si sblocca **dalla cassa**, non dalla Dashboard.

### Cosa vedi nella Dashboard

Nella scheda del prodotto, nella griglia dei punti vendita, accanto all'interruttore della disponibilità compare un badge **Bloccato in cassa** per i punti vendita in cui la cassa ha bloccato quel prodotto. L'interruttore resta modificabile: governa la tua decisione, non quella della cassa.

### Ambito

La disponibilità per punto vendita governa i prodotti che Voucherly propone in quel punto vendita, comprese le proposte mostrate durante il pagamento al tavolo. Non limita un catalogo online: se vendi anche tramite un sito e-commerce, un articolo bloccato in cassa può comunque essere ordinato lì.

## Risoluzione dei problemi

| Cosa vedi | Cosa significa di solito |
|---|---|
| Blocchi un articolo in cassa e in Voucherly non cambia niente | `ordersNotificationLegacyMode` è ancora `true`, oppure l'URL del webhook non è stato registrato — o è stato registrato sull'ambiente sbagliato |
| Un intero punto vendita non si aggiorna mai | quel punto vendita non è collegato al negozio a cui si riferiscono le notifiche |
| Alcuni articoli vengono bloccati, altri mai | gli articoli che non vengono mai bloccati non sono stati sincronizzati dalla cassa, quindi Voucherly non ha niente a cui agganciarli |
| Un prodotto resta bloccato dopo che l'hai riassortito | il blocco è ancora attivo in cassa: si rilascia da lì, non dalla Dashboard |

:::info support

- Scrivi a support@voucherly.it.
- Invia una richiesta di supporto su [voucherly.it/contattaci](https://voucherly.it/contattaci).
:::
