const iconsList = {
  noAd: '/icons/icon-no-qc.svg',
  ad: '/icons/icon-qc.svg',
  adRed: '/icons/icon-qc-red.svg',
  noAdRed: '/icons/icon-no-qc-red.svg',
  reportWithAd: '/icons/flag-diemdatqc.svg',
  report: '/icons/flag-quangcao.svg',
  // report: '/icons/flag-diemdatqc.svg',
  // reportWithAd: '/icons/flag-quangcao.svg',
}

const iconNote = {
  noAd: 'Điểm đặt quảng cáo',
  ad: 'Điểm đặt đã đăng ký quảng cáo',
  adRed: 'Quảng cáo tại khu đất chưa quy hoạch',
  noAdRed: 'Điểm đặt tại khu đất chưa quy hoạch',
  report: 'Báo cáo của người dân',
  reportWithAd: 'Báo cáo tại điểm đặt quảng cáo',
}

const getMarkerIcon = (marker) => {
  // quy hoach
  const isPlanned = marker.isPlanned
  const ads = marker.countAds
  const fullAddress = marker.fullAddress
  const hasReport = marker.reportsCount && !marker.address
  if(hasReport) return iconsList.reportWithAd
  if(fullAddress) return iconsList.report
  if(isPlanned) {
    if(ads) return iconsList.ad
    return iconsList.noAd
  }
  if(ads) return iconsList.adRed
  return iconsList.noAdRed
}

export { getMarkerIcon, iconsList, iconNote }