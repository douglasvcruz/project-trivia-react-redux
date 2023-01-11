import PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import { addEmail, addName } from '../redux/actions/index';

class Login extends Component {
  state = {
    email: '',
    name: '',
    validated: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validationError);
  };

  validationError = () => {
    const { email, name } = this.state;
    const allTests = email && name;
    if (allTests) {
      this.setState({
        validated: false,
      });
    } else {
      this.setState({
        validated: true,
      });
    }
  };

  redirectWallet = () => {
    const { dispatch } = this.props;
    const { email, name } = this.state;
    dispatch(addEmail(email));
    dispatch(addName(name));
  };

  render() {
    const { email, name, validated } = this.state;
    return (
      <div className="container">
        <input
          className="email"
          type="email"
          name="email"
          value={ email }
          data-testid="input-gravatar-email"
          onChange={ this.handleChange }
        />
        <input
          className="name"
          type="text"
          name="name"
          value={ name }
          data-testid="input-player-name"
          onChange={ this.handleChange }
        />
        <button
          data-testid="btn-play"
          type="button"
          className="play"
          disabled={ validated }
          onClick={ this.redirectWallet }
        >
          Play
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
