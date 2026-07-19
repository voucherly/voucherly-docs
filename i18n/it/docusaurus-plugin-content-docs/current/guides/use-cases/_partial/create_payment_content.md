<>
    :::info
    Consulta la [Create Payment API](/api/webapi/create-payment) per il funzionamento e l'utilizzo dettagliati.
    :::


    Puoi anche creare un pagamento per un cliente esistente, così da precompilare il modulo di checkout con i suoi dati di contatto e unificarne lo storico degli acquisti. Un pagamento rappresenta l'esperienza che il cliente vede quando viene reindirizzato al modulo di pagamento. Puoi configurarlo con opzioni come:

    - **Lines**. Specifica gli articoli da addebitare. Per ogni articolo, il campo `product.isFood` determina se può essere pagato con i buoni.
    - **Discounts**. Definisci gli sconti applicati al carrello.

    Assicurati di impostare `redirectOkUrl` sull'URL a cui il cliente viene reindirizzato dopo un pagamento riuscito. Puoi anche fornire un `redirectKoUrl` a cui il cliente viene reindirizzato se annulla il processo di pagamento.

    :::info
    Per impostazione predefinita, i pagamenti scadono 24 ore dopo la creazione.
    :::
</>