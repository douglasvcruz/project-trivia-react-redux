import { Component } from 'react';

class Config extends Component {
  state = {
    result: [],
  };

  componentDidMount() {
    this.fetchApi();
  }

  fetchApi = async () => {
    const api = await fetch('https://opentdb.com/api_category.php');
    const data = await api.json();
    console.log(data.trivia_categories);
    this.setState({
      result: data.trivia_categories,
    });
  };

  render() {
    const { result } = this.state;
    return (
      <>
        <title data-testid="settings-title" />
        <select>
          { result.map(({ id, name }) => (
            <option key={ id }>{name}</option>
          ))}
        </select>
        <select>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
        <select>
          <option>Multiple Choice</option>
          <option>True / False</option>
        </select>
      </>
    );
  }
}

export default Config;
