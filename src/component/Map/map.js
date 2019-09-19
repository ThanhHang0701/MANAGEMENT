/* global google */

import React from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";

class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        this.handleMapReady = this.handleMapReady.bind(this);
    }

    handleMapReady(mapProps, map) {
        this.calculateAndDisplayRoute(map);
    }

    makeMarker( position, map, icon, title ) {
       return new google.maps.Marker({
         position: position,
         map: map,
         icon: icon,
         title: title
        });
    }

    calculateAndDisplayRoute(map) {
        const directionsService = new google.maps.DirectionsService();
        let directionsDisplay = null
        if( typeof this.props.data[0] == 'string'){
            directionsDisplay = new google.maps.DirectionsRenderer()
        }else{
            directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers:true});
        }
        
        directionsDisplay.setMap(map);
        
        var icons = {
            start: new google.maps.MarkerImage(
             // URL
             'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
             // (width,height)
             new google.maps.Size( 44, 32 ),
             // The origin point (x,y)
             new google.maps.Point( 0, 0 ),
             // The anchor point (x,y)
             new google.maps.Point( 22, 32 )
            ),
            end: new google.maps.MarkerImage(
             // URL
             'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
             // (width,height)
             new google.maps.Size( 44, 32 ),
             // The origin point (x,y)
             new google.maps.Point( 0, 0 ),
             // The anchor point (x,y)
             new google.maps.Point( 22, 32 )
            )
        };
        const waypoints = this.props.data.map((item, i) =>{
            if(typeof item == 'string'){
                return{
                    location: item,
                    stopover: true
                }
            }else{
                return{
                    location: {lat: item.Lat, lng: item.Long},
                    stopover: true
                }
            }
        })
        const origin = waypoints.shift().location;
        const destination = waypoints.pop().location;

        directionsService.route({
        origin: origin,
        destination: destination,
        waypoints: waypoints,
        travelMode: 'DRIVING'
        }, (response, status) => {
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
                if(typeof origin == 'string'){
                    this.makeMarker(origin,map,icons.start,"Bắt Đầu")
                    this.makeMarker(destination,map,icons.end,"Kết Thúc")
                }
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }

  render() {
    const mapStyles = {
        height: 400,
        width: "100%",
    };
    return (
      <div className="map-container">
        <Map
          google={this.props.google}
          styles={mapStyles}
          zoom={this.props.zoom}
          initialCenter={this.props.center}
          onReady={this.handleMapReady}
        />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDaWj3rvUNG8OyOyypBIKyVy41vD_HEY3g",
  libraries: []
})(MapContainer);

