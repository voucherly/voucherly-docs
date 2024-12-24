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
      collapsible: true,
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "api/webapi/get-customer-payment-methods",
          label: "Get customer payment methods",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/webapi/delete-customer-payment-method",
          label: "Delete customer payment method",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Payments",
      collapsible: true,
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "api/webapi/create-payment",
          label: "Create payment",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/webapi/get-payment",
          label: "Get payment",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/webapi/confirm-payment",
          label: "Confirm payment",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/webapi/refund-payment",
          label: "Refund payment",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "PaymentGateway",
      collapsible: true,
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "api/webapi/get-payment-gateways",
          label: "Get payment gateways",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
