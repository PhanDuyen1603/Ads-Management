<template>
  <div class="map_wrapper" style="--info-width: 300px; ">
    <!-- <slot /> -->
    <ElementGmap class="map" :map-styles="mapStyles" @open-detail="showAdDetail" />
    <div class="map_infos">
      <ElementAdInformation :info="info" />
    </div>
  </div>
</template>

<script setup>
const info = ref(null)
const showDetail = ref(true)
const showAdDetail = (data) => {
  console.log(data)
  showDetail.value = true
}

const mapStyles = computed(() => {
  return {
    height: '40rem',
    width: `calc(100vw - ${showDetail.value ? '300px' : '0'})`
  }
})
</script>

<style>
.map_wrapper {
  --right-section-width: 300px;
  --left-section-width: 0;

  position: relative;
  width: 100%;
  height: 100%;
  display: inline-flex;
}
/* .vue-map-container {
  max-width: cal;
} */
.map_infos {
  -webkit-transition: width 1s ease-in-out;
  -moz-transition: width 1s ease-in-out;
  -o-transition: width 1s ease-in-out;
  transition: width 1s ease-in-out;
  /* position: absolute; */
  width: var(--right-section-width);
  right: 0;
  top: 0;
  background-color: #fff;
}
</style>