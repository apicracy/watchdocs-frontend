import React from 'react';
import styles from './DocLayout.css';
import Heading from 'components/Heading/Heading';
import Well from 'components/Well/Well';
import Code from 'components/Code/Code';
import ParamTable from 'components/ParamTable/ParamTable';

import { curlBuilder } from 'services/helpers';

const EndpointDoc = ({ doc }) => (
  <div className={styles.top} >
    <article className={styles.content}>
      <div className={styles.bodyContent}>
        <div className={styles.section}>
          <Heading>HTTP Request</Heading>
          <Well type="span" variants={['body', 'bold']}>
            <span className={styles.method}>{doc.method}:</span> {`http://startjoin.com/api/v1${doc.path}`}
          </Well>
        </div>

        { doc.urlParams && doc.urlParams.length > 0 && (
          <div className={styles.section}>
            <Heading>URL parameters</Heading>
            <ParamTable
              data={doc.urlParams}
              headers={[
                { key: 'name', text: 'Parameter', flex: 1 },
                { key: 'description', text: 'Description', flex: 4 },
              ]}
            />
          </div>
        )}

        { doc.queryParams && (
          <div className={styles.section}>
            <Heading>Query parameters</Heading>
            <ParamTable
              data={Object.keys(doc.queryParams.properties).map(v => ({
                ...doc.queryParams.properties[v],
                name: v,
                required: `${!!doc.queryParams.required.find(x => x === v)}`,
              }))}
              headers={[
                { key: 'name', text: 'Parameter', flex: 1 },
                { key: 'required', text: 'Required', flex: 1 },
                { key: 'description', text: 'Description', flex: 4 },
              ]}
            />
          </div>
        )}

      </div>
    </article>
    <article className={styles.code}>
      <div className={styles.codeInner}>
        <Code>
          { curlBuilder(doc) }
        </Code>
        { doc.exampleResponse && (
          <div>
            <Well variants={['code']}>
              The above command returns JSON structured like this:
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
};

export default EndpointDoc;
