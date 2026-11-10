# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Sito di documentazione Voucherly (Docusaurus 3, docs-only mode, bilingue IT/EN). La lingua sorgente è l'italiano.

## Comandi

- **Package manager: `pnpm`**, alla versione fissata da `packageManager` in `package.json` (non usare npm né yarn: i loro lockfile sono in `.gitignore`). `pnpm-lock.yaml` è tracciato: CI e Netlify installano con `--frozen-lockfile`, quindi va committato insieme a ogni cambio di dipendenze. Una dipendenza nuova con uno script di installazione va autorizzata in `onlyBuiltDependencies` di `pnpm-workspace.yaml`, altrimenti pnpm non esegue lo script. Versione di Node pinnata in `.nvmrc` (22), letta sia dalla CI sia da Netlify.
- `pnpm start` — dev server. Serve **solo il locale di default (it)**; per vedere l'inglese: `pnpm start --locale en`.
- `pnpm build` — build di tutti i locali. È il gate di qualità: prima `check-locale-files.mjs` verifica che ogni pagina di `docs/` abbia la sua traduzione in `i18n/en/` e viceversa, poi `onBrokenLinks: 'throw'` e `onBrokenMarkdownLinks: 'throw'` fanno fallire il build su **un link interno rotto**. Eseguirlo dopo modifiche a link, slug o rinomine di file.
- `pnpm typecheck` — `tsc` sui file TS/TSX.
- Rigenerare la reference API: `pnpm docusaurus clean-api-docs webapi; pnpm docusaurus gen-api-docs webapi`.
- Il build di produzione è `pnpm build && node postbuild.mjs` (definito in `netlify.toml`): `postbuild.mjs` sintetizza `robots.txt`, l'indice `sitemap.xml` e la 404 alla radice del dominio, che Docusaurus lascia vuota per via dei baseUrl per-locale.

## File generati — non modificarli a mano

- `docs/api/webapi/**` è **generato** da `docusaurus-plugin-openapi-docs` (via `customMdGenerators.ts`). Per cambiarlo, rigenera con i comandi sopra.
- `static/download/openapi.yaml` è **sincronizzato dall'API**: non è la fonte di verità, le modifiche vanno fatte a monte nel backend e poi risincronizzate. Sta sotto `static/` perché è anche pubblicato, su `https://docs.voucherly.it/en/download/openapi.yaml`. Gli SDK si aggiornano leggendolo da questo repository su GitHub, a questo percorso: spostarlo o rinominarlo rompe quell'aggiornamento. A ogni push su `main` che lo tocca, `.github/workflows/notify-sdks.yml` manda ai due repository SDK un `repository_dispatch` di tipo `openapi-updated` con `client_payload.sha`, usando `SDK_TOKEN`, un segreto di organizzazione condiviso con i due SDK, che lo usano per aprire le pull request di aggiornamento: il tipo e il payload sono il contratto con gli SDK, non cambiarli da una parte sola.

## Bilinguismo IT ↔ EN

Il sorgente italiano vive in `docs/**`, perché chi legge è soprattutto italiano. La traduzione inglese è una **copia manuale completa** in `i18n/en/docusaurus-plugin-content-docs/current/**` (stesso path relativo). I nomi di file e cartelle restano in inglese: danno il path degli URL inglesi.

- **Si scrive prima in italiano, in `docs/**`, e nella stessa modifica si aggiorna la controparte EN**: stessi heading e ancore, stesso ordine di sezioni, frontmatter tradotto (`title`, `description`, `keywords`). Il build fallisce se una delle due manca.
- Terminologia, registro (dare del "tu"), casing dei nomi entità e convenzioni frontmatter SEO: segui **@STYLEGUIDE.it.md** — è il riferimento vincolante, leggilo prima di scrivere o tradurre prosa.
- I nomi di prodotto, di integrazione e i termini tecnici (Hosted Checkout, Custom integration, kiosk, redirect, two-step, capture, nomi degli endpoint e degli oggetti dell'API) restano in inglese anche nel testo e negli slug italiani: il glossario è al §4 dello style guide.
- Le etichette della sidebar (`_category_.json`, `sidebars.ts`), della navbar e del footer (`docusaurus.config.ts`) e i testi dei componenti sono in italiano nel sorgente. L'inglese sta nei JSON di `i18n/en/`: dopo aver cambiato un'etichetta, `pnpm write-translations --locale en` aggiunge la chiave nuova, da tradurre a mano. La chiave di un'etichetta è il testo italiano stesso, quindi cambiarla lascia la vecchia chiave orfana: cancellala. `MealVoucherCosts` e `MealVoucherRoles` costruiscono gli id a runtime e `write-translations` non li vede: le loro voci in `i18n/en/code.json` si aggiungono a mano.
- `i18n/it/code.json` resta per le stringhe del tema: la traduzione italiana di Docusaurus ne lascia molte in inglese, e Docusaurus applica quel file anche al locale di default.
- `docs/api/webapi/**` è generato in inglese e condiviso tra i locali (non ha controparte in `i18n/en`).
- L'`hreflang="x-default"` punta all'inglese, non al locale di default (`src/theme/SiteMetadata`): come il redirect della radice in `netlify.toml`, chi non legge l'italiano è servito meglio in inglese.

## Slug italiani — tre punti da aggiornare insieme

Gli URL IT sono localizzati con `slug:` nel frontmatter dei file italiani in `docs/**`; i file EN in `i18n/en/…/current/**` restano path-based, con il solo `slug: /` della home. Quando aggiungi o cambi uno slug IT, aggiorna **tutti e tre**:

1. il `slug:` nel frontmatter del file italiano;
2. un redirect 301 dal vecchio URL in `netlify.toml`;
3. la `SLUG_MAP` in `src/utils/localeSlugs.ts` — senza questo gli `hreflang` di quella pagina e il selettore della lingua in navbar puntano a URL inesistenti. La mappa è una sola e la usano due componenti swizzati apposta: `src/theme/SiteMetadata` (hreflang) e `src/theme/NavbarItem/LocaleDropdownNavbarItem` (selettore).

Altri vincoli sui link:

- I link `to:` del footer in `docusaurus.config.ts` **non** seguono gli slug per-locale: usare solo target stabili in entrambi i locali (`/`, `/api/postman`, `/api/webapi/*`) oppure `href` esterni.
- Cross-link dalla reference API (condivisa tra locali) verso una guida con slug localizzato: usare un **URL assoluto alla versione EN** (es. `https://docs.voucherly.it/en/guides/...`), altrimenti si rompe sul locale IT.

## Git e deploy

- **`main` è protetto: nessun push diretto.** Ogni modifica entra via branch + PR su `github.com/voucherly/voucherly-docs`. Messaggi di commit brevi, in inglese, all'imperativo (`Add POS-RT connection`).
- Ogni PR verso `main` fa girare la GitHub Action `build` (`pnpm build && node postbuild.mjs`, lo stesso comando di `netlify.toml`): è un required status check, quindi un link rotto blocca il merge. In parallelo Netlify pubblica un deploy preview della PR.
- **È il merge su `main` a pubblicare in produzione**, non il push: Netlify builda e deploya `docs.voucherly.it`.
- Dopo un cambio di slug, forzare il re-crawl di Algolia DocSearch per riallineare l'indice.
