import React from 'react';
import Head from '@docusaurus/Head';

export interface FAQ {
  question: string;
  answer: string;
}

export interface FAQStructuredDataProps {
  faqs: FAQ[];
}

interface FAQPageStructuredData {
  '@context': 'https://schema.org';
  '@type': 'FAQPage';
  mainEntity: {
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }[];
}

export default function FAQStructuredData({ faqs }: FAQStructuredDataProps): JSX.Element {
  const structuredData: FAQPageStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const json = JSON.stringify(structuredData).replace(/<\/script/gi, '<\\/script');

  return (
    <>
      <Head>
        <script type="application/ld+json">{json}</script>
      </Head>
      {faqs.map((faq) => (
        <React.Fragment key={faq.question}>
          <h3>{faq.question}</h3>
          <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
        </React.Fragment>
      ))}
    </>
  );
}
