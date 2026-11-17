# ARCHITECTURE & LOGIC SPECIFICATION - FINANCIAL HUB
Phân hệ: Tra Cứu Học Phí & Học Bổng · Môn Thiết Kế Web

---

## 1. Cấu Trúc File & Kiến Trúc Tách Biệt

```text
financial-hub/
├── index.html          # Trang giao diện chính
├── css/
│   ├── reset.css       # Reset CSS mặc định trình duyệt
│   ├── variables.css   # Khai báo màu sắc, font chữ, shadow (:root)
│   └── style.css       # CSS giao diện chính (Cards, Table, Modal)
├── js/
│   ├── data.js         # Dữ liệu mẫu danh sách môn học & quy định học bổng
│   ├── logic.js        # Các hàm tính toán học phí, xét học bổng, format tiền
│   └── main.js         # Xử lý sự kiện DOM (change, input, submit, click)
└── docs/               # Chứa các file .md quản lý dự án (PRD.md, LOGIC.md, AI_RULES.md)
```

---

## 2. Đặc Tả Module JavaScript

### Module 1: `js/data.js`
- Chứa `SCHOLARSHIP_TIERS_DATA`: Mảng cấu hình các mức học bổng, tiêu chuẩn điểm và tỷ lệ giảm.
- Chứa `COURSES_DATA`: Danh sách 5 môn học mẫu kèm mã môn, số tín chỉ và đơn giá tín chỉ.
- Chứa `WALLET_CONFIG`: Khóa LocalStorage và số dư mặc định 5.500.000 VNĐ.

### Module 2: `js/logic.js` (Hàm tính toán thuần túy)
- `formatVND(amount)`: Định dạng tiền tệ dạng `1.000.000 VNĐ`.
- `determineScholarship(gpa, drl)`: Trả về đối tượng học bổng đạt được.
- `calculateTuitionSummary(selectedCourses, gpa, drl)`: Tính tổng tín chỉ, tổng học phí, giảm trừ và công nợ còn lại.
- `parseLocaleNumber(rawValue)`: Chuẩn hóa dữ liệu số thập phân (hỗ trợ cả dấu `,` và `.`).

### Module 3: `js/main.js` (Controller & DOM Events)
- Lắng nghe sự kiện `change` trên `.course-checkbox` và `#select-all-courses`.
- Lắng nghe sự kiện `input` và `change` trên `#declaration-gpa` và `#declaration-drl`.
- Lắng nghe sự kiện `click` trên `.scholarship-card` để áp dụng điểm mẫu.
- Lắng nghe sự kiện mở, đóng và xác nhận thanh toán trên Modal Ví điện tử.
- Cập nhật class `.scholarship-card--active` cho thẻ đạt chuẩn.
