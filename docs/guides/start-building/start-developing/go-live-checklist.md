---
sidebar_position: 2
description: "Checklist to take your Voucherly integration live: follow API best practices, review error handling and logging, and switch from test to live API keys."
keywords:
  - go-live checklist
  - Voucherly integration
  - live mode
  - API keys
  - best practices
  - error handling
---

import Checkbox from '@site/src/components/Checkbox';

# Go-live checklist

Use this checklist to ensure a smooth transition when taking your integration live.

Voucherly’s live and test modes are designed to function as similarly as possible, making the transition to live mode largely a matter of switching your API keys.

If you are a developer, or had a developer integrate Voucherly for you, consider the following points before going live. If you’re using Voucherly through a connected website or plug-in, many of these items may not apply.

<Checkbox label="Follow Voucherly API best practices" >

Make sure your integration follow [Voucherly API best practices](/api/general/best-practices).

</Checkbox>

<Checkbox label="Always authenticate your user" >

We recommend that you send user information to Voucherly endpoints. This allows you to keep relevant internal references and take full advantage of Voucherly's features, such as advanced reporting and recurring payments.

</Checkbox>

<Checkbox label="Handle edge cases" >

We recommend thoroughly testing your integration using specific test values to replicate various states and responses. Beyond standard tests, ensure your system handles the following scenarios:

- Incomplete data
- Invalid data
- Duplicate data (for example, retrying the same request to observe the behavior)

Involve non-technical individuals in the testing process to uncover issues that might be overlooked by developers.

</Checkbox>

<Checkbox label="Review your API error handling" >

Discovering issues with error handling after going live can have serious repercussions. Ensure your code is robust and handles not only common errors but also rare and unexpected ones.

When testing error handling, pay attention to the information displayed to users.

</Checkbox>

<Checkbox label="Review your logging" >

Voucherly keeps a record of every API request, accessible through the [Dashboard](https://dashboard.voucherly.it/Developer/Log). However, it’s essential to log relevant data on your end as well. These logs can be critical for diagnosing issues, such as server communication problems or API key errors.

Ensure your logs do not store sensitive information, such as card details or personally identifiable information.

</Checkbox>

<Checkbox label="Ensure you're not relying on test mode objects" >

Objects created in test mode are not usable in live mode. Before going live, recreate the necessary objects in live mode, ensuring the same IDs are used to maintain compatibility with your code.

</Checkbox>
