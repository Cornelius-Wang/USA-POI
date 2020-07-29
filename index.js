const apiKey = "o7kCAzQFYOrmQkati6mwco2d0Yjt0HNUuPuJTdB5";
const getUrl = "https://developer.nps.gov/api/v1/parks";

function formatQueryParams(params) {
    
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');

}

function getParks(query, maxResults) {
    const params = {
      key: apiKey,
      q: query,
      stateCode: states,
      limit: maxResults,
    };
    const queryString = formatQueryParams(params)
    const url = getURL + '?' + queryString;
  
    console.log(url);
  
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => displayResults(responseJson))
      .catch(err => {
        $('.result-title').empty();
        $('.result-title').text(`Something went wrong: ${err.message}`);
      });
  }

function templateParkHtml(parkUrl, parkName, description, address1, address2, city, postalCode){

    return `<li class="parks">
    <a href="${parkUrl}">${parkName}</a>
    <p>${description}</p>
    <p>${address1}</p>
    <p>${address2}</p>
    <p>${city}</p>
    <p>${postalCode}</p>
    </li>`

}

function loopPark(parkArray) {
    $('#result-list').empty();
    for (let i = 0; i < parkArray.length; i++) {
        $('#result-list').append(templateParkHtml(
            parkArray[i].data.url, 
            parkArray[i].data.fullName, 
            parkArray[i].data.description, 
            parkArray[i].data.addresses[0].line1, 
            parkArray[i].data.addresses[0].line2, 
            parkArray[i].data.addresses[0].city, 
            parkArray[i].data.addresses[0].postalCode));
    };
    $('.result-title').removeClass('hidden');
    $('.results').removeClass('hidden');
}

function displayParks(responseJson, parkID) {
    /* Log the JSON array from the response */
    console.log(responseJson);
    console.log(parkID);
    /* Set array as local variable */
    parkArray = responseJson;

    loopPark(parkArray, parkID);
}

function formEvent() {

    $('form').on('submit', function(event){
        event.preventDefault();
        let parkID = $('#js-search').val();
        console.log(parkID);
        getParks(gitURL, parkID);
    });

}


$(function start() {
    console.log('Done');
    formEvent();
})