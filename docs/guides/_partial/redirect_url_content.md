<>
    È importante che i tuoi clienti vedano una pagina di successo o di errore dopo aver inviato il modulo di pagamento.

    Quando un cliente completa il pagamento sulla pagina di Voucherly Checkout, viene reindirizzato agli URL specificati nella richiesta [Create Payment API](/api/webapi/create-payment):
    - Se il pagamento va a buon fine, il cliente viene reindirizzato al `redirectOkUrl`.
    - Se il pagamento fallisce, il cliente viene reindirizzato al `redirectKoUrl`.

    Le informazioni sul pagamento vengono passate tramite la query string:

    - **success**. Indica l'esito del pagamento (`OK` per successo, `KO` per fallimento).
    - **status**. Lo stato del pagamento.
    - **paymentId**. L'identificativo Voucherly univoco del pagamento.
    - **referenceId**. L'ID di riferimento personalizzato del merchant.
    - **amount**. L'importo totale pagato in centesimi.
    - **customerId**. L'identificativo Voucherly univoco del cliente.
    - **tenant**. *live* o *sand*.
</>
