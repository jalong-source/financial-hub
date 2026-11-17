# NHẬT KÝ SỬ DỤNG AI PROMPT (AI PROMPT LOG)
## Dự án: Tra Cứu Học Phí & Học Bổng (Financial Hub)
- **Học phần:** Thiết kế Web / Web Application Development
- **Nhánh phát triển:** `feature/Danh`
- **Người thực hiện:** Danh
- **Công cụ hỗ trợ:** Antigravity AI Assistant

---

## 📑 BẢNG TỔNG HỢP CÁC PHIÊN LÀM VIỆC (PROMPT SESSIONS)

| Phiên | Thời gian | Nhiệm vụ chính | Trạng thái |
|---|---|---|:---:|
| **#01** | 17/11/2026 13:28 | Thiết kế Design System Dark Mode CSS3 & Trang Thẻ Học bổng GPA | ✅ Hoàn thành |
| **#02** | 17/11/2026 13:38 | Kiểm tra đối soát Quy chuẩn Kiến trúc (AI Coding Rules) | ✅ Hoàn thành |
| **#03** | 17/11/2026 13:40 | Refactor cấu trúc phân tách (3 CSS, 3 JS, index.html, docs/) | ✅ Hoàn thành |
| **#04** | 17/11/2026 13:50 | Xây dựng Web App phong cách Priority Banking ("Thẻ đen viền vàng") | ✅ Hoàn thành |
| **#05** | 17/11/2026 13:56 | Khởi tạo nhánh Git `feature/Danh`, đóng gói commit và đẩy lên GitHub | ✅ Hoàn thành |
| **#06** | 17/11/2026 14:09 | Lập tài liệu nhật ký kỹ thuật Prompt Log (`promptlog.md`) | ✅ Hoàn thành |

---

## 📝 CHI TIẾT CÁC PHIÊN PROMPT & KẾT QUẢ ĐẠT ĐƯỢC

### Phiên #01: Thiết Kế CSS3 Dark Mode & Trang Tra Cứu Học Bổng GPA
- **Mục tiêu:** Xây dựng hệ thống giao diện Dark Mode chuyên nghiệp, trang hiển thị dạng thẻ Grid kèm hiệu ứng viền neon, hover nhấc 3D và đổi trạng thái active theo GPA.
- **Input Prompt:**
  ```text
  "Hãy thiết kế hệ thống CSS3 hoàn chỉnh trong file css/style.css cho toàn bộ dự án theo phong cách Dark Mode chuyên nghiệp. Xây dựng trang pages/scholarship.html và script js/scholarship.js giải quyết yêu cầu: Thiết kế giao diện dạng các Thẻ (Cards) hiển thị mức học bổng đạt được dựa trên các điều kiện điểm số GPA (Xuất sắc >= 3.60: 100%, Giỏi >= 3.20: 75%, Khá >= 2.50: 50%, Khuyến khích >= 2.00: 25%). Sử dụng CSS Grid, hiệu ứng viền neon, hover nhấc 3D và class .active phát sáng đúng thẻ khi người dùng nhập GPA."
  ```
- **Kỹ thuật AI triển khai:**
  - CSS Custom Properties (`:root`) với 40+ design tokens.
  - Phối màu Neon: Cyan, Gold, Purple, Green cho từng mức học bổng.
  - CSS Grid 4 cột (`scholarship-grid`), hiệu ứng 3D Transform (`translateY`, `rotateX`).
  - `@keyframes scholarshipGlow` phát sáng viền neon cho card đạt chuẩn (`.active`) và làm mờ các thẻ còn lại (`.has-active`).
  - JavaScript bắt sự kiện `input` với cơ chế Debounce 200ms, validation miền giá trị GPA `0.00 – 4.00`.
- **Sản phẩm bàn giao:**
  - `css/style.css`
  - `pages/scholarship.html`
  - `js/scholarship.js`

---

### Phiên #02: Đối Soát Quy Chuẩn Kỹ Thuật (Architecture & Rules Audit)
- **Mục tiêu:** Rà soát mã nguồn hiện tại so với bộ quy chuẩn nghiêm ngặt: Không dùng framework, tách biệt 3 file CSS, 3 file JS, semantic HTML5, chuẩn BEM.
- **Input Prompt:**
  ```text
  # AI Coding Rules - Financial Hub
  ## 1. Tech Stack & Ràng buộc tuyệt đối
  - Ngôn ngữ: Chỉ sử dụng HTML5, CSS3 và JavaScript thuần (Vanilla JS - ES6+).
  - Cấm: Không sử dụng bất kỳ framework/thư viện bên ngoài nào...
  ## 2. Quy chuẩn Code (Coding Standards)
  - HTML5 thẻ ngữ nghĩa, CSS3 biến :root, JS tách biệt file...
  # ARCHITECTURE & LOGIC
  hãy xem luật và check lại cấu trúc dự án xem đã đạt yêu cầu chưa
  ```
- **Kỹ thuật AI triển khai:**
  - Quét toàn bộ cây thư mục dự án và đối chiếu với cấu trúc chuẩn.
  - Xuất báo cáo kiểm tra (Audit Report Artifact) phát hiện 12 điểm thiếu sót (thiếu `index.html`, thiếu `css/reset.css`, `css/variables.css`, thiếu tách biệt `js/data.js`, `js/logic.js`, `js/main.js`, vị trí `TASKS.md`).
  - Đề xuất lộ trình refactor 10 bước chuẩn chỉ.
- **Sản phẩm bàn giao:**
  - Báo cáo kiểm định cấu trúc `audit-report.md`.

---

### Phiên #03: Tái Cấu Trúc Toàn Diện (Refactoring 10 Steps)
- **Mục tiêu:** Thực hiện refactor toàn bộ mã nguồn đạt 100% chuẩn kiến trúc modular mà không phụ thuộc framework.
- **Input Prompt:**
  ```text
  Xác nhận và phê duyệt kế hoạch refactor 10 bước.
  ```
- **Kỹ thuật AI triển khai:**
  - Tách CSS: `reset.css` (chuẩn hóa box-sizing, font-smoothing), `variables.css` (bảng màu, font, shadow), `style.css` (các component).
  - Tách JS: `data.js` (chứa mock data độc lập), `logic.js` (các pure functions tính học phí, xét học bổng, `formatCurrency` VNĐ), `main.js` (bắt sự kiện DOM).
  - Xây dựng `index.html` làm cổng điều hướng trung tâm với 3 cards dẫn lối.
  - Di chuyển `TASKS.md` vào thư mục `docs/` và tích dấu `[x]` cho giai đoạn 3.
- **Sản phẩm bàn giao:**
  - `css/reset.css`, `css/variables.css`, `css/style.css`
  - `js/data.js`, `js/logic.js`, `js/main.js`
  - `index.html`, `docs/TASKS.md`

---

### Phiên #04: Thiết Kế Web App Phong Cách "Priority Banking" (Thẻ Đen Viền Vàng)
- **Mục tiêu:** Nâng cấp trải nghiệm người dùng theo đẳng cấp ngân hàng hạng ưu tiên (Private Banking / Priority Banking), sang trọng, tối giản, đáng tin cậy.
- **Input Prompt:**
  ```text
  Bạn là một senior UI/UX designer kiêm frontend developer. Hãy xây dựng web app "Tra cứu Học phí & Học bổng" cho sinh viên, với phong cách giao diện của ngân hàng hạng ưu tiên (Priority Banking / Private Banking): sang trọng, tối giản, đáng tin cậy, cảm giác "thẻ đen viền vàng".
  - Tỷ lệ màu 60-30-10: Đen (#0A0A0A) - Vàng kim loại (Metallic Gold Gradient) - Trắng ngà (#FAFAF7).
  - Font: Playfair Display + Inter.
  - Các khối: Student Priority Card dập hoa văn Guilloche, Donut Chart tiến độ thanh toán, 4 Thẻ chỉ số, Khối nhắc việc, Bảng tra cứu học phí đa tiêu chí (chuyển Card trên Mobile), Khối học bổng độc quyền, Lịch sử giao dịch & Tải biên lai, Modal chi tiết chuyển khoản kèm nút sao chép 1-click.
  - Tạo 1 file md tông màu đọc và áp dụng. Trả về 1 file HTML hoàn chỉnh, chạy được ngay.
  ```
- **Kỹ thuật AI triển khai:**
  - Soạn thảo quy chuẩn `docs/COLOR_PALETTE.md` làm bộ quy tắc thiết kế gốc.
  - Xây dựng `index.html` độc lập, tích hợp toàn bộ HTML5, CSS responsive và Vanilla JS ES6+ không cần build.
  - Sử dụng 100% SVG line icons nét mảnh 1.5px, loại bỏ hoàn toàn emoji.
  - Thiết kế thẻ *Student Priority Card* dập nổi vân bảo an Guilloche, chip EMV, biểu tượng Contactless, số thẻ dập nhóm `2200 1234`.
  - Hỗ trợ chuyển đổi Theme Sáng (Light Ivory) / Tối (Deep Black) mượt mà.
  - Đảm bảo độ tương phản chuẩn WCAG AA và hỗ trợ điều hướng bàn phím (`:focus-visible` viền vàng).
- **Sản phẩm bàn giao:**
  - `docs/COLOR_PALETTE.md`
  - `index.html` (Single-page app hoàn chỉnh)

---

### Phiên #05: Quản Lý Phiên Bản Git & Đẩy Nhánh `feature/Danh`
- **Mục tiêu:** Tạo nhánh tính năng riêng biệt, đóng gói commit sạch sẽ và đẩy lên kho lưu trữ GitHub từ xa.
- **Input Prompt:**
  ```text
  "tạo 1 nhánh tên feature/Danh ròi commit lên"
  ```
- **Lệnh thực thi:**
  - `git checkout -b feature/Danh`
  - `git add .`
  - `git commit -m "feat: thiet ke giao dien Priority Banking va he thong tra cuu hoc phi, hoc bong"`
  - `git push -u origin feature/Danh`
- **Kết quả:**
  - Mã commit: `58e5bb2` (10 tệp tin, +4.470 dòng).
  - Đã xuất hiện nhánh `feature/Danh` trên GitHub: [jalong-source/financial-hub](https://github.com/jalong-source/financial-hub/tree/feature/Danh).

---

## 💡 BÀI HỌC KINH NGHIỆM PROMPT ENGINEERING
1. **Ràng buộc rõ ràng (Explicit Constraints):** Khi cấm sử dụng thư viện (No React/Bootstrap/jQuery), cần nhấn mạnh ngay trong câu mở đầu để AI tối ưu hóa mã nguồn thuần (Vanilla HTML/CSS/JS).
2. **Quy chuẩn tỷ lệ màu sắc (Color Rule 60-30-10):** Cung cấp mã HEX cụ thể cùng tỷ lệ màu giúp giao diện giữ đúng tinh thần nhận diện thương hiệu cao cấp (Luxury / Priority).
3. **Phân tách trách nhiệm (Separation of Concerns):** Tách bạch rõ các file Data, Logic và DOM Events giúp mã nguồn dễ bảo trì, mở rộng và dễ dàng thay thế bằng API thật trong tương lai.
