---
slug: /guide/risorse/gateway-di-pagamento/configurazione-per-punto-vendita
sidebar_position: 5
description: "Assegna a ogni punto vendita il giusto account del gateway di pagamento in Voucherly tramite account di pagamento, configurazioni di pagamento e configurazione predefinita."
keywords:
  - configurazione per punto vendita
  - account di pagamento
  - configurazione di pagamento
  - multi-punto vendita
  - catena
  - Voucherly
---

# Configurazione per punto vendita

Voucherly ti permette di decidere **quale account del gateway di pagamento viene utilizzato da ciascuno dei tuoi punti vendita**. È utile quando gestisci più di un punto vendita, o quando lo stesso gateway (es. Satispay o Edenred) è attivato separatamente per ogni punto vendita.

Il modello ha tre livelli:

- **Account di pagamento** — una singola attivazione di un gateway (ad esempio un negozio Satispay, o un MID Edenred). Contiene le credenziali che inserisci nella Dashboard.
- **Configurazione di pagamento** — un insieme denominato di uno o più account di pagamento. Ogni merchant ha una **configurazione predefinita** che si applica automaticamente a tutti i punti vendita che non ne hanno una specifica.
- **Punto vendita** (*Sede*) — un tuo punto vendita fisico o online. A ogni punto vendita può essere assegnata una configurazione di pagamento. È la risorsa [Store](/guide/introduzione/definizioni#store-sede) delle API.

:::info
Un **punto vendita** non è mai collegato direttamente a un account di pagamento. Punta a una **configurazione di pagamento**, che a sua volta contiene uno o più account. Cambia la configurazione assegnata a un punto vendita per modificare quali account utilizza quel punto vendita.
:::

:::tip
Tutto quello che c'è in questa pagina si può fare anche via API: crea i tuoi punti vendita con [Create a Store](/api/webapi/create-store) e imposta `paymentGatewayConfigurationId` sulla configurazione che ciascuno deve usare.
:::

## Punto vendita singolo

Se hai un solo punto vendita (ad esempio un unico e-commerce), non devi configurare nulla per punto vendita:

1. Crea un account di pagamento per il gateway in **Impostazioni > Pagamenti > [Account di pagamento](https://dashboard.voucherly.it/settings/payment/payment-accounts)**.
2. Mantienilo nella **configurazione predefinita**.

La configurazione predefinita viene applicata automaticamente, quindi i pagamenti utilizzeranno quell'account.

## Punti vendita multipli / catena

Se gestisci più punti vendita — o il gateway è attivato separatamente per ogni punto vendita (ad esempio un codice negozio Satispay per ogni negozio, o un MID Edenred diverso per ogni negozio) — crea **un account di pagamento per ogni attivazione** e assegna ciascun account al punto vendita corretto:

1. In **Impostazioni > Pagamenti > [Account di pagamento](https://dashboard.voucherly.it/settings/payment/payment-accounts)**, crea un account per ogni attivazione (assegna a ciascuno un nome che identifichi il punto vendita).
2. Raggruppa gli account in **[configurazioni di pagamento](https://dashboard.voucherly.it/settings/payment/payment-gateways)** (una configurazione per punto vendita, o per gruppo di punti vendita che condividono lo stesso account).
3. Assegna ogni configurazione al proprio punto vendita, in uno dei due modi seguenti:
   - Dal punto vendita: **Impostazioni > [Sedi](https://dashboard.voucherly.it/settings/store)** → apri il punto vendita → campo *"Configurazione di pagamento"*.
   - Dalla configurazione: *"Gestisci configurazione"* → campo *"Punti vendita assegnati"*.

:::tip
La **configurazione predefinita** resta il fallback: qualsiasi punto vendita che non assegni esplicitamente continua a utilizzarla.
:::
