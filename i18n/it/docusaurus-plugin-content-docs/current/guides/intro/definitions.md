---
slug: /guide/introduzione/definizioni
sidebar_position: 3
description: "Termini e concetti chiave di Voucherly: merchant, user, sede, customer, payment, gateway di pagamento, wallet e metodo di pagamento."
keywords:
  - definizioni voucherly
  - merchant
  - sede
  - insegna
  - area
  - customer
  - gateway di pagamento
  - wallet
  - metodo di pagamento
---

# Definizioni

Questa sezione definisce i termini e i concetti chiave utilizzati in Voucherly per aiutarti a comprendere meglio le guide e il funzionamento del sistema.

## Concetti e termini

### Merchant

Il titolare dell'attività di un negozio online che integra Voucherly. È l'entità a cui vengono intestate le fatture.

### User (Utente)

Una persona, tipicamente un dipendente del merchant, che può accedere e gestire l'account del merchant tramite la Dashboard. Gli utenti possono visualizzare i dati, modificare le impostazioni ed eseguire operazioni.

Un singolo utente può avere accesso a più merchant.

### Store (Sede)

Un punto vendita di un merchant, fisico oppure online. Nella Dashboard si trova in **Impostazioni > [Sedi](https://dashboard.voucherly.it/settings/store)**.

Ogni sede ha il proprio indirizzo, la propria connessione al POS e la propria configurazione di pagamento: un merchant con più sedi può quindi accettare gateway di pagamento diversi in ciascuna. Pagamenti e terminali possono essere attribuiti a una sede.

Consulta la guida [Configurazione per punto vendita](/guide/risorse/gateway-di-pagamento/configurazione-per-punto-vendita) per vedere come una sede viene collegata a una configurazione di pagamento.

### Concept Store (Insegna)

Un brand usato per raggruppare le sedi dello stesso merchant. Un merchant che gestisce più brand può distinguerli mantenendo un solo account. Nella Dashboard si trova in **Impostazioni > Sedi > [Insegne](https://dashboard.voucherly.it/settings/concept-store)**.

Assegnare un'insegna a una sede è opzionale.

Eliminare un'insegna non elimina mai le sue sedi: puoi spostarle su un'altra insegna, oppure lasciarle senza.

### Store Area (Area)

Un raggruppamento geografico o operativo di sedi, definito dal merchant: per esempio una regione, o un cluster in franchising. Nella Dashboard si trova in **Impostazioni > Sedi > [Aree](https://dashboard.voucherly.it/settings/store-area)**.

Assegnare un'area a una sede è opzionale. Le aree sono indipendenti dalle insegne: una sede può appartenere a entrambe, a una sola o a nessuna delle due.

Come per le insegne, eliminare un'area non elimina mai le sue sedi: puoi spostarle su un'altra area, oppure lasciarle senza.

### Customer (Cliente)

La persona che effettua acquisti sul sito del merchant e paga tramite Voucherly.

A ogni cliente in Voucherly viene assegnato un ID univoco che consente l'accesso al proprio wallet e permette di salvare e riutilizzare i metodi di pagamento.

### Payment (Pagamento)

L'entità che rappresenta l'azione di pagamento di un cliente. Un pagamento deve essere creato tramite API ogni volta che un cliente intende effettuare un pagamento. Voucherly genera una sessione in cui il cliente viene reindirizzato per selezionare i gateway di pagamento e completare il processo.

Un pagamento include più transazioni, ciascuna delle quali rappresenta un tentativo di pagamento tramite uno specifico gateway.

Consulta la guida [Come funzionano i pagamenti](/guide/risorse/ciclo-di-vita-dei-pagamenti) per una spiegazione dettagliata.

### Payment Gateway (Gateway di pagamento)

Un servizio esterno che Voucherly utilizza per autorizzare ed elaborare le transazioni.

I gateway di pagamento possono essere attivati o disattivati dalla Dashboard dopo aver inserito le credenziali necessarie, ottenute tramite accordi tra il merchant e il fornitore del gateway.

Consulta la guida [Gateway di pagamento](/guide/risorse/gateway-di-pagamento) per una spiegazione dettagliata.

### Wallet (Portafoglio)

Un portafoglio digitale che migliora l'esperienza d'acquisto eliminando la necessità di inserire i dati di pagamento a ogni transazione. Quando è abilitato tramite la Dashboard, i clienti possono ricaricare il proprio wallet e utilizzare il credito per acquisti futuri.

I wallet supportano la ricarica tramite buoni e il credito può essere utilizzato solo per prodotti idonei al pagamento con buoni.

Per maggiori dettagli, consulta [questa pagina](/guide/risorse/gateway-di-pagamento#wallet).

### Payment Method (Metodo di pagamento)

Lo strumento utilizzato dal cliente all'interno di un gateway di pagamento per eseguire una transazione.
