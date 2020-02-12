export class Bike{
  async getStolenCount(location, distance, manufacturer){
    try{
      let response = await fetch(`https://bikeindex.org:443/api/v3/search/count?manufacturer=${manufacturer}&location=${location}&distance=${distance}&stolenness=proximity&access_token=${process.env.API_KEY}`);
      let jsonifiedResponse = await response.json();
      return jsonifiedResponse;
    } catch(error){
      console.error("Error handling request: " + error.message);
    }
  }

  async getStolenRed(location, distance){
    try{
      let response = await fetch(`https://bikeindex.org:443/api/v3/search?page=1&per_page=25&query=red&location=${location}&distance=${distance}&stolenness=proximity&access_token=${process.env.API_KEY}`);
      let jsonifiedResponse = await response.json();
      return jsonifiedResponse;
    } catch(error){
      console.error("Error handling request: " + error.message);
    }
  }

  mostStolenManufacturer(array) {
    console.log(array);
    // array.sort(function(a,b){
    //   return a[1] - b[1];
    // });

    let keysSorted = Object.keys(array).sort(function(a,b){return array[a]-array[b]});
    console.log(keysSorted);
  }
}