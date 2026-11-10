---
slug: /guide/inizia-a-integrare/inizia-a-sviluppare/checklist-sito-web
sidebar_position: 3
description: "Checklist del sito web per andare in produzione con Voucherly: contatti, dati aziendali, policy, privacy, sicurezza e loghi dei gateway."
keywords:
  - checklist sito web voucherly
  - requisiti produzione
  - privacy policy
  - termini e condizioni
  - pci
  - gateway di pagamento
---

import Checkbox from '@site/src/components/Checkbox';

# Checklist del sito web

Assicurati che il tuo sito web sia conforme agli standard dei circuiti di pagamento e alle best practice dell'e-commerce.

Questa pagina contiene un elenco degli elementi comuni — come descrizioni accurate dei prodotti, policy chiare e adeguate funzionalità di sicurezza — che ogni attività su Voucherly dovrebbe curare sul proprio sito web. Rispettare queste raccomandazioni riduce il rischio di confusione e contestazioni da parte dei clienti. Ti aiuta inoltre a soddisfare gli standard di Voucherly e quelli stabiliti dai circuiti delle carte di credito.

### Requisiti

:::warning
Se uno qualsiasi dei requisiti non è soddisfatto, l'attivazione di Voucherly non può procedere e ti verrà chiesto di aggiornare le informazioni necessarie.
:::

<Checkbox label="Informazioni di contatto del servizio clienti" >

Assicurati che i clienti possano contattarti facilmente offrendo più canali di contatto, come:

- Indirizzi email
- Numeri di telefono
- Live chat

Canali di comunicazione a bassa frizione riducono i malintesi e migliorano la soddisfazione dei clienti, contribuendo a prevenire le contestazioni. Evita di affidarti esclusivamente ai moduli di contatto.

</Checkbox>

<Checkbox label="Le informazioni sulla tua attività" >

Fornisci dettagli chiari sulla tua attività, tra cui:

- Ragione sociale completa
- Partita IVA
- Iscrizione alla Camera di Commercio (CoC, in Italia nota come REA)
- Sede legale dell'attività

Queste informazioni aumentano la credibilità e aiutano i clienti a verificare la legittimità della tua attività.

</Checkbox>

<Checkbox label="I termini e le condizioni generali del tuo servizio" >

Illustra chiaramente le tue policy per creare fiducia e definire le aspettative. Queste includono:

- **Policy di rimborso**. Le condizioni in base alle quali vengono emessi i rimborsi.
- **Policy di cancellazione**. Le regole per la cancellazione di abbonamenti o prenotazioni.
- **Policy di reso**. Le condizioni per i resi e le istruzioni passo passo.
- **Policy di spedizione**. Metodi, tempi, tariffe e destinazioni ammesse.
- **Addendum sul pagamento one-click**. Consulta l'[addendum Voucherly sul pagamento one-click](https://legal.voucherly.it/examples/one-click-payment).

Aggiungi al checkout una casella di spunta (click-to-accept) con i termini e le condizioni. Se non è possibile, informa chiaramente i clienti che, effettuando l'ordine, accettano implicitamente i termini e le condizioni del sito web.

:::info
Se la tua attività non prevede un processo di evasione (come nei servizi erogati di persona), le policy di evasione non sono richieste.
:::

</Checkbox>

<Checkbox label="La privacy policy del tuo sito web" >

Per rispettare le normative sulla privacy a livello globale, includi una privacy policy chiara che spieghi come i dati dei clienti vengono raccolti, conservati, utilizzati o condivisi. Questo dimostra il tuo impegno nella protezione delle informazioni dei clienti.

</Checkbox>

### Best practice

Applicando queste pratiche, aumenti la fiducia dei clienti, migliori la loro esperienza e riduci la probabilità di contestazioni.

<Checkbox label="Una descrizione di ciò che vendi" >

Aiuta i tuoi clienti a prendere decisioni d'acquisto consapevoli fornendo descrizioni dettagliate dei tuoi prodotti o servizi. Ad esempio:

- Per i beni fisici, includi più immagini e informazioni su materiali, colori e altre specifiche.
- Per le offerte digitali o basate su servizi, illustra chiaramente caratteristiche, vantaggi ed eventuali limitazioni.

Descrizioni dettagliate aiutano anche a definire aspettative accurate, riducendo il rischio di contestazioni perché chiariscono ciò che i clienti riceveranno.

:::info
Se il tuo sito web non descrive chiaramente ciò che vendi, potremmo contattarti con suggerimenti per migliorarlo.
:::

</Checkbox>

<Checkbox label="La valuta di acquisto" >

Mostra chiaramente la valuta utilizzata per i prezzi sul tuo sito. Usa termini espliciti come EUR o USD invece di affidarti ai soli simboli, che possono variare da regione a regione. Questo aiuta i clienti internazionali a evitare confusione.

:::warning
Voucherly supporta esclusivamente pagamenti in EUR.
:::

</Checkbox>

<Checkbox label="Restrizioni legali o all'esportazione" >

Segnala eventuali restrizioni legali o all'esportazione applicabili ai tuoi prodotti o servizi. Questa trasparenza crea fiducia e aiuta i clienti a comprendere eventuali limitazioni che potrebbero riguardarli.

</Checkbox>

<Checkbox label="I termini di eventuali promozioni offerte" >

Indica chiaramente le condizioni di eventuali promozioni, sconti o prove gratuite. Fornisci disclaimer o link ben visibili quando i clienti accettano di parteciparvi, garantendo trasparenza ed evitando contestazioni.

</Checkbox>

<Checkbox label="Sicurezza del tuo sito web e delle informazioni di pagamento" >

Rassicura i clienti sul fatto che i loro dati di pagamento sono al sicuro:

- Rispettando gli standard PCI.
- Utilizzando HTTPS e altre best practice di sicurezza.
- Prevenendo vulnerabilità come il card testing.

Spiega come gestisci in modo sicuro le informazioni di pagamento dei clienti e come ne mantieni la fiducia.

</Checkbox>

<Checkbox label="I loghi dei gateway di pagamento accettati" >

Mostra al checkout i loghi dei gateway di pagamento che accetti. Questo riduce la frizione rendendo chiaro quali metodi di pagamento sono supportati.
Voucherly fornisce questa informazione tramite API. Consulta l'endpoint [List all PaymentGateways](/api/webapi/list-payment-gateway).

</Checkbox>
