---
sidebar_label: Panoramica
sidebar_position: 0
slug: /guide/inizia-a-integrare
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

La publishable key è pensata per il browser: inizializza i [Voucherly Components](/guide/pagamenti-online/components), il modulo di pagamento incorporato nella tua pagina. Non può chiamare l'API.

### 3. Abilita i gateway di pagamento

Attiva i gateway di pagamento in **Impostazioni > Pagamenti > [Gateway di pagamento](https://dashboard.voucherly.it/settings/payment/payment-gateways)**.

I pagamenti con buoni spesso richiedono un'integrazione con una transazione *standard*, come un pagamento con carta. Per questo motivo, si consiglia vivamente di attivare almeno un gateway di pagamento diverso dai buoni.

:::tip
Per i test in sandbox, consigliamo di attivare Demo Voucherly e MultiSafepay. Sono sufficienti a replicare tutti i comportamenti di pagamento.\
Per maggiori informazioni sui gateway di pagamento, consulta la [risorsa Gateway di pagamento](/guide/informazioni/risorse/gateway-di-pagamento/).
:::

### 4. Iniziamo

Fai la tua prima chiamata API con il [Quickstart](/guide/inizia-a-integrare/inizia-a-sviluppare/quickstart), poi scegli l'integrazione più adatta a te in [Pagamenti online](/guide/pagamenti-online):

- **Plugin e-commerce** — sviluppati internamente per PrestaShop, WooCommerce e Shopify, richiedono uno sforzo di sviluppo minimo o nullo e ti permettono di iniziare a testare da subito.
- **Checkout ospitato** — il tuo server crea un Payment e reindirizza il cliente a una pagina ospitata da Voucherly.
- **Voucherly Components** — il modulo di pagamento mostrato dentro la tua pagina.
- **Integrazione personalizzata** — il tuo selettore di gateway sopra le API REST, per il pieno controllo del flusso di pagamento.

La vendita di persona, da un chiosco o da un distributore automatico, è trattata in [Pagamenti di persona](/guide/pagamenti-di-persona).

### 5. Prima di andare in produzione

Per iniziare a elaborare transazioni reali, dobbiamo verificare e approvare le informazioni del tuo account merchant.

1. [Attiva il tuo account](/guide/inizia-a-integrare/attiva-account) fornendo le informazioni sulla tua azienda.
1. Assicurati che il tuo sito web sia conforme alla [Checklist del sito web](/guide/inizia-a-integrare/inizia-a-sviluppare/checklist-sito-web).

Una volta inviata la richiesta, effettueremo le verifiche KYC (know your customer). Se approvato, il tuo account verrà attivato in produzione.

[dashboard]: https://dashboard.voucherly.it/
