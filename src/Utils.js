const getDistance = (place1, place2) => {
  var radlat1 = Math.PI * place1.lat/180;
  var radlat2 = Math.PI * place2.lat/180
  var theta = place1.lng - place2.lng;
  var radtheta = Math.PI * theta/180;
  var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
      dist = 1;
  }
  dist = Math.acos(dist);
  dist = dist * 180/Math.PI;
  dist = dist * 60 * 1.1515;
  return dist;
}

const getNeighbors = (place, places, limit) => { 
  return places
    .slice()
    .filter(p => p.type === place.type)
    .map(p => ({place: p, distance: getDistance(place, p)}))
    .sort((a, b) => a.distance - b.distance)
    .slice(1, limit + 1)
    .map(p => p.place);
}

const getRandomElement = (arr) => {
  return arr ? arr[Math.floor(Math.random()*arr.length)] : null;
}

export {getNeighbors, getRandomElement};
