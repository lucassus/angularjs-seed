import { Icon, LatLng, Map, Marker, TileLayer } from 'leaflet';

const MAP_LAYER_URL = 'http://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png';
const MAP_IMAGES_PATH = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.1/images/';
const INITIAL_ZOOM = 4;

Icon.Default.imagePath = MAP_IMAGES_PATH;

class Controller {

  constructor($element) {
    'ngInject';

    this.mapEl = $element.find('.map')[0];
  }

  $onInit() {
    this._buildMap(this.location);
  }

  _buildMap({ lat, lon }) {
    const position = new LatLng(lat, lon);

    const map = new Map(this.mapEl);
    map.setView(position, INITIAL_ZOOM);
    map.addLayer(new TileLayer(MAP_LAYER_URL));

    const marker = new Marker(position);
    marker.addTo(map);
  }

}

export default {
  controller: Controller,
  bindings: {
    location: '='
  },

  template: `
    <div class="map"></div>  
  `
};
