import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TweetsList from './components/tweetsList';

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={TweetsList} />
    </div>
  </Router>
);
export default App;
