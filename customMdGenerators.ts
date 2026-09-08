import { createAuthorization } from "docusaurus-plugin-openapi-docs/lib/markdown/createAuthorization";
import { createCallbacks } from "docusaurus-plugin-openapi-docs/lib/markdown/createCallbacks";
import { createDeprecationNotice } from "docusaurus-plugin-openapi-docs/lib/markdown/createDeprecationNotice";
import { createDescription } from "docusaurus-plugin-openapi-docs/lib/markdown/createDescription";
import { createHeading } from "docusaurus-plugin-openapi-docs/lib/markdown/createHeading";
import { createMethodEndpoint } from "docusaurus-plugin-openapi-docs/lib/markdown/createMethodEndpoint";
import { createParamsDetails } from "docusaurus-plugin-openapi-docs/lib/markdown/createParamsDetails";
import { createRequestBodyDetails } from "docusaurus-plugin-openapi-docs/lib/markdown/createRequestBodyDetails";
import { createRequestHeader } from "docusaurus-plugin-openapi-docs/lib/markdown/createRequestHeader";
import { createStatusCodes } from "docusaurus-plugin-openapi-docs/lib/markdown/createStatusCodes";
import { createVendorExtensions } from "docusaurus-plugin-openapi-docs/lib/markdown/createVendorExtensions";
import { render } from "docusaurus-plugin-openapi-docs/lib/markdown/utils";
import { ApiPageMetadata } from "docusaurus-plugin-openapi-docs/src/types";

// The schemas that carry x-tags in openapi.yaml: the plugin generates a page under schemas/ for these only.
const SCHEMAS_WITH_PAGE = ["Company", "ConceptStore", "Customer", "Payment", "PaymentGateway", "PaymentMethod", "Receipt", "Store", "StoreArea", "Terminal"];

// The response is stripped to its description: this turns "Returns a Payment object." into a link to the schema page.
// The URL is absolute to the EN locale because docs/api/webapi is shared by every locale (see STYLEGUIDE.it.md).
function describeObjectResponse(response: any): string {
  const description: string = response.description ?? "";
  const title: string | undefined = response.content?.["application/json"]?.schema?.title;
  if (!title || !SCHEMAS_WITH_PAGE.includes(title)) {
    return description;
  }

  const link = `[${title} object](https://docs.voucherly.it/en/api/webapi/schemas/${title.toLowerCase()})`;
  const objectMention = `${title} object`;
  return description.includes(objectMention)
    ? description.replace(objectMention, link)
    : `${description} See the ${link}.`;
}

export function createApiPageMdForVoucherly({
  title,
  api: {
    deprecated,
    "x-deprecated-description": deprecatedDescription,
    description,
    method,
    path,
    extensions,
    parameters,
    requestBody,
    responses,
    callbacks,
  },
  infoPath,
  frontMatter,
}: ApiPageMetadata) {

  responses = Object.fromEntries(
    Object.entries(responses).map(([key, value]) => {

      // If response is OK, I'll return only description. The response is the element object.
      const keyAsNumber = Number(key);
      if (keyAsNumber >= 200 && keyAsNumber <= 299) {
        return [key, { description: describeObjectResponse(value) }];
      } else {
        return [key, value];
      }
    })
  );

  return render([
    `import MethodEndpoint from "@theme/ApiExplorer/MethodEndpoint";\n`,
    `import ParamsDetails from "@theme/ParamsDetails";\n`,
    `import RequestSchema from "@theme/RequestSchema";\n`,
    `import StatusCodes from "@theme/StatusCodes";\n`,
    `import OperationTabs from "@theme/OperationTabs";\n`,
    `import TabItem from "@theme/TabItem";\n`,
    `import Heading from "@theme/Heading";\n`,
    `import Translate from "@docusaurus/Translate";\n\n`,
    createHeading(title),
    createMethodEndpoint(method, path),
    infoPath && createAuthorization(infoPath),
    frontMatter.show_extensions
      ? createVendorExtensions(extensions)
      : undefined,
    createDeprecationNotice({ deprecated, description: deprecatedDescription }),
    createDescription(description),
    requestBody || parameters ? createRequestHeader("Request") : undefined,
    createParamsDetails({ parameters }),
    createRequestBodyDetails({
      title: "Body",
      body: requestBody,
    }),
    // @ts-expect-error - responses è ristretto alla sola description per i 2xx
    createStatusCodes({ responses }),
    createCallbacks({ callbacks }),
  ]);
}