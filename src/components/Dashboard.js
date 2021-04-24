import React, { Component } from 'react';


class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dashboard: [],
      error: ''
    }
  }

  componentDidMount() {
    let token = this.props.token;
    fetch('http://localhost:3001/dashboard', {
      headers: {
        'token': token
      },
    }).then(response => response.json())
      .then(data => console.log(data));
  }

  render() {
    return (
      <div>
        <h1> Dashboard </h1>
      </div>
    )
  }
}

export default Dashboard;