import PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';

class Feedback extends Component {
  render() {
    const minAssert = 3;
    const { history, score, name, assertions } = this.props;
    const gravatar = localStorage.getItem('picture');

    return (
      <>
        <img data-testid="header-profile-picture" src={ gravatar } alt="gravatar" />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">{score}</p>
        <h3>Feedback</h3>
        <p data-testid="feedback-total-question">
          { `Total de acertos: ${assertions}` }
        </p>
        <p data-testid="feedback-total-score">
          { `Pontuação final: ${score}` }
        </p>
        <p
          data-testid="feedback-text"
        >
          {
            (assertions < minAssert) ? ('Could be better...') : ('Well Done!')
          }
        </p>
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ () => history.push('/') }
        >
          Play Again
        </button>
        <button
          data-testid="btn-ranking"
          type="button"
          onClick={ () => history.push('/ranking') }
        >
          Ranking
        </button>
      </>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  name: PropTypes.any,
  score: PropTypes.any,
  assertions: PropTypes.any,
}.isRequired;

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
