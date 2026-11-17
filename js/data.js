/**
 * data.js — Financial Hub
 * ──────────────────────────────────────────────
 * Dữ liệu mẫu: quy định học bổng & danh sách môn học.
 * File này KHÔNG chứa logic tính toán hay thao tác DOM.
 */

'use strict';

/**
 * Bảng quy định học bổng (sắp xếp giảm dần theo GPA tối thiểu).
 * Mỗi tier gồm:
 *   - level    : Tên xếp loại
 *   - minGPA   : Điểm GPA tối thiểu
 *   - percent  : Mức giảm học phí (%)
 *   - icon     : Emoji đại diện
 *   - neonClass: Class CSS neon tương ứng
 */
const SCHOLARSHIP_TIERS = [
  { level: 'Xuất sắc',     minGPA: 3.60, percent: 100, icon: '🏆', neonClass: 'card--gold'   },
  { level: 'Giỏi',         minGPA: 3.20, percent: 75,  icon: '🥇', neonClass: 'card--cyan'   },
  { level: 'Khá',          minGPA: 2.50, percent: 50,  icon: '🥈', neonClass: 'card--purple' },
  { level: 'Khuyến khích', minGPA: 2.00, percent: 25,  icon: '🎖️', neonClass: 'card--green'  },
];

/**
 * Danh sách môn học mẫu.
 * Mỗi môn gồm:
 *   - id       : Mã môn học
 *   - name     : Tên môn
 *   - credits  : Số tín chỉ
 *   - pricePerCredit: Đơn giá mỗi tín chỉ (VNĐ)
 */
const SUBJECTS = [
  { id: 'CS101', name: 'Nhập môn Lập trình',          credits: 3, pricePerCredit: 650000 },
  { id: 'CS201', name: 'Cấu trúc Dữ liệu',           credits: 4, pricePerCredit: 650000 },
  { id: 'CS301', name: 'Thiết kế Web',                 credits: 3, pricePerCredit: 650000 },
  { id: 'CS401', name: 'Cơ sở Dữ liệu',              credits: 3, pricePerCredit: 650000 },
  { id: 'MA101', name: 'Toán cao cấp',                 credits: 3, pricePerCredit: 500000 },
  { id: 'MA201', name: 'Xác suất Thống kê',            credits: 3, pricePerCredit: 500000 },
  { id: 'EN101', name: 'Tiếng Anh chuyên ngành',       credits: 2, pricePerCredit: 450000 },
  { id: 'PH101', name: 'Giáo dục Thể chất',           credits: 1, pricePerCredit: 300000 },
];

/**
 * Các khoản phụ phí cố định mỗi học kỳ (VNĐ).
 */
const EXTRA_FEES = [
  { name: 'Bảo hiểm Y tế',         amount: 564000  },
  { name: 'Phí hoạt động sinh viên', amount: 150000  },
  { name: 'Phí thư viện',           amount: 100000  },
];
