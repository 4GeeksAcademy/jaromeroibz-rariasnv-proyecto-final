/*    Get the latitude and longitude from address:
      Author : Bastin Robins J
*/

//     Add the link to webpage

import React from "react";



export const Georef = () => {

  //Function to covert address to Latitude and Longitude
  var getLocation = function (address) {

    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, function (results, status) {

      if (status == google.maps.GeocoderStatus.OK) {
        var latitude = results[0].geometry.location.lat();
        var longitude = results[0].geometry.location.lng();
        console.log(results)
        console.log(latitude, longitude);
      }
    });
  }

  //Call the function with address as parameter
  getLocation('Genova 2060, Providencia, Region Metropolitana, Chile');
return (
  <h1>Georef</h1>
)
}