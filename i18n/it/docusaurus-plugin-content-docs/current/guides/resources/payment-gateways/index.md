---
slug: /guide/risorse/gateway-di-pagamento
sidebar_position: 2
description: "I gateway di pagamento disponibili in Voucherly: buoni pasto, carte e wallet, con supporto per processo a due fasi e rimborsi parziali."
keywords:
  - gateway di pagamento
  - buoni pasto
  - pagamento a due fasi
  - rimborso parziale
  - wallet Voucherly
  - gateway supportati
---

import IframeWindow from '@site/src/components/BrowserWindow/IframeWindow';

# Gateway di pagamento

## Elenco dei gateway di pagamento disponibili
| Id | Nome | Buoni pasto | Processo a 2 fasi | Rimborsabile parzialmente |
|-|-|-|-|-|
| **[EDENRED](edenred)**| Edenred           | V |   |   |
| **[FAKEVOU](#demo)**  | Demo Voucherly    | V |   |   |
| **[GPAY](google-pay)**| Google Pay        |   | V | V |
| **LUNCHGM**           | LunchGM           | V |   |   |
| **MLTSFPY**           | MultiSafepay      |   | V | V |
| **NEXI**              | Nexi              |   | V | V |
| **[PAYPAL](paypal)**  | PayPal            |   | V |   |
| **PELLEGR**           | Pellegrini        | V |   |   |
| **PHEY**              | Worldline         |   | V | V |
| **[SATISPY](satispay)**| Satispay         | V |   | V |
| **SODEXO**            | Pluxee            | V |   |   |
| **STRIPE**            | Stripe            |   | V | V |
| **UPDAY**             | UpDay             | V |   |   |
| **YESTCKT**           | Yes!Ticket        | V |   |   |
| **[WALLET](#wallet)** | Wallet            | V |   | V |

<!-- 
| **ADYEN**     | Adyen | | ✔️ | Refunds are asynchronous. | 
| **AXERVE**    | Axerve | | ✔️ | |
-->

:::info
**Rimborsabile parzialmente** significa che una transazione nello stato `Confirmed` può essere rimborsata per un importo inferiore al `ConfirmedAmount`.
:::

### Demo Voucherly {#demo}
Demo Voucherly è un gateway di pagamento virtuale fornito da Voucherly che puoi utilizzare per scopi di test.

### Wallet
Il Wallet è un gateway di pagamento virtuale fornito da Voucherly che consente ai clienti di pagare in anticipo e caricare *credito*. Per gli acquisti futuri, i clienti possono comodamente utilizzare il Wallet per pagare i prodotti alimentari senza dover interagire nuovamente con i gateway di pagamento dei buoni pasto.

Un ulteriore vantaggio del Wallet è la sua flessibilità: elimina la limitazione dei buoni pasto dal valore fisso, offrendo ai clienti maggiore libertà nell'utilizzo dei propri fondi.

:::warning
Per utilizzare il Wallet, il sito web del merchant deve memorizzare l'ID cliente Voucherly, che viene creato quando un cliente effettua il suo primo pagamento. Questo ID deve essere incluso in tutti i pagamenti successivi.

Scopri di più nella nostra guida [Gestione del cliente](/api/generale/best-practice/gestione-clienti).
:::

<!-- ## Fallback Payment Gateway
To enhance the reliability and availability of the service, merchants can configure a fallback payment gateway for each non-voucher gateway via the Dashboard. This ensures that if a payment gateway error is detected during the process (e.g., temporary unavailability), users can still complete their payment. -->


<!-- 
## Configuration Guide
Below are short guides on configuring payment gateways to make them compatible with Voucherly (e.g., Voucherly S2S endpoint, payment types, etc.). No specific configuration is required for gateways not listed here.

### Vouchers Payment Gateways
No specific configuration is necessary for voucher payment gateways. Refer to the developer's website of the respective payment gateway for instructions.

### Adyen
<IframeWindow url="https://scribehow.com/embed/Adyen_Configuration__d72fy6uYRFaiDPuSsYDIWA" height="640" />

### Axerve
<IframeWindow url="https://scribehow.com/embed/Axerve_Configuration__bamVVC4vTf-4dDvMUOGAWw" height="640" />

### Nexi
<IframeWindow url="https://scribehow.com/embed/Nexi_Configuration__IgK5HJpDTP-zyFG2BryGAw" height="640" />

### PayPal
<IframeWindow url="https://scribehow.com/embed/PayPal_configuration__V4wNn2Z4TOWF_HMzl8DVOA" height="640" />

### Stripe
<IframeWindow url="https://scribehow.com/embed/Stripe_Configuration__AU0YOKBDQcSx_i1cQo2Y4Q" height="640" /> 
-->
