import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: <>High-Level Science API</>,
    imageUrl: 'img/high-level-api.png',
    description: (
      <>
        DVID provides a high-level Science HTTP API, focused on connectomics operations,
        and can shield clients from infrastructure changes and allow easier support
        for multiple tools.
      </>
    ),
  },
  {
    title: <>Distributed Versioning</>,
    imageUrl: 'img/distributed-versioning.png',
    description: (
      <>
        Inspired by git and open-source version control, DVID allows
        efficient <strong>branched versioning</strong> with access to
        all versions of data at any time.
      </>
    ),
  },
  {
    title: <>Extremely Flexible Storage</>,
    imageUrl: 'img/flexible-storage.png',
    description: (
      <>
        Because DVID uses key-value stores to persist data, we can
        use petabyte-scale cloud storage as well as smaller but
        extremely fast SSDs locally.
      </>
    ),
  },
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={classnames('col col--4', styles.feature)}>
      <h3>{title}</h3>
      <p>{description}</p>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="DVID documentation">
      <header className={classnames('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={classnames(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('blog/release')}>
              Get Started with the Hemibrain
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
