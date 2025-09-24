---
sidebar_position: 2
---


# Ticket Restaurant Edenred

The standard Edenred integration process consists of 3 phases:

- Integration and development.
- Validation and UAT process, requiring successful completion of specific tests (UAT, User Acceptance Testing).
- Production environment setup.

Voucherly complies with all technical and UX standards set by Edenred. Activation only requires some manual configuration steps.

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