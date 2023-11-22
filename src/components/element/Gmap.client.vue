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
        :title="m.title"
        :details="m.content"
        :icon="m.icon"
        :clickable="true"
        :draggable="true"
        @click="showAdsInfo((adsId = index))"
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
            lng: 106.694979,
          },
          title: "Billboard 1",
          icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
          details:
            "<h3>Quảng cáo 1</h3><p>Thông tin bảng quảng cáo 1</p><button onclick=\"reportBillboard('Billboard 1')\">Report</button>",
        },
        {
          position: {
            lat: 10.767314647300887,
            lng: 106.69504212474372,
          },
          title: "Billboard 2",
          icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
          details:
            "<h3>Quảng cáo 1</h3><p>Thông tin bảng quảng cáo 1</p><button onclick=\"reportBillboard('Billboard 1')\">Report</button>",
        },
        {
          position: {
            lat: 10.7674370433134,
            lng: 106.69459270256289,
          },
          title: "Billboard 3",
          icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
          details:
            "<h3>Quảng cáo 1</h3><p>Thông tin bảng quảng cáo 1</p><button onclick=\"reportBillboard('Billboard 1')\">Report</button>",
        },
        {
          position: {
            lat: 10.767138376927196,
            lng: 106.6949105854267,
          },
          title: "Billboard 4",
          icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
          details:
            "<h3>Quảng cáo 1</h3><p>Thông tin bảng quảng cáo 1</p><button onclick=\"reportBillboard('Billboard 1')\">Report</button>",
        },
      ],
    };
  },
  methods: {
    // Show Ads Infor here
    showAdsInfo(adsId) {
      const marker = this.markers[adsId];
      alert(marker.title);
    },
  },
};
</script>

<style>
body {
  margin: 0;
}
</style>
