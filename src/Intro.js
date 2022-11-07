import GoogleMapReact from "google-map-react";
import {getRandomElement} from "./Utils";
import "./Intro.css";

const mapOptions = {
  disableDefaultUI: true,
  gestureHandling: "none",
  keyboardShortcuts: false,
  styles: [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dadada"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#c9c9c9"
        }
      ]
    },
    {
      featureType: "all",
      elementType: "labels",
      stylers: [
        { "visibility": "off" }
      ]
    }
  ]
};

const Intro = (props) => {
  const {onStart} = props;
  const cities = [
    [40.7127837, -74.0059413],
    [34.0522342, -118.2436849],
    [41.8781136, -87.6297982],
    [29.7604267, -95.3698028],
    [39.9525839, -75.1652215]
  ];
  const center = getRandomElement(cities);
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
        <button className="pure-button pure-button-primary play-button" onClick={onStart}>Play</button>
      </div>
    </div>
  );
}

export default Intro;