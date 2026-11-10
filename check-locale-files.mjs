// Runs before the build: every page written in Italian under docs/ must have its English translation under i18n/en/, and no English file may be left without its Italian source.
// Docusaurus would otherwise fall back silently and serve the Italian page under /en/.
// docs/api/webapi/** is generated in English and shared by both locales, so it is skipped.
import { readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const source = 'docs';
const english = join('i18n', 'en', 'docusaurus-plugin-content-docs', 'current');
const skipped = join('api', 'webapi');

const walk = (root, dir = root) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      return walk(root, path);
    }
    return [relative(root, path)];
  });

const isTranslatable = (path) =>
  !path.startsWith(skipped + sep) && !path.endsWith('_category_.json');

const sourceFiles = new Set(walk(source).filter(isTranslatable));
const englishFiles = new Set(walk(english));

const untranslated = [...sourceFiles].filter((path) => !englishFiles.has(path));
const orphaned = [...englishFiles].filter((path) => !sourceFiles.has(path));

for (const path of untranslated) {
  console.error(`missing English translation: ${join(english, path)}`);
}
for (const path of orphaned) {
  console.error(`English file without Italian source: ${join(english, path)}`);
}

if (untranslated.length > 0 || orphaned.length > 0) {
  process.exit(1);
}

console.log(`check-locale-files: ${sourceFiles.size} pages, all translated`);
