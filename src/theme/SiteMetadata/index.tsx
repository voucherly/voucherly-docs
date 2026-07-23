/**
 * Swizzled SiteMetadata: fixes i18n hreflang alternates for pages that use a
 * localized (per-locale) slug. Docusaurus' default AlternateLangHeaders only
 * swaps the locale prefix on the SAME pathname, which produces broken alternate
 * URLs when EN and IT use different slugs. Here we map the path suffix between
 * locales using SLUG_MAP so each hreflang points to the page's real URL.
 *
 * Everything else (canonical, og, twitter:card, search, themeConfig.metadata)
 * is kept identical to the upstream component.
 */
import React from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {PageMetadata, useThemeConfig} from '@docusaurus/theme-common';
import {DEFAULT_SEARCH_TAG} from '@docusaurus/theme-common/internal';
import {useLocation} from '@docusaurus/router';
import {applyTrailingSlash} from '@docusaurus/utils-common';
import SearchMetadata from '@theme/SearchMetadata';

// [ EN suffix, IT suffix ] — relative to the locale root, no leading slash,
// trailing slash. Keep in sync with the slugs in i18n/it/.../current/**.
const SLUG_MAP: [string, string][] = [
  ['guides/intro/definitions/', 'guide/introduzione/definizioni/'],
  ['guides/intro/getting-started/', 'guide/introduzione/per-iniziare/'],
  ['guides/intro/getting-started/activate-account/', 'guide/introduzione/per-iniziare/attiva-account/'],
  ['guides/intro/getting-started/website-checklist/', 'guide/introduzione/per-iniziare/checklist-sito-web/'],
  ['guides/integrations/api/', 'guide/integrazioni/api/'],
  ['guides/integrations/api/go-live-checklist/', 'guide/integrazioni/api/checklist-go-live/'],
  ['guides/integrations/ecommerce-plugins/', 'guide/integrazioni/plugin-e-commerce/'],
  ['guides/integrations/ecommerce-plugins/prestashop/', 'guide/integrazioni/plugin-e-commerce/prestashop/'],
  ['guides/integrations/ecommerce-plugins/woocommerce/', 'guide/integrazioni/plugin-e-commerce/woocommerce/'],
  ['guides/integrations/ecommerce-plugins/shopify/', 'guide/integrazioni/plugin-e-commerce/shopify/'],
  ['guides/integrations/pay-at-table/', 'guide/integrazioni/pagamento-al-tavolo/'],
  ['guides/legal/gdpr/', 'guide/note-legali/gdpr/'],
  ['guides/legal/fuhrmann2/', 'guide/note-legali/fuhrmann2/'],
  ['guides/products/electronic-receipt/ade-documento-commerciale/', 'guide/prodotti/scontrino-elettronico/documento-commerciale-online/'],
  ['guides/products/electronic-receipt/pos-rt-connection/', 'guide/prodotti/scontrino-elettronico/collegamento-pos-rt/'],
  ['guides/resources/payments-lifecycle/', 'guide/risorse/ciclo-di-vita-dei-pagamenti/'],
  ['guides/resources/payment-gateways/', 'guide/risorse/gateway-di-pagamento/'],
  ['guides/resources/payment-gateways/google-pay/', 'guide/risorse/gateway-di-pagamento/google-pay/'],
  ['guides/resources/payment-gateways/edenred/', 'guide/risorse/gateway-di-pagamento/edenred/'],
  ['guides/resources/payment-gateways/satispay/', 'guide/risorse/gateway-di-pagamento/satispay/'],
  ['guides/resources/payment-gateways/per-store-configuration/', 'guide/risorse/gateway-di-pagamento/configurazione-per-punto-vendita/'],
  ['guides/resources/payment-gateways/paypal/', 'guide/risorse/gateway-di-pagamento/paypal/'],
  ['guides/use-cases/charge-wallet/', 'guide/casi-duso/ricarica-wallet/'],
  ['guides/use-cases/smart-vending-machine/', 'guide/casi-duso/distributori-automatici-smart/'],
  ['guides/use-cases/ecommerce/', 'guide/casi-duso/e-commerce/'],
  ['guides/use-cases/kiosk/', 'guide/casi-duso/chiosco/'],
  ['guides/faq/', 'guide/faq/'],
  ['api/general/errors/', 'api/generale/errori/'],
  ['api/general/best-practices/', 'api/generale/best-practice/'],
  ['api/general/best-practices/s2s/', 'api/generale/best-practice/s2s/'],
  ['api/general/best-practices/customer/', 'api/generale/best-practice/gestione-clienti/'],
  ['api/libraries/', 'api/librerie/'],
  ['api/libraries/sdks/php/', 'api/librerie/sdk/php/'],
  ['api/libraries/sdks/dotnet/', 'api/librerie/sdk/dotnet/'],
];

function mapSuffix(suffix: string, fromLocale: string, toLocale: string): string {
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

function AlternateLangHeaders() {
  const {
    siteConfig: {baseUrl, trailingSlash, url: siteUrl},
    i18n: {currentLocale, defaultLocale, localeConfigs},
  } = useDocusaurusContext();
  const {pathname} = useLocation();

  const canonicalPathname = applyTrailingSlash(pathname, {trailingSlash, baseUrl});
  const currentSuffix = canonicalPathname.startsWith(baseUrl)
    ? canonicalPathname.slice(baseUrl.length)
    : canonicalPathname.replace(baseUrl, '');

  const currentHtmlLang = localeConfigs[currentLocale].htmlLang;
  const bcp47ToOpenGraphLocale = (code: string) => code.replace('-', '_');

  const buildUrl = (locale: string) => {
    const cfg = localeConfigs[locale];
    const suffix = mapSuffix(currentSuffix, currentLocale, locale);
    return `${cfg.url ?? siteUrl}${cfg.baseUrl}${suffix}`;
  };

  return (
    <Head>
      {Object.entries(localeConfigs).map(([locale, {htmlLang}]) => (
        <link key={locale} rel="alternate" href={buildUrl(locale)} hrefLang={htmlLang} />
      ))}
      <link rel="alternate" href={buildUrl(defaultLocale)} hrefLang="x-default" />

      <meta property="og:locale" content={bcp47ToOpenGraphLocale(currentHtmlLang)} />
      {Object.values(localeConfigs)
        .filter((config) => currentHtmlLang !== config.htmlLang)
        .map((config) => (
          <meta
            key={`meta-og-${config.htmlLang}`}
            property="og:locale:alternate"
            content={bcp47ToOpenGraphLocale(config.htmlLang)}
          />
        ))}
    </Head>
  );
}

function useDefaultCanonicalUrl(): string {
  const {
    siteConfig: {url: siteUrl, baseUrl, trailingSlash},
  } = useDocusaurusContext();
  const {pathname} = useLocation();
  const canonicalPathname = applyTrailingSlash(useBaseUrl(pathname), {
    trailingSlash,
    baseUrl,
  });
  return siteUrl + canonicalPathname;
}

function CanonicalUrlHeaders({permalink}: {permalink?: string}) {
  const {
    siteConfig: {url: siteUrl},
  } = useDocusaurusContext();
  const defaultCanonicalUrl = useDefaultCanonicalUrl();
  const canonicalUrl = permalink ? `${siteUrl}${permalink}` : defaultCanonicalUrl;
  return (
    <Head>
      <meta property="og:url" content={canonicalUrl} />
      <link rel="canonical" href={canonicalUrl} />
    </Head>
  );
}

export default function SiteMetadata() {
  const {
    i18n: {currentLocale},
  } = useDocusaurusContext();
  const {metadata, image: defaultImage} = useThemeConfig();
  return (
    <>
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <body />
      </Head>

      {defaultImage && <PageMetadata image={defaultImage} />}

      <CanonicalUrlHeaders />

      <AlternateLangHeaders />

      <SearchMetadata tag={DEFAULT_SEARCH_TAG} locale={currentLocale} />

      <Head>
        {metadata.map((metadatum, i) => (
          <meta key={i} {...metadatum} />
        ))}
      </Head>
    </>
  );
}
