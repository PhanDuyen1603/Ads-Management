export default function getLocationFromClick(map) {
  window.google.maps.event.addListener(map, 'click', function( event ){
    setTimeout(() => {
      const infoWindow = document.querySelector('.poi-info-window')
      const data = {
        position: {
          lat: event.latLng.lat(),
          lng: event.latLng.lng()
        },
        title: infoWindow?.querySelector('.title')?.innerText,
        full_address: infoWindow?.querySelector('.address')?.innerText.replaceAll('\n', ', '),
        streetLine1: infoWindow?.querySelector('[jsinstance="0"]')?.innerText,
        ward: infoWindow?.querySelector('[jsinstance="1"]')?.innerText,
        district: infoWindow?.querySelector('[jsinstance="2"]')?.innerText,
        city: infoWindow?.querySelector('[jsinstance="*3"]')?.innerText,
      }
      emit('getPlace', { value: data })
    }, 1000)
  });
}