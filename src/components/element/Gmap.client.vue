<template>
  <GMapMap
    :center="center"
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
    }
  },
  data() {
    return {
      openMarker: null,
      center: { lat: 10.766959, lng: 106.694979 },
    };
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
      if (location && location.lat) this.center.lat = location.lat;
      if (location && location.lng) this.center.lng = location.lng;
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