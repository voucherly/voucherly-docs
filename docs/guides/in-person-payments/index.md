---
slug: /guide/pagamenti-di-persona
sidebar_position: 0
title: Pagamenti di persona
sidebar_label: Panoramica
description: "Accetta pagamenti con Voucherly dove il cliente è fisicamente presente: kiosk self-service e smart vending machine, con il checkout mostrato come QR code."
keywords:
  - pagamenti di persona
  - kiosk
  - smart vending machine
  - pagamento con QR code
  - buoni pasto
---

import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

# Pagamenti di persona

Quando il cliente è davanti a uno schermo invece che sul tuo sito, il Payment viene comunque creato dal tuo sistema con l'API, e l'Hosted Checkout viene mostrato come **QR code** che il cliente inquadra con il telefono. Quello che cambia è come la macchina viene a sapere che il pagamento è concluso.

<DocCardList items={useCurrentSidebarCategory().items.filter((item) => item.docId !== 'guides/in-person-payments/index')} />

Il pagamento al tavolo in un ristorante è un prodotto Voucherly a sé: consulta [Pagamento al tavolo](/guides/products/pay-at-table).
