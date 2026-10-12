/**
 * Swizzled SiteMetadata: fixes i18n hreflang alternates for pages that use a
 * localized (per-locale) slug. Docusaurus' default AlternateLangHeaders only
 * swaps the locale prefix on the SAME pathname, which produces broken alternate
 * URLs when EN and IT use different slugs. Here each hreflang uses
 * useLocalizedPath (src/utils/localeSlugs.ts, shared with the locale dropdown)
 * so it points to the page's real URL.
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
import {useLocalizedPath} from '@site/src/utils/localeSlugs';

function AlternateLangHeaders() {
  const {
    siteConfig: {url: siteUrl},
    i18n: {currentLocale, defaultLocale, localeConfigs},
  } = useDocusaurusContext();
  const localizedPath = useLocalizedPath();

  const currentHtmlLang = localeConfigs[currentLocale].htmlLang;
  const bcp47ToOpenGraphLocale = (code: string) => code.replace('-', '_');

  const buildUrl = (locale: string) => {
    const cfg = localeConfigs[locale];
    return `${cfg.url ?? siteUrl}${localizedPath(locale)}`;
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
