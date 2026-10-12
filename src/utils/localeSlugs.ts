/**
 * Single source of truth for the URL of the current page in another locale.
 * EN URLs are path-based while IT pages can have a localized `slug:`, so the
 * path suffix differs between locales: SLUG_MAP pairs them. Used by both the
 * hreflang alternates (theme/SiteMetadata) and the locale dropdown
 * (theme/NavbarItem/LocaleDropdownNavbarItem), so they always agree.
 */
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useLocation} from '@docusaurus/router';
import {applyTrailingSlash} from '@docusaurus/utils-common';

// [ EN suffix, IT suffix ] — relative to the locale root, no leading slash,
// trailing slash. Keep in sync with the slugs in i18n/it/.../current/**.
export const SLUG_MAP: [string, string][] = [
  ['guides/about/definitions/', 'guide/informazioni/definizioni/'],
  ['guides/start-building/', 'guide/inizia-a-integrare/'],
  ['guides/start-building/activate-account/', 'guide/inizia-a-integrare/attiva-account/'],
  ['guides/start-building/start-developing/quickstart/', 'guide/inizia-a-integrare/inizia-a-sviluppare/quickstart/'],
  ['guides/start-building/start-developing/go-live-checklist/', 'guide/inizia-a-integrare/inizia-a-sviluppare/checklist-go-live/'],
  ['guides/start-building/start-developing/website-checklist/', 'guide/inizia-a-integrare/inizia-a-sviluppare/checklist-sito-web/'],
  ['guides/start-building/start-developing/test-data/', 'guide/inizia-a-integrare/inizia-a-sviluppare/dati-di-test/'],
  ['guides/online-payments/', 'guide/pagamenti-online/'],
  ['guides/online-payments/hosted-checkout/', 'guide/pagamenti-online/checkout-ospitato/'],
  ['guides/online-payments/components/', 'guide/pagamenti-online/components/'],
  ['guides/online-payments/components/reference/', 'guide/pagamenti-online/components/riferimento/'],
  ['guides/online-payments/custom-integration/', 'guide/pagamenti-online/integrazione-personalizzata/'],
  ['guides/online-payments/ecommerce-plugins/', 'guide/pagamenti-online/plugin-e-commerce/'],
  ['guides/online-payments/ecommerce-plugins/prestashop/', 'guide/pagamenti-online/plugin-e-commerce/prestashop/'],
  ['guides/online-payments/ecommerce-plugins/woocommerce/', 'guide/pagamenti-online/plugin-e-commerce/woocommerce/'],
  ['guides/online-payments/ecommerce-plugins/shopify/', 'guide/pagamenti-online/plugin-e-commerce/shopify/'],
  ['guides/in-person-payments/', 'guide/pagamenti-di-persona/'],
  ['guides/in-person-payments/kiosk/', 'guide/pagamenti-di-persona/chiosco/'],
  ['guides/in-person-payments/smart-vending-machine/', 'guide/pagamenti-di-persona/distributori-automatici-smart/'],
  ['guides/about/legal/gdpr/', 'guide/informazioni/note-legali/gdpr/'],
  ['guides/about/legal/fuhrmann2/', 'guide/informazioni/note-legali/fuhrmann2/'],
  ['guides/products/', 'guide/prodotti/'],
  ['guides/products/electronic-receipt/ade-documento-commerciale/', 'guide/prodotti/scontrino-elettronico/documento-commerciale-online/'],
  ['guides/products/electronic-receipt/pos-rt-connection/', 'guide/prodotti/scontrino-elettronico/collegamento-pos-rt/'],
  ['guides/products/pay-at-table/authentication-sso/', 'guide/prodotti/pagamento-al-tavolo/autenticazione-sso/'],
  ['guides/products/pay-at-table/upselling/', 'guide/prodotti/pagamento-al-tavolo/upselling/'],
  ['guides/about/resources/payments-lifecycle/', 'guide/informazioni/risorse/ciclo-di-vita-dei-pagamenti/'],
  ['guides/about/resources/payment-gateways/', 'guide/informazioni/risorse/gateway-di-pagamento/'],
  ['guides/about/resources/payment-gateways/meal-vouchers/', 'guide/informazioni/risorse/gateway-di-pagamento/buoni-pasto/'],
  ['guides/about/resources/payment-gateways/meal-vouchers/payment-costs/', 'guide/informazioni/risorse/gateway-di-pagamento/buoni-pasto/costi-dei-pagamenti/'],
  ['guides/about/resources/payment-gateways/google-pay/', 'guide/informazioni/risorse/gateway-di-pagamento/google-pay/'],
  ['guides/about/resources/payment-gateways/edenred/', 'guide/informazioni/risorse/gateway-di-pagamento/edenred/'],
  ['guides/about/resources/payment-gateways/edenred/objections/', 'guide/informazioni/risorse/gateway-di-pagamento/edenred/obiezioni/'],
  ['guides/about/resources/payment-gateways/satispay/', 'guide/informazioni/risorse/gateway-di-pagamento/satispay/'],
  ['guides/about/resources/payment-gateways/per-store-configuration/', 'guide/informazioni/risorse/gateway-di-pagamento/configurazione-per-punto-vendita/'],
  ['guides/about/resources/payment-gateways/paypal/', 'guide/informazioni/risorse/gateway-di-pagamento/paypal/'],
  ['guides/about/resources/charge-wallet/', 'guide/informazioni/risorse/ricarica-wallet/'],
  ['guides/faq/', 'guide/faq/'],
  ['api/general/errors/', 'api/generale/errori/'],
  ['api/general/best-practices/', 'api/generale/best-practice/'],
  ['api/general/best-practices/s2s/', 'api/generale/best-practice/s2s/'],
  ['api/general/best-practices/customer/', 'api/generale/best-practice/gestione-clienti/'],
  ['api/libraries/', 'api/librerie/'],
  ['api/libraries/sdks/php/', 'api/librerie/sdk/php/'],
  ['api/libraries/sdks/dotnet/', 'api/librerie/sdk/dotnet/'],
  ['api/libraries/sdks/javascript/', 'api/librerie/sdk/javascript/'],
];

export function mapSuffix(suffix: string, fromLocale: string, toLocale: string): string {
  if (fromLocale === toLocale) {
    return suffix;
  }
  for (const [en, it] of SLUG_MAP) {
    if (fromLocale === 'it' && suffix === it) {
      return toLocale === 'en' ? en : suffix;
    }
    if (fromLocale === 'en' && suffix === en) {
      return toLocale === 'it' ? it : suffix;
    }
  }
  // Not a localized page: the path is identical across locales.
  return suffix;
}

/** Returns `locale => path` (locale baseUrl + mapped suffix) of the current page. */
export function useLocalizedPath(): (locale: string) => string {
  const {
    siteConfig: {baseUrl, trailingSlash},
    i18n: {currentLocale, localeConfigs},
  } = useDocusaurusContext();
  const {pathname} = useLocation();

  const canonicalPathname = applyTrailingSlash(pathname, {trailingSlash, baseUrl});
  const currentSuffix = canonicalPathname.startsWith(baseUrl)
    ? canonicalPathname.slice(baseUrl.length)
    : canonicalPathname.replace(baseUrl, '');

  return (locale) =>
    `${localeConfigs[locale].baseUrl}${mapSuffix(currentSuffix, currentLocale, locale)}`;
}
