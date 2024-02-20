import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let data = new URLSearchParams(search);

  // Place holder for functionality to work in the Stubs
  return data.get('adventure');
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    let res = await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`)
    let data  = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    alert(error);
    return null;
  }

  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  console.log(adventure)
  document.getElementById('adventure-name').textContent = adventure.name;
  document.getElementById('adventure-subtitle').textContent = adventure.subtitle;
  document.getElementById('adventure-content').textContent = adventure.content;
  let photoGallery = document.getElementById('photo-gallery');

  adventure.images.forEach(element => {
    let div = document.createElement('div');
    div.className = 'carousel slide';

    let img = document.createElement('img');
    img.className = "activity-card-image"
    img.src = element;
    div.append(img)
    photoGallery.append(div)
  });

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let photoGallery = document.getElementById('photo-gallery');
  photoGallery.textContent = "";
  let carouselExampleIndicators = document.createElement('div');
  carouselExampleIndicators.id = 'carouselExampleIndicators';
  carouselExampleIndicators.className = 'carousel slide';
  carouselExampleIndicators.setAttribute('data-bs-ride', 'carousel')

  let carouselIndicators = document.createElement('div');
  carouselIndicators.className = "carousel-indicators";
  let carouselInner = document.createElement('div');
  carouselInner.className = "carousel-inner";

  images.forEach((element, i) => {
    let button = document.createElement('button');
    button.type = "button";
    button.setAttribute('data-bs-target', '#carouselExampleIndicators');
    button.setAttribute('data-bs-slide-to', `${i}`);
    button.setAttribute('aria-label', `Slide ${i+1}`);
    if(i === 0){
      button.setAttribute('class', 'active')
      button.setAttribute('aria-current', 'true')
    }
    carouselIndicators.append(button);

    let carouselItem = document.createElement('div');
    if(i===0){
      carouselItem.className = 'carousel-item active'
    }
    else {
      carouselItem.className = 'carousel-item'
    }

    let img = document.createElement('img');
    img.src = element;
    img.className = 'd-block w-100'

    carouselItem.append(img);
    carouselInner.append(carouselItem);
    
  });
  let prevButton = document.createElement('button');
    prevButton.className = 'carousel-control-prev'
    prevButton.type = 'button';
    prevButton.setAttribute('data-bs-target', '#carouselExampleIndicators');
    prevButton.setAttribute('data-bs-slide', 'prev');
    prevButton.innerHTML = '<span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="visually-hidden">Previous</span>';

    let nextButton = document.createElement('button');
    nextButton.className = 'carousel-control-next'
    nextButton.type = 'button';
    nextButton.setAttribute('data-bs-target', '#carouselExampleIndicators');
    nextButton.setAttribute('data-bs-slide', 'next');
    nextButton.innerHTML = '<span class="carousel-control-next-icon" aria-hidden="true"></span><span class="visually-hidden">Next</span>';

    carouselExampleIndicators.append(carouselIndicators)
    carouselExampleIndicators.append(carouselInner)
    carouselExampleIndicators.append(prevButton);
    carouselExampleIndicators.append(nextButton);
    photoGallery.append(carouselExampleIndicators);
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available) {
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    document.getElementById("reservation-panel-available").style.display = "block";
    document.getElementById("reservation-person-cost").textContent = adventure.costPerHead;
  }
  else {
    document.getElementById("reservation-panel-available").style.display = "none";
    document.getElementById("reservation-panel-sold-out").style.display = "block";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  const total = adventure.costPerHead * persons;
  document.getElementById("reservation-cost").textContent = total;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const form = document.getElementById("myForm");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    let url = config.backendEndpoint + "/reservations/new";
    let formElements = form.elements;
    let bodyString = JSON.stringify({
      name: formElements["name"].value,
      date: formElements["date"].value,
      person: formElements["person"].value,
      adventure: adventure.id
    })
    try {
      let res = await fetch(url, {
        method: "POST",
        body: bodyString,
        headers: {
          "Content-Type": "application/json"
        }
      })
      if(res.ok) {
        alert("Success!")
        window.location.reload();
      } else {
        let data = await res.json();
        alert(`Failed - ${data.message}`)
      }
    } catch (error) {
      console.log(e)
      alert('Failed - fetch call resulted in error');
    }
  })
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved){
    document.getElementById('reserved-banner').style.display = "block";
  }
  else{
    document.getElementById('reserved-banner').style.display = "none";
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
