---
sidebar_position: 10
---


# Ticket Restaurant Edenred

The standard Edenred integration process consists of 3 phases:

- Integration and development.
- Validation and UAT process, requiring successful completion of specific tests (UAT, User Acceptance Testing).
- Production environment setup.

Voucherly complies with all technical and UX standards set by Edenred. Activation only requires some manual configuration steps.


## Become a partner

To enable Edenred Ticket Restaurant with Voucherly, your business must first be registered as an Edenred partner.

#### Already accepting Edenred 
If you already accept Ticket Restaurant via POS in your physical store: 
   - Contact your Edenred sales representative.  
   - Request the activation to also accept Ticket Restaurant Edenred online through your e-commerce.  

#### New to Edenred
If you are not yet an Edenred partner, you can request activation by: 
   - Filling out the form https://www.edenred.it/merchant/edenred-per-il-ecommerce/.
   - Or sending an email to assistenzanetwork-it@edenred.com with the subject line *Richiesta convenzione buoni pasto Edenred per e-commerce* and include the following company details:  
     - Legal company name (*Ragione sociale*)  
     - VAT number (*Partita IVA*)  
     - Fiscal code (*Codice fiscale*)  
     - Trade name (*Insegna*, if different from legal name)  
     - REA code  
     - Registered office address  
     - Operational office address (if different)  
     - IBAN  
     - PEC or SDI code  
     - Legal representative (name, surname, tax code, ID document)  
     - Contact email (used for contract delivery)  
     - Contact mobile number  


> **Note:** Edenred will also offer free POS activation. This is optional and not required to accept vouchers online with Voucherly.  


:::warning
Response times may vary and are not controlled by Voucherly. Activation typically takes about two weeks, but this depends on Edenred’s processing time.
:::

## Integration and UAT
Edenred will provide you with the *Introduzione ad EDPS* document containing all necessary information about the process and required integrations.

:::info
Voucherly provides a ready-to-use infrastructure, with no additional development needed. A careful read-through is not mandatory but only recommended.
:::

You will need to share the parameters listed in the table below with Edenred. Activation typically takes a couple of days.

| Parameter | Value | 
|-|-|
| **Redirect login**   | https://checkout.voucherly.it/edenred/callback |
| **Redirect logout**  | https://checkout.voucherly.it/edenred/logout |

Once enabled, Edenred will supply the **AuthenticationClientId**, **AuthenticationClientSecret**, **MID**, **PaymentClientId**, **PaymentClientSecret**.

- Configure these parameters in **Attività > [Gateway di pagamento](https://dashboard.voucherly.it/merchant/payment-gateways)** on the Voucherly Dashboard. Use sandbox environment.
- Schedule a meeting with Edenred to conduct UAT. Voucherly can join if needed.
    - A complete list of tests is available in <a target="_blank" href="/download/edenred/TestBook_UAT.xlsx" download>TestBook_UAT.xlsx</a>.

## Production environment and Go live

:::warning
You need an active Voucherly account to configure Ticket Restaurant Edenred in the live environment. If you haven’t done so yet, [activate your account](/guides/intro/getting-started/activate-account) by providing your company information.
:::

After completing the UAT process, Edenred will send an email with instructions for production setup and go live.

### Configuration
Edenred will request new parameters for production environment activation.
1. Opt-in callback URL (post-login): URL where users are redirected after login.
1. (Optional) Opt-out callback URL (post-logout): URL where users are redirected after logout.
1. (Optional) URL to your logo.
1. An email to create an Anypoint account for registering your application. It's recommended to use a shared company email (e.g., edps@edenred.com) instead of a personal one.
1. Authorization duration (default: 60 minutes): the time after which an uncaptured authorization expires.

Provide these details at least one week before the go-live date.
| Parameter | Value | 
|-|-|
| **Redirect login**   | https://checkout.voucherly.it/edenred/callback |
| **Redirect logout**  | https://checkout.voucherly.it/edenred/logout |
| **Logo**             | Use a static resource to avoid unintended changes. The provided link will display the logo during the SSO flow. |
| **Authorization duration**   | The Edenred transaction remains in *authorization* status while the user completes payment with other methods (e.g., debit or credit card). We recommend at least 10 minutes. The 60-minute default is also acceptable. |

### Registration
1. You will receive an invitation at the email provided in step 4 (check Spam). Use it to create an Anypoint account and confirm registration.
2. Notify Edenred once you've completed the registration. Edenred will enable your access so you can register the application.
3. Register your application at: https://anypoint.mulesoft.com/exchange/f02a5569-24ac-491a-964a-0950ab318728/edenred-payment-services-api/.
    - Follow the steps in the attached <a target="_blank" href="/download/edenred/Come creare un accesso in produzione su eDPS.pdf">Come creare un accesso in produzione su eDPS</a>.
    - Share the application name with Edenred.
    - Save **PaymentClientId** and **PaymentClientSecret**.
4. Edenred will complete the configuration and send you the following via email: **AuthenticationClientId**, **AuthenticationClientSecret**, **MID**.
5. Configure these parameters in **Attività > [Gateway di pagamento](https://dashboard.voucherly.it/merchant/payment-gateways)** on the Voucherly Dashboard. Use live environment.

### Go live

Now you're ready to accept Ticket Restaurant Edenred with Voucherly!

:::warning
Edenred may require an additional UAT for production environment.
:::