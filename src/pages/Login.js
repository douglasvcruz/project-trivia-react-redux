import PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import { addEmail, addName } from '../redux/actions/index';
import apiToken from '../services/Api';
import logo from '../images/trivia.png';
import icone from '../images/icone.png';

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

  redirectGame = async () => {
    const { dispatch, history } = this.props;
    const { email, name } = this.state;
    dispatch(addEmail(email));
    dispatch(addName(name));
    const getToken = await apiToken();
    localStorage.setItem('token', getToken);
    history.push('/game');
  };

  redirectSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { email, name, validated } = this.state;
    return (
      <div className="container">
        <img className="logo" src={ logo } alt="logo" />
        <form className="form">
          <section className="login">
            <input
              placeholder="Qual é o seu e-mail do gravatar?"
              className="email"
              type="email"
              name="email"
              value={ email }
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
            />
            <input
              placeholder="Qual é o seu nome"
              className="name"
              type="text"
              name="name"
              value={ name }
              data-testid="input-player-name"
              onChange={ this.handleChange }
            />
          </section>
          <button
            data-testid="btn-play"
            type="button"
            className="play"
            disabled={ validated }
            onClick={ this.redirectGame }
          >
            Play
          </button>
          <button
            onClick={ this.redirectSettings }
            type="button"
            data-testid="btn-settings"
            className="settings"
          >
            Settings
          </button>
        </form>
        <img src={ icone } alt="icone" className="icone" />
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
