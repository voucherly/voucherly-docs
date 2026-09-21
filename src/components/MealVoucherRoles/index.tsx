import React from 'react';
import { translate } from '@docusaurus/Translate';
import styles from './styles.module.css';

const t = (id: string, message: string) => translate({ id: `mealVoucherRoles.${id}`, message });

const MealVoucherRoles: React.FC = () => {
  const title = t('title', 'The role of Voucherly between the merchant ecommerce and the meal voucher issuers');

  return (
    <figure className={styles.figure}>
      <svg viewBox="0 0 1000 540" role="img" aria-label={title} className={styles.svg}>
        <defs>
          <marker id="mvrArrowInk" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className={styles.inkFill} />
          </marker>
          <marker id="mvrArrowAgreement" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className={styles.agreementFill} />
          </marker>
        </defs>

        <text x="500" y="26" textAnchor="middle" className={styles.section}>{t('flow', 'TECHNICAL PAYMENT FLOW')}</text>

        <rect x="270" y="44" width="440" height="210" rx="14" className={styles.merchantArea} />
        <text x="490" y="70" textAnchor="middle" className={styles.areaLabel}>{t('merchantTools', 'Tools chosen and used by the merchant')}</text>

        <rect x="30" y="92" width="170" height="100" rx="10" className={styles.box} />
        <text x="115" y="136" textAnchor="middle" className={styles.name}>{t('customer', 'Customer')}</text>
        <text x="115" y="160" textAnchor="middle" className={styles.caption}>{t('customerCaption', 'pays with meal vouchers')}</text>

        <rect x="290" y="92" width="170" height="100" rx="10" className={styles.box} />
        <text x="375" y="136" textAnchor="middle" className={styles.name}>{t('ecommerce', 'Ecommerce')}</text>
        <text x="375" y="160" textAnchor="middle" className={styles.caption}>{t('ecommerceCaption', 'of the merchant')}</text>

        <rect x="520" y="92" width="170" height="100" rx="10" className={styles.voucherlyBox} />
        <text x="605" y="136" textAnchor="middle" className={`${styles.name} ${styles.brand}`}>Voucherly</text>
        <text x="605" y="160" textAnchor="middle" className={styles.caption}>{t('voucherlyCaption', 'technology layer')}</text>

        <rect x="800" y="92" width="170" height="100" rx="10" className={styles.issuerBox} />
        <text x="885" y="130" textAnchor="middle" className={styles.name}>{t('issuers', 'Issuers')}</text>
        <text x="885" y="152" textAnchor="middle" className={styles.caption}>{t('issuersCaption', 'of meal vouchers')}</text>
        <text x="885" y="174" textAnchor="middle" className={styles.small}>Edenred, Pluxee, Day, …</text>

        <line x1="202" y1="142" x2="286" y2="142" className={styles.arrow} markerEnd="url(#mvrArrowInk)" />
        <text x="234" y="132" textAnchor="middle" className={styles.small}>{t('buys', 'buys')}</text>

        <line x1="462" y1="142" x2="516" y2="142" className={styles.arrow} markerEnd="url(#mvrArrowInk)" />

        <line x1="692" y1="128" x2="796" y2="128" className={styles.arrow} markerEnd="url(#mvrArrowInk)" />
        <text x="745" y="118" textAnchor="middle" className={styles.small}>{t('request', 'request')}</text>
        <line x1="796" y1="158" x2="694" y2="158" className={styles.arrow} markerEnd="url(#mvrArrowInk)" />
        <text x="745" y="176" textAnchor="middle" className={styles.small}>{t('outcome', 'outcome')}</text>

        <text x="490" y="230" textAnchor="middle" className={styles.statement}>{t('serviceStatement', 'A service for the merchant, not for the issuers')}</text>

        <line x1="30" y1="290" x2="970" y2="290" className={styles.divider} />

        <text x="500" y="324" textAnchor="middle" className={styles.section}>{t('relationship', 'CONTRACTUAL AND ECONOMIC RELATIONSHIP')}</text>

        <rect x="200" y="348" width="170" height="90" rx="10" className={styles.merchantBox} />
        <text x="285" y="388" textAnchor="middle" className={styles.name}>Merchant</text>
        <text x="285" y="411" textAnchor="middle" className={styles.caption}>{t('merchantCaption', 'affiliated')}</text>

        <rect x="630" y="348" width="170" height="90" rx="10" className={styles.issuerBox} />
        <text x="715" y="388" textAnchor="middle" className={styles.name}>{t('issuer', 'Issuer')}</text>
        <text x="715" y="411" textAnchor="middle" className={styles.caption}>{t('issuerCaption', 'of meal vouchers')}</text>

        <line x1="374" y1="393" x2="626" y2="393" className={styles.agreement} markerStart="url(#mvrArrowAgreement)" markerEnd="url(#mvrArrowAgreement)" />
        <text x="500" y="381" textAnchor="middle" className={styles.agreementLabel}>{t('agreement', 'direct agreement')}</text>

        <rect x="310" y="462" width="380" height="52" rx="10" className={styles.notPartyBox} />
        <text x="500" y="493" textAnchor="middle" className={styles.notParty}>{t('notParty', 'Voucherly is not a party to the agreement')}</text>
      </svg>
    </figure>
  );
};

export default MealVoucherRoles;
