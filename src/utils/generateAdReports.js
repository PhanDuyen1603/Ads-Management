import { faker } from '@faker-js/faker';
import generateRandomDate from '~/utils/date/generateRandomDate'

// Function to generate a random email address
function generateRandomEmail() {
  const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'example.com'];
  const randomDomain = domains[Math.floor(Math.random() * domains.length)];
  return `user${Math.floor(Math.random() * 1000)}@${randomDomain}`;
}

// Function to generate a random phone number
function generateRandomPhoneNumber() {
  const phoneNumber = '+1-' + Math.random().toString().slice(2, 12);
  return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
}

// Function to generate a random Vietnamese name
function generateRandomVietnameseName() {
  return faker.person.fullName();
}

function generateRandomReportType() {
  const types = ['Tố giác sai phạm', 'Đăng ký nội dung', 'Đóng góp ý kiến', 'Giải đáp thắc mắc']
  const randomType = types[Math.floor(Math.random() * types.length)];
  return randomType
}

export const mapReportKey = {
  report_createdAt: 'Ngày gửi',
  report_reportType: 'Hình thức báo cáo',
  report_fullName: 'Họ và tên',
  report_email: 'Email',
  report_phone: 'Số điện thoại',
  report_content: 'Nội dung báo cáo',
  report_images: 'Hình ảnh minh hoạ',
  report_status: 'Tình trạng xử lý',
  ads_address: 'Điểm đặt quảng cáo',
}

export const keys = {
  fullName: 'report_fullName',
  createdAt: 'report_createdAt',
  reportType: 'report_reportType',
  email: 'report_email',
  phone: 'report_phone',
  content: 'report_content',
  images: 'report_images',
  status: 'report_status',
  address: 'ads_address',
}

// Generate an array of 10 objects
export const generateReportList = (ids = []) => Array.from({ length: 10 }, (_, index) => ({
  id: Math.random().toString(),
  reportType: generateRandomReportType(),
  userName: generateRandomVietnameseName(),
  email: generateRandomEmail(),
  phone: generateRandomPhoneNumber(),
  reportDetail: `Nội dung báo cáo số ${index + 1}`,
  images: [
    faker.image.urlLoremFlickr(),
    faker.image.urlLoremFlickr()
  ],
  createdAt: generateRandomDate(),
  ad: ids[Math.floor(Math.random() * ids.length)] || null,
  status: Math.random() < 0.5
}));