<template>
  <GMapMap
    :center="center"
    :zoom="18"
    map-type-id="terrain"
    :style="mapStyles"
  >
    <GMapCluster :zoomOnClick="true">
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
import random_coordinates_district_1 from '@constant/random_coordinates_district_1.json'
import { generateLocations } from '~/utils/generateLocation'
const defaultLocation = [
  {
    position: {
      lat: 10.766959,
      lng: 106.694979
    },
  },
]
export default {
  props: {
    mapStyles: {
      type: Object,
      default:() => ({
        width: '100vw',
        height: '40rem',
      })
    }
  },
  data() {
    return {
      openMarker: null,
      center: { lat: 10.766959, lng: 106.694979 },
      markers: generateLocations([...defaultLocation, ...random_coordinates_district_1])
    };
  },
  mounted() {
    console.log(generateLocations(random_coordinates_district_1))
  },
  methods: {
    onOpenMarker(id) {
      this.openMarker = id
    },
    onFocusMarker(location) {
      this.onOpenMarker(location.id)
      this.$emit('openDetail', { value: location })
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