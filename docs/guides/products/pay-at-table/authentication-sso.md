---
sidebar_label: Autenticazione e SSO
slug: /guide/prodotti/pagamento-al-tavolo/autenticazione-sso
title: Integrazione autenticazione e SSO
sidebar_position: 1
description: "Integra autenticazione e SSO con il pagamento al tavolo Voucherly: esponi endpoint di login/logout e firma i parametri di redirect con chiave RSA a 2048 bit."
keywords:
  - pagamento al tavolo Voucherly
  - integrazione SSO
  - firma RSA
  - endpoint di login
  - pagamento con QR code
  - autenticazione
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Accordion from '@site/src/components/Accordion';

# Guida all'integrazione dell'autenticazione e SSO per il pagamento al tavolo di Voucherly

## Introduzione

Questa guida spiega come collegare il tuo sistema di autenticazione all'esperienza di pagamento al tavolo di Voucherly.  
Quando un cliente apre un link Voucherly (in genere scansionando un QR code sul tavolo), Voucherly potrebbe aver bisogno di verificarne l'identità prima di procedere.
Invece di gestire direttamente l'autenticazione, Voucherly delega il processo al tuo sistema, permettendoti di gestire sessioni, dati utente e metodi di login come preferisci.

Dovrai esporre un endpoint di login (obbligatorio) e, facoltativamente, un endpoint di logout, che Voucherly chiamerà ogni volta che è necessaria l'autenticazione o la chiusura della sessione.
Questi endpoint si scambieranno un insieme di parametri firmati per garantire l'integrità dei dati e la fiducia tra il tuo sistema e Voucherly.

Al termine di questa guida, saprai come:

- Configurare i tuoi endpoint di autenticazione
- Generare e verificare le firme digitali
- Configurare tutto nella Dashboard
- (Facoltativamente) gestire il logout dell'utente

## Prerequisiti

- Leggi **[Come iniziare con un account Voucherly](/guide/inizia-a-integrare)**.

## Panoramica

Voucherly richiede che il tuo sistema esponga due endpoint:

- **Endpoint login** – pagina di login standard in stile SSO che riceve le richieste di autenticazione da Voucherly e, dopo aver verificato l'utente, lo reindirizza a Voucherly con le informazioni cliente richieste.
- **Endpoint logout** (facoltativo) – se implementato, gestisce le richieste di logout provenienti da Voucherly per terminare le sessioni cliente nel tuo sistema.

Il tuo sistema è responsabile della verifica dell'identità dell'utente, dell'eventuale accesso come ospite e della comunicazione sicura dei dati cliente a Voucherly tramite parametri di query firmati.

## Integrazione

### Endpoint di login

Questo endpoint funziona come una tipica pagina di login SSO:

1. Voucherly chiama il tuo endpoint di autenticazione con un parametro di query `returnUrl`.
2. Il tuo sistema verifica l'identità dell'utente.
    - Utenti non autenticati: facoltativamente consenti l'accesso come ospite reindirizzando a `returnUrl` senza parametri di query.
    - Utenti autenticati: reindirizza a `returnUrl` con i seguenti parametri di query.

| Parametro      | Descrizione |
| -------------- | ----------------- |
| `customerId`   | Identificatore univoco del cliente nel tuo sistema (**obbligatorio**) |
| `email`        | Indirizzo email del cliente |
| `receiptEmail` | Indirizzo email usato per precompilare il destinatario dello scontrino durante il checkout. Passalo quando `email` contiene un valore mascherato. Se omesso, viene usato `email`. |
| `friendlyName` | Nome visualizzato che Voucherly userà per rivolgersi al cliente |
| `firstName`    | Nome del cliente |
| `lastName`     | Cognome del cliente |
| `timestamp`    | Timestamp Unix in secondi (generato dal tuo sistema al momento del redirect) |
| `signature`    | Firma digitale per verificare l'autenticità |

:::info Perché `email` e `receiptEmail` possono essere diversi
`email` può contenere un valore mascherato (ad esempio per non esporre l'indirizzo reale). `receiptEmail` deve invece contenere l'indirizzo effettivo usato per l'invio dello scontrino fiscale: Voucherly vi applica le proprie logiche di conservazione e redemption per la compliance GDPR. Se `receiptEmail` non viene passato, Voucherly usa `email` come fallback per precompilare il destinatario dello scontrino.
:::

#### Calcolo della firma

Il parametro `signature` garantisce l'integrità e l'autenticità del redirect. Usa la tua [chiave privata RSA a 2048 bit (PKCS#8)](#generazione-di-una-coppia-di-chiavi-rsa-a-2048-bit-pkcs8) per firmare i parametri.

1. Concatena i seguenti parametri nell'esatto ordine:

   ```text
   customerId + email + receiptEmail + friendlyName + firstName + lastName + timestamp
   ```

2. Calcola l'hash SHA-256 della stringa concatenata.
3. Firma l'hash usando RSA PKCS#1 v1.5 con la tua chiave privata.
4. Codifica la firma in base64.
5. Aggiungila all'URL di redirect come `signature`.

<Tabs>

<TabItem value="csharp" label=".NET">

```csharp
var concatenation = new StringBuilder()
    .Append(customerId)
    .Append(email)
    .Append(receiptEmail)
    .Append(friendlyName)
    .Append(firstName)
    .Append(lastName)
    .Append(timestamp)
    .ToString();

var dataBytes = Encoding.UTF8.GetBytes(concatenation);

var privateKey = ReadPrivateKeyPem(); // your PKCS#8 private key

using var rsa = RSA.Create();
rsa.ImportFromPem(privateKey);

var signature = rsa.SignData(dataBytes, HashAlgorithmName.SHA256, RSASignaturePadding.Pkcs1);

// Append to returnUrl as query parameter

```

</TabItem>

</Tabs>

#### Generazione di una coppia di chiavi RSA a 2048 bit (PKCS#8)

Per firmare le richieste di autenticazione, hai bisogno di una coppia di chiavi asimmetriche RSA:

1. Genera la chiave privata in formato PKCS#8 (2048 bit).
2. Esporta la chiave pubblica da condividere con Voucherly per la verifica della firma.

``` bash
# Genera una chiave privata a 2048 bit in formato PKCS#8 PEM
openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048

# Estrai la chiave pubblica corrispondente
openssl rsa -pubout -in private_key.pem -out public_key.pem
```

:::warning

- Mantieni la chiave privata al sicuro. Non esporla nel codice client-side.

:::

### Endpoint di logout (facoltativo)

Questo endpoint è facoltativo e funziona come una pagina di logout SSO standard:

1. Voucherly chiama il tuo endpoint di logout e fornisce un parametro di query `returnUrl`.
2. Il tuo sistema termina la sessione del cliente (es. cancella i cookie, chiude la sessione lato server).
3. Reindirizza l'utente al `returnUrl`.

:::info
Se non implementato, l'utente non vedrà un pulsante di logout in Voucherly.
:::

## Configurazione

1. Accedi alla Dashboard.
1. Vai su **Impostazioni > [Pagamento al tavolo](https://dashboard.voucherly.it/settings/table)**.
    - Seleziona `Redirect` come tipo di autenticazione.
    - Inserisci l'URL del tuo endpoint di login.
    - (Facoltativo) Inserisci l'URL del tuo endpoint di logout.
    - Carica la tua [chiave pubblica RSA in formato PEM (PKCS#8)](#generazione-di-una-coppia-di-chiavi-rsa-a-2048-bit-pkcs8).
    - Salva la configurazione.

:::tip
Puoi includere negli URL degli endpoint dei segnaposto che verranno popolati al momento del redirect:

- `{ExternalTableId}`
- `{ExternalShopId}`
- `{OrderId}`

Questi segnaposto possono essere usati, per esempio, per eseguire controlli su negozi o tavoli prima di reindirizzare l'utente.
:::

## Testa l'integrazione

Una volta configurati i tuoi endpoint di login/logout e caricata la tua chiave RSA, puoi testare il flusso di pagamento al tavolo direttamente dalla Dashboard.

1. Accedi alla Dashboard.
1. Vai su **Impostazioni > [Sedi](https://dashboard.voucherly.it/settings/store)** e crea una nuova sede (se non già presente).
1. Vai su **Tavoli > [Sedi e tavoli](https://dashboard.voucherly.it/table/table)**.
    - Seleziona la sede che hai appena creato.
    - Se necessario, crea prima una sala, poi aggiungi un tavolo.
    - Ora vedrai una tabella popolata con le tue sale e i tuoi tavoli. Nella colonna del QR code troverai tre icone:
        - Cliccando sulle prime due icone copierai l'URL di pagamento al tavolo negli appunti.
        - Cliccando sulla terza icona aprirai la pagina di pagamento al tavolo in una nuova scheda del browser.
1. Apri l'URL di pagamento al tavolo in un browser.
    - Verifica che l'autenticazione funzioni correttamente.
    - Controlla che i parametri firmati vengano passati e che l'utente venga reindirizzato a Voucherly.

:::tip
Assicurati di essere nell'ambiente sandbox così da avere sempre un ordine attivo sul tavolo.  
Altrimenti, dovrai gestire manualmente la presenza degli ordini nel tuo sistema POS.
:::

:::info support

- Scrivi a support@voucherly.it.
- Invia una richiesta di supporto su [voucherly.it/contattaci](https://voucherly.it/contattaci).
:::
