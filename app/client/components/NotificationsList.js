import React from 'react';
import UnauthorizedLayout from 'components/UnauthorizedLayout/UnauthorizedLayout';

import { ActionCable } from 'react-actioncable-provider';

class NotificationsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [
        {id: 1, message: "Dupa"}
      ],
    };
  }

  onReceived = message => {
    this.setState({
      notifications: [
        ...this.state.notifications,
        message,
      ],
    });
  }

  render() {
    return (
      <UnauthorizedLayout>
        <ActionCable
          channel={{ channel: 'Notifications::Channel' }}
          onReceived={this.onReceived}
        />
        <ul>
          {this.state.notifications.map((message) =>
            <li key={message.id}>{message.message}</li>
          )}
        </ul>
      </UnauthorizedLayout>
    );
  }
}

export default NotificationsList;
