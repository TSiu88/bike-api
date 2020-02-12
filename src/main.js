import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';
import { Bike } from './bike';

$(document).ready(function(){
  $("#submit").click(function(event){
    event.preventDefault();
    $("#results").empty();
    const location = $("#location").val();
    const distance = $("#distance").val();
    let manufacturerArray = ["Trek", "Raleigh", "Specialized", "Cannondale"];
    let countArray = {};

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
      let mostStolen = bike.mostStolenManufacturer(countArray);
      mostStolenOutput(mostStolen);
    })();

    function getElements(response, manufacturer) {
      $("#results").append(`<h3>Stolen Count:</h3>`);
      $("#results").append(`<p>${response.proximity} ${manufacturer} Bikes stolen within that distance.</p>`);
      if (manufacturer != ""){
        countArray[manufacturer] = response.proximity;
      }
      
    }

    function getRedElements(response) {
      $("#results").append(`<h3>First 25 Red Bikes stolen near location</h3>`);
      for (let i = 0; i < response.bikes.length; i++){
        $("#results").append(`<p>${response.bikes[i].title}</p>`);
      }
      
    }

    function mostStolenOutput (array) {
      let most = array[array.length-1];
      $("#results").append(`<p>${most} is stolen the most of these manufacturers.</p>`);
    }

  });
});