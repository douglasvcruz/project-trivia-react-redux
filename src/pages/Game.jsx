import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

export class Header extends Component {
  state = {
    url: '',
    score: 0,
  };

  componentDidMount() {
    this.getPicture();
  }

  getPicture = () => {
    const { email } = this.props;
    const hash = md5(email).toString();
    this.setState({
      url: hash,
    });
  };

  render() {
    const { name } = this.props;
    const { url, score } = this.state;
    return (
      <div>
        <header>
          <img
            data-testid="header-profile-picture"
            alt="profile"
            src={ `https://www.gravatar.com/avatar/${url}` }
          />
          <p data-testid="header-player-name">{name}</p>
          <p data-testid="header-score">{score}</p>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.email,
});

Header.propTypes = {}.isRequired;

export default connect(mapStateToProps)(Header);
