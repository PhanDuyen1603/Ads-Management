<template>
  <GMapMap
    :center="mapCenter"
    :zoom="18"
    map-type-id="terrain"
    ref="map"
    :style="mapStyles"
  >
    <GMapCluster v-if="markers.length" :zoomOnClick="true">
      <GMapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="false"
        :icon= '{
          url: "/icons/icon-qc.svg",
          scaledSize: {width: 30, height: 30},
          labelOrigin: {x: 16, y: -10}
        }'
        @click="onFocusMarker(m)"
      >
        <GMapInfoWindow
          :closeclick="true"
          @closeclick="onOpenMarker(null)"
          :opened="openMarker === m.id"
        >
          <div class="">
            <h3>{{ m.advertisingType }}</h3>
            <p>{{ m.areaType }}</p>
            <p>{{ m.positionType }}</p>
            <p>{{ m.address }}</p>
            <h4>ĐÃ QUY HOẠCH</h4>
          </div>
        </GMapInfoWindow>

      </GMapMarker>
    </GMapCluster>
  </GMapMap>
</template>

<script>
import { defaultLocation } from '~/constant/locations';
export default {
  props: {
    mapStyles: {
      type: Object,
      default:() => ({
        width: '100vw',
        height: '40rem',
      })
    },
    markers: {
      type: Array,
      default: () => []
    },
    center: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      openMarker: null,
      customCenter: {}
    };
  },
  computed: {
    mapCenter() {
      if(this.customCenter && this.customCenter.lat && this.customCenter.lng) return this.customCenter
      if(this.center && this.center.lat && this.center.lng) return this.center
      return defaultLocation.position
    }
  },
  mounted() {

  },
  methods: {
    onOpenMarker(id) {
      this.openMarker = id
    },
    onFocusMarker(location) {
      this.onOpenMarker(location.id)
      this.$emit('openDetail', { value: location })
    },
    onCenterMap(location = {}) {
      if (location && location.lat) this.customCenter.lat = location.lat;
      if (location && location.lng) this.customCenter.lng = location.lng;
    }
  }
};
</script>

<style>
.cluster img {
  max-width: 100%;
  max-height: 100%;
}
.cluster span{
  color: #fff;
}
</style>