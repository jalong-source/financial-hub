/**
 * ==============================================================================
 * FINANCIAL HUB - BUSINESS LOGIC MODULE
 * File: js/logic.js
 * Chứa các hàm thuần túy tính toán học phí, xét học bổng, format tiền tệ VNĐ
 * ==============================================================================
 */

/**
 * Định dạng số tiền sang chuẩn tiền tệ Việt Nam (Ví dụ: 1.000.000 VNĐ)
 * @param {number} amount - Số tiền cần format
 * @returns {string} Chuỗi tiền tệ đã định dạng
 */
function formatVND(amount) {
  const validAmount = isNaN(amount) ? 0 : Math.max(0, Math.round(amount));
  const formattedNumber = new Intl.NumberFormat('vi-VN').format(validAmount);
  return `${formattedNumber} VNĐ`;
}

/**
 * Xét duyệt mức học bổng dựa trên GPA và Điểm Rèn Luyện (ĐRL)
 * @param {number} gpa - Điểm trung bình học tập (0 - 4.0)
 * @param {number} drl - Điểm rèn luyện (0 - 100)
 * @returns {object} Thông tin mức học bổng tương ứng
 */
function determineScholarship(gpa, drl) {
  const validGpa = isNaN(gpa) ? 0 : gpa;
  const validDrl = isNaN(drl) ? 0 : drl;

  for (const tier of SCHOLARSHIP_TIERS_DATA) {
    if (tier.id === 'tier-none') return tier;
    if (validGpa >= tier.minGpa && validDrl >= tier.minDrl) {
      return tier;
    }
  }

  return SCHOLARSHIP_TIERS_DATA[SCHOLARSHIP_TIERS_DATA.length - 1];
}

/**
 * Tính toán tổng kết tài chính dựa trên danh sách các môn được chọn và điểm số
 * @param {Array<{credits: number, price: number}>} selectedCourses - Danh sách môn học được tick
 * @param {number} gpa - Điểm GPA
 * @param {number} drl - Điểm rèn luyện
 * @returns {object} Kết quả tính toán toàn diện
 */
function calculateTuitionSummary(selectedCourses, gpa, drl) {
  const courseCount = selectedCourses.length;
  
  let totalCredits = 0;
  let totalTuition = 0;

  for (const course of selectedCourses) {
    totalCredits += (course.credits || 0);
    totalTuition += (course.price || 0);
  }

  // Xét mức học bổng
  const scholarshipTier = determineScholarship(gpa, drl);

  // Tính số tiền giảm trừ và công nợ còn lại
  const discountAmount = Math.round(totalTuition * scholarshipTier.discountRate);
  const remainingDebt = Math.max(0, totalTuition - discountAmount);

  return {
    courseCount,
    totalCredits,
    totalTuition,
    scholarshipTier,
    discountRate: scholarshipTier.discountRate,
    discountAmount,
    remainingDebt
  };
}

/**
 * Xử lý chuỗi nhập điểm số hỗ trợ cả dấu phẩy (,) và dấu chấm (.)
 * @param {string|number} rawValue - Giá trị thô người dùng nhập
 * @returns {number} Giá trị float hợp lệ
 */
function parseLocaleNumber(rawValue) {
  if (typeof rawValue === 'number') return rawValue;
  if (!rawValue) return 0;
  const sanitized = String(rawValue).trim().replace(',', '.');
  const parsed = parseFloat(sanitized);
  return isNaN(parsed) ? 0 : parsed;
}
