import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type * as Plugin from "@docusaurus/types/src/plugin";
import type * as OpenApiPlugin from "docusaurus-plugin-openapi-docs";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Voucherly',
  titleDelimiter: '—',
  tagline: 'Il modo migliore per accettare i buoni pasto',
  favicon: 'https://ucarecdn.com/5c304dd8-db4f-471e-a930-04bc0ed961d3/-/preview/100x100/',

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
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    image: 'https://ucarecdn.com/1a50448f-55d8-46ac-bab0-764dee2b9c4f/-/preview/100x100/',
    navbar: {
      logo: {
        alt: 'Voucherly Logo',
        src: 'https://ucarecdn.com/a5e716fc-abcb-4ab2-960a-33a6a1b5446c/-/preview/200x50/',
        srcDark: 'https://ucarecdn.com/cf4a09cb-1f6e-4385-97c8-46ae406fd671/-/preview/200x50/',
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
  } satisfies Preset.ThemeConfig,

  plugins: [
    'docusaurus-plugin-sass',
    [
      'docusaurus-plugin-openapi-docs',
      {
        id: "api", // plugin id
        docsPluginId: "classic", // configured for preset-classic
        config: {
          webapi: {
            specPath: "files/openapi.yaml",
            //specPath: "https://api.voucherly.it/swagger/v1/swagger.json",
            outputDir: "docs/api/webapi",
            sidebarOptions: {
              groupPathsBy: "tag",
              // categoryLinkSource: "auto",
              sidebarCollapsible: true,
              sidebarCollapsed: true,
            },
            showSchemas: true,
          } satisfies OpenApiPlugin.Options,
        }
      },
    ]
  ],
  themes: ["docusaurus-theme-openapi-docs"], // export theme components
};

export default config;
