import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  console.log("from init")
  console.log(config.backendEndpoint);
  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    let res = await fetch(config.backendEndpoint+"/cities");
    let cities = await res.json();
    return cities;
  }
  catch(err){
    alert("Failed - fetch call resulted in error");
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let contentEl = document.getElementById('data');
  let tileEl = getCityTile(id, city, description, image);
  contentEl.append(tileEl);
}

function getCityTile(id, city, description, image){
  let container = document.createElement('div');
  container.setAttribute('class', 'col-12 col-sm-6 col-lg-3 mb-4');
  let aEl = document.createElement('a');
  aEl.id = id;
  aEl.href = `pages/adventures/?city=${id}`;
  let tile = document.createElement('div');
  tile.setAttribute('class', 'tile');
  let img = document.createElement('img');
  img.src = image;
  let div = document.createElement('div');
  div.setAttribute('class', 'tile-text text-center');
  let h5 = document.createElement('h5');
  h5.textContent = city;
  let p = document.createElement('p');
  p.textContent = description;
  div.append(h5);
  div.append(p);

  tile.append(img);
  tile.append(div);

  aEl.append(tile);

  container.append(aEl);

  return container;
  
}

export { init, fetchCities, addCityToDOM };
