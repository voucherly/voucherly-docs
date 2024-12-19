import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "category",
      collapsed: false,
      label: "Customers",
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
    // {
    //   type: "category",
    //   collapsed: false,
    //   label: "Merchants",
    //   items: [
    //     {
    //       type: "doc",
    //       id: "api/webapi/create-merchant",
    //       label: "Create merchant",
    //       className: "api-method post",
    //     },
    //   ],
    // },
    {
      type: "category",
      collapsed: false,
      label: "Payments",
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
      collapsed: false,
      label: "Payment Gateways",
      items: [
        {
          type: "doc",
          id: "api/webapi/get-payment-gateways",
          label: "Get payment gateways",
          className: "api-method get",
        },
      ],
    },
    // {
    //   type: "category",
    //   collapsed: false,
    //   label: "Payment Links",
    //   items: [
    //     {
    //       type: "doc",
    //       id: "api/webapi/create-payment-link",
    //       label: "Create payment link",
    //       className: "api-method post",
    //     },
    //     {
    //       type: "doc",
    //       id: "api/webapi/get-payment-link",
    //       label: "Get payment link",
    //       className: "api-method get",
    //     },
    //     {
    //       type: "doc",
    //       id: "api/webapi/update-payment-link",
    //       label: "Update payment link",
    //       className: "api-method put",
    //     },
    //   ],
    // },
  ],
};

export default sidebar.apisidebar;
