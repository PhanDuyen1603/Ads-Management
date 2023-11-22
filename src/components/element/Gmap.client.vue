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
        @click="center = m.position"
      />
    </GMapCluster>
  </GMapMap>
</template>

<script>
import random_coordinates_district_1 from '@constant/random_coordinates_district_1.json'
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
      markers: [...defaultLocation, ...random_coordinates_district_1]
    };
  },
  mounted() {
    console.log(random_coordinates_district_1)
  },
};
</script>

<style>
body {
  margin: 0;
}
</style>