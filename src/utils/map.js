const onFocusMap = (item, $map) => {
  $map.onCenterMap?.({ lat: item.lat, lng: item.lng })
}

const iconsList = {
  noAd: '/icons/icon-no-qc.svg',
  ad: '/icons/icon-qc.svg',
  adRed: '/icons/icon-qc-red.svg',
  noAdRed: '/icons/icon-no-qc-red.svg'
}

const getMarkerIcon = (marker) => {
  // quy hoach
  const isPlanned = marker.isPlanned
  const ads = marker.ads
  if(isPlanned) {
    if(ads?.length) return iconsList.ad
    return iconsList.noAd
  }
  if(ads?.length) return iconsList.adRed
  return iconsList.noAdRed
}

export { onFocusMap, getMarkerIcon }