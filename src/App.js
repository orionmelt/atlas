import "./App.css";
import React from "react";
import Intro from "./Intro";
import Atlas from "./Atlas";
import places from "./Data";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showIntro: true
    };
  }

  startGame = () => {
    this.setState({
      showIntro: false
    });
  }

  render() {
    const showIntro = this.state.showIntro;
    return (
      showIntro ? <Intro onStart={this.startGame} /> : <Atlas places={places} difficulty={0} numRounds={5} />
    );
  }
}

export default App;
