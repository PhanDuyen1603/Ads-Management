<template>
  <div
    ref="mapContainer"
    class="map_google"
  />
</template>

<script>
import { defaultLocation } from '~/constant/locations';
export default {
  props: {
    initAddress: {
      type: String,
      default: undefined,
    },
    initLocation: {
      type: Object,
      default: undefined,
    },
    markers: {
      type: Array,
      default: undefined,
    },
  },
  emits: ['ready'],

  setup() {
    const config = useRuntimeConfig();
    const $config = config.public;
    useHead({
      script: [
        {
          key: 'google_map',
          src: `https://maps.googleapis.com/maps/api/js?key=${$config.googleMapApiKey}&libraries=places&callback=initMap`,
          async: true,
          defer: true,
        },
      ],
    });
  },
  data() {
    this.marks = {};

    return {};
  },
  computed: {
    propsLocationInfos() {
      return (this.markers || []).concat([this.initLocation]).filter((i) => i);
    },
  },
  async mounted() {
    const el = this.$refs.mapContainer;
    const rect = el.getBoundingClientRect();
    el.style.height = `${rect.height}px`;
    el.style.width = `${rect.width}px`;
    await this.$nextTick();
    this.init();
  },
  methods: {
    /**
     * Using loop will be better when a page have multiple instances
     */
    async init(retry = 0) {
      if (!window.google) {
        setTimeout(() => {
          if (retry < 50) {
            this.init();
          }
        }, 200);
        return;
      }

      if (!window.google.maps.LatLng) {
        return window.google.maps.load(() => {
          this.init();
        });
      }

      // Map
      const container = this.$refs.mapContainer; // 지도를 담을 영역의 DOM 레퍼런스

      const options = { // 지도를 생성할 때 필요한 기본 옵션
        center: this.createLatLngObject(defaultLocation.position.lat, defaultLocation.position.lng), // 지도의 중심좌표.
        zoom: 17,
      };

      this.map = new window.google.maps.Map(container, options); // 지도 생성 및 객체 리턴

      // Geocoder
      this.geocoder = new window.google.maps.Geocoder();

      // after init (should use callback?)
      if (this.initAddress) {
        await this.focusToAddress(this.initAddress);
      } else if (this.initLocation) {
        await this.focusToLocationInfo(this.initLocation);
      }

      if (this.markers && this.markers.length) {
        await Promise.all(this.markers.map(async (i) => this.setMarkerAtLocationInfo(i.position && i.position.lat ? i.position : i)));
      }

      this.$emit('ready');
    },
    getMarkedLocations() {
      return Object.entries(this.marks).map(([k, v]) => {
        const latlng = v.getPosition();
        const propsInfo = this.propsLocationInfos.find((i) => i.id == k);

        return {
          ...propsInfo,
          id: k,
          lat: latlng.lat(),
          lng: latlng.lng(),
        };
      });
    },
    createLatLngObject(lat, lng) {
      return new window.google.maps.LatLng(lat, lng);
    },
    getLatLngFromAddressData(data) {
      const position = data.geometry.location;
      return this.createLatLngObject(position.lat(), position.lng());
    },
    createInfoBox({ latlng, map, text }) {
      return new window.google.maps.InfoWindow({
        map,
        position: latlng,
        content: `<div class="ice_map_info_box">${text}</div>`,
      });
    },
    createMarkerImage({ url }) {
      return {
        url,
      };
    },
    addMarker({
      latlng, map, id = Math.random().toString(), image = '', title = '',
    }) {
      const marker = new window.google.maps.Marker({
        map,
        position: latlng,
        title,
      });

      if (this.marks[id]) {
        this.marks[id].setMap(null);
      }

      this.marks[id] = marker;

      if (image) {
        marker.setIcon(this.createMarkerImage({ url: image }));
      }

      if (title) {
        this.createInfoBox({ latlng, map, text: title });
      }
    },
    async setMarkerAtLocationInfo({
      id, address, lat, lng, title, image,
    }) {
      let latlng;

      if (address) {
        const [first] = await this.searchAddress(address);

        if (first) {
          latlng = this.getLatLngFromAddressData(first);
        }
      } else if (lat && lng) {
        latlng = this.createLatLngObject(lat, lng);
      }

      if (latlng) {
        this.addMarker({
          latlng, map: this.map, id, title, image,
        });
      }

      return latlng;
    },
    removeMarker({ id }) {
      if (this.marks[id]) {
        this.marks[id].setMap(null);
      }
    },
    focusToLatLng(a, b) {
      if (a instanceof window.google.maps.LatLng) {
        this.map.setCenter(a);
      } else {
        this.map.setCenter(this.createLatLngObject(a, b));
      }
    },
    async focusToLocationInfo(info) {
      const latlng = await this.setMarkerAtLocationInfo(info);

      if (latlng) {
        this.focusToLatLng(latlng);
      }
    },
    async focusToAddress(address) {
      const [first] = await this.searchAddress(address);

      if (first) {
        const latlng = this.getLatLngFromAddressData(first);
        this.addMarker({ latlng, map: this.map });
        this.focusToLatLng(latlng);
      }
    },
    searchAddress(address) {
      return new Promise((resolve) => {
        this.geocoder.geocode({ address }, (res, status) => (status == 'OK' ? resolve(res) : resolve([])));
      });
    },
  },
};
</script>
