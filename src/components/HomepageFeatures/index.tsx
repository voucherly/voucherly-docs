import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import { FaRocket, FaCode, FaShoppingBag } from 'react-icons/fa';

type FeatureItem = {
  title: string;
  icon: any;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Rest API',
    icon: <FaRocket />,
    description: (
      <>
        Communicate with Voucherly via Rest API.
      </>
    ),
  },
  {
    title: 'Integrations',
    icon: <FaShoppingBag />,
    description: (
      <>
        Start accept payments with Voucherly quickly and easily for Woocommerce, Prestashop and Shopify.
      </>
    ),
  },
  {
    title: 'Step by step tutorial',
    icon: <FaCode />,
    description: (
      <>
        Follow the quick guides to implement each use case on your website.
      </>
    ),
  },
];

function Feature({title, icon, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        {icon}
        {/* <Svg className=role="img" /> */}
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
