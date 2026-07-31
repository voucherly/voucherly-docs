---
slug: /guide/integrazioni/api/checklist-go-live
sidebar_position: 3
description: "Checklist per portare in produzione la tua integrazione Voucherly: best practice API, gestione errori e logging, e passaggio dalle API key di test a live."
keywords:
  - checklist go-live
  - integrazione Voucherly
  - modalità live
  - API key
  - best practice
  - gestione errori
---

import Checkbox from '@site/src/components/Checkbox';

# Checklist per andare in produzione

Usa questa checklist per garantire una transizione senza intoppi quando porti la tua integrazione in produzione.

Le modalità live e test di Voucherly sono progettate per funzionare nel modo più simile possibile, rendendo il passaggio alla modalità live essenzialmente una questione di sostituzione delle API key.

Se sei uno sviluppatore, o se hai fatto integrare Voucherly da uno sviluppatore, considera i seguenti punti prima di andare in produzione. Se utilizzi Voucherly tramite un sito web collegato o un plug-in, molti di questi elementi potrebbero non essere applicabili.

<Checkbox label="Segui le best practice delle API Voucherly" >

Assicurati che la tua integrazione segua le [best practice delle API Voucherly](/api/generale/best-practice).

</Checkbox>

<Checkbox label="Autentica sempre il tuo utente" >

Ti consigliamo di inviare le informazioni dell'utente agli endpoint di Voucherly. Questo ti permette di mantenere i riferimenti interni rilevanti e di sfruttare appieno le funzionalità di Voucherly, come la reportistica avanzata e i pagamenti ricorrenti.

</Checkbox>

<Checkbox label="Gestisci i casi limite" >

Ti consigliamo di testare a fondo la tua integrazione utilizzando valori di test specifici per replicare vari stati e risposte. Oltre ai test standard, assicurati che il tuo sistema gestisca i seguenti scenari:

- Dati incompleti
- Dati non validi
- Dati duplicati (per esempio, ritentando la stessa richiesta per osservarne il comportamento)

Coinvolgi persone non tecniche nel processo di test per far emergere problemi che potrebbero sfuggire agli sviluppatori.

</Checkbox>

<Checkbox label="Rivedi la gestione degli errori delle API" >

Scoprire problemi nella gestione degli errori dopo essere andati in produzione può avere gravi ripercussioni. Assicurati che il tuo codice sia robusto e gestisca non solo gli errori comuni ma anche quelli rari e inaspettati.

Quando testi la gestione degli errori, presta attenzione alle informazioni mostrate agli utenti.

</Checkbox>

<Checkbox label="Rivedi il tuo logging" >

Voucherly conserva una traccia di ogni richiesta API, accessibile tramite la [Dashboard](https://dashboard.voucherly.it/Developer/Log). Tuttavia, è essenziale registrare i dati rilevanti anche dalla tua parte. Questi log possono essere fondamentali per diagnosticare problemi, come problemi di comunicazione con il server o errori delle API key.

Assicurati che i tuoi log non memorizzino informazioni sensibili, come i dettagli delle carte o informazioni personali identificabili.

</Checkbox>

<Checkbox label="Assicurati di non dipendere da oggetti creati in modalità test" >

Gli oggetti creati in modalità test non sono utilizzabili in modalità live. Prima di andare in produzione, ricrea gli oggetti necessari in modalità live, assicurandoti di utilizzare gli stessi ID per mantenere la compatibilità con il tuo codice.

</Checkbox>
