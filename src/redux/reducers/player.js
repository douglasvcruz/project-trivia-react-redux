const INITIAL_STATE = {
  name: '',
  email: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'EMAIL':
    return {
      ...state,
      email: action.payload,
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
