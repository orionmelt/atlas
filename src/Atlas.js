import React from "react";
import GamePanel from "./GamePanel";
import GameMap from "./GameMap";
import { getNeighbors, getRandomElement } from "./Utils";
import "./Atlas.css";

class Atlas extends React.Component {
  constructor(props) {
    super(props);
    const {places, difficulty, numRounds} = props;
    const rounds = this.makeRounds(places, difficulty, numRounds);
    this.state = {
      places: places,
      score: 0,
      difficulty: difficulty,
      rounds: rounds,
      currentRoundNum: 0,
      currentAnswerPlace: null,
      gameOver: false
    };
  }

  makeRounds = (places, difficulty, numRounds) => {
    const gamePlaces = [...places].sort(() => 0.5 - Math.random()).slice(0, numRounds);
    return gamePlaces.map(place => {
      let neighbors = getNeighbors(place, places, 5);
      let choices = neighbors.slice().concat([place]);
      let center = getRandomElement(choices);
      return {
        place: place,
        neighbors: getNeighbors(place, places, 5),
        question: getRandomElement(place.questions),
        center: center
        };
    });
  }

  reset = () => {
    this.setState((state) => ({
      score: 0,
      difficulty: state.difficulty,
      rounds: this.makeRounds(state.places, state.difficulty, state.rounds.length),
      currentRoundNum: 0,
      currentAnswerPlace: null,
      gameOver: false
    }));
  }

  markerClicked = (name) => {
    if (this.state.currentAnswerPlace !== null) return;
    const places = this.state.places;
    const selectedAnswerPlace = places.find(p => p.name===name);
    const correctAnswerPlace = this.state.rounds[this.state.currentRoundNum].place;
    const isAnswerCorrect = correctAnswerPlace.name === selectedAnswerPlace.name;
    const isLastQuestionAnswered = this.state.currentRoundNum === this.state.rounds.length-1;
    this.setState({
      currentAnswerPlace: selectedAnswerPlace,
      score: isAnswerCorrect ? this.state.score + 10 : this.state.score,
      gameOver: isLastQuestionAnswered
    });
  }

  next = () => {
    if (!this.hasMoreRounds()) {
      this.setState({
        gameOver: true
      });
    } else {
      this.setState(prevState => ({
        currentRoundNum: prevState.currentRoundNum + 1,
        currentAnswerPlace: null
      }));
    }
  }

  hasMoreRounds = () => {
    return this.state.currentRoundNum < this.state.rounds.length - 1;
  }

  render() {
    const currentRoundNum = this.state.currentRoundNum;
    const round = this.state.rounds[currentRoundNum];
    const place = round.place;
    const score = this.state.score;
    const answerPlace = this.state.currentAnswerPlace;
    const showNext = this.hasMoreRounds();
    const gameOver = this.state.gameOver;

    return (
      <div id="atlas" className="pure-g">
        <div className="pure-u-1 pure-u-md-1-4">
          <GamePanel
            currentRound={currentRoundNum+1}
            totalRounds={this.state.rounds.length}
            place={place}
            question={round.question}
            answerPlace={answerPlace}
            score={score}
            showNext={showNext}
            gameOver={gameOver}
            onNext={this.next}
            onReset={this.reset}
          />
        </div>
        <div className="pure-u-1 pure-u-md-3-4 map-container">
          <div id="map">
            <GameMap
              onMarkerClick={this.markerClicked}
              place={round.place}
              answerPlace={answerPlace}
              labelFeatures={round.question.labels}
              neighbors={round.neighbors}
              center={round.center}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Atlas;
