import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions as KafkaActions } from 'redux-lenses-streaming';
import { Action } from '../actions';
import SQLInput from './SQLInput';
import ListActions from './ListActions';
import Search from './Search';

export class Actions extends React.Component {
    constructor(props) {
        super(props);

        this.onSqlsChange = this.onSqlsChange.bind(this);
        this.onSubscribe = this.onSubscribe.bind(this);
        this.onUnsubscribe = this.onUnsubscribe.bind(this);
        this.onClearMessages = this.onClearMessages.bind(this);

        this.state = {
            sqls: '',
            chunk: 0,
        };
    }

    componentDidUpdate() {
        const { subscriptions, totalOfMessages } = this.props;
        const { chunk } = this.state;

        if (totalOfMessages > 15000 * chunk) {
            subscriptions.map(subscription => {
                this.onUnsubscribe(subscription);
            });
        }
    }

    onSqlsChange(event) {
        this.setState({ sqls: event.target.value });
    }

    onSubscribe() {
        const request = {
            sqls: this.state.sqls,
        };
        this.props.subscribe(request);
        const { chunk } = this.state;
        this.setState({ chunk: chunk + 1 });
    }

    onClearMessages() {
        this.props.clearMessages();
        this.setState({ chunk: 0 });
    }

    onUnsubscribe(topic) {
        const request = {
            topics: [topic],
        };
        this.props.unsubscribe(request);
    }

    render() {
        const { messages, subscriptions, connection, onSerch } = this.props;
        const { sqls } = this.state;

        const topics = subscriptions.map(subscription => (
            <button
                onClick={this.onUnsubscribe.bind(this, subscription)}
                key={subscription}
                className="button is-danger is-outlined is-small is-pulled-right"
            >
                <span>{subscription}</span>
                <span className="icon is-small">
                    <i className="fa fa-times" />
                </span>
            </button>
        ));

        return (
            <nav className="ws-subscribe panel">
                <SQLInput onChange={this.onSqlsChange} value={sqls} />

                <ListActions
                    topics={topics}
                    isClearDisabled={!connection}
                    isSubscribeDisabled={!connection || !this.state.sqls}
                    onClearMessages={this.onClearMessages}
                    onSubscribe={this.onSubscribe}
                />
                <Search
                    isSearchDisabled={!connection || !messages.length}
                    onSearch={onSerch}
                />
            </nav>
        );
    }
}

Actions.defaultProps = {};

Actions.propTypes = {
    subscribe: PropTypes.func.isRequired,
    unsubscribe: PropTypes.func.isRequired,
    onSerch: PropTypes.func.isRequired,
    totalOfMessages: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
    subscriptions: state.lenses.subscriptions,
    connection: state.lenses.connection,
    messages: state.session.messages,
});

const mapDispatchToProps = {
    ...KafkaActions,
    ...Action,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Actions);
