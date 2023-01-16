import PropTypes from 'prop-types';
import { Component } from 'react';

class Ranking extends Component {
  render() {
    const { history } = this.props;
    return (
      <>
        <title data-testid="ranking-title" />
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Play Again
        </button>
      </>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Ranking;
