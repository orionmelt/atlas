import "./App.css";
import React from "react";
import Intro from "./Intro";
import Atlas from "./Atlas";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showIntro: true,
      places: null,
    };
    fetch("data.json")
      .then((response) => response.json())
      .then((data) => this.initPlaces(data));
  }

  initPlaces = (data) => {
    const places = data.map(p => {
      if (p.type === "country" || p.type === "state") {
        p.questions.push({
          difficulty: 0,
          text:  "Which of these is " + p.name + "?",
          type: "text",
          labels: []
        });
      }
    
      if (p.type === "country") {
        p.questions.push({
          difficulty: 0,
          text: "Which country's flag is this?",
          type: "image",
          imageType: "emoji",
          imageSrc: p.flag,
          labels: ["administrative.country"]
        });
      }
    
      if (p.type === "city") {
        p.questions.push({
          difficulty: 0,
          text: "Which of these is " + p.name + ", " + p.state + "?",
          type: "text",
          labels: ["administrative.country"]
        });
      }
      
      return p;
    });
    this.setState({
      places: places
    });
  }

  startGame = () => {
    this.setState({
      showIntro: false
    });
  }

  render() {
    const showIntro = this.state.showIntro;
    const places = this.state.places;
    return (
      showIntro ? <Intro isLoading={places===null} onStart={this.startGame} /> : <Atlas places={places} difficulty={0} numRounds={5} />
    );
  }
}

export default App;
