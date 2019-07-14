import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Actions as KafkaActions } from 'redux-lenses-streaming'
import { Action } from '../actions'
import PanelAHeading from './PanelAHeading'
import PanelABlockA from './PanelABlockA'
import PanelABlockB from './PanelABlockB'
import PanelBBlockA from './PanelBBlockA'

class PanelA extends React.Component {
    constructor(props) {
        super(props)

        this.onSqlsChange = this.onSqlsChange.bind(this)
        this.onSubscribe = this.onSubscribe.bind(this)
        this.onUnsubscribe = this.onUnsubscribe.bind(this)
        this.onClearMessages = this.onClearMessages.bind(this)

        this.state = {
            sqls: '',
        }
    }

    onSqlsChange(event) {
        this.setState({ sqls: event.target.value })
    }

    onSubscribe() {
        const request = {
            sqls: this.state.sqls,
        }
        this.props.subscribe(request)
    }

    onClearMessages() {
        this.props.clearMessages()
    }

    onUnsubscribe(topic) {
        const request = {
            topics: [topic],
        }
        this.props.unsubscribe(request)
    }

    render() {
        const { messages, subscriptions, connection } = this.props
        const { sqls } = this.state

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
        ))

        return (
            <nav className="ws-subscribe panel">
                <PanelAHeading onChange={this.onSqlsChange} value={sqls} />

                <PanelABlockA
                    topics={topics}
                    isClearDisabled={!connection}
                    isSubscribeDisabled={!connection || !this.state.sqls}
                    onClearMessages={this.onClearMessages}
                    onSubscribe={this.onSubscribe}
                />
                <PanelABlockB isSearchDisabled={!connection || !messages.length} onSearch={keyword => console.log(keyword)} />
            </nav>
        )
    }
}

PanelA.defaultProps = {}

PanelA.propTypes = {
    subscribe: PropTypes.func.isRequired,
    unsubscribe: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    subscriptions: state.lenses.subscriptions,
    connection: state.lenses.connection,
    messages: state.session.messages,
})

const mapDispatchToProps = {
    ...KafkaActions,
    ...Action,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PanelA)
