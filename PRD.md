# PRODUCT REQUIREMENTS DOCUMENT (PRD) - FINANCIAL HUB
Phân hệ: Tra Cứu Học Phí & Học Bổng (Financial Hub) · Môn Thiết Kế Web

---

## 1. Mục Tiêu & Tầm Nhìn Dự Án
- **Tên dự án:** Student Financial Hub (Tra cứu Học phí & Học bổng Sinh viên).
- **Mục tiêu ngắn hạn (Đồ án cuối kỳ):**
  - Kê khai học phí bằng các HTML5 Input types thích hợp (`number`, `date`, `checkbox`).
  - Trực quan hóa các mức học bổng bằng CSS3 Cards có hiệu ứng phát sáng viền (`active`) theo điểm số.
  - Tính toán công nợ học phí thời gian thực bằng Vanilla JavaScript khi bắt sự kiện `change` trên checkbox môn học.
- **Tầm nhìn dài hạn:** Hệ thống quản lý tài chính sinh viên toàn diện, tích hợp ví điện tử và xét duyệt hồ sơ học bổng tự động.

---

## 2. Tiêu Chuẩn Xét Duyệt Học Bổng (PRD Rules)

| Mức Học Bổng | Tiêu Chuẩn Điểm GPA | Tiêu Chuẩn ĐRL | Tỷ Lệ Miễn Giảm | Class CSS |
|:---|:---:|:---:|:---:|:---:|
| **Học bổng Xuất sắc** (Hạng A) | GPA ≥ 3.80 | ĐRL ≥ 90 | **100% học phí** | `.scholarship-card--excellent` |
| **Học bổng Giỏi** (Hạng B) | GPA ≥ 3.60 | ĐRL ≥ 85 | **50% học phí** | `.scholarship-card--good` |
| **Học bổng Khuyến khích** (Hạng C) | GPA ≥ 3.20 | ĐRL ≥ 80 | **25% học phí** | `.scholarship-card--fair` |
| **Không đạt học bổng** (Tiêu chuẩn) | Không đạt các mốc trên | | **0%** | `.scholarship-card--none` |

---

## 3. Công Thức Nghiệp Vụ Tài Chính
1. **Tổng học phí:**
   $$\text{Tổng học phí} = \sum (\text{Đơn giá môn học được chọn})$$
2. **Tổng tín chỉ:**
   $$\text{Tổng tín chỉ} = \sum (\text{Số tín chỉ môn học được chọn})$$
3. **Số tiền giảm trừ học bổng:**
   $$\text{Số tiền giảm trừ} = \text{Tổng học phí} \times \text{Tỷ lệ miễn giảm}$$
4. **Công nợ còn lại:**
   $$\text{Công nợ còn lại} = \max(0, \text{Tổng học phí} - \text{Số tiền giảm trừ})$$
5. **Định dạng tiền tệ:** Định dạng số tiền kèm chuỗi `"VNĐ"` (ví dụ: `1.000.000 VNĐ`).

---

## 4. Mô Phỏng Ví Điện Tử Sinh Viên
- Số dư ban đầu: `5.500.000 VNĐ` (lưu trữ trong `localStorage`).
- Cho phép mở Modal kiểm tra hóa đơn và thanh toán trực tiếp công nợ.
- Sau khi xác nhận thanh toán, số dư ví bị trừ đi đúng số tiền công nợ và công nợ đưa về `0 VNĐ`.
