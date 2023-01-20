import PropTypes from 'prop-types';
import { Component } from 'react';
import logo from '../images/trivia.png';
import star from '../images/star.png';

class Ranking extends Component {
  render() {
    const local = JSON.parse(localStorage.getItem('ranking'));
    const { history } = this.props;
    return (
      <div className="text">
        <img src={ logo } alt="logo" className="logo-ranking" />
        <title data-testid="ranking-title" />
        <div className="div-ranking">
          <p className="ranking-text">Ranking</p>
          <div className="max">
            { local.sort((a, b) => b.score - a.score).map(({ name, hash, score }, i) => (
              <section className="section-ranking" key={ i }>
                <img
                  className="img-ranking"
                  data-testid="header-profile-picture"
                  src={ `https://www.gravatar.com/avatar/${hash}` }
                  alt="gravatar"
                />
                <p
                  className="ranking-name"
                  data-testid={ `player-name-${i}` }
                >
                  { name }
                </p>
                <div className="star-score">
                  <img src={ star } alt="star" className="star-ranking" />
                  <p
                    className="score-ranking"
                    data-testid={ `player-score-${i}` }
                  >
                    { score }
                  </p>
                  <span>pontos</span>
                </div>
              </section>
            ))}
          </div>
          <button
            className="ranking-button"
            type="button"
            data-testid="btn-go-home"
            onClick={ () => history.push('/') }
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Ranking;
