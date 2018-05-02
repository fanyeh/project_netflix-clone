import React, { Component } from 'react';
import Header from './Header';
import Main from './Main';
import Intro from './Intro';
import Footer from './Footer';
import Loader from './Loader';
import 'tachyons';
import './App.css';
import axios from 'axios';
import api from './lib/apiServer';

const sliders = [
  { title: 'most popular', category: 'mostpopular' },
  { title: 'best drama', category: 'bestdrama' },
  { title: 'action', category: 'action' },
  { title: 'comedy', category: 'comedy' },
  { title: 'horror', category: 'horror' },
  { title: 'romance', category: 'romance' },
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  componentDidMount() {
    let promises = sliders.map(slide => {
      return axios.get(`${api.movie}${slide.category}`);
    });

    Promise.all(promises)
      .then(responses => {
        responses.forEach((response, index) => {
          sliders[index].data = response.data;
        });
        this.setState({ loading: false });
      })
      .catch(error => {
        console.log(`Errors : ${error}`);
      });
  }

  render() {
    const component = this.state.loading ? <Loader /> : <Main sliders={sliders} />;
    return (
      <div className="App relative ">
        <Header />
        <Intro />
        <Footer />
        {component}
      </div>
    );
  }
}

export default App;
