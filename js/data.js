/**
 * ==============================================================================
 * FINANCIAL HUB - DATA MODULE
 * File: js/data.js
 * Chứa dữ liệu mẫu danh sách môn học, bảng mức học bổng và thông tin sinh viên
 * ==============================================================================
 */

// 1. Quy định các mức học bổng theo GPA và ĐRL
const SCHOLARSHIP_TIERS_DATA = [
  {
    id: 'tier-excellent',
    name: 'Học bổng Xuất sắc',
    tag: 'Xuất sắc',
    minGpa: 3.80,
    minDrl: 90,
    discountRate: 1.0, // 100% học phí
    badgeClass: 'summary-item__badge--excellent',
    cardClass: 'scholarship-card--excellent',
    discountText: '-100%',
    conditionText: 'GPA ≥ 3.80 & ĐRL ≥ 90',
    sampleGpa: 3.85,
    sampleDrl: 92
  },
  {
    id: 'tier-good',
    name: 'Học bổng Giỏi',
    tag: 'Giỏi',
    minGpa: 3.60,
    minDrl: 85,
    discountRate: 0.5, // 50% học phí
    badgeClass: 'summary-item__badge--good',
    cardClass: 'scholarship-card--good',
    discountText: '-50%',
    conditionText: 'GPA ≥ 3.60 & ĐRL ≥ 85',
    sampleGpa: 3.65,
    sampleDrl: 86
  },
  {
    id: 'tier-fair',
    name: 'Học bổng Khuyến khích',
    tag: 'Khuyến khích',
    minGpa: 3.20,
    minDrl: 80,
    discountRate: 0.25, // 25% học phí
    badgeClass: 'summary-item__badge--fair',
    cardClass: 'scholarship-card--fair',
    discountText: '-25%',
    conditionText: 'GPA ≥ 3.20 & ĐRL ≥ 80',
    sampleGpa: 3.25,
    sampleDrl: 82
  },
  {
    id: 'tier-none',
    name: 'Không đạt học bổng',
    tag: 'Tiêu chuẩn',
    minGpa: 0,
    minDrl: 0,
    discountRate: 0.0, // 0%
    badgeClass: 'summary-item__badge--none',
    cardClass: 'scholarship-card--none',
    discountText: '0%',
    conditionText: 'Chưa đủ điều kiện xét',
    sampleGpa: 2.75,
    sampleDrl: 75
  }
];

// 2. Danh sách học phần đăng ký mẫu
const COURSES_DATA = [
  {
    id: 'IT3012',
    name: 'Lập trình Web Tiên tiến',
    subText: 'IT3012 · Lý thuyết + Thực hành',
    credits: 3,
    price: 2100000,
    defaultChecked: true
  },
  {
    id: 'IT3024',
    name: 'Cơ sở Dữ liệu Phân tán',
    subText: 'IT3024 · Đồ án môn học',
    credits: 4,
    price: 2800000,
    defaultChecked: true
  },
  {
    id: 'IT3088',
    name: 'Trí tuệ Nhân tạo Ứng dụng',
    subText: 'IT3088 · Machine Learning Lab',
    credits: 3,
    price: 2100000,
    defaultChecked: true
  },
  {
    id: 'GE2011',
    name: 'Kỹ năng Làm việc Nhóm & Agile',
    subText: 'GE2011 · Kỹ năng mềm',
    credits: 2,
    price: 1400000,
    defaultChecked: false
  },
  {
    id: 'IT3055',
    name: 'An toàn và Bảo mật Thông tin',
    subText: 'IT3055 · Chuyên ngành',
    credits: 3,
    price: 2100000,
    defaultChecked: false
  }
];

// 3. Cấu hình Ví Điện Tử Sinh Viên
const WALLET_CONFIG = {
  storageKey: 'financial_hub_student_wallet',
  initialBalance: 5500000 // 5.500.000 VNĐ
};
