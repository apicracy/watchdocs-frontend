import React from 'react';
import { ActionCable } from 'react-actioncable-provider';

class NotificationsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
    };
  }

  onReceived(message) {
    this.setState({
      notifications: [
        ...this.state.notifications,
        message,
      ],
    });
  }

  render() {
    return (
      <div>
        <ActionCable
          channel={{ channel: 'MessagesChannel' }}
          onReceived={this.onReceived}
        />
        <ul>
          {this.state.notifications.map((message) =>
            <li key={message.id}>{message.message}</li>
          )}
        </ul>
      </div>
    );
  }
}

export default NotificationsList;
