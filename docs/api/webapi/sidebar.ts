import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/webapi/voucherly-api",
    },
    {
      type: "category",
      label: "Companies",
      link: {
        type: "doc",
        id: "api/webapi/company",
      },
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "api/webapi/schemas/company",
          label: "Company",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/webapi/create-company",
          label: "Create a Company",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/webapi/list-company",
          label: "List all Companies",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/webapi/retrieve-company",
          label: "Retrieve a Company",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Customers",
      link: {
        type: "doc",
        id: "api/webapi/customer",
      },
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "api/webapi/schemas/customer",
          label: "Customer",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/webapi/create-customer",
          label: "Create a Customer",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/webapi/list-customer",
          label: "List all Customers",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/webapi/retrieve-customer",
          label: "Retrieve a Customer",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/webapi/update-customer",
          label: "Update a Customer",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/webapi/retrieve-customer-prepaid-balance",
          label: "Retrieve a Customer's prepaid balance",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/webapi/list-customer-wallet-movement",
          label: "List a Customer's wallet movements",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/webapi/list-customer-address",
          label: "List a Customer's Addresses",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/webapi/create-customer-address",
          label: "Create a Customer's Address",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/webapi/retrieve-customer-address",
          label: "Retrieve a Customer's Address",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/webapi/update-customer-address",
          label: "Update a Customer's Address",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/webapi/delete-customer-address",
          label: "Delete a Customer's Address",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Payment Methods",
      link: {
        type: "doc",
        id: "api/webapi/payment-method",
      },
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "api/webapi/schemas/paymentmethod",
          label: "PaymentMethod",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/webapi/list-customer-payment-method",
          label: "List a Customer's PaymentMethods",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/webapi/delete-customer-payment-method",
          label: "Delete a Customer's PaymentMethod",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Payments",
      link: {
        type: "doc",
        id: "api/webapi/payment",
      },
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "api/webapi/schemas/payment",
          label: "Payment",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/webapi/create-payment",
          label: "Create a Payment",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/webapi/retrieve-payment",
          label: "Retrieve a Payment",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/webapi/confirm-payment",
          label: "Confirm a Payment",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/webapi/refund-payment",
          label: "Refund a Payment",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/webapi/void-payment",
          label: "Void a Payment",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/webapi/download-payment-receipt",
          label: "Download a Payment receipt",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/webapi/download-payment-refund-receipt",
          label: "Download a Payment refund receipt",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Payment Gateways",
      link: {
        type: "doc",
        id: "api/webapi/payment-gateway",
      },
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "api/webapi/schemas/paymentgateway",
          label: "PaymentGateway",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/webapi/list-payment-gateway",
          label: "List all PaymentGateways",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Receipts",
      link: {
        type: "doc",
        id: "api/webapi/receipt",
      },
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "api/webapi/schemas/receipt",
          label: "Receipt",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/webapi/retrieve-receipt",
          label: "Retrieve a Receipt",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/webapi/download-receipt",
          label: "Download a Receipt",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Terminals",
      link: {
        type: "doc",
        id: "api/webapi/terminal",
      },
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "api/webapi/schemas/terminal",
          label: "Terminal",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/webapi/list-terminal",
          label: "List all Terminals",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/webapi/delete-terminal",
          label: "Delete a Terminal",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Stores",
      link: {
        type: "doc",
        id: "api/webapi/store",
      },
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "api/webapi/schemas/store",
          label: "Store",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/webapi/list-store",
          label: "List all Stores",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/webapi/create-store",
          label: "Create a Store",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/webapi/retrieve-store",
          label: "Retrieve a Store",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/webapi/update-store",
          label: "Update a Store",
          className: "api-method put",
        },
      ],
    },
    {
      type: "category",
      label: "Concept Stores",
      link: {
        type: "doc",
        id: "api/webapi/concept-store",
      },
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "api/webapi/schemas/conceptstore",
          label: "ConceptStore",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/webapi/list-concept-store",
          label: "List all Concept Stores",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/webapi/create-concept-store",
          label: "Create a Concept Store",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/webapi/retrieve-concept-store",
          label: "Retrieve a Concept Store",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/webapi/update-concept-store",
          label: "Update a Concept Store",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/webapi/delete-concept-store",
          label: "Delete a Concept Store",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Store Areas",
      link: {
        type: "doc",
        id: "api/webapi/store-area",
      },
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "api/webapi/schemas/storearea",
          label: "StoreArea",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/webapi/list-store-area",
          label: "List all Store Areas",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/webapi/create-store-area",
          label: "Create a Store Area",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/webapi/retrieve-store-area",
          label: "Retrieve a Store Area",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/webapi/update-store-area",
          label: "Update a Store Area",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/webapi/delete-store-area",
          label: "Delete a Store Area",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Reports",
      link: {
        type: "doc",
        id: "api/webapi/reports",
      },
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "api/webapi/volumes-report",
          label: "Volumes",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
