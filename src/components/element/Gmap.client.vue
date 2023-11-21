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
export default {
  data() {
    return {
      center: { lat: 10.766959, lng: 106.694979 },
      markers: [
        {
          position: {
            lat: 10.766959,
            lng: 106.694979
          },
        },
        {
          position: {
            lat: 51.198429,
            lng: 6.69529,
          },
        },
        {
          position: {
            lat: 51.165218,
            lng: 7.067116,
          },
        },
        {
          position: {
            lat: 51.09256,
            lng: 6.84074,
          },
        },
      ],
    };
  },
};
</script>

<style>
body {
  margin: 0;
}
</style>