import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type * as Plugin from "@docusaurus/types/src/plugin";
import type * as OpenApiPlugin from "docusaurus-plugin-openapi-docs";
import { createApiPageMdForVoucherly } from './customMdGenerators';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Voucherly',
  titleDelimiter: '—',
  tagline: 'Il modo migliore per accettare i buoni pasto',
  favicon: 'https://voucherly-media.s3.eu-central-1.amazonaws.com/logo/voucherly-favicon.ico',

  url: 'https://docs.voucherly.it',
  baseUrl: '/',
  organizationName: 'voucherly', // Usually your GitHub org/user name.
  projectName: 'voucherly-docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  trailingSlash: true,

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    path: 'i18n',
    localeConfigs: {
      en: {
        label: 'English',
      },
      it: {
        label: 'Italiano',
      }
    }
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: "/",   // Docs-only mode (https://docusaurus.io/docs/docs-introduction#docs-only-mode)
          sidebarPath: './sidebars.ts',
          docItemComponent: "@theme/ApiItem", // Derived from docusaurus-theme-openapi
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.scss',
        },
      } satisfies Preset.Options,
    ]
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    image: 'https://voucherly-media.s3.eu-central-1.amazonaws.com/logo/voucherly-logo-square.png',
    navbar: {
      logo: {
        alt: 'Voucherly logo',
        src: 'https://voucherly-media.s3.eu-central-1.amazonaws.com/logo/voucherly-logo.png',
        srcDark: 'https://voucherly-media.s3.eu-central-1.amazonaws.com/logo/voucherly-logo-white.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'guidesSidebar',
          position: 'left',
          label: 'Guides',
        },
        {
          type: 'docSidebar',
          sidebarId: 'apiSidebar',
          position: 'left',
          label: 'API', 
        },
        {
          href: 'https://dashboard.voucherly.it/',
          label: 'Dashboard',
          position: 'right',
        },
        {
          type: 'search',
          position: 'right',
        },
        // {
        //   type: 'localeDropdown',
        //   position: 'right'
        // }
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    algolia: {
      appId: 'D23TRRADUC',
      apiKey: 'a5753bd31e9892057744c18fe9da15de',
      indexName: 'voucherly',
      contextualSearch: true,
      // externalUrlRegex: 'external\\.com|domain\\.com',
      // replaceSearchResultPathname: {
      //   from: '/docs/',
      //   to: '/',
      // },
      searchParameters: {},
      searchPagePath: 'search',
      insights: false,
    },
  } satisfies Preset.ThemeConfig,

  plugins: [
    'docusaurus-plugin-sass',
    function webpackFallbackPlugin() {
      return {
        name: 'webpack-fallback',
        configureWebpack() {
          return {
            resolve: {
              fallback: {
                path: false,
                fs: false,
                os: false,
                stream: false,
                buffer: false,
                util: false,
                crypto: false,
                http: false,
                https: false,
                url: false,
                zlib: false,
                child_process: false,
              },
            },
          };
        },
      };
    },
    [
      'docusaurus-plugin-openapi-docs',
      {
        id: "api", // plugin id
        docsPluginId: "classic", // configured for preset-classic
        config: {
          webapi: {
            specPath: "files/openapi.yaml",
            outputDir: "docs/api/webapi",
            sidebarOptions: {
              groupPathsBy: "tag",
              categoryLinkSource: 'tag',
              sidebarCollapsible: true,
              sidebarCollapsed: true,
            },
            showSchemas: false,
            markdownGenerators: { createApiPageMD: createApiPageMdForVoucherly },
          } satisfies OpenApiPlugin.Options,
        }
      },
    ]
  ],
  themes: ["docusaurus-theme-openapi-docs"], // export theme components
};

export default config;
