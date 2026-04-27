import DocCardList from '@theme/DocCardList';

# API integration

These steps will show you how to successfully integrate your platform with our APIs.

## Prerequisites
- Read **[Getting started with a Voucherly account](/guides/intro/getting-started)**.

Before continuing with this tutorial, see if you can save development time with our [postman collection](/api/postman) or range of [wrappers and SDKs](/api/libraries).

## Tutorial

### 1. Check how [Voucherly APIs work](/api/webapi/voucherly-api)

### 2. Create a Payment
Voucherly provides a RESTful API accessible through HTTP requests to manage your data. The API supports data exclusively in JSON format.

The core element of our API is the payment, which can be linked to multiple transactions.

1. Begin by testing the most common operation with our API: [Create a Payment](/api/webapi/create-payment). 

**Example request**

```json
{
    "mode": "Payment",
    "customerEmail": "mario.rossi@voucherly.it",
    "customerFirstName": "Mario",
    "customerLastName": "Rossi",
    "redirectOkUrl": "https://{redirect_host}}/payment/success",
    "redirectKoUrl": "https://{{redirect_host}}/payment/error",
    "country": "IT",
    "lines": [
        {
            "quantity": 2,
            "unitAmount": 250,
            "unitDiscountAmount": 10,
            "discountAmount": 0,
            "product": {
                "externalId": "SKU-MUFFIN-001",
                "name": "Muffin al Cioccolato",
                "image": "https://cdn.trovaricetta.com/photo/2016/10/07/1771032/b/muffin-al-cioccolato-facilissimi.jpg",
                "isFood": true
            }
        }
    ],
    "discounts": [
        {
            "discountName": "Coupon",
            "discountDescription": "",
            "amount": 200
        }
    ]
}
```

2. Check that you receive a 200 OK response.

**Example response**

```json
{
    "id": "my-payment-id-1",
    "tenant": "live",
    "mode": "Payment",
    "customerId": "my-customer-id-1",
    "customerEmail": "mario.rossi@voucherly.it",
    "customerFirstName": "Mario",
    "customerLastName": "Rossi",
    "paymentGateways": [],
    "checkoutUrl": "https://example.voucherly.it/checkout",
    "totalAmount": 500,
    "discountAmount": 220,
    "finalAmount": 280,
    "paidAmount": 0,
    "paidVoucherAmount": 0,
    "amount": 280,
    "status": "Requested",
    "lines": [
        {
            "quantity": 2,
            "productName": "Muffin al Cioccolato",
            "productImage": "https://cdn.trovaricetta.com/photo/2016/10/07/1771032/b/muffin-al-cioccolato-facilissimi.jpg",
            "productExternalId1": "SKU-MUFFIN-001",
            "productExternalId2": "EAN-1234567890",
            "unitAmount": 250,
            "unitDiscountAmount": 10,
            "discountAmount": 0,
            "finalAmount": 480,
            "isFood": true
        }
    ],
    "discounts": [
        {
            "discountName": "Coupon",
            "discountDescription": "",
            "amount": 200
        }
    ]
}
```

3. Open the `checkoutUrl` to complete payment on the checkout page.

### 3. View logs

Whenever you make a call to Voucherly APIs, Voucherly creates and stores API for your merchant account. The API key you specify for the request determines whether the objects are stored in test or live mode. For example, if the last request used your test API secret key, Voucherly stored the objects in test mode.

To view the API request log:

1. Open the **Sviluppatori > [Log](https://dashboard.voucherly.it/Developer/Log)** page.
2. Click on the specific request `200 OK POST /v1/payments`.

### 4. Store your API keys

All merchant accounts have a total of four API keys by default — two for test mode and two for live mode:

- **Test mode secret key**. Use this key to authenticate requests on your server when in test mode. By default, this key can be used to perform any API request without restriction.
- **Test mode publishable key**. Use this key for testing purposes in your web or mobile app’s client-side code.
- **Live mode secret key**. Use this key to authenticate requests on your server when in live mode. By default, this key can be used to perform any API request without restriction.
- **Live mode publishable key**. Use this key in your web or mobile app’s client-side code when you’re ready to launch your app.

You can find your secret and publishable keys in **Sviluppatori > [API keys](https://dashboard.voucherly.it/Developer/ApiKey)**.

:::warning Testing and development
Use only your test API keys for testing and development. This ensures that you don’t accidentally modify your live customers or charges.
:::