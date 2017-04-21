import React from 'react';
import styles from './DocLayout.css';
import Heading from 'components/Heading/Heading';
import Well from 'components/Well/Well';
import Code from 'components/Code/Code';
import ParamTable from 'components/ParamTable/ParamTable';

import { curlBuilder } from 'services/helpers';

const EndpointDoc = ({ topLevel, projectUrl, doc }) => (
  <div className={styles.top} >
    <article className={styles.content}>
      <div className={topLevel ? styles.headerMain : styles.header}>{ doc.title }</div>
      <div className={styles.addHeader}>{ doc.description }</div>
      <div className={styles.bodyContent}>
        <div className={styles.section}>
          <Well type="span" variants={['body', 'bold']}>
            <span className={styles.method}>{doc.method}</span> {`${projectUrl}${doc.url}`}
          </Well>
        </div>

        { doc.url_params && doc.url_params.length > 0 && (
          <div className={styles.section}>
            <Heading>URL parameters</Heading>
            <ParamTable
              data={doc.url_params.map(x => ({ ...x, type: `${x.type} (${x.required ? 'required' : 'optional'})` }))}
              headers={[
                { key: 'name', text: 'Parameter', style: { flex: 1 } },
                { key: 'type', text: 'Type', style: { flex: 2 } },
                { key: 'description', text: 'Description', style: { flex: 3 } },
              ]}
            />
          </div>
        )}

      </div>
    </article>
    <article className={styles.code}>
      <div className={styles.codeInner}>
        <Well variants={['code']}>
          Example request
        </Well>
        <Code>
          { curlBuilder(projectUrl, doc) }
        </Code>
        { doc.exampleResponse && (
          <div>
            <Well variants={['code']}>
              Example response
            </Well>
            <Code>
              { JSON.stringify(doc.exampleResponse, null, 2) }
            </Code>
          </div>
        )}
      </div>
    </article>
  </div>
);

EndpointDoc.propTypes = {
  doc: React.PropTypes.object,
  projectUrl: React.PropTypes.string,
  topLevel: React.PropTypes.bool,
};

export default EndpointDoc;
