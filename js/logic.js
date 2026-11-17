/**
 * logic.js — Financial Hub
 * ──────────────────────────────────────────────
 * Các hàm tính toán thuần (pure functions):
 *   - Xét học bổng theo GPA
 *   - Tính học phí
 *   - Định dạng tiền tệ VNĐ
 * File này KHÔNG thao tác DOM.
 * Phụ thuộc: data.js (SCHOLARSHIP_TIERS, SUBJECTS, EXTRA_FEES)
 */

'use strict';

/**
 * Xác định mức học bổng cao nhất mà sinh viên đạt được.
 * @param {number} gpa - Điểm GPA (0.00 – 4.00)
 * @returns {Object|null} Tier học bổng hoặc null nếu chưa đủ điều kiện
 */
function getScholarshipTier(gpa) {
  for (const tier of SCHOLARSHIP_TIERS) {
    if (gpa >= tier.minGPA) return tier;
  }
  return null;
}

/**
 * Tính tổng học phí cho danh sách môn đã chọn (trước khi trừ học bổng).
 * @param {string[]} selectedIds - Mảng mã môn học đã chọn
 * @returns {number} Tổng học phí (VNĐ)
 */
function calculateTuition(selectedIds) {
  return SUBJECTS
    .filter(s => selectedIds.includes(s.id))
    .reduce((sum, s) => sum + s.credits * s.pricePerCredit, 0);
}

/**
 * Tính tổng số tín chỉ cho danh sách môn đã chọn.
 * @param {string[]} selectedIds - Mảng mã môn học đã chọn
 * @returns {number} Tổng tín chỉ
 */
function calculateTotalCredits(selectedIds) {
  return SUBJECTS
    .filter(s => selectedIds.includes(s.id))
    .reduce((sum, s) => sum + s.credits, 0);
}

/**
 * Tính tổng phụ phí cố định.
 * @returns {number} Tổng phụ phí (VNĐ)
 */
function calculateExtraFees() {
  return EXTRA_FEES.reduce((sum, f) => sum + f.amount, 0);
}

/**
 * Tính số tiền được giảm từ học bổng.
 * @param {number} tuition - Học phí gốc (VNĐ)
 * @param {number} scholarshipPercent - Phần trăm giảm (0–100)
 * @returns {number} Số tiền được giảm (VNĐ)
 */
function calculateDiscount(tuition, scholarshipPercent) {
  return Math.round(tuition * scholarshipPercent / 100);
}

/**
 * Tính công nợ cuối cùng = Học phí - Giảm + Phụ phí.
 * @param {number} tuition           - Học phí gốc
 * @param {number} scholarshipPercent - % giảm học bổng
 * @returns {number} Công nợ phải nộp (VNĐ)
 */
function calculateNetPayable(tuition, scholarshipPercent) {
  const discount = calculateDiscount(tuition, scholarshipPercent);
  const extras   = calculateExtraFees();
  return tuition - discount + extras;
}

/**
 * Định dạng số thành chuẩn tiền tệ Việt Nam: 1.000.000 VNĐ
 * @param {number} amount - Số tiền
 * @returns {string} Chuỗi tiền tệ đã format
 */
function formatCurrency(amount) {
  return amount.toLocaleString('vi-VN') + ' VNĐ';
}

/**
 * Kiểm tra GPA có hợp lệ không (0.00 – 4.00).
 * @param {string} raw - Giá trị thô từ input
 * @returns {{ valid: boolean, value: number, error: string }}
 */
function validateGPA(raw) {
  const trimmed = raw.trim();
  if (trimmed === '') {
    return { valid: false, value: NaN, error: '' }; // empty = no error, just clear
  }
  const gpa = parseFloat(trimmed);
  if (isNaN(gpa) || gpa < 0 || gpa > 4) {
    return { valid: false, value: gpa, error: '❌ Vui lòng nhập GPA hợp lệ từ 0.00 đến 4.00' };
  }
  return { valid: true, value: gpa, error: '' };
}
