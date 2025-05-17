import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/webapi/voucherly",
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
      ],
    },
    // {
    //   type: "category",
    //   label: "Customers",
    //   collapsible: true,
    //   collapsed: true,
    //   items: [
    //     {
    //       type: "doc",
    //       id: "api/webapi/list-a-customers-addresses",
    //       label: "List a Customer's Addresses",
    //       className: "api-method get",
    //     },
    //     {
    //       type: "doc",
    //       id: "api/webapi/create-a-customers-address",
    //       label: "Create a Customer's Address",
    //       className: "api-method post",
    //     },
    //     {
    //       type: "doc",
    //       id: "api/webapi/retrieve-a-customers-address",
    //       label: "Retrieve a Customer's Address",
    //       className: "api-method get",
    //     },
    //     {
    //       type: "doc",
    //       id: "api/webapi/update-a-customers-address",
    //       label: "Update a Customer's Address",
    //       className: "api-method put",
    //     },
    //     {
    //       type: "doc",
    //       id: "api/webapi/delete-a-customers-address",
    //       label: "Delete a Customer's Address",
    //       className: "api-method delete",
    //     },
    //   ],
    // },
    {
      type: "category",
      label: "Payment Gateways",
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "api/webapi/list-payment-gateway",
          label: "List all PaymentGateways",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
