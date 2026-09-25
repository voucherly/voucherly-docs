import React from 'react';
import { translate } from '@docusaurus/Translate';
import styles from '../MealVoucherRoles/styles.module.css';

const t = (id: string, message: string) => translate({ id: `mealVoucherCosts.${id}`, message });

const MealVoucherCosts: React.FC = () => {
  const title = t('title', 'The costs a merchant bears on payments that go through Voucherly, with and without meal vouchers');

  return (
    <figure className={styles.figure}>
      <svg viewBox="0 0 1000 620" role="img" aria-label={title} className={styles.svg}>
        <defs>
          <marker id="mvcArrowInk" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className={styles.inkFill} />
          </marker>
        </defs>

        <text x="500" y="30" textAnchor="middle" className={styles.name}>{t('heading', 'COSTS BY PAYMENT TYPE')}</text>

        <rect x="420" y="48" width="14" height="14" rx="3" className={styles.issuerBox} />
        <text x="440" y="60" className={styles.small}>{t('unchanged', 'Unchanged')}</text>
        <rect x="515" y="48" width="14" height="14" rx="3" className={styles.voucherlyBox} />
        <text x="535" y="60" className={styles.small}>{t('new', 'New')}</text>

        <rect x="755" y="98" width="220" height="70" rx="10" className={styles.issuerBox} />
        <text x="865" y="127" textAnchor="middle" className={styles.statement}>{t('methodFees', 'Payment fees')}</text>
        <text x="865" y="149" textAnchor="middle" className={styles.small}>{t('methodFeesUnchanged', 'from the direct agreement, unchanged')}</text>
        <line x1="865" y1="168" x2="865" y2="196" className={styles.divider} />

        <rect x="780" y="196" width="170" height="80" rx="10" className={styles.issuerBox} />
        <text x="865" y="231" textAnchor="middle" className={styles.name}>{t('methods', 'Card, PayPal')}</text>
        <text x="865" y="253" textAnchor="middle" className={styles.caption}>{t('methodsCaption', 'and other methods')}</text>

        <rect x="30" y="306" width="170" height="80" rx="10" className={styles.box} />
        <text x="115" y="341" textAnchor="middle" className={styles.name}>{t('customer', 'Customer')}</text>
        <text x="115" y="363" textAnchor="middle" className={styles.caption}>{t('customerCaption', 'pays for the order')}</text>

        <rect x="300" y="306" width="170" height="80" rx="10" className={styles.box} />
        <text x="385" y="341" textAnchor="middle" className={styles.name}>{t('ecommerce', 'Ecommerce')}</text>
        <text x="385" y="363" textAnchor="middle" className={styles.caption}>{t('ecommerceCaption', 'of the merchant')}</text>

        <rect x="540" y="306" width="170" height="80" rx="10" className={styles.voucherlyBox} />
        <text x="625" y="341" textAnchor="middle" className={`${styles.name} ${styles.brand}`}>Voucherly</text>
        <text x="625" y="363" textAnchor="middle" className={styles.caption}>{t('voucherlyCaption', 'technology layer')}</text>

        <line x1="202" y1="346" x2="296" y2="346" className={styles.arrow} markerEnd="url(#mvcArrowInk)" />
        <line x1="472" y1="346" x2="536" y2="346" className={styles.arrow} markerEnd="url(#mvcArrowInk)" />

        <line x1="712" y1="346" x2="757" y2="346" className={styles.arrow} />
        <line x1="757" y1="236" x2="757" y2="456" className={styles.arrow} />
        <line x1="757" y1="236" x2="776" y2="236" className={styles.arrow} markerEnd="url(#mvcArrowInk)" />
        <line x1="757" y1="456" x2="776" y2="456" className={styles.arrow} markerEnd="url(#mvcArrowInk)" />

        <line x1="625" y1="386" x2="625" y2="416" className={styles.divider} />
        <rect x="515" y="416" width="220" height="84" rx="10" className={styles.voucherlyBox} />
        <text x="625" y="444" textAnchor="middle" className={styles.notParty}>{t('voucherlyFee', 'Voucherly service cost')}</text>
        <text x="625" y="466" textAnchor="middle" className={styles.small}>{t('voucherlyFeeSubscription', 'monthly subscription')}</text>
        <text x="625" y="484" textAnchor="middle" className={styles.small}>{t('voucherlyFeeVolumes', 'set according to volumes')}</text>

        <rect x="780" y="416" width="170" height="80" rx="10" className={styles.issuerBox} />
        <text x="865" y="444" textAnchor="middle" className={styles.name}>{t('issuers', 'Issuers')}</text>
        <text x="865" y="464" textAnchor="middle" className={styles.caption}>{t('issuersCaption', 'of meal vouchers')}</text>
        <text x="865" y="484" textAnchor="middle" className={styles.small}>Edenred, Pluxee, Day, …</text>

        <line x1="865" y1="496" x2="865" y2="524" className={styles.divider} />
        <rect x="755" y="524" width="220" height="70" rx="10" className={styles.issuerBox} />
        <text x="865" y="553" textAnchor="middle" className={styles.statement}>{t('issuerFee', 'Issuer fee')}</text>
        <text x="865" y="575" textAnchor="middle" className={styles.small}>{t('issuerFeeCaption', 'from the direct agreement, unchanged')}</text>
      </svg>
    </figure>
  );
};

export default MealVoucherCosts;
