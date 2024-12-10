import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/webapi/sberempay",
    },
    {
      type: "category",
      label: "Customers",
      items: [
        {
          type: "doc",
          id: "api/webapi/get-customer-payment-methods",
          label: "GetCustomerPaymentMethods",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/webapi/delete-customer-payment-method",
          label: "DeleteCustomerPaymentMethod",
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
          label: "CreateMerchant",
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
          label: "GetPaymentGateways",
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
          label: "CreatePaymentLink",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/webapi/get-payment-link",
          label: "GetPaymentLink",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/webapi/update-payment-link",
          label: "UpdatePaymentLink",
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
          label: "CreatePayment",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/webapi/get-payment",
          label: "GetPayment",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/webapi/confirm-payment",
          label: "ConfirmPayment",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/webapi/refund-payment",
          label: "RefundPayment",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Schemas",
      items: [
        {
          type: "doc",
          id: "api/webapi/schemas/microsoft-aspnetcore-mvc-problemdetails",
          label: "Microsoft.AspNetCore.Mvc.ProblemDetails",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/webapi/schemas/sberempay-domain-customers-creditcardinfo",
          label: "SberemPay.Domain.Customers.CreditCardInfo",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/webapi/schemas/sberempay-domain-customers-directdebitinfo",
          label: "SberemPay.Domain.Customers.DirectDebitInfo",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/webapi/schemas/sberempay-domain-paymentgateways-checkoutaction",
          label: "SberemPay.Domain.PaymentGateways.CheckoutAction",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/webapi/schemas/sberempay-domain-payments-discounttype",
          label: "SberemPay.Domain.Payments.DiscountType",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/webapi/schemas/sberempay-domain-payments-paymentmode",
          label: "SberemPay.Domain.Payments.PaymentMode",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/webapi/schemas/sberempay-domain-payments-paymentstatus",
          label: "SberemPay.Domain.Payments.PaymentStatus",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/webapi/schemas/sberempay-domain-payments-transactionstatus",
          label: "SberemPay.Domain.Payments.TransactionStatus",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/webapi/schemas/sberempay-webapi-handlers-customers-deletecustomerpaymentmethod-deletecustomerpaymentmethodcommand",
          label: "SberemPay.WebApi.Handlers.Customers.DeleteCustomerPaymentMethod.DeleteCustomerPaymentMethodCommand",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/webapi/schemas/sberempay-webapi-handlers-merchants-createmerchantcommand",
          label: "SberemPay.WebApi.Handlers.Merchants.CreateMerchantCommand",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/webapi/schemas/sberempay-webapi-handlers-merchants-createmerchantcommand-merchantbusinessinformation",
          label: "SberemPay.WebApi.Handlers.Merchants.CreateMerchantCommand.MerchantBusinessInformation",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/webapi/schemas/sberempay-webapi-handlers-merchants-createmerchantcommand-merchantperson",
          label: "SberemPay.WebApi.Handlers.Merchants.CreateMerchantCommand.MerchantPerson",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/webapi/schemas/sberempay-webapi-handlers-paymentgateways-getpaymentgateways-getpaymentgatewaysresponse",
          label: "SberemPay.WebApi.Handlers.PaymentGateways.GetPaymentGateways.GetPaymentGatewaysResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/webapi/schemas/sberempay-webapi-handlers-paymentgateways-merchantpaymentgatewaydto",
          label: "SberemPay.WebApi.Handlers.PaymentGateways.MerchantPaymentGatewayDto",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/webapi/schemas/sberempay-webapi-handlers-paymentgateways-paymentgatewaydto",
          label: "SberemPay.WebApi.Handlers.PaymentGateways.PaymentGatewayDto",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/webapi/schemas/sberempay-webapi-handlers-paymentgateways-paymentgatewayparameterdto",
          label: "SberemPay.WebApi.Handlers.PaymentGateways.PaymentGatewayParameterDto",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/webapi/schemas/sberempay-webapi-handlers-paymentlinks-createpaymentlinkcommand",
          label: "SberemPay.WebApi.Handlers.PaymentLinks.CreatePaymentLinkCommand",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/webapi/schemas/sberempay-webapi-handlers-paymentlinks-paymentlinkdiscountcommand",
          label: "SberemPay.WebApi.Handlers.PaymentLinks.PaymentLinkDiscountCommand",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/webapi/schemas/sberempay-webapi-handlers-paymentlinks-paymentlinkdiscountdto",
          label: "SberemPay.WebApi.Handlers.PaymentLinks.PaymentLinkDiscountDto",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/webapi/schemas/sberempay-webapi-handlers-paymentlinks-paymentlinkdto",
          label: "SberemPay.WebApi.Handlers.PaymentLinks.PaymentLinkDto",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/webapi/schemas/sberempay-webapi-handlers-paymentlinks-paymentlinklinecommand",
          label: "SberemPay.WebApi.Handlers.PaymentLinks.PaymentLinkLineCommand",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/webapi/schemas/sberempay-webapi-handlers-paymentlinks-paymentlinklinedto",
          label: "SberemPay.WebApi.Handlers.PaymentLinks.PaymentLinkLineDto",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/webapi/schemas/sberempay-webapi-handlers-paymentlinks-updatepaymentlinkbodycommand",
          label: "SberemPay.WebApi.Handlers.PaymentLinks.UpdatePaymentLinkBodyCommand",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/webapi/schemas/sberempay-webapi-handlers-paymentmethods-customerpaymentmethoddto",
          label: "SberemPay.WebApi.Handlers.PaymentMethods.CustomerPaymentMethodDto",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/webapi/schemas/sberempay-webapi-handlers-payments-confirmpaymentcommand",
          label: "SberemPay.WebApi.Handlers.Payments.ConfirmPaymentCommand",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/webapi/schemas/sberempay-webapi-handlers-payments-createpaymentcommand",
          label: "SberemPay.WebApi.Handlers.Payments.CreatePaymentCommand",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/webapi/schemas/sberempay-webapi-handlers-payments-createpaymentcommand-paymentdiscount",
          label: "SberemPay.WebApi.Handlers.Payments.CreatePaymentCommand.PaymentDiscount",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/webapi/schemas/sberempay-webapi-handlers-payments-createpaymentcommand-paymentline",
          label: "SberemPay.WebApi.Handlers.Payments.CreatePaymentCommand.PaymentLine",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/webapi/schemas/sberempay-webapi-handlers-payments-paymentdiscountdto",
          label: "SberemPay.WebApi.Handlers.Payments.PaymentDiscountDto",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/webapi/schemas/sberempay-webapi-handlers-payments-paymentdto",
          label: "SberemPay.WebApi.Handlers.Payments.PaymentDto",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/webapi/schemas/sberempay-webapi-handlers-payments-paymentlinedto",
          label: "SberemPay.WebApi.Handlers.Payments.PaymentLineDto",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/webapi/schemas/sberempay-webapi-handlers-payments-refundpaymenttransactioncommand",
          label: "SberemPay.WebApi.Handlers.Payments.RefundPaymentTransactionCommand",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/webapi/schemas/sberempay-webapi-handlers-payments-refundpaymenttransactionscommand",
          label: "SberemPay.WebApi.Handlers.Payments.RefundPaymentTransactionsCommand",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/webapi/schemas/sberempay-webapi-handlers-payments-transactiondto",
          label: "SberemPay.WebApi.Handlers.Payments.TransactionDto",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/webapi/schemas/fbognini-core-domain-query-pagination-paginationresponse-1-sberempay-webapi-handlers-paymentmethods-customerpaymentmethoddto-sberempay-webapi-version-1-0-0-0-culture-neutral-publickeytoken-null",
          label: "fbognini.Core.Domain.Query.Pagination.PaginationResponse`1[[SberemPay.WebApi.Handlers.PaymentMethods.CustomerPaymentMethodDto, SberemPay.WebApi, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/webapi/schemas/fbognini-core-domain-query-pagination-paginationresult",
          label: "fbognini.Core.Domain.Query.Pagination.PaginationResult",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/webapi/schemas/fbognini-webframework-handlers-problems-detailedvalidationproblemdetails",
          label: "fbognini.WebFramework.Handlers.Problems.DetailedValidationProblemDetails",
          className: "schema",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
