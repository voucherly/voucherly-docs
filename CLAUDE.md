# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Sito di documentazione Voucherly (Docusaurus 3, docs-only mode, bilingue EN/IT).

## Comandi

- **Package manager: `yarn`** (`package-lock.json` è in `.gitignore`; non usare npm). `yarn.lock` è tracciato: CI e Netlify installano con `--frozen-lockfile`, quindi va committato insieme a ogni cambio di dipendenze. Versione di Node pinnata in `.nvmrc` (22), letta sia dalla CI sia da Netlify.
- `yarn start` — dev server. Serve **solo il locale di default (en)**; per vedere l'italiano: `yarn start --locale it`.
- `yarn build` — build di tutti i locali. È il gate di qualità: `onBrokenLinks: 'throw'` e `onBrokenMarkdownLinks: 'throw'`, quindi **un link interno rotto fa fallire il build**. Eseguirlo dopo modifiche a link, slug o rinomine di file.
- `yarn typecheck` — `tsc` sui file TS/TSX.
- Rigenerare la reference API: `yarn docusaurus clean-api-docs webapi; yarn docusaurus gen-api-docs webapi`.
- Il build di produzione è `yarn build && node postbuild.mjs` (definito in `netlify.toml`): `postbuild.mjs` sintetizza `robots.txt`, l'indice `sitemap.xml` e la 404 alla radice del dominio, che Docusaurus lascia vuota per via dei baseUrl per-locale.

## File generati — non modificarli a mano

- `docs/api/webapi/**` è **generato** da `docusaurus-plugin-openapi-docs` (via `customMdGenerators.ts`). Per cambiarlo, rigenera con i comandi sopra.
- `files/openapi.yaml` è **sincronizzato dall'API**: non è la fonte di verità, le modifiche vanno fatte a monte nel backend e poi risincronizzate.

## Bilinguismo EN ↔ IT

Il sorgente EN vive in `docs/**`, la traduzione italiana è una **copia manuale completa** in `i18n/it/docusaurus-plugin-content-docs/current/**` (stesso path relativo).

- **Ogni modifica a un file `docs/**` va replicata subito nella controparte IT**, nella stessa modifica: stessi heading e ancore, stesso ordine di sezioni, frontmatter tradotto (`title`, `description`, `keywords`).
- Terminologia, registro (dare del "tu"), casing dei nomi entità e convenzioni frontmatter SEO: segui **@STYLEGUIDE.it.md** — è il riferimento vincolante, leggilo prima di scrivere o tradurre prosa.
- `docs/api/webapi/**` è condiviso tra i locali (non ha controparte in `i18n/it`).

## Slug italiani — tre punti da aggiornare insieme

Gli URL IT sono localizzati con `slug:` nel frontmatter dei file in `i18n/it/…/current/**` (l'EN resta path-based). Quando aggiungi o cambi uno slug IT, aggiorna **tutti e tre**:

1. il `slug:` nel frontmatter del file IT;
2. un redirect 301 dal vecchio URL in `netlify.toml`;
3. la `SLUG_MAP` in `src/theme/SiteMetadata/index.tsx` — senza questo gli `hreflang` di quella pagina puntano a URL inesistenti (il componente è swizzato apposta).

Altri vincoli sui link:

- I link `to:` del footer in `docusaurus.config.ts` **non** seguono gli slug per-locale: usare solo target stabili in entrambi i locali (`/`, `/api/postman`, `/api/webapi/*`) oppure `href` esterni.
- Cross-link dalla reference API (condivisa tra locali) verso una guida con slug localizzato: usare un **URL assoluto alla versione EN** (es. `https://docs.voucherly.it/en/guides/...`), altrimenti si rompe sul locale IT.

## Git e deploy

- **`main` è protetto: nessun push diretto.** Ogni modifica entra via branch + PR su `github.com/voucherly/voucherly-docs`. Messaggi di commit brevi, in inglese, all'imperativo (`Add POS-RT connection`).
- Ogni PR verso `main` fa girare la GitHub Action `build` (`yarn build && node postbuild.mjs`, lo stesso comando di `netlify.toml`): è un required status check, quindi un link rotto blocca il merge. In parallelo Netlify pubblica un deploy preview della PR.
- **È il merge su `main` a pubblicare in produzione**, non il push: Netlify builda e deploya `docs.voucherly.it`.
- Dopo un cambio di slug, forzare il re-crawl di Algolia DocSearch per riallineare l'indice.
