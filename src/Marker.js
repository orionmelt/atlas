import pinBlue from "./pin-blue.png";
import pinGreen from "./pin-green.png";
import pinRed from "./pin-red.png";
import "./Marker.css";

const Marker = (props) => {
  const {place, correctPlace, answerPlace, onClick} = props;
  const pin = answerPlace === null ? pinBlue : (answerPlace === place ? (answerPlace === correctPlace ? pinGreen : pinRed) : pinBlue);

  return (
    <img
      onClick={() => onClick(place.name)}
      className="marker"
      src={pin}
      width={16}
      alt=""
    />
  );
}

export default Marker;
