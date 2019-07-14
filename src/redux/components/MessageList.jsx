import React from 'react';
import PropTypes from 'prop-types';
import { List, AutoSizer } from 'react-virtualized';
import { parseMessages } from '../util';
import ListHeading from './ListHeading';
import classnames from 'classnames';
import Chart from './Chart';
import MessageListItem from './MessageListItem';

const tab = {
    MESSAGES: 'messages',
    CHART: 'chart',
};

export class MessageList extends React.Component {
    state = {
        active: tab.MESSAGES,
    };

    constructor(props) {
        super(props);

        this.rowRenderer = this.rowRenderer.bind(this);
    }

    componentDidUpdate() {
        /*if (Object.keys(this.state.message).length === 0) {
            this.list.scrollToRow(this.props.messages.length);
        }*/
        if (this.props.shouldScrollToBottom) {
            this.list && this.list.scrollToRow(this.props.messages.length);
        }
    }

    rowRenderer = messages => ({
        key, // Unique key within array of rows
        index, // Index of row within collection
        isScrolling, // The MessageList is currently being scrolled
        isVisible, // This row is visible within the MessageList (eg it is not an overscanned row)
        style, // Style object to be applied to row (to position it)
    }) => {
        const [arr, keys] = parseMessages(messages, index);

        const onMessageDetailRequest = () => {
            this.props.onMessageDetailRequest(messages[index]);
        };

        return (
            <div
                key={key}
                style={style}
                className="message-row columns ws-message-list is-multiline"
                onClick={onMessageDetailRequest}
            >
                <div className="column is-2">
                    <div>Index</div>
                    {index}
                </div>
                {keys.map(item => (
                    <MessageListItem
                        className="key"
                        key={item.label}
                        label={item.label}
                        value={item.value}
                    />
                ))}
                {arr.map(item => (
                    <MessageListItem
                        key={item.label}
                        label={item.label}
                        value={item.value}
                    />
                ))}
            </div>
        );
    };

    isActive(tab) {
        const { active } = this.state;
        return tab === active;
    }

    render() {
        const { messages } = this.props;

        const data = messages.map(({ key, value }) => {
            const oKey = JSON.parse(key);
            const oValue = JSON.parse(value);
            return {
                ...oKey,
                ...oValue,
            };
        });

        return (
            <div>
                <div
                    className="tabs is-small"
                    style={{
                        margin: 0,
                        background: '#fff',
                        padding: '25px 0 0 0',
                    }}
                >
                    <ul>
                        <li
                            className={classnames({
                                'is-active': this.isActive(tab.MESSAGES),
                            })}
                        >
                            <a
                                onClick={() =>
                                    this.setState({ active: tab.MESSAGES })
                                }
                            >
                                Messages
                            </a>
                        </li>
                        <li
                            className={classnames({
                                'is-active': this.isActive(tab.CHART),
                            })}
                        >
                            <a
                                onClick={() =>
                                    this.setState({ active: tab.CHART })
                                }
                            >
                                Chart
                            </a>
                        </li>
                    </ul>
                </div>

                {this.isActive(tab.MESSAGES) ? (
                    <nav className="panel">
                        <ListHeading numberOfMessages={messages.length} />

                        <div className="panel-block">
                            <AutoSizer className="autosizer-bulma-fix">
                                {({ width = true }) => (
                                    <List
                                        ref={list => {
                                            this.list = list;
                                        }}
                                        width={width}
                                        height={290}
                                        rowCount={messages.length}
                                        rowHeight={160}
                                        rowRenderer={this.rowRenderer(messages)}
                                    />
                                )}
                            </AutoSizer>
                        </div>
                    </nav>
                ) : null}

                {this.isActive(tab.CHART) ? (
                    <Chart
                        data={data}
                        xAxisDataKey={'Timestamp'}
                        lineDataKey={'Speed'}
                    />
                ) : null}
            </div>
        );
    }
}

MessageList.defaultProps = {};

MessageList.propTypes = {
    onMessageDetailRequest: PropTypes.func,
    shouldScrollToBottom: PropTypes.bool,
    onCommitMessage: PropTypes.func,
    messages: PropTypes.arrayOf(PropTypes.object),
};

export default MessageList;
