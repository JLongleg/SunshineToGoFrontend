async function loadCities() {
  const response = await fetch('/api/cities');
  if (!response.ok) {
  throw new Error('API nicht erreichbar');
  }
  var cities = await response.json();
  return cities;
}

function pickCities(cities) {
    if (cities.length > 2) {
        var curCities = cities.splice(0,3);
    } else throw new Error('Nicht ausreichend Städte im Array');
    return curCities;
}

var cities;
try {
  cities = await loadCities();
  }
catch (e) {
  cities = [
    {"city":"Tokyo","country":"Japan","maxTemperature":9},
    {"city":"Delhi","country":"India","maxTemperature":16},
    {"city":"Shanghai","country":"China","maxTemperature":20},
    {"city":"São Paulo","country":"Brazil","maxTemperature":29},
    {"city":"Mexico City","country":"Mexico","maxTemperature":19},
    {"city":"Cairo","country":"Egypt","maxTemperature":18},
    {"city":"Beijing","country":"China","maxTemperature":0},
    {"city":"Mumbai","country":"India","maxTemperature":25},
    {"city":"Osaka","country":"Japan","maxTemperature":8},
    {"city":"Karachi","country":"Pakistan","maxTemperature":24},
    {"city":"Chongqing","country":"China","maxTemperature":13},
    {"city":"Istanbul","country":"Turkey","maxTemperature":8},
    {"city":"Buenos Aires","country":"Argentina","maxTemperature":34},
    {"city":"Kolkata","country":"India","maxTemperature":22},
    {"city":"Kinshasa","country":"DR Congo","maxTemperature":30},
    {"city":"Lagos","country":"Nigeria","maxTemperature":34},
    {"city":"Manila","country":"Philippines","maxTemperature":28},
    {"city":"Tianjin","country":"China","maxTemperature":2}];
  }
  
  while (cities.length > 2) {
    var curCities = pickCities(cities);
  }
 
