import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/webapi/voucherly",
    },
    {
      type: "category",
      label: "Customers",
      items: [
        {
          type: "doc",
          id: "api/webapi/get-customer-payment-methods",
          label: "Get Customer PaymentMethods",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/webapi/delete-customer-payment-method",
          label: "Delete Customer PaymentMethod",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Merchants",
      items: [
        {
          type: "doc",
          id: "api/webapi/create-merchant",
          label: "Create Merchant",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "PaymentGateway",
      items: [
        {
          type: "doc",
          id: "api/webapi/get-payment-gateways",
          label: "Get PaymentGateways",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "PaymentLinks",
      items: [
        {
          type: "doc",
          id: "api/webapi/create-payment-link",
          label: "Create PaymentLink",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/webapi/get-payment-link",
          label: "Get PaymentLink",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/webapi/update-payment-link",
          label: "Update PaymentLink",
          className: "api-method put",
        },
      ],
    },
    {
      type: "category",
      label: "Payments",
      items: [
        {
          type: "doc",
          id: "api/webapi/create-payment",
          label: "Create Payment",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/webapi/get-payment",
          label: "Get Payment",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/webapi/confirm-payment",
          label: "Confirm Payment",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/webapi/refund-payment",
          label: "Refund Payment",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
