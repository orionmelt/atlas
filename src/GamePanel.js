import { getRandomElement } from "./Utils";
import "./GamePanel.css";

const GamePanel = (props) => {
  const {currentRound, totalRounds, place, question, score, answerPlace, showNext, gameOver, onNext, onReset} = props;
  const answered = answerPlace !== null;
  const correctAnswer = answered && place.name === answerPlace.name;
  const nextButtonText = gameOver ? "Game Over" : showNext ? (answered ? "Next Round" : "Skip Round") : "End Game";
  const correctAnswerText = getRandomElement(["Awesome!", "You got it!", "Way to go!", "Great job!"]);
  const wrongAnswerText = getRandomElement(["Close but no cigar!", "Sorry!", "Oh no!"]);
  const correctAnswerEmoji = getRandomElement(["😊", "😇", "😎", "😁"]);
  const wrongAnswerEmoji = getRandomElement(["🤕", "🤧", "😵", "🙁", "😢", "😭", "😞", "😫"])
  const gameOverEmoji = getRandomElement(["🎲", "🎮", "👾", "🕹️"]);
  const wikiLink = "https://wikipedia.org/wiki/" + place.wikiLink;

  return (
    <div id="game-panel">
      <div className="pure-g">
        <div className="pure-u-1-2 bold">
          Round {currentRound}/{totalRounds}
        </div>
        <div className="pure-u-1-2 bold scoreboard">
          Score {score}
        </div>
        <div className="pure-u-1-1">
        <button disabled={gameOver} className="pure-button pure-button-primary next-button" onClick={onNext}>{nextButtonText}</button>
        </div>
        <div id="question" className="pure-u-1-1">
          {question.text}
          {question.type === "image" && question.imageType === "emoji" &&
            <div className="emoji">
              {question.imageSrc}
            </div>
          }
        </div>
        {answered &&
          <div id="answer-feedback" className="pure-u-1-1 animate">
            {correctAnswer &&
              <>
                <div className="emoji">{correctAnswerEmoji}</div>
                <div className="heading">{correctAnswerText}</div>
                <p>Read more about <a href={wikiLink}>{place.name}</a> on Wikipedia.</p>
              </>
            }
            {!correctAnswer &&
              <>
                <div className="emoji">{wrongAnswerEmoji}</div>
                <div className="heading">{wrongAnswerText}</div>
                <div>That is incorrect.</div>
              </>
            }
          </div>
        }
        {gameOver &&
          <div id="game-over" className="pure-u-1-1">
            <div className="emoji">
              {gameOverEmoji}
            </div>
            <div className="heading">
              {score > 0 ? "Good job" : "Sorry"}
            </div>
            <div className="score-blurb">
              You scored {score} points.
            </div>
            <button className="pure-button pure-button-primary" onClick={onReset}>Play again</button>
          </div>
        }
      </div>
    </div>
  );
}

export default GamePanel;
