import PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import star from '../images/star.png';
import settings from '../images/settings.png';

class Header extends Component {
  render() {
    const { name, score, settingsHistory, url } = this.props;
    return (
      <header>
        <img
          className="gravatar"
          data-testid="header-profile-picture"
          alt="profile"
          src={ `https://www.gravatar.com/avatar/${url}` }
        />
        <p className="name-header" data-testid="header-player-name">{name}</p>
        <img src={ star } alt="star" className="star" />
        <p>Pontos:</p>
        <p className="score" data-testid="header-score">{score}</p>
        <button className="settings-button" type="button" onClick={ settingsHistory }>
          <img
            src={ settings }
            alt="settings"
            className="header-settings"
          />
        </button>
      </header>
    );
  }
}

Header.propTypes = {
  gravatarEmail: PropTypes.any,
  name: PropTypes.any,
  score: PropTypes.any,
}.isRequired;

const mapStateToProps = (state) => ({
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
