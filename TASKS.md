# DANH SÁCH CÔNG VIỆC DỰ ÁN (TASKS.MD) - FINANCIAL HUB
Phân hệ: Tra cứu Học phí & Học bổng (Financial Hub) · Môn Thiết kế Web

---

## 📋 TIẾN ĐỘ THỰC HIỆN THEO QUY CHUẨN KỸ THUẬT

### Giai đoạn 1: Khởi tạo Kiến trúc & Tài liệu Dự án (Thành viên 1 - Team Lead)
- [x] Đọc và đối soát toàn bộ yêu cầu kỹ thuật trong `PRD.md`, `antigravity.md`, `logic.md`.
- [x] Khởi tạo cấu trúc thư mục chuẩn: `assets/`, `css/`, `js/`, `pages/`, `docs/`.
- [x] Xây dựng trang Cổng điều hướng (`index.html`) chuẩn ngữ nghĩa HTML5.
- [x] Soạn thảo báo cáo phân công độc quyền 4 thành viên trong `README.md`.
- [x] Khởi tạo bảng kiểm tra tiến độ `TASKS.md`.
- [x] Khởi tạo Git repository và đẩy commit Bước 1 lên GitHub.

### Giai đoạn 2: Bảng Kê Khai Học Phí & Form HTML5 (Thành viên 2 - Frontend Dev)
- [x] Xây dựng giao diện `pages/tuition.html` với cấu trúc ngữ nghĩa HTML5.
- [x] Áp dụng Input Type `date` cho hạn nộp học phí và `number` cho đơn giá/tín chỉ, phụ phí.
- [x] Bảng môn học mẫu với checkbox mang thuộc tính `data-credits`.
- [x] Form thêm/giả lập môn học mới động (Tên môn, Tín chỉ, Đơn giá, Hạn nộp).
- [x] Viết script `js/tuition.js` tính tổng tín chỉ và học phí tức thời với định dạng tiền tệ VNĐ.
- [x] Đẩy commit Bước 2 lên GitHub với tài khoản Thành viên 2 (Tran Khac Dat).

### Giai đoạn 3: Design System CSS3 & Thẻ Cards Học Bổng (Thành viên 3 - UI/UX Designer)
- [x] Xây dựng Design System toàn diện trong `css/style.css` (Dark Theme `#101513`, `#84d9bb`, `#c5ee75`, biến `:root`, CSS Grid, Flexbox).
- [x] Thiết kế trang `pages/scholarship.html` hiển thị 3 thẻ (Cards) học bổng theo `PRD.md`:
  - 🥇 Học bổng Xuất sắc (Giảm 100%): GPA ≥ 3.8 và ĐRL ≥ 90.
  - 🥈 Học bổng Giỏi (Giảm 50%): GPA ≥ 3.6 và ĐRL ≥ 85.
  - ⭐ Học bổng Khuyến khích (Giảm 25%): GPA ≥ 3.2 và ĐRL ≥ 80.
- [x] Hiệu ứng phát sáng viền neon cho Card đạt chuẩn (`.active`) và làm mờ nhẹ các Card chưa đạt.
- [x] Viết script `js/scholarship.js` xử lý tương tác nhập điểm GPA & ĐRL.
- [x] Đẩy commit Bước 3 lên GitHub.

### Giai đoạn 4: Lập trình Logic JS & Bắt Sự kiện Realtime (Thành viên 4 - JS Developer)
- [x] Xây dựng giao diện `pages/calculator.html` tính công nợ thời gian thực.
- [x] Viết script `js/calculator.js` lắng nghe sự kiện `change` trên checkbox môn học.
- [x] Công thức tính công nợ tự động trừ mức học bổng đạt được theo GPA & ĐRL.
- [x] Tích hợp Modal "Thanh toán qua Ví sinh viên" giả lập và cập nhật số dư ví.
- [x] Hoàn thiện tài liệu nhật ký kỹ thuật AI Prompt Log (`prompt.log`).
- [x] Đẩy commit Bước 4 lên GitHub.

### Giai đoạn 5: Tích hợp Toàn diện Dashboard & Nghiệm thu (Thành viên 1 - Team Lead)
- [x] Xây dựng trang tích hợp `pages/dashboard.html` liên kết cả 3 phân hệ.
- [x] Viết script `js/dashboard.js` đồng bộ dữ liệu thời gian thực giữa GPA, ĐRL, học phí và công nợ.
- [x] Tích hợp tính năng thanh toán ví sinh viên và nộp hồ sơ xét duyệt tự động (UI Mockup).
- [x] Kiểm thử responsive trên Mobile và Desktop, đảm bảo không có lỗi console.
- [x] Hoàn thiện toàn bộ đồ án, sẵn sàng cho buổi bảo vệ cuối kỳ.
