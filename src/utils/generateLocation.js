// Function to generate realistic random addresses
function generateRandomAddress() {
  const streetNames = ["Le Loi", "Dong Khoi", "Nguyen Hue", "Tran Hung Dao"];
  const randomStreet = streetNames[Math.floor(Math.random() * streetNames.length)];
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  return `${randomNumber} ${randomStreet}, quận 1, thành phố Hồ Chí Minh`;
}

const mapAreaType = {
  ward: 'Phường',
  district: 'Quận'
}

const mapPositionType = {
  public_land : 'Đất công/Công viên/Hành lang an toàn giao thông',
  private_land : 'Đất tư nhân/Nhà ở riêng lẻ',
  shopping_malls : 'Trung tâm thương mại',
  markets : 'Chợ',
  gas_stations : 'Cây xăng',
  bus_shelters : 'Nhà chờ xe buýt'
}

const mapAdvertisingType = {
  political_mobilization: 'Cổ động chính trị',
  commercial_advertising: 'Quảng cáo thương mại',
  socialization: 'Xã hội hoá'
}

const listAddTypes = ['Trụ bảng hiflex', 'Trụ màn hình điện tử LED', 'Trụ hộp đèn', 'Bảng hiflex ốp tường', 'Màn hình điện tử ốp tường', 'Trụ treo băng rôn dọc', 'Trụ treo băng rôn ngang', 'Trụ/Cụm pano', 'Cổng chào', 'Trung tâm thương mại']

export const mapKey = {
  address: 'Địa chỉ',
  areaType: 'Khu vực',
  positionType: 'Loại vị trí',
  advertisingType: 'Hình thức quảng cáo',
  isZoning: 'Thông tin quy hoạch'
}

// Function to generate random data
export function generateRandomData() {
  const areaTypes = ["ward", "district"];
  const positionTypes = ["public_land", "private_land", "shopping_malls", "markets", "gas_stations", "bus_shelters"];
  const advertisingTypes = ["political_mobilization", "commercial_advertising", "socialization"];

  return {
    id: Math.random().toString(),
    address: generateRandomAddress(),
    areaType: mapAreaType[areaTypes[Math.floor(Math.random() * areaTypes.length)]],
    positionType: mapPositionType[positionTypes[Math.floor(Math.random() * positionTypes.length)]],
    advertisingType: mapAdvertisingType[advertisingTypes[Math.floor(Math.random() * advertisingTypes.length)]],
  };
}

// Transform the original data
export function generateLocations (originalData) {
  return originalData.map(item => ({
    ...item,
    ...generateRandomData(),
  }))
}
