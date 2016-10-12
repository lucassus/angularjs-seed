import L from 'leaflet';

L.Icon.Default.imagePath = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.1/images/';

export default class {

  constructor($element, contact) {
    'ngInject';

    this.contact = contact;
    const { lat, lon } = contact.address.location;

    // TODO create a component
    const map = new L.Map($element.find('#address-map')[0])
      .setView([lat, lon], 4);
    map.addLayer(new L.TileLayer('http://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png'));

    const marker = L.marker([lat, lon]);
    marker.addTo(map);
  }

}
