---
sidebar_position: 1
---

# Overview

The Voucherly API is organized around  [REST](http://en.wikipedia.org/wiki/Representational_State_Transfer). Our API has predictable resource-oriented URLs, accepts request bodies and returns responses in [JSON-encoded](http://www.json.org/) format (using [camelCase](https://en.wikipedia.org/wiki/Camel_case) notation), and uses standard HTTP response codes, authentication, and verbs.

You can use the Voucherly API in sandbox mode, which doesn't affect your live data or interact with the banking networks. The API key you use to authenticate the request determines whether the request is live mode or test mode.
```
https://api.voucherly.it
```
