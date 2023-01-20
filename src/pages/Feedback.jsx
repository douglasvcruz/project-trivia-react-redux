import PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../images/trivia.png';

class Feedback extends Component {
  render() {
    const minAssert = 3;
    const { history, score, name, assertions } = this.props;
    const local = JSON.parse(localStorage.getItem('ranking'));
    const { length } = local;
    return (
      <div className="div-feedback">
        <img src={ logo } alt="logo" className="logo-feedback" />
        <img
          className="gravatar-feedback"
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${local[length - 1].hash}` }
          alt="gravatar"
        />
        <section className="section-feedback">
          <p data-testid="header-player-name">{name}</p>
          <p data-testid="header-score">{score}</p>
          <p
            className={ assertions < minAssert ? 'feedback-text' : 'feedback-text-well' }
            data-testid="feedback-text"
          >
            {(assertions < minAssert) ? ('Could be better...') : ('Well Done!')}
          </p>
          <div className="feedback-total">
            <span>Você acertou </span>
            <span data-testid="feedback-total-question">
              {assertions}
            </span>
            <span> Questões!</span>
            <br />
            <span>Um total de </span>
            <span data-testid="feedback-total-score">
              {score}
            </span>
            <span> pontos</span>
          </div>
        </section>
        <section className="buttons">
          <button
            data-testid="btn-play-again"
            type="button"
            onClick={ () => history.push('/') }
            className="btn-again"
          >
            Play Again
          </button>
          <button
            data-testid="btn-ranking"
            type="button"
            onClick={ () => history.push('/ranking') }
            className="btn-ranking"
          >
            Ranking
          </button>
        </section>
      </div>
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
