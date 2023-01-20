export const addEmail = (email) => ({
  type: 'EMAIL',
  payload: email,
});

export const addName = (name) => ({
  type: 'NAME',
  payload: name,
});

export const addAssertions = (assertions) => ({
  type: 'ASSERTIONS',
  payload: assertions,
});

export const addScore = (score) => ({
  type: 'SCORE',
  payload: score,
});
