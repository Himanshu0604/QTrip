
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  
  const params = new URLSearchParams(search);
  return params.get('city');
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    let res = await fetch(`${config.backendEndpoint}/adventures/?city=${city}`)
    let data  = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    alert('Failed - fetch call resulted in error');
    return null;
  }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  let existingEl = document.getElementById('data');
  if (adventures) {
    adventures.forEach((key) => {
      let container = document.createElement('div');
      container.setAttribute('class', 'col-6 col-lg-3 mb-3');
      let ref = document.createElement('a');
      ref.id = `${key.id}`;
      ref.href = `detail/?adventure=${key.id}`;
      let card = document.createElement('div');
      card.setAttribute('class', 'activity-card');
      let img = document.createElement('img');
      img.setAttribute('class','activity-card-image');
      img.src = `${key.image}`;
      let category = document.createElement('div');
      category.setAttribute('class', 'category-banner');
      category.textContent = `${key.category}`;
      let details = document.createElement('div');
      details.setAttribute('class', 'd-flex flex-column');
      let detailDiv1 = document.createElement('div');
      detailDiv1.setAttribute('class', 'd-flex justify-content')
      let name = document.createElement('h5');
      name.textContent = `${key.name}`;
      let price= document.createElement('p');
      price.textContent = `${key.currency}${key.costPerHead}`;
      detailDiv1.append(name);
      detailDiv1.append(price);
      let detailDiv2 = document.createElement('div');
      detailDiv2.setAttribute('class', 'd-flex space-between')
      let durationLabel = document.createElement('h5');
      durationLabel.textContent = `Duration`;
      let duration = document.createElement('p');
      duration.textContent = `${key.duration} hours`
      detailDiv2.append(durationLabel);
      detailDiv2.append(duration);

      details.append(detailDiv1);
      details.append(detailDiv2);
      

      card.append(img);
      card.append(category);
      card.append(details);

      ref.append(card);
      container.append(ref);

      existingEl.append(container);

    });
  }
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  return list.filter((adv) => adv.duration >= low && adv.duration <= high)
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
    return list.filter((adv) => categoryList.includes(adv.category))
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  const splitDuration = filters.duration.split("-");
  const low = splitDuration[0];
  const high = splitDuration[1];
  // 3. Filter by duration and category together
  if(filters.duration.length > 0 && filters.category.length > 0){
    let filteredList = filterByDuration(list, low, high);
    filteredList = filterByCategory(filteredList, filters.category)
    return filteredList
  }
  // 1. Filter by duration only
  else if(filters.duration.length > 0 && filters.category.length === 0){
    let filteredList = filterByDuration(list, low, high);
    return filteredList
  }
  // 2. Filter by category only
  else if(filters.duration.length === 0 && filters.category.length > 0){
    let filteredList = filterByCategory(list, filters.category);
    return filteredList
  }

  // Place holder for functionality to work in the Stubs
  else {
    return list;
  }
  
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem('filters', JSON.stringify(filters))
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object


  // Place holder for functionality to work in the Stubs
  return JSON.parse(localStorage.getItem('filters'));
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  const categoryList = filters.category;
  const parentEl = document.getElementById('category-list');
  categoryList.map((category) => {
    const element = document.createElement('div');
    element.classList.add('category-filter');
    element.textContent = category;
    parentEl.append(element)
  })

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
