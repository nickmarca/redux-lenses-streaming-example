import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Action } from '../actions';
import { Actions as KafkaActions } from 'redux-lenses-streaming';

export class Connect extends React.Component {
  constructor(props) {
    super(props);

    this.onConnectClick = this.onConnectClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onLogin = this.onLogin.bind(this);

    this.state = {
      authRequired: false,
    }
  }

  onConnectClick() {
    const { connection } = this.props;
    const { authRequired } = this.state;

    if (connection) {
      this.props.disconnect();
    } else if (authRequired) {
      const options = {
        host: this.props.host,
        clientId: this.props.clientId,
        user: this.props.user,
        password: this.props.password,
      };
      this.props.connect(options);
    } else {
      const options = {
        host: this.props.host,
        clientId: this.props.clientId,
      };
      this.props.connect(options);
    }
  }

  onLogin() {
    const options = {
      user: this.props.user,
      password: this.props.password,
    };
    this.props.login(options);
  }

  onInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    switch (name) {
      case 'authRequired':
        this.setState({ authRequired: value });
        break;
      case 'host':
        this.props.updateHost(value);
        break;
      case 'clientId':
        this.props.updateClientId(value);
        break;
      case 'user':
        this.props.updateUser(value);
        break;
      case 'password':
        this.props.updatePassword(value);
        break;
      default:
        break;
    }
  }

  render() {
    const { connection, heartbeatCount, host, clientId, user, password } = this.props;
    const { authRequired } = this.state;

    const btnLabel = connection ? 'Disconnect' : 'Connect';
    const btnStyle = classnames('button is-fullwidth', {
      'is-primary': !connection,
      'is-danger': connection,
    });

    const authPanel = authRequired ? (
      <div>
        <div className="panel-block">
          <p className="control has-icons-left">
            <input
              className="input is-small"
              type="text"
              placeholder="User"
              value={user}
              name="user"
              onChange={this.onInputChange}
            />
            <span className="icon is-small is-left">
              <i className="fa fa-user" />
            </span>
          </p>
        </div>
        <div className="panel-block">
          <p className="control has-icons-left">
            <input
              className="input is-small"
              type="password"
              placeholder="Password for Authentication"
              value={password}
              name="password"
              onChange={this.onInputChange}
              autoComplete="off"
            />
            <span className="icon is-small is-left">
              <i className="fa fa-lock" />
            </span>
          </p>
        </div>
      </div>
    ) : (<div />)

    return (
      <nav className="panel">
        <p className="panel-heading">
          Connection Details
                </p>
        <div className="panel-block">
          <p className="control has-icons-left">
            <input
              className="input is-small"
              type="text"
              placeholder="host"
              value={host}
              name="host"
              onChange={this.onInputChange}
            />
            <span className="icon is-small is-left">
              <i className="fa fa-server" />
            </span>
          </p>
        </div>
        <div className="panel-block">
          <p className="control has-icons-left">
            <input
              className="input is-small"
              type="text"
              placeholder="Client Id"
              value={clientId}
              name="clientId"
              onChange={this.onInputChange}
            />
            <span className="icon is-small is-left">
              <i className="fa fa-user" />
            </span>
          </p>
        </div>
        <div className="panel-block">
          <p className="control has-icons-left">
            Heartbeat Count: {heartbeatCount}
          </p>
        </div>
        <div className="panel-block">
          <p className="control has-icons-left">
            <label className="checkbox">
              <input name='authRequired'
                type="checkbox"
                checked={authRequired}
                onChange={this.onInputChange} />
              Requires Authentication
            </label>
          </p>
          <div className="control">
            <button
              onClick={this.onLogin}
              className="button is-small is-info is-pulled-right"
              disabled={!connection || !authRequired}
            >
              Login
              </button>
          </div>
        </div>
        {authPanel}
        <div className="panel-block">
          <button
            onClick={this.onConnectClick}
            className={btnStyle}
          >
            {btnLabel}
          </button>
        </div>
      </nav>
    );
  }
}

Connect.defaultProps = {
  connection: null,
  heartbeatCount: 0,
};

Connect.propTypes = {
  connection: PropTypes.shape({
    publish: PropTypes.func.isRequired,
  }),
  heartbeatCount: PropTypes.number,
  connect: PropTypes.func.isRequired,
  disconnect: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  connection: state.lenses.connection,
  host: state.session.host,
  user: state.session.user,
  password: state.session.password,
  clientId: state.session.clientId,
  heartbeatCount: state.session.heartbeatCount,
});

const mapDispatchToProps = {
  ...KafkaActions,
  ...Action,
};

export default connect(mapStateToProps, mapDispatchToProps)(Connect);
