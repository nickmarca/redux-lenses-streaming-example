import React from 'react';
import { connect } from 'react-redux';
import { Actions as KafkaActions } from 'redux-lenses-streaming';

import Connect from '../components/Connect';
import Publish from '../components/Publish';
import PanelA from '../components/Actions';
import MessageList from '../components/MessageList';
import Messages from '../components/Section';

class MainContainer extends React.Component {
  render() {
    const { messages, commit } = this.props;

    return (
      <div className="container app">
        <div className="columns">
          <div className="column">
            <Connect />
          </div>
          <div className="column">
            <Publish />
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <Messages messages={messages} onCommit={commit}/>
           {/* <PanelA />
            {messages.length ? (
              <MessageList messages={messages} onCommitMessage={commit} />
            ) : null}*/}
          </div>
        </div>
      </div>
    );
  }
}

/**
 * Defaults and types
 */
MainContainer.defaultProps = {

};

MainContainer.propTypes = {
};

/**
 * Redux mappings
 */
const mapStateToProps = state => ({
  messages: state.session.messages,
});

const mapDispatchToProps = {
  ...KafkaActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
