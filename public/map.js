
const userIcon = L.divIcon({
    className: 'custom-user-icon',
    iconSize: [25, 25],
    html: '<div class="circle"></div>',
  });
  
  var map = L.map('map');
  let userMarker, startMarker, destinationMarker;
  
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  
  navigator.geolocation.watchPosition(success, error);
  
  function success(pos) {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    const accuracy = pos.coords.accuracy;
  
    if (!userMarker) {
      userMarker = L.marker([lat, lng], { icon: userIcon }).addTo(map);
    } else {
      userMarker.setLatLng([lat, lng]);
    }
  
    map.setView([lat, lng], 20);
  
    fitMapToMarkers();
  
    
  
  }
  
  
  
  
  
  
  
  
  
  //   var control = L.Routing.control({
  //     waypoints: [
  //        L.latLng(57.74, 11.94),
  //       L.latLng(57.6792, 11.949),
  //     ],
  //   }).addTo(map);
  
  var control = L.Routing.control({
    waypoints: [], // Remove the hardcoded waypoints
  }).addTo(map);
  
  
  
  
  
  
  
  
  function error(err) {
    if (err.code === 1) {
      alert("Please allow geolocation access");
    } else {
      alert("Cannot get current location");
    }
  }
  
  
  
  //   function plotStartLocation() {
  //      const locationName = document.getElementById('location').value;
  //     plotLocation(locationName, 'start');
  //    }
  
  //   function plotDestination() {
  //     const locationName = document.getElementById('destination').value;
  //     plotLocation(locationName, 'destination');
  //   }
  
  //   function plotLocation(locationName, type) {
  //     const geocodeURL = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationName)}`;
  
  //     fetch(geocodeURL)
  //       .then(response => response.json())
  //       .then(data => {
  //         if (data.length > 0) {
  //           const lat = data[0].lat;
  //           const lon = data[0].lon;
  
  //           if (type === 'start' && startMarker) {
  //             map.removeLayer(startMarker);
  //           } else if (type === 'destination' && destinationMarker) {
  //             map.removeLayer(destinationMarker);
  //           }
  
  //           if (type === 'start') {
  //             startMarker = L.marker([lat, lon]).addTo(map);
  //           } else if (type === 'destination') {
  //             destinationMarker = L.marker([lat, lon]).addTo(map);
  //           }
  
  //           fitMapToMarkers();
  //         } else {
  //           alert('Location not found. Please enter a valid location.');
  //         }
  //       })
  //       .catch(error => console.error('Error geocoding location:', error));
  //   }
  
  
  function plotStartLocation() {
     const locationName = document.getElementById('location').value;
    plotLocation(locationName, 'start', (lat, lon) => {
         control.spliceWaypoints(0, 1, L.latLng(lat, lon));
  
         fetchAndDisplayBusStops(lat, lon);
     });
  }
  
  function plotDestination() {
    const locationName = document.getElementById('destination').value;
    plotLocation(locationName, 'destination', (lat, lon) => {
        control.spliceWaypoints(control.getWaypoints().length - 1, 1, L.latLng(lat, lon));
  
  
        fetchRecommendedRoutes(/* Add parameters for start and destination */) //new
        .then((recommendedRoutes) => {        //new
          displayRecommendedRoutes(recommendedRoutes); //new
  
  
  
  
    });
  
  }); //new 
  
  }
  
  
  
  
  //new
  
  //function fetchRecommendedRoutes(startLocation, destination)
  function fetchRecommendedRoutes(lat, lon){
    // Simulate fetching routes without making a real API request
    return new Promise((resolve) => {
      setTimeout(() => {
        const recommendedRoutes = [
          {
            availableBus: 'Samakhushi yatayat, Micro , Sanjha Yatayat',
            
            totalDistance: 4.5,
            busRoutes: [
              ' #1 (Samakhushi - Ratnapark)',
              ' (Samakhushi - Jamal)',
            ],
          },
          
          // Add more mock data for other routes
        ];
  
        resolve(recommendedRoutes);
      }, 1000); // Simulate a delay similar to an actual API request
    });
  }
  
  // Usage:
  fetchRecommendedRoutes('Gongabu', 'Ratnapark')
    .then((routes) => {
      // Handle the recommended routes data here
      console.log('Recommended Routes:', routes);
    })
    .catch((error) => {
      console.error('Error fetching recommended routes:', error);
    });
  
  
  function plotLocation(locationName, type, callback) {
    const geocodeURL = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationName)}`;
  
    fetch(geocodeURL)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const lat = data[0].lat;
                const lon = data[0].lon;
  
                if (type === 'start' && startMarker) {
                    map.removeLayer(startMarker);
                } else if (type === 'destination' && destinationMarker) {
                    map.removeLayer(destinationMarker);
                }
  
                if (type === 'start') {
                    startMarker = L.marker([lat, lon]).addTo(map);
                } else if (type === 'destination') {
                    destinationMarker = L.marker([lat, lon]).addTo(map);
                }
  
                if (callback) {
                    callback(lat, lon);
                }
            } else {
                alert('Location not found. Please enter a valid location.');
            }
        })
        .catch(error => console.error('Error geocoding location:', error));
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  //   function fitMapToMarkers() {
  //     let bounds = L.latLngBounds(userMarker.getLatLng());
  
  //     if (startMarker) {
  //       bounds.extend(startMarker.getLatLng());
  //     }
  
  //     if (destinationMarker) {
  //       bounds.extend(destinationMarker.getLatLng());
  //     }
  
  //     map.fitBounds(bounds);
  
  //     map.fitBounds(bounds);
  //   }
  
  // function fitMapToMarkers() {
  //     let bounds = L.latLngBounds();
  
  //     if (userMarker) {
  //       bounds.extend(userMarker.getLatLng());
  //     }
  
  //     if (startMarker) {
  //       bounds.extend(startMarker.getLatLng());
  //     }
  
  //     if (destinationMarker) {
  //       bounds.extend(destinationMarker.getLatLng());
  //     }
  
  //     if (bounds.isValid()) {
  //       map.fitBounds(bounds);
  //     }
  //   }
  
  
  
  function fitMapToMarkers() {
    let bounds = L.latLngBounds();
  
    if (userMarker) {
      bounds.extend(userMarker.getLatLng());
    }
  
    if (startMarker) {
      bounds.extend(startMarker.getLatLng());
    }
  
    if (destinationMarker) {
      bounds.extend(destinationMarker.getLatLng());
    }
  
    if (bounds.isValid()) {
      map.fitBounds(bounds);
    } else {
      // Handle the case where bounds are not valid
      alert('Markers are not set or have invalid coordinates.');
    }
  }
  
  
  
  
  
  
  
  
  
  
  
  function fetchAndDisplayBusStops(lat, lon) {
    const radius = 500; // Define the search radius in meters (adjust as needed)
  
    const overpassURL = `https://overpass-api.de/api/interpreter?data=[out:json];node(around:${radius},${lat},${lon})[highway=bus_stop];out;`;
  
    fetch(overpassURL)
      .then(response => response.json())
      .then(data => {
        data.elements.forEach(busStop => {
          const busStopMarker = L.marker([busStop.lat, busStop.lon]).addTo(map);
          busStopMarker.bindPopup(busStop.tags.name || 'Bus Stop');
        });
      })
      .catch(error => console.error('Error fetching bus stop data:', error));
  }
 
  function goToBusStop(lat, lon) {
    control.spliceWaypoints(control.getWaypoints().length - 1, 1, L.latLng(lat, lon));
  }
  