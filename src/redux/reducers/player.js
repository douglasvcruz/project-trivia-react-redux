const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
  score: 0,
  assertions: 0,
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'EMAIL':
    return {
      ...state,
      gravatarEmail: action.payload,
    };
  case 'NAME':
    return {
      ...state,
      name: action.payload,
    };
  case 'ASSERTIONS':
    return {
      ...state,
      assertions: state.assertions + action.payload,
    };
  case 'SCORE':
    return {
      ...state,
      score: state.score + action.payload,
    };
  default:
    return state;
  }
};

export default playerReducer;
