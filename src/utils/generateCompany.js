const companies = [
  'Saatchi & Saatchi Vietnam',
  'Dentsu Vietnam',
  'Ogilvy Vietnam',
  'Havas Riverorchid Vietnam',
  'Leo Burnett Vietnam',
  'TBWA Vietnam',
  'Cheil Vietnam',
  'VMLY&R Vietnam',
  'Isobar Vietnam',
  'Publicis Vietnam',
  'Innocean Worldwide Vietnam',
  'Mindshare Vietnam',
  'Mediacom Vietnam',
  'MullenLowe Vietnam',
  'Wunderman Thompson Vietnam',
  'Phibious Vietnam',
  'Chuo Senko Vietnam',
  'CleverAds Vietnam',
  'IAS Vietnam',
  'Purple Asia Vietnam',
  'Emotiv Vietnam',
  // Add more company names as needed
];

function getRandomAdvertisingCompany() {
  const randomIndex = Math.floor(Math.random() * companies.length);
  return companies[randomIndex];
}

// Example usage
const randomCompany = getRandomAdvertisingCompany();
console.log(randomCompany);
