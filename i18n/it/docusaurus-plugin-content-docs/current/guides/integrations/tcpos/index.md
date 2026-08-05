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

:::note Disponibile in sandbox
L'integrazione è per ora disponibile nell'ambiente **sandbox**. Arriverà in produzione al termine della fase pilota: fino ad allora la riga TCPOS non compare nella pagina Integrazioni di un account di produzione.
:::

## Prerequisiti

- Leggi **[Come iniziare con un account Voucherly](/guide/introduzione/per-iniziare)**.
- La tua installazione TCPOS comprende il modulo **TCPOS.WebHook**.
- **Il TCPOS.WebHook è raggiungibile dai server di Voucherly.** È l'attivazione a registrare la sottoscrizione sulla tua cassa, quindi il collegamento deve funzionare anche in questa direzione, non solo dalla tua installazione verso di noi. Chi amministra il tuo TCPOS deve pubblicare il modulo su un indirizzo che possiamo raggiungere, con un certificato valido se è esposto in HTTPS.
- **Se l'autenticazione WOnD è attiva** sul tuo TCPOS.WebHook, le credenziali di un utente WOnD. Per difetto è disattivata, e si accende configurando un server WOnD nell'`appsettings.json` del modulo. Chiedi un utente dedicato con i privilegi minimi che permettano di gestire i webhook: quelle credenziali vengono conservate in Voucherly.
- I tuoi punti vendita sono già collegati ai negozi corrispondenti in cassa. Ogni punto vendita Voucherly deve essere associato al negozio a cui appartiene, altrimenti le notifiche arrivano e Voucherly non sa a quale punto vendita si riferiscono.
- Il tuo catalogo prodotti è già sincronizzato dalla cassa. Voucherly aggancia gli articoli bloccati ai tuoi prodotti tramite i codici che scrive la sincronizzazione: un prodotto mai sincronizzato non può essere agganciato.

## Configurazione

### Voucherly

1. Accedi alla Dashboard.
2. Vai su **Impostazioni** > **Attività** > **[Integrazioni](https://dashboard.voucherly.it/merchant/integrations)** e clicca su TCPOS.
3. Espandi la riga di TCPOS, apri i parametri e inserisci l'**indirizzo del tuo TCPOS.WebHook** — l'URL completo di porta, per esempio `https://wond.tuodominio.it:9797`. Utente e password WOnD si compilano solo se sulla tua installazione l'autenticazione è attiva.
4. Clicca **Attiva**. È questo il passo che registra la sottoscrizione sulla tua cassa: Voucherly chiama il TCPOS.WebHook e gli chiede di inviare al proprio indirizzo le notifiche di saleability degli articoli.

:::warning
Se la registrazione non riesce, l'integrazione **non** viene attivata e la Dashboard ti dice perché: indirizzo sbagliato, servizio non raggiungibile, oppure credenziali rifiutate. Non esiste uno stato a metà — «Attivato» significa sempre che la sottoscrizione esiste sulla tua cassa.
:::

Dopo l'attivazione l'accordion mostra anche l'**URL registrato su TCPOS.WebHook**. Non c'è niente da farci: è lì perché tu e il nostro supporto possiate confrontarlo con quello che vedete sul vostro TCPOS.

### TCPOS

Restano due cose in capo a chi amministra la tua installazione TCPOS, e nessuna delle due si può fare via API:

1. Impostare `ordersNotificationLegacyMode: false` nell'`appsettings.json` del TCPOS.WebHook, poi riavviare il servizio.
2. Rendere il modulo raggiungibile da Voucherly, e creare l'utente WOnD se l'autenticazione è attiva.

:::warning
Senza `ordersNotificationLegacyMode: false` le notifiche non partono, e **non viene segnalato nessun errore da nessuna parte** — né su TCPOS né su Voucherly. La sottoscrizione risulta registrata e tutto sembra a posto. Se dopo aver bloccato un articolo non succede niente, è la prima cosa da controllare.
:::

:::caution
Non cambiare l'utente WOnD dopo l'attivazione. TCPOS mostra a ogni utente soltanto i webhook che ha creato lui: con credenziali diverse Voucherly non vede più la sottoscrizione che ha registrato, ne creerebbe una seconda e non potrebbe più rimuovere la prima. Se le credenziali devono cambiare, disattiva prima l'integrazione e riattivala dopo.
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
| L'attivazione dà errore | l'indirizzo è sbagliato, il servizio non è raggiungibile da Voucherly, oppure le credenziali sono state rifiutate. Il messaggio dice quale dei tre |
| Il bottone **Attiva** è grigio | l'indirizzo del TCPOS.WebHook non è ancora stato inserito |
| Blocchi un articolo in cassa e in Voucherly non cambia niente | `ordersNotificationLegacyMode` è ancora `true`, oppure la sottoscrizione è stata rimossa lato TCPOS dopo l'attivazione |
| Funzionava, poi si è fermato dopo un intervento sul TCPOS | la sottoscrizione potrebbe essere stata rimossa. Apri i parametri e usa **Aggiorna**: la registra di nuovo |
| Un intero punto vendita non si aggiorna mai | quel punto vendita non è collegato al negozio a cui si riferiscono le notifiche |
| Alcuni articoli vengono bloccati, altri mai | gli articoli che non vengono mai bloccati non sono stati sincronizzati dalla cassa, quindi Voucherly non ha niente a cui agganciarli |
| Un prodotto resta bloccato dopo che l'hai riassortito | il blocco è ancora attivo in cassa: si rilascia da lì, non dalla Dashboard |

:::info support

- Scrivi a support@voucherly.it.
- Invia una richiesta di supporto su [voucherly.it/contattaci](https://voucherly.it/contattaci).
:::
