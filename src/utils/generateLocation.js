// Function to generate realistic random addresses
function generateRandomAddress() {
  const streetNames = ["Le Loi Street", "Dong Khoi Street", "Nguyen Hue Street", "Tran Hung Dao Street"];
  const randomStreet = streetNames[Math.floor(Math.random() * streetNames.length)];
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  return `${randomNumber} ${randomStreet}, District 1, Ho Chi Minh City`;
}

// Function to generate random data
export function generateRandomData() {
  const areaTypes = ["ward", "district"];
  const positionTypes = ["public land", "private land", "Shopping malls", "markets", "gas stations", "bus shelters"];
  const advertisingTypes = ["Political mobilization", "Commercial advertising", "Socialization"];

  return {
    address: generateRandomAddress(),
    areaType: areaTypes[Math.floor(Math.random() * areaTypes.length)],
    positionType: positionTypes[Math.floor(Math.random() * positionTypes.length)],
    advertisingType: advertisingTypes[Math.floor(Math.random() * advertisingTypes.length)],
  };
}

// Transform the original data
export function generateLocations (originalData) {
  return originalData.map(item => ({
    ...item,
    ...generateRandomData(),
  }))
}
