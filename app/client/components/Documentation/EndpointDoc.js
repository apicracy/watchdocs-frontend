import React from 'react';
import styles from './DocLayout.css';
import Heading from 'components/Heading/Heading';
import Well from 'components/Well/Well';
import Code from 'components/Code/Code';
import ParamTable from 'components/ParamTable/ParamTable';

import { curlBuilder } from 'services/helpers';

const EndpointDoc = ({ doc }) => {
  return (
    <div className={styles.top} >
      <article className={styles.content}>
        <div className={styles.bodyContent}>
          <div className={styles.section}>
            <Heading>HTTP Request</Heading>
            <Well type="span" variants={['body']}>{doc.method}: <b>{`http://startjoin.com/api/v1${doc.path}`}</b></Well>
          </div>
          { doc.urlParams && doc.urlParams.length > 0 && (
            <div className={styles.section}>
              <Heading>URL parameters</Heading>
              <ParamTable data={doc.urlParams} headers={[
                {key: 'name', text: 'Parameter', flex: 1},
                {key: 'description', text: 'Description', flex: 4},
              ]} />
            </div>
          )}

          <div className={styles.section}>
            <Heading>Query parameters</Heading>
            <ParamTable data={doc.urlParams} headers={[
              {key: 'name', text: 'Parameter', flex: 1},
              {key: 'default', text: 'Default', flex: 1},
              {key: 'description', text: 'Description', flex: 4},
            ]} />
          </div>
        </div>
      </article>
      <article className={styles.code}>
        <div className={styles.codeInner}>
          <Code>
            { curlBuilder(doc) }
          </Code>
          <Well variants={['code']}>
            The above command returns JSON structured like this:
          </Well>
          <Code>
            { JSON.stringify([doc], null, 2)}
          </Code>
        </div>
      </article>
    </div>
  );
}

export default EndpointDoc;
