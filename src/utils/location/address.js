import getName from '../getter/getName'

const getFullAddressByAdsLocation = (item) => {
  return `${getName(item, 'adsLocation_address_streetLine1') } ${ getName(item, 'adsLocation_address_streetLine2') },
    Phường ${ getName(item, 'adsLocation_address_ward') },
    Quận ${ getName(item, 'adsLocation_address_district') },
    TP Hồ Chí Minh`
}

const getFullAddress = (item) => {
  return `${getName(item, 'address_streetLine1') } ${ getName(item, 'address_streetLine2') },
    Phường ${ getName(item, 'address_ward') },
    Quận ${ getName(item, 'address_district') },
    TP Hồ Chí Minh`
}

export { getFullAddressByAdsLocation, getFullAddress }