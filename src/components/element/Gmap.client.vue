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
        :title="m.title"
        :details="m.content"
        :icon="m.icon"
        :clickable="true"
<<<<<<< HEAD
        :draggable="true"
        @click="showAdsInfo((adsId = index))"
      />
=======
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
>>>>>>> ce668ccf042d17ce8f376422934a03bf8900ffcb
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
<<<<<<< HEAD
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
=======
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
>>>>>>> ce668ccf042d17ce8f376422934a03bf8900ffcb
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
