const iconsList = {
  noAd: '/icons/icon-no-qc.svg',
  ad: '/icons/icon-qc.svg',
  adRed: '/icons/icon-qc-red.svg',
  noAdRed: '/icons/icon-no-qc-red.svg'
}

const getMarkerIcon = (marker) => {
  // quy hoach
  const isPlanned = marker.isPlanned
  const ads = marker.countAds
  if(isPlanned) {
    if(ads) return iconsList.ad
    return iconsList.noAd
  }
  if(ads) return iconsList.adRed
  return iconsList.noAdRed
}

export { getMarkerIcon }