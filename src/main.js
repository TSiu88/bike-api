import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';
import { Bike } from './bike'

$(document).ready(function(){
  $("#submit").click(function(event){
    event.preventDefault();
    const location = $("#location").val();
    const distance = $("#distance").val();
    let manufacturerArray = ["Trek", "Raleigh", "Specialized", "Cannondale"];
    let countArray = [];

    (async () => {
      let bike = new Bike();
      const response = await bike.getStolenCount(location, distance, "");
      getElements(response, "");
      const redResponse = await bike.getStolenRed(location, distance);
      getRedElements(redResponse);
      for (let j = 0; j < manufacturerArray.length; j++){
        let manufacturerResponse = await bike.getStolenCount(location, distance, manufacturerArray[j]);
        getElements(manufacturerResponse, manufacturerArray[j]);
      }
      bike.mostStolenManufacturer(countArray);
    })();

    function getElements(response, manufacturer) {
      console.log(response);
      $("#results").append(`<p>${response.proximity} ${manufacturer} Bikes stolen within that distance.</p>`);
      countArray.push({[manufacturer]: response.proximity});
    }

    function getRedElements(response) {
      console.log(response);
      for (let i = 0; i < response.bikes.length; i++){
        $("#results").append(`<p>${response.bikes[i].title}</p>`);
      }
      
    }

  });
});