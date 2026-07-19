---
slug: /guide/introduzione/per-iniziare
description: "Guida passo passo per integrare la tua piattaforma con Voucherly: crea un account sandbox, ottieni le API key, abilita i gateway e vai in produzione."
keywords:
  - voucherly per iniziare
  - api key
  - account sandbox
  - gateway di pagamento
  - integrazione
  - produzione
---

# Per iniziare

Le istruzioni seguenti ti guideranno nell'integrazione della tua piattaforma con le nostre API.

## Configurazione

### 1. Crea un account Sandbox
Visita la [Dashboard][dashboard] e registra un nuovo account.  
Verifica il tuo indirizzo email cliccando sul link inviato alla tua casella di posta.

### 2. Ottieni le API keys
Nella sezione **[Sviluppatori](https://dashboard.voucherly.it/Developer/ApiKey)** troverai sia la secret key (chiave segreta) sia la publishable key (chiave pubblicabile).  
Utilizza la secret key per autenticare le chiamate API, come spiegato in [Autenticazione API](/api/webapi/voucherly-api#authentication).  

La publishable key è destinata alle chiamate API dal frontend e consente esclusivamente la creazione dei pagamenti.

### 3. Abilita i gateway di pagamento
Attiva i gateway di pagamento in **Impostazioni > Pagamenti > [Gateway di pagamento](https://dashboard.voucherly.it/settings/payment/payment-gateways)**.

I pagamenti con buoni spesso richiedono un'integrazione con una transazione *standard*, come un pagamento con carta. Per questo motivo, si consiglia vivamente di attivare almeno un gateway di pagamento diverso dai buoni.

:::tip
Per i test in sandbox, consigliamo di attivare Demo Voucherly e MultiSafepay. Sono sufficienti a replicare tutti i comportamenti di pagamento.\
Per maggiori informazioni sui gateway di pagamento, consulta la [risorsa Gateway di pagamento](/guide/risorse/gateway-di-pagamento/).
:::

### 4. Iniziamo
Definisci qual è l'[integrazione](/guides/integrations) più adatta a te e il tuo [caso d'uso](/guides/use-cases).

#### Plugin e-commerce

I plugin e-commerce di Voucherly, sviluppati internamente, richiedono uno sforzo di sviluppo minimo o nullo e ti permettono di iniziare a testare da subito. Offriamo un'ampia gamma di plugin e app per integrarti con piattaforme come PrestaShop, WooCommerce e Shopify.

Guida completa: [Plugin e-commerce](/guide/integrazioni/plugin-e-commerce/).

#### Integrazione API

Integra direttamente con le nostre API REST per il pieno controllo del flusso di pagamento. Ideale quando ti serve una logica personalizzata o la tua piattaforma non è coperta dai nostri plugin.

Guida completa: [Integrazione API](/guide/integrazioni/api/).

### 5. Prima di andare in produzione

Per iniziare a elaborare transazioni reali, dobbiamo verificare e approvare le informazioni del tuo account merchant.

1. [Attiva il tuo account](/guide/introduzione/per-iniziare/attiva-account) fornendo le informazioni sulla tua azienda.
1. Assicurati che il tuo sito web sia conforme alla [Checklist del sito web](/guide/introduzione/per-iniziare/checklist-sito-web).

Una volta inviata la richiesta, effettueremo le verifiche KYC (know your customer). Se approvato, il tuo account verrà attivato in produzione.


[dashboard]: https://dashboard.voucherly.it/
