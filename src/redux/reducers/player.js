const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
  score: 0,
  assertions: '',
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
  default:
    return state;
  }
};

export default playerReducer;
