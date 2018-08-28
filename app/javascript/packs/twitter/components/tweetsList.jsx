import React, { Component } from 'react';
import { tweets } from '../api/tweets';

class TweetsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
    };
  }

  componentDidMount() {
    tweets().then(response => {
      this.setState({ tweets: response });
    });
  }

  render() {
    const { tweets } = this.state;
    return (
      <div>
        <h1>Tweets</h1>
      </div>
    );
  }
}
export default TweetsList;
