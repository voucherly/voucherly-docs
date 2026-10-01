import React, {type ReactNode} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useLocation} from '@docusaurus/router';
import {TitleFormatterProvider} from '@docusaurus/theme-common/internal';
import type {Props} from '@theme/ThemeProvider/TitleFormatter';

// Guides and API reference are both served by the same docs plugin, so the section is told apart by the URL, not by params.plugin.
export default function ThemeProviderTitleFormatter({children}: Props): ReactNode {
  const {pathname} = useLocation();
  const apiBaseUrl = useBaseUrl('/api/');
  const siteTitle = pathname.startsWith(apiBaseUrl) ? 'Voucherly API' : 'Voucherly Documentation';

  return (
    <TitleFormatterProvider formatter={(params) => params.defaultFormatter({...params, siteTitle})}>
      {children}
    </TitleFormatterProvider>
  );
}
