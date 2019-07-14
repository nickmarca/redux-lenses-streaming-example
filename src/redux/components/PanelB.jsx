import React from 'react';
import PropTypes from 'prop-types';
import { List, AutoSizer } from 'react-virtualized';
import { parseMessages } from '../util';
import PanelBBlockA from './PanelBBlockA';

class PanelB extends React.Component {
    constructor(props) {
        super(props);

        this.rowRenderer = this.rowRenderer.bind(this);
    }

    componentDidUpdate() {
        /*if (Object.keys(this.state.message).length === 0) {
            this.list.scrollToRow(this.props.messages.length);
        }*/
        if(this.props.shouldScrollToBottom) {
          this.list.scrollToRow(this.props.messages.length);
        }
    }

    rowRenderer = messages => ({
        key, // Unique key within array of rows
        index, // Index of row within collection
        isScrolling, // The List is currently being scrolled
        isVisible, // This row is visible within the List (eg it is not an overscanned row)
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

    render() {
        const { messages } = this.props;

        return (
            <nav className="panel">
                <PanelBBlockA numberOfMessages={messages.length} />

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
        );
    }
}

class MessageListItem extends React.Component {
    render() {
        return (
            <div className="column is-2">
                <div>{this.props.label}</div>
                {this.props.value}
            </div>
        );
    }
}

PanelB.defaultProps = {};

PanelB.propTypes = {
    onMessageDetailRequest: PropTypes.func,
    shouldScrollToBottom: PropTypes.bool,
    onCommitMessage: PropTypes.func,
    messages: PropTypes.arrayOf(PropTypes.object),
};

export default PanelB;