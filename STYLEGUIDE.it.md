<!--
  Documento interno di stile e terminologia per voucherly-docs.
  NON pubblicato (fuori da docs/). Riferimento per traduzioni IT e coerenza EN.
-->

# Style guide & glossario — voucherly-docs (EN / IT)

Riferimento per mantenere **coerenza terminologica, naturalezza e branding** nella documentazione, in inglese (sorgente `docs/`) e italiano (`i18n/it/…/current/`).

## 1. Principi generali

- **Audience mista**: merchant (non-tecnici) + sviluppatori. Spiegare il *perché* prima del *come*; introdurre i termini tecnici con un gloss al primo uso.
- **Fedeltà + naturalezza**: la traduzione IT non deve suonare come "traduttese". Preferire la resa italiana idiomatica alla traduzione letterale, senza aggiungere o omettere contenuto.
- **Struttura allineata**: EN e IT devono avere gli stessi heading, lo stesso ordine di sezioni e lo stesso frontmatter (tradotto). Vedi §7 (anti-drift).

## 2. Registro e tono (IT)

- **Seconda persona singolare informale ("tu")**, imperativo: "Assicurati", "Vai su", "Consulta", "Ti consigliamo". Mai il "voi".
- Impersonale ("è possibile", "si consiglia") ammesso solo dove l'italiano lo richiede per scorrevolezza; non alternarlo al "tu" nella stessa pagina.
- Evitare calchi dall'inglese ("permette di" → "consente di / ti permette di"; "in ordine di" → "per").

## 3. Casing e formattazione

- **Nomi prodotto/entità sempre con la maiuscola coerente**: `Voucherly`, `Dashboard`, `Payment`, `Transaction`, `Payment Gateway`, `Wallet`, `Customer`, `Merchant` (quando indicano l'entità/oggetto del modello). In prosa discorsiva i sostantivi comuni restano minuscoli ("il pagamento", "la transazione").
- **`Dashboard`**: sempre maiuscolo (nome del prodotto). Correggere le occorrenze "dashboard" minuscolo.
- **`buono pasto` / `buoni pasto`**: minuscolo, tranne a inizio frase o in un titolo. Correggere "Buono pasto" nelle intestazioni di tabella.
- **Valori di stato / enum API** (`Requested`, `Paid`, `Confirmed`, `Refunded`, `Cancelled`, `Voided`, `Expired`, `Dropped`, `Failed`, `ImpossibleRefund`, `PAID`, …): **restano in inglese**, in grassetto o `code`, anche in IT. Si traduce solo la spiegazione, non il valore.
- **Nomi di campo/parametro** (`mode`, `status`, `ParentPaymentId`, `checkoutUrl`, …): invariati, in `code`.
- Percorsi di menu Dashboard resi con `>`: es. **Sviluppatori > API keys**, **Impostazioni > Pagamenti > Gateway di pagamento**.

## 4. Glossario canonico EN → IT

Pattern di introduzione al primo uso: **`Termine EN (gloss IT)`**, poi si usa il termine scelto.

| Concetto EN | Reso canonico IT | Note / cosa correggere |
|---|---|---|
| merchant | **merchant** (invariato) | Mai "esercente/commerciante/negoziante". Già coerente. |
| user | **utente** (entità: `User`) | |
| customer | **cliente** (entità: `Customer`) | |
| payment | **pagamento** (entità: `Payment`) | |
| transaction | **transazione** (entità: `Transaction`) | |
| payment gateway | **gateway di pagamento** | Primo uso: "Payment Gateway (gateway di pagamento)". |
| payment method | **metodo di pagamento** | |
| wallet | **wallet (portafoglio)** al 1º uso, poi `wallet` | Già coerente. |
| meal voucher(s) | **buono pasto / buoni pasto** (minuscolo) | |
| checkout | **checkout** / "pagina di checkout" | Invariato. |
| refund / to refund | **rimborso / rimborsare** | Già coerente. |
| **secret key** | **secret key** (invariato) | ⚠️ Correggere "chiave privata". È la chiave `sk_…`. Gloss 1º uso: "(chiave segreta)". |
| **publishable key** | **publishable key** (invariato) | ⚠️ Correggere "chiave pubblica". È la chiave `pk_…`. Gloss 1º uso: "(chiave pubblicabile)". |
| restricted key | **restricted key** (invariato) | Chiave `rk_…`. |
| API key(s) | **API key** (invariato, sing./plur. invariato) | Non "chiave/i API" nel corpo; la voce di menu segue §3. |
| Dashboard menu "API Keys" | **Sviluppatori > API keys** | Uniformare le varianti "Chiavi API"/"API Key"/solo "Sviluppatori". |
| sandbox (ambiente) | **ambiente sandbox** | Eliminare "ambiente di prova"/"ambiente di test". |
| test (toggle/modalità) | **modalità test** | |
| live / production (ambiente) | **ambiente di produzione** | |
| live (toggle/modalità) | **modalità live** | |
| authorization | **autorizzazione** | Fase del processo a due fasi. |
| capture / to capture | **cattura / catturare** (gloss "(capture)" al 1º uso) | ⚠️ Tradurre anche la label "Capture" nella lista a due fasi (oggi lasciata in EN accanto a "Autorizzazione"). |
| to cancel / Cancelled | **annullare / annullata** | Stato API `Cancelled` resta in EN. |
| to void / Voided | **invalidare / invalidata** (gloss "(void)" al 1º uso) | ⚠️ Distinguere da *cancel*. Stato API `Voided` resta in EN. Uniformare `s2s.md` alla resa di `payments-lifecycle.md`. |
| webhook / callback / S2S | **webhook / callback / S2S (server-to-server)** | Invariati. |
| onboarding | **onboarding** | Invariato. |
| KYC | **verifiche KYC (know your customer)** | |

**Decisioni confermate (2026-07-19):**

1. **UI Dashboard solo italiana** → le voci di menu Dashboard restano **in italiano anche nei doc EN** (l'utente vede una UI italiana). Si uniformano solo le varianti: la voce chiavi è sempre **Sviluppatori > API keys** (non "Chiavi API"/"API Key" da soli).
2. **`secret key`/`publishable key` invariati in IT** (inglese), con glossa "(chiave segreta)"/"(chiave pubblicabile)" al primo uso. Vietato "chiave privata/pubblica".
3. **`ade-documento-commerciale`**: il sorgente `docs/` va **tradotto in inglese**; la versione italiana resta in `i18n/it`.

## 5. Convenzione frontmatter SEO (EN + IT)

Modello di riferimento già presente: [docs/guides/marketplace/ade-documento-commerciale/index.mdx](docs/guides/marketplace/ade-documento-commerciale/index.mdx).

Ogni pagina di prosa deve avere:

```yaml
---
title: <Titolo pagina, controlla il <title> SEO>
sidebar_label: <Etichetta breve per la sidebar (se diversa dal title)>
sidebar_position: <n>
description: <150–160 caratteri, orientata alla query, con il beneficio + 1-2 keyword>
keywords:
  - <keyword mirata>
  - <keyword mirata>
image: <og:image per-pagina, per le pagine di punta>
---
```

Regole:

- `description` **unica per pagina**, non generica; in IT è **tradotta** (non lasciata in EN).
- `keywords` in lingua: keyword italiane nei file IT, inglesi nei file EN.
- `title`/`description`/`keywords`/`image` vanno **sempre tradotti** nella controparte `i18n/it`.
- Pagine FAQ: usare il componente `FAQStructuredData` (`@site/src/theme/MDXComponents/FAQStructuredData`) con `export const faqs = [{question, answer}, …]` per generare il JSON-LD `FAQPage`.

## 6. Slug italiani

- Gli URL IT sono localizzati tramite `slug:` nel frontmatter dei file in `i18n/it/…/current/**` (l'EN resta path-based).
- Schema: segmenti in italiano, minuscoli, con trattini. Es. `/guide/risorse/gateway-di-pagamento/paypal`.
- Ogni cambio di slug richiede un **redirect 301** in `netlify.toml` dal vecchio URL IT (path inglese) al nuovo.
- **Importante — hreflang**: Docusaurus genera gli `hreflang` scambiando solo il prefisso di locale sullo stesso path, quindi con slug diversi tra EN e IT gli alternate puntano a pagine inesistenti. Per questo il componente `theme/SiteMetadata` è stato swizzato in [src/theme/SiteMetadata/index.tsx](src/theme/SiteMetadata/index.tsx): contiene una `SLUG_MAP` (coppie suffisso EN ↔ IT). **Quando aggiungi/cambi uno slug IT, aggiorna anche `SLUG_MAP`**, altrimenti gli hreflang di quella pagina tornano rotti.
- **Cross-link dall'API reference autogenerata** (`docs/api/webapi/**`, condivisa tra i locali) verso una guida con slug localizzato: usare un **URL assoluto completo** alla versione EN (es. `https://docs.voucherly.it/en/guides/...`) sia in `files/openapi.yaml` sia nel file generato — un link interno per-path si romperebbe su IT.
- I link interni nei file IT devono puntare ai nuovi slug italiani (o essere link relativi `.md`, che sono slug-aware). I link a `/api/webapi/*` restano invariati (non localizzati).
- Il build con `onBrokenLinks: 'throw'` deve passare: è la garanzia che nessun link interno si sia rotto. Dopo il deploy, forzare il re-crawl di Algolia DocSearch (contextualSearch per lingua) per riallineare l'indice ai nuovi slug.
- **Footer/config**: i link `to:` del footer (in `docusaurus.config.ts`) NON seguono gli slug per-locale; usare solo target stabili in entrambi i locali (home `/`, `/api/postman`, `/api/webapi/*`) o `href` esterni.

## 7. Procedura anti-drift EN ↔ IT

Le traduzioni sono copie manuali complete: **ogni modifica a un file `docs/**` va replicata nella controparte `i18n/it/…/current/**`** (stesso path, stessi heading/anchor, stesso frontmatter tradotto).

Checklist rapida a ogni modifica:

1. Il file IT esiste allo stesso path? Ha gli stessi heading e lo stesso numero di sezioni?
2. Frontmatter tradotto (title/description/keywords) e `slug` IT presente?
3. `import`, componenti, nomi immagine e ancore identici all'EN?
4. `yarn build` passa (link interni validi)?
