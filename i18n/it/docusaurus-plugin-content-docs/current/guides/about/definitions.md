---
slug: /guide/informazioni/definizioni
sidebar_position: 3
description: "Termini e concetti chiave di Voucherly: merchant, user, customer, payment, gateway di pagamento, wallet e metodo di pagamento."
keywords:
  - definizioni voucherly
  - merchant
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

### Customer (Cliente)

La persona che effettua acquisti sul sito del merchant e paga tramite Voucherly.

A ogni cliente in Voucherly viene assegnato un ID univoco che consente l'accesso al proprio wallet e permette di salvare e riutilizzare i metodi di pagamento.

### Payment (Pagamento)

L'entità che rappresenta l'azione di pagamento di un cliente. Un pagamento deve essere creato tramite API ogni volta che un cliente intende effettuare un pagamento. Voucherly genera una sessione in cui il cliente viene reindirizzato per selezionare i gateway di pagamento e completare il processo.

Un pagamento include più transazioni, ciascuna delle quali rappresenta un tentativo di pagamento tramite uno specifico gateway.

Consulta la guida [Come funzionano i pagamenti](/guide/informazioni/risorse/ciclo-di-vita-dei-pagamenti) per una spiegazione dettagliata.

### Payment Gateway (Gateway di pagamento)

Un servizio esterno che Voucherly utilizza per autorizzare ed elaborare le transazioni.

I gateway di pagamento possono essere attivati o disattivati dalla Dashboard dopo aver inserito le credenziali necessarie, ottenute tramite accordi tra il merchant e il fornitore del gateway.

Consulta la guida [Gateway di pagamento](/guide/informazioni/risorse/gateway-di-pagamento) per una spiegazione dettagliata.

### Wallet (Portafoglio)

Un portafoglio digitale che migliora l'esperienza d'acquisto eliminando la necessità di inserire i dati di pagamento a ogni transazione. Quando è abilitato tramite la Dashboard, i clienti possono ricaricare il proprio wallet e utilizzare il credito per acquisti futuri.

I wallet supportano la ricarica tramite buoni e il credito può essere utilizzato solo per prodotti idonei al pagamento con buoni.

Per maggiori dettagli, consulta [questa pagina](/guide/informazioni/risorse/gateway-di-pagamento#wallet).

### Payment Method (Metodo di pagamento)

Lo strumento utilizzato dal cliente all'interno di un gateway di pagamento per eseguire una transazione.
