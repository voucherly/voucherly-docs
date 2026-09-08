---
sidebar_position: 0
title: In-person payments
sidebar_label: Overview
description: "Accept payments with Voucherly where the customer is physically present: self-service kiosks and smart vending machines, with the checkout shown as a QR code."
keywords:
  - in-person payments
  - kiosk
  - smart vending machine
  - QR code payment
  - meal vouchers
---

import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

# In-person payments

When the customer is in front of a screen rather than on your website, the Payment is still created by your system with the API, and the hosted checkout is shown as a **QR code** the customer scans with their phone. What changes is how the machine learns that the payment is done.

<DocCardList items={useCurrentSidebarCategory().items.filter((item) => item.docId !== 'guides/in-person-payments/index')} />

Paying at the table in a restaurant is a Voucherly product of its own: see [Pay at table](/guides/products/pay-at-table).
