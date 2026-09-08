---
slug: /guide/pagamenti-online
sidebar_position: 0
title: Pagamenti online
sidebar_label: Panoramica
description: "Scegli come accettare pagamenti online con Voucherly: checkout ospitato, Voucherly Components nella tua pagina, un'integrazione personalizzata sul tuo selettore di gateway, o un plugin e-commerce."
keywords:
  - pagamenti online
  - checkout ospitato
  - Voucherly Components
  - integrazione personalizzata
  - plugin e-commerce
  - buoni pasto online
---

# Pagamenti online

Ogni modo di accettare un pagamento online con Voucherly parte allo stesso modo — il tuo server crea un Payment con l'API — e si distingue per quello che il cliente vede dopo. Scegli quello che corrisponde a quanta parte del checkout vuoi gestire tu.

| | Dove paga il cliente | Cosa costruisci | Ideale per |
| --- | --- | --- | --- |
| **[Checkout ospitato](./hosted-checkout/index.md)** | Su una pagina ospitata da Voucherly, con tutti i metodi di pagamento del tuo account | Un pulsante che crea il Payment e reindirizza | Andare in produzione in fretta, senza lavoro sul frontend |
| **[Voucherly Components](./components/index.md)** | Dentro la tua pagina, in un modulo di pagamento mostrato da Voucherly.js | Il Payment, un contenitore e qualche callback | Un checkout che resta sul tuo sito, senza gestire dati di pagamento |
| **[Integrazione personalizzata](./custom-integration/index.md)** | Sulla pagina del gateway che ha scelto sul tuo sito | Il tuo selettore di gateway sopra l'API | Controllo completo su come presentare i metodi |
| **[Plugin e-commerce](./ecommerce-plugins/index.md)** | Sul checkout ospitato, collegato dal plugin | Niente: installa e configura | Negozi WooCommerce, PrestaShop e Shopify |

Qualunque sia la scelta, l'esito arriva al tuo server nello stesso modo: la [callback S2S](/api/generale/best-practice/s2s) e l'API [Retrieve a Payment](/api/webapi/retrieve-payment). Pagamenti in due fasi, metodi di pagamento salvati e il resto del [ciclo di vita dei pagamenti](/guide/informazioni/risorse/ciclo-di-vita-dei-pagamenti) funzionano con tutti.

La vendita di persona — un chiosco, un distributore automatico — è trattata in [Pagamenti di persona](/guide/pagamenti-di-persona); il pagamento al tavolo in un ristorante è un prodotto Voucherly a sé, [Pagamento al tavolo](/guides/products/pay-at-table).
