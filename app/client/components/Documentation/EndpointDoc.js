import React from 'react';
import styles from './DocLayout.css';
import Heading from 'components/Heading/Heading';
import Well from 'components/Well/Well';
import Code from 'components/Code/Code';
import ParamTable from 'components/ParamTable/ParamTable';
import SchemaTable from 'components/SchemaTable/SchemaTable';

const EndpointDoc = ({ topLevel, projectUrl, doc }) => (
  <div className={styles.top} >
    <article className={styles.content}>
      <div className={topLevel ? styles.headerMain : styles.header}>{ doc.title }</div>
      { doc.description &&
        doc.description.content &&
        <div className={styles.addHeader}>{ doc.description.content }</div> }
      <div className={styles.bodyContent}>
        <div className={styles.section}>
          <Heading>HTTP Request</Heading>
          <Well variants={['body', 'bold', 'noPadding']}>
            <span className={styles.method}>{doc.method}</span> {`${projectUrl}${doc.url}`}
          </Well>
        </div>

        { doc.url_params && doc.url_params.length > 0 && (
          <div className={styles.section}>
            <Heading>URL parameters</Heading>
            <ParamTable
              data={doc.url_params.map(x => ({ ...x, data_type: `${x.data_type ? x.data_type : ''} (${x.required ? 'required' : 'optional'})` }))}
              headers={[
                { key: 'name', text: 'Parameter', style: { flex: 1, fontWeight: 'bold' } },
                { key: 'data_type', text: 'Type', style: { flex: 2, fontStyle: 'italic', color: '#999' } },
                { key: 'description', text: 'Description', style: { flex: 3 } },
              ]}
            />
          </div>
        )}

        { doc.exampleRequest && (
          <div className={styles.section}>
            <Heading>Request</Heading>
            <SchemaTable data={doc.request.body} topLevel />
          </div>
        )}

        { doc.exampleResponse && (
          <div className={styles.section}>
            <Heading>Response</Heading>
            <SchemaTable data={doc.responses[0].body} topLevel />
          </div>
        )}

      </div>
    </article>
    <article className={styles.code}>
      <div className={styles.codeInner}>
        { doc.exampleRequest && (
          <div>
            <Well variants={['code']}>
              Example request
            </Well>
            <Code>
              { JSON.stringify(doc.exampleRequest, null, 2) }
            </Code>
          </div>
        )}

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
