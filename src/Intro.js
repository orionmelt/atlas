import GoogleMapReact from "google-map-react";
import {getRandomElement} from "./Utils";
import "./Intro.css";

const Intro = (props) => {
  const {isLoading, onStart} = props;
  const cities = [
    [40.7127837, -74.0059413],
    [34.0522342, -118.2436849],
    [41.8781136, -87.6297982],
    [29.7604267, -95.3698028],
    [39.9525839, -75.1652215]
  ];
  const mapOptions = {
    disableDefaultUI: true,
    gestureHandling: "none",
    keyboardShortcuts: false,
    styles: [
      {
        featureType: "all",
        elementType: "labels",
        stylers: [
          { "visibility": "off" }
        ]
      }
    ]
  };
  const center = getRandomElement(cities);
  const buttonText = isLoading ? "Loadng..." : "Play";
  return (
    <div id="background">
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        center={center}
        zoom={16}
        options={mapOptions}
      >
      </GoogleMapReact>
      <div id="intro" lat={center[0]} lng={center[1]}>
        <h1>Atlas</h1>
        <h2>A maps-based trivia game</h2>
        <button disabled={isLoading} className="pure-button pure-button-primary play-button" onClick={onStart}>{buttonText}</button>
      </div>
    </div>
  );
}

export default Intro;