---
sidebar_position: 2
---

# Authentication
The Voucherly API uses API keys to authenticate requests. Sandbox mode secret keys have the prefix `sk_sand_` and live mode secret keys have the prefix `sk_live_`. You can view and manage your API keys in the [Voucherly Dashboard](https://dashboard.voucherly.it/Developer/ApiKey).

Your API keys carry many privileges, so be sure to keep them secure! Do not share your secret API keys in publicly accessible areas such as GitHub, client-side code, and so forth.

Provide your API key as the "Voucherly-API-Key" header. For example:
```cURL []
-H  "Voucherly-API-Key: sk_sand_BYsZDnaUWfVKGwHFvLop0dc9Fp1mE8py2Mtgm5aU6IrtCiuJg9s4747J"
```

All API requests must be made over  [HTTPS](http://en.wikipedia.org/wiki/HTTP_Secure). Calls made over plain HTTP will fail. API requests without authentication will also fail.