import React from 'react';
import styles from './DocLayout.css';
import Heading from 'components/Heading/Heading';
import Well from 'components/Well/Well';
import Code from 'components/Code/Code';
import ParamTable from 'components/ParamTable/ParamTable';

const EndpointDoc = ({ doc }) => {
  return (
    <div className={styles.top} >
      <article className={styles.content}>
        <div className={styles.bodyContent}>
          <Heading>HTTP Request</Heading>
          <Well type="span" variants={['body']}>{doc.method}: <b>{`http://startjoin.com/api/v1${doc.path}`}</b></Well>

          { doc.urlParams && doc.urlParams.length > 0 && (
            <div>
              <Heading>URL parameters</Heading>
              <ParamTable data={doc.urlParams} headers={[
                {name: 'name', text: 'Parameter', flex: 1},
                {name: 'description', text: 'Description', flex: 4},
              ]} />
            </div>
          )}

          <Heading>Query parameters</Heading>
        </div>
      </article>
      <article className={styles.code}>
        <div className={styles.codeInner}>
          <Code>
            {`curl "api_endpoint_here"\n  -H "Authorization: meowmeow"`}
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
