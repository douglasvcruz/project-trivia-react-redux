const apiToken = async () => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await response.json();
  console.log(data);
  return data.token;
};

export default apiToken;
