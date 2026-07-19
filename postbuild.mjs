// Post-build step for the per-locale baseUrl setup (en -> /en/, it -> /it/).
// Docusaurus emits a full site under build/en and build/it, leaving the domain
// root empty. Search engines look for robots.txt and sitemap.xml at the root,
// so we synthesize them here, plus a root 404 fallback for Netlify.
import { writeFileSync, copyFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const buildDir = 'build';
const site = 'https://docs.voucherly.it';
const locales = ['en', 'it'];

const robots = `# ${site.replace('https://', '')} robots.txt

User-agent: *
Allow: /
${locales.flatMap((l) => [`Disallow: /${l}/assets/`, `Disallow: /${l}/img/`, `Disallow: /${l}/download/`]).join('\n')}

Sitemap: ${site}/sitemap.xml
`;
writeFileSync(join(buildDir, 'robots.txt'), robots, 'utf8');

const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${locales.map((l) => `  <sitemap><loc>${site}/${l}/sitemap.xml</loc></sitemap>`).join('\n')}
</sitemapindex>
`;
writeFileSync(join(buildDir, 'sitemap.xml'), sitemapIndex, 'utf8');

// Root 404 fallback (English) so unknown top-level paths don't hit Netlify's default page.
const en404 = join(buildDir, 'en', '404.html');
if (existsSync(en404)) {
  copyFileSync(en404, join(buildDir, '404.html'));
}

console.log('postbuild: wrote build/robots.txt, build/sitemap.xml (index), build/404.html');
