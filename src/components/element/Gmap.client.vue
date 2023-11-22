<template>
  <GMapMap
    :center="center"
    :zoom="18"
    map-type-id="terrain"
    style="width: 100vw; height: 40rem"
  >
    <GMapCluster :zoomOnClick="true">
      <GMapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        :icon= '{
          url: "/icons/icon-qc.svg",
          scaledSize: {width: 30, height: 30},
          labelOrigin: {x: 16, y: -10}
        }'
        @click="center = m.position"
      />
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
  data() {
    return {
      center: { lat: 10.766959, lng: 106.694979 },
      markers: generateLocations([...defaultLocation, ...random_coordinates_district_1])
    };
  },
  mounted() {
    console.log(generateLocations(random_coordinates_district_1))
  },
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