import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      error: ''
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('form to be submitted');

    fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    }).then(response => response.json())
      .then(data => {
        if (data.error) {
          this.setState({ error: data.error });
        } else {
          localStorage.setItem('user-token', data.token);
          this.props.updateToken(data.token);
          this.props.history.push('/dashboard');
        }
      });
  }

  componentDidMount() {
    let token = localStorage.getItem('user-token');
    if (token) {
      this.props.history.push('/dashboard');
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username: </label>
          <input onChange={this.handleChange} id="username" type="text" />
          <br />
          <label htmlFor="password">Password: </label>
          <input onChange={this.handleChange} id="password" type="password" />
          <br />
          <button type="submit">Login</button>
          <br />
          <span>{this.state.error}</span>
        </form>
      </div>
    )
  }
}

export default Login;
