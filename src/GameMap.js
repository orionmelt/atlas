import React from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";

class GameMap extends React.Component {
  calcZoom = (places) => {
    const lats = places.map(p => p.lat);
    const lngs = places.map(p => p.lng);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);
    const latDistance = Math.abs(maxLat - minLat);
    const lngDistance = Math.abs(maxLng - minLng);
    const distance = Math.max(latDistance, lngDistance);
    return distance < 20 ? 5 : 4;
  }

  getMapOptions = (labelFeatures) => {
    const mapOptions = {
      mapTypeControl: false,
      fullscreenControl: false,
      styles: [
        {
          featureType: "all",
          elementType: "labels",
          stylers: [
            { "visibility": "off" }
          ]
        },
        {
          featureType: "road",
          elementType: "all",
          stylers: [
            { "visibility": "off" }
          ]
        },
        {
          featureType: "landscape",
          elementType: "all",
          stylers: [
            { "visibility": "on" }
          ]
        }
      ]
    };
  
    for (const feature of labelFeatures) {
      mapOptions.styles.push({
        featureType: feature,
        elementType: "labels",
        stylers: [
          { "visibility": "on" }
        ]
      });
    }
  
    return mapOptions;
  }

  render() {
    const {place, answerPlace, neighbors, center, labelFeatures, onMarkerClick} = this.props;
    const choices = neighbors.slice();
    choices.push(place);
    const zoom = this.calcZoom(choices);
    const mapOptions = this.getMapOptions(labelFeatures);
    return (
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        center={[center.lat, center.lng]}
        zoom={zoom}
        options={mapOptions}
      >
        {choices.map((choice) =>
          <Marker
            key={choice.name}
            lat={+choice.lat}
            lng={+choice.lng}
            place={choice}
            correctPlace={place}
            answerPlace={answerPlace}
            onClick={onMarkerClick}
          />
        )}
      </GoogleMapReact>
    );
  }
}

export default GameMap;
