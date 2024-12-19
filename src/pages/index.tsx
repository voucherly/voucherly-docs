import React, { useEffect } from 'react';
import { useHistory } from '@docusaurus/router';

import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title} Guides
        </Heading>
        <p className="hero__subtitle">
          Discover Voucherly features and start to integrate Voucherly on your website.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/guides/overview">
            Get started 
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {

  const history = useHistory();

  useEffect(() => {
    history.push('/guides/intro/overview');
  }, [history]);

  return null;

  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} Guides`}
      description="Voucherly guides">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
