import pin from "./pin.png";
import "./Marker.css"

const Marker = (props) => {
  const {place, onClick} = props;

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
