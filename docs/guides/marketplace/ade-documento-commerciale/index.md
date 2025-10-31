---
title: AdE - Documento Commerciale on line
sidebar_position: 1
---


# AdE - Documento Commerciale on line

Voucherly usa la procedura web ufficiale dell’Agenzia delle Entrate, chiamata "Documento Commerciale online", per emettere ricevute fiscali valide.
Quando generi uno scontrino, Voucherly si collega direttamente al portale dell’Agenzia delle Entrate, che rilascia un documento commerciale a norma di legge, pronto da stampare o inviare al cliente.

:::info
L’Agenzia delle Entrate, con la risposta all’interpello n. 413 del 25/09/2020, ha confermato che è possibile automatizzare via software la procedura web di emissione dei documenti commerciali online (cioè gli scontrini elettronici).  
[Leggi la risposta ufficiale all’interpello N. 413/2020](https://www.agenziaentrate.gov.it/portale/documents/20143/2665720/Risposta+n.+413+del+25+settembre+2020.pdf/35bddf23-25e5-0aa8-49f0-ed7703230c04).
:::

:::warning ALIQUOTE IVA
Per l’emissione corretta dello scontrino, è obbligatorio indicare le aliquote IVA nei dettagli di ogni richiesta di pagamento.
Voucherly trasmette queste informazioni direttamente all’Agenzia delle Entrate, quindi senza IVA non può essere generato un documento commerciale valido.
:::

### Come ottenere le credenziali

Per usare AdE - Documento Commerciale on line è necessario che la persona che gestisce le credenziali abbia il ruolo di "Incaricato" dell’azienda per conto della quale si vogliono emettere i documenti.

:::tip
Sconsigliamo di richiedere le credenziali Fisconline aziendali, perché la procedura è lenta e macchinosa.
:::

Procedura passo per passo:
1. Accedi al sito dell’agenzia dell’entrate da [questo link](https://iampe.agenziaentrate.gov.it/sam/UI/Login?realm=/agenziaentrate) tramite spid o altre credenziali in tuo possesso.
1. Clicca su "Profilo Utente"
1. Nella barra a sinistra clicca su "Credenziali di Sicurezza"
1.  Clicca il tasto prelievo credenziali e conferma.  
Una volta completata questa procedura ti viene mostrata la prima parte composta da 4 numeri del codice pin composto da 8 cifre. Le altre 4 cifre ti sono state inviate per email insieme alla password per effettuare il primo accesso.

### Configurazione del plugin Voucherly


Una volta ottenute le credenziali, puoi attivare Voucherly in pochi secondi.

1. Accedi alla Dashboard Voucherly.
1. Vai alla sezione **Attività > [Integrazioni](https://dashboard.voucherly.it/merchant/integrations)** e seleziona AdE - Documento Commerciale on line.
1. Clicca su "Configura" (matita in alto a destra)
1. Inserisci le credenziali dell’Agenzia delle Entrate:
    - Codice Fiscale (incaricato)
    - Partita IVA (azienda)
    - Password
    - PIN (8 cifre)
1. Salva le impostazioni e clicca su "Attiva".

Se l'attivazione avviene correttamente, Voucherly è pronto per emettere documenti commerciali associati ai tuoi pagamenti.