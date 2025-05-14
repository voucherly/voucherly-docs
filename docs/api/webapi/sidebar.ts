import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/webapi/voucherly",
    },
    {
      type: "category",
      label: "Companys",
      collapsible: true,
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "api/webapi/create-company",
          label: "Create company",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/webapi/get-company",
          label: "Get company",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Customers",
      collapsible: true,
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "api/webapi/create-customer",
          label: "Create customer",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/webapi/get-customers",
          label: "Get customers",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/webapi/get-customer",
          label: "Get customer",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/webapi/update-customer",
          label: "Update customer",
          className: "api-method post",
        },
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
        {
          type: "doc",
          id: "api/webapi/get-customer-addresses",
          label: "Get customer addresses",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/webapi/create-customer-address",
          label: "Create customer address",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/webapi/get-customer-address",
          label: "Get customer address",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/webapi/update-customer-address",
          label: "Update customer address",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/webapi/delete-customer-address",
          label: "Delete customer address",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Merchants",
      collapsible: true,
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "api/webapi/create-merchant",
          label: "Create merchant",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Payment Links",
      collapsible: true,
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "api/webapi/create-payment-link",
          label: "Create payment link",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/webapi/get-payment-link",
          label: "Get payment link",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/webapi/update-payment-link",
          label: "Update payment link",
          className: "api-method put",
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
      label: "Payment Gateways",
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
