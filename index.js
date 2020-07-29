const apiKey = "o7kCAzQFYOrmQkati6mwco2d0Yjt0HNUuPuJTdB5";
const getUrl = "https://developer.nps.gov/api/v1/parks";

function formatQueryParams(params) {
    
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');

}

function getParks(stateString, maxResults) {
    const params = {
      api_key: apiKey,
      stateCode: stateString,
      limit: maxResults,
    };
    const queryString = formatQueryParams(params)
    const url = getUrl + '?' + queryString;
  
    console.log(url);
  
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => displayParks(responseJson))
      .catch(error => {
        $('.result-title').removeClass('hidden');
        $('.result-title').text(`Something went wrong: ${error.message}`);
      });
  }

function templateParkHtml(parkUrl, parkName, description, address1, address2, city, postalCode, state){

    return `<li class="parks">
    <h3><a href="${parkUrl}">${parkName}</a></h3>
    <p>${description}</p>
    <p class="address">${address1}</p>
    <p class="address">${address2}</p>
    <p class="address">${city}</p>
    <p class="address">${postalCode}</p>
    <p class="address">${state}</p>
    </li>
    
    <br>`

}

function loopPark(parkObject) {

    $('#result-list').empty();
    console.log(parkObject)

    for (let i = 0; i < parkObject.data.length; i++) {

      const currentPark = parkObject.data[i];

      const html = templateParkHtml(
        currentPark.url, 
        currentPark.fullName, 
        currentPark.description, 
        currentPark.addresses[0].line1, 
        currentPark.addresses[0].line2, 
        currentPark.addresses[0].city, 
        currentPark.addresses[0].postalCode,
        currentPark.addresses[0].stateCode);

        $('#result-list').append(html);

    };
    $('.results').removeClass('hidden');

}


function displayParks(responseJson) {
    /* Set array as local variable */
    const parkObject = responseJson;
    console.log(parkObject);
    loopPark(parkObject);
}

function formEvent() {

    $('form').on('submit', function(event){
        event.preventDefault();
        const stateString = $('#js-search').val();
        const maxResults = $('#js-max-results').val();
        console.log(stateString, maxResults);
        getParks(stateString, maxResults);
    });

}


$(function start() {
    console.log('Done');
    formEvent();
})