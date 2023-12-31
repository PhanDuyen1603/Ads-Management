import { slugify } from "~/utils/string/slug"
import { districts, hcmCity } from '~/constant/location'

const standardize_district = (locatioName) => {
  const slugText = slugify(locatioName)
  const keys_district = Object.keys(districts)
  const district = keys_district.find(x => slugText.indexOf(x) !== -1)
  if (district) {
    return districts[district]
  }
  return null
}

const standardize_ward = (locationName) => {
  const slugText = slugify(locationName)
  const district = standardize_district(locationName)
  const wards = hcmCity.districts.find(x => slugify(`${x.type.name} ${x.names[0]}`) === slugify(district)).wards
  const ward = wards.find(x => {
    let name = slugify(x.names[0])
    if (parseInt(name) && parseInt(name) > 0) {
      name = 'phuong' + name
    }
    return slugText.indexOf(name) !== -1
  })?.names[0]
  if (ward) {
    return ward
  }
  return null
}

export { standardize_district, standardize_ward }