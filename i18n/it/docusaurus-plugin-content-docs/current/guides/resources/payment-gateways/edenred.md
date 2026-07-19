---
slug: /guide/risorse/gateway-di-pagamento/edenred
sidebar_position: 10
description: "Accetta i buoni pasto Ticket Restaurant Edenred online con Voucherly: diventa partner Edenred, completa l'UAT e configura la produzione per il go live."
keywords:
  - Edenred
  - Ticket Restaurant
  - buoni pasto
  - UAT
  - eDPS
  - integrazione Voucherly
---


# Ticket Restaurant Edenred

Il processo di integrazione standard di Edenred si compone di 3 fasi:

- Integrazione e sviluppo.
- Validazione e processo di UAT, che richiede il completamento con successo di test specifici (UAT, User Acceptance Testing).
- Configurazione dell'ambiente di produzione.

Voucherly rispetta tutti gli standard tecnici e di UX definiti da Edenred. L'attivazione richiede solo alcuni passaggi di configurazione manuale.


## Diventa partner

Per abilitare Edenred Ticket Restaurant con Voucherly, la tua azienda deve prima essere registrata come partner Edenred.

#### Accetti già Edenred
Se accetti già Ticket Restaurant tramite POS nel tuo punto vendita fisico:
   - Contatta il tuo referente commerciale Edenred.
   - Richiedi l'attivazione per accettare Ticket Restaurant Edenred anche online tramite il tuo e-commerce.

#### Non sei ancora partner Edenred
Se non sei ancora partner Edenred, puoi richiedere l'attivazione:
   - Compilando il modulo https://www.edenred.it/merchant/edenred-per-il-ecommerce/.
   - Oppure inviando un'email a assistenzanetwork-it@edenred.com con oggetto *Richiesta convenzione buoni pasto Edenred per e-commerce* e includendo i seguenti dati aziendali:
     - Ragione sociale
     - Partita IVA
     - Codice fiscale
     - Insegna (se diversa dalla ragione sociale)
     - Codice REA
     - Indirizzo della sede legale
     - Indirizzo della sede operativa (se diverso)
     - IBAN
     - PEC o codice SDI
     - Legale rappresentante (nome, cognome, codice fiscale, documento d'identità)
     - Email di contatto (utilizzata per l'invio del contratto)
     - Numero di cellulare di contatto


> **Nota:** Edenred offrirà anche l'attivazione gratuita del POS. Questa è opzionale e non necessaria per accettare buoni online con Voucherly.


:::warning
I tempi di risposta possono variare e non dipendono da Voucherly. L'attivazione richiede in genere circa due settimane, ma dipende dai tempi di elaborazione di Edenred.
:::

## Integrazione e UAT
Edenred ti fornirà il documento *Introduzione ad EDPS* contenente tutte le informazioni necessarie sul processo e sulle integrazioni richieste.

:::info
Voucherly fornisce un'infrastruttura pronta all'uso, senza necessità di sviluppo aggiuntivo. Una lettura attenta non è obbligatoria ma solo consigliata.
:::

Dovrai condividere con Edenred i parametri elencati nella tabella sottostante. L'attivazione richiede in genere un paio di giorni.

| Parametro | Valore | 
|-|-|
| **Redirect login**   | https://checkout.voucherly.it/edenred/callback |
| **Redirect logout**  | https://checkout.voucherly.it/edenred/logout |

Una volta abilitato, Edenred ti fornirà **AuthenticationClientId**, **AuthenticationClientSecret**, **MID**, **PaymentClientId**, **PaymentClientSecret**.

- Configura questi parametri in **Impostazioni > Pagamenti > [Gateway di pagamento](https://dashboard.voucherly.it/settings/payment/payment-gateways)** nella Dashboard di Voucherly. Utilizza l'ambiente sandbox.
- Fissa un incontro con Edenred per svolgere l'UAT. Voucherly può partecipare se necessario.
    - L'elenco completo dei test è disponibile in <a target="_blank" href="/download/edenred/TestBook_UAT.xlsx" download>TestBook_UAT.xlsx</a>.

## Ambiente di produzione e Go live

:::warning
Hai bisogno di un account Voucherly attivo per configurare Ticket Restaurant Edenred nell'ambiente di produzione. Se non l'hai ancora fatto, [attiva il tuo account](/guide/introduzione/per-iniziare/attiva-account) fornendo le informazioni della tua azienda.
:::

Al termine del processo di UAT, Edenred invierà un'email con le istruzioni per la configurazione in produzione e il go live.

### Configurazione
Edenred richiederà nuovi parametri per l'attivazione dell'ambiente di produzione.
1. URL di callback opt-in (post-login): URL a cui gli utenti vengono reindirizzati dopo il login.
1. (Facoltativo) URL di callback opt-out (post-logout): URL a cui gli utenti vengono reindirizzati dopo il logout.
1. (Facoltativo) URL del tuo logo.
1. Un'email per creare un account Anypoint con cui registrare la tua applicazione. Si consiglia di utilizzare un'email aziendale condivisa (es. edps@edenred.com) anziché una personale.
1. Durata dell'autorizzazione (predefinita: 60 minuti): il tempo dopo il quale un'autorizzazione non catturata scade.

Fornisci questi dettagli almeno una settimana prima della data di go-live.
| Parametro | Valore | 
|-|-|
| **Redirect login**   | https://checkout.voucherly.it/edenred/callback |
| **Redirect logout**  | https://checkout.voucherly.it/edenred/logout |
| **Logo**             | Utilizza una risorsa statica per evitare modifiche indesiderate. Il link fornito mostrerà il logo durante il flusso SSO. |
| **Authorization duration**   | La transazione Edenred rimane nello stato di *autorizzazione* mentre l'utente completa il pagamento con altri metodi (es. carta di debito o di credito). Consigliamo almeno 10 minuti. Anche il valore predefinito di 60 minuti è accettabile. |

### Registrazione
1. Riceverai un invito all'email fornita al punto 4 (controlla lo Spam). Usalo per creare un account Anypoint e confermare la registrazione.
2. Comunica a Edenred una volta completata la registrazione. Edenred abiliterà il tuo accesso così potrai registrare l'applicazione.
3. Registra la tua applicazione all'indirizzo: https://anypoint.mulesoft.com/exchange/f02a5569-24ac-491a-964a-0950ab318728/edenred-payment-services-api/.
    - Segui i passaggi indicati nell'allegato <a target="_blank" href="/download/edenred/Come creare un accesso in produzione su eDPS.pdf">Come creare un accesso in produzione su eDPS</a>.
    - Condividi il nome dell'applicazione con Edenred.
    - Salva **PaymentClientId** e **PaymentClientSecret**.
4. Edenred completerà la configurazione e ti invierà via email: **AuthenticationClientId**, **AuthenticationClientSecret**, **MID**.
5. Configura questi parametri in **Impostazioni > Pagamenti > [Gateway di pagamento](https://dashboard.voucherly.it/settings/payment/payment-gateways)** nella Dashboard di Voucherly. Utilizza l'ambiente di produzione.
    - Se gestisci più punti vendita con MID differenti, crea un account per ogni MID e assegnalo a ciascun punto vendita — vedi [Configurazione per punto vendita](/guide/risorse/gateway-di-pagamento/configurazione-per-punto-vendita).

### Go live

Ora sei pronto ad accettare Ticket Restaurant Edenred con Voucherly!

:::warning
Edenred potrebbe richiedere un'ulteriore UAT per l'ambiente di produzione.
:::
