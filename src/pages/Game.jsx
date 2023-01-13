import { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import logo from '../images/trivia.png';
import certo from '../images/right.png';
import errado from '../images/wrong.png';
import initial from '../images/inicial.png';
import icone from '../images/icone.png';
import settings from '../images/settings.png';
import star from '../images/star.png';

export class Header extends Component {
  state = {
    url: '',
    score: 0,
    proxima: 0,
    result: [],
    wrong: '',
    right: '',
    change: true,
  };

  componentDidMount() {
    this.getPicture();
    this.fetchApi();
  }

  fetchApi = async () => {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    const api = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await api.json();
    const magicNumber = 3;
    if (data.response_code === magicNumber) {
      localStorage.removeItem('token');
      history.push('/');
    }
    this.setState({
      result: data.results,
    });
  };

  nextQuestion = () => {
    const { proxima } = this.state;
    const magicNumber = 4;
    if (proxima === magicNumber) {
      this.setState({
        proxima: 0,
      });
    } else {
      this.setState((prevState) => ({
        proxima: prevState.proxima + 1,
      }));
    }
    this.setState({
      wrong: '',
      right: '',
      change: true,
    });
  };

  changeColor = () => {
    this.setState({
      wrong: 'incorrect',
      right: 'correct',
      change: false,
    });
  };

  getPicture = () => {
    const { email } = this.props;
    const hash = md5(email).toString();
    this.setState({
      url: hash,
    });
  };

  render() {
    const { result, proxima, wrong, right, change, url, score } = this.state;
    const { name } = this.props;
    if (result.length === 0) {
      return false;
    }

    const incorrectAndCorrect = [...result[proxima]
      .incorrect_answers, result[proxima].correct_answer];

    for (let i = 0; i < incorrectAndCorrect.length; i += 1) {
      const j = Math
        .floor(Math
          .random() * (incorrectAndCorrect.length));
      [incorrectAndCorrect[i], incorrectAndCorrect[j]] = [incorrectAndCorrect[j],
        incorrectAndCorrect[i]];
    }
    return (
      <div>
        <header>
          <img
            className="gravatar"
            data-testid="header-profile-picture"
            alt="profile"
            src={ `https://www.gravatar.com/avatar/${url}` }
          />
          <p className="name-header" data-testid="header-player-name">{name}</p>
          <img src={ star } alt="star" className="star" />
          <p className="score" data-testid="header-score">{`Pontos: ${score}`}</p>
          <img src={ settings } alt="settings" className="header-settings" />
        </header>
        <main className="container-question">
          <img src={ logo } alt="logo" className="logo-questions" />
          <div className="div-questions">
            <section className="questions">
              <p
                className="category"
                data-testid="question-category"
              >
                {result[proxima].category}
              </p>
              <p
                className="question"
                data-testid="question-text"
              >
                {result[proxima].question}
              </p>
            </section>
            <section className="answers" data-testid="answer-options">
              {incorrectAndCorrect
                .map((a, i) => (
                  <button
                    className={ `pre-answers ${a === result[proxima].correct_answer
                      ? right : wrong}` }
                    onClick={ this.changeColor }
                    data-testid={ a === result[proxima].correct_answer ? 'correct-answer'
                      : `wrong-answer-${i}` }
                    type="button"
                    key={ i }
                  >
                    { !change ? (
                      <img
                        src={ a === result[proxima].correct_answer ? certo : errado }
                        alt={ a === result[proxima].correct_answer ? 'right' : 'wrong' }
                        className="img-answer"
                      />
                    ) : (
                      <img
                        src={ initial }
                        alt="initial"
                        className="img-answer"
                      />
                    )}
                    <p className="frase">{a}</p>
                  </button>
                ))}
              { !change && (
                <button
                  type="button"
                  data-testid="btn-next"
                  onClick={ this.nextQuestion }
                  className="next"
                >
                  Next
                </button>
              )}
            </section>
          </div>
          <img src={ icone } alt="icone" className="icone-questions" />
        </main>
        <footer />
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
});

export default connect(mapStateToProps)(Header);
