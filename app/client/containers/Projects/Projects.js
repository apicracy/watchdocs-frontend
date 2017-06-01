import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import styles from './Projects.css';

import Brand from 'components/Brand/Brand';
import Button from 'components/Button/Button';

@connect(store => ({
  projects: store.projects.projectList,
}))
class Projects extends React.Component {
  static propTypes = {
    projects: React.PropTypes.array,
    location: React.PropTypes.object,
  }

  handleOptionClick = name => () => browserHistory.push(`/${name}`);

  render() {
    const { projects, location } = this.props;
    const notFound = location.query.not_found;

    return (
      <div className={styles.root}>
        <div className={styles.inner}>
          <Brand />
          { notFound && (
            <div>
              <h1>404 Project Not Found</h1>
              <h3>
                We are sorry, but project
                <span className={styles.projectName}>{ ` ${notFound} ` }</span>
                either does not exist or you do not have access to it.
              </h3>
              <h4>
                If you think it is an error,
                please contact adninistrators or pick a project from list below.
              </h4>
            </div>
          )}

          <div className={styles.buttonGroup}>

            {
              projects.map(o => (
                <Button
                  key={o.id}
                  onClick={this.handleOptionClick(o.name)}
                >
                  {o.name}
                </Button>
              ))
            }

          </div>

        </div>
      </div>
    );
  }
}

export default Projects;
