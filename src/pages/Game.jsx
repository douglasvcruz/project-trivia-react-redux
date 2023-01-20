import { Component } from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from '../images/trivia.png';
import certo from '../images/right.png';
import errado from '../images/wrong.png';
import initial from '../images/inicial.png';
import icone from '../images/icone.png';
import Header from '../components/Header';
import { addAssertions, addScore } from '../redux/actions';

const number = 30100;
const numberInterval = 1000;

class Game extends Component {
  state = {
    proxima: 0,
    result: [],
    wrong: '',
    right: '',
    change: true,
    seconds: 30,
    question: '',
    category: '',
    correct: '',
    url: '',
  };

  componentDidMount() {
    this.fetchApi();
    this.getPicture();
    setTimeout(this.timer, number);
    setInterval(this.timerInterval, numberInterval);
  }

  timer = () => {
    const { seconds } = this.state;
    if (seconds === 0) {
      this.setState({
        change: false,
      });
    }
  };

  timerInterval = () => {
    const { seconds } = this.state;
    if (seconds === 0) {
      return false;
    }
    this.setState((prevState) => ({
      seconds: prevState.seconds - 1,
    }));
  };

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
    const { result } = this.state;
    if (!result.length) {
      this.setState({
        result: data.results,
      }, this.questionRandom);
    }
  };

  questionRandom = () => {
    const { proxima, result } = this.state;
    const incorrectAndCorrect = [...result[proxima]
      .incorrect_answers, result[proxima].correct_answer];

    for (let i = 0; i < incorrectAndCorrect.length; i += 1) {
      const j = Math.floor(Math.random() * (incorrectAndCorrect.length));
      [incorrectAndCorrect[i], incorrectAndCorrect[j]] = [incorrectAndCorrect[j],
        incorrectAndCorrect[i]];
    }

    const { category, correct_answer: correct, question } = result[proxima];

    this.setState({
      incorrectAndCorrect,
      correct,
      category,
      question,
    });
  };

  nextQuestion = () => {
    const { proxima, url } = this.state;
    const { history, score, name } = this.props;
    const magicNumber = 4;
    const local = JSON.parse(localStorage.getItem('ranking'));
    if (proxima === magicNumber) {
      if (local) {
        localStorage.setItem('ranking', JSON.stringify([...local, { name, score, url }]));
      } else {
        localStorage.setItem('ranking', JSON.stringify([{ name, score, url }]));
      }
      history.push('/feedback');
    } else {
      this.setState((prevState) => ({
        proxima: prevState.proxima + 1,
      }), this.questionRandom);
    }
    this.setState({
      wrong: '',
      right: '',
      change: true,
      seconds: 30,
    });
    setTimeout(this.timer, number);
  };

  changeColor = (event) => {
    this.setState({
      wrong: 'incorrect',
      right: 'correct',
      change: false,
    });

    const { correct, seconds, result, proxima } = this.state;
    const { dispatch } = this.props;
    const three = 3; const two = 2; const one = 1; const ten = 10;

    if (event.target.innerText === correct) {
      dispatch(addAssertions(1));
      if (result[proxima].difficulty === 'hard') {
        dispatch(addScore(ten + (seconds * three)));
      } else if (result[proxima].difficulty === 'medium') {
        dispatch(addScore(ten + (seconds * two)));
      } else {
        dispatch(addScore(ten + (seconds * one)));
      }
    }
  };

  getPicture = () => {
    const { email } = this.props;
    const hash = md5(email).toString();
    this.setState({
      url: hash,
    });
  };

  render() {
    const {
      wrong, right,
      change, seconds,
      incorrectAndCorrect,
      question, category,
      correct, url,
    } = this.state;
    const { history, score, name } = this.props;

    return (
      <div className="container-div">
        <Header
          url={ url }
          name={ name }
          score={ score }
          settingsHistory={ () => history.push('/settings') }
        />
        <div className="div-questions">
          <div className="imgs">
            <img src={ logo } alt="logo" className="logo-questions" />
            <section className="questions">
              <p
                className="category"
                data-testid="question-category"
              >
                {category}
              </p>
              <p
                className="question"
                data-testid="question-text"
              >
                {question}
              </p>
              <p className="timer">{`Tempo: ${seconds}s`}</p>
            </section>
            <img src={ icone } alt="icone" className="icone-questions" />
          </div>
          <section className="answers" data-testid="answer-options">
            { incorrectAndCorrect && incorrectAndCorrect.map((a, i) => (
              <button
                disabled={ !change }
                className={ `pre-answers ${a === correct
                  ? right : wrong}` }
                onClick={ this.changeColor }
                data-testid={ a === correct ? 'correct-answer'
                  : `wrong-answer-${i}` }
                type="button"
                key={ i }
              >
                { !change ? (
                  <img
                    src={ a === correct ? certo : errado }
                    alt={ a === correct ? 'right' : 'wrong' }
                    className="img-answer"
                  />
                ) : (
                  <img
                    src={ initial }
                    alt="initial"
                    className="img-answer"
                  />)}
                <p className="frase">{a}</p>
              </button>))}
            { !change && (
              <button
                type="button"
                data-testid="btn-next"
                onClick={ this.nextQuestion }
                className="next"
              >
                Next
              </button>)}
          </section>
        </div>
        <footer />
      </div>
    );
  }
}

Game.propTypes = {
  email: PropTypes.any,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  name: PropTypes.any,
  score: PropTypes.any,
}.isRequired;

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
  score: state.player.score,
});

export default connect(mapStateToProps)(Game);
