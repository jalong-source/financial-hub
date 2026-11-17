# AI Coding Rules & Collaboration Guidelines - Financial Hub

## 1. Tech Stack & Ràng buộc tuyệt đối
- **Ngôn ngữ:** Chỉ sử dụng HTML5, CSS3 và JavaScript thuần (Vanilla JS - ES6+).
- **Cấm thư viện ngoài:** Không sử dụng bất kỳ framework/thư viện bên ngoài nào (React, Vue, Bootstrap, Tailwind CSS, jQuery) trừ khi được yêu cầu rõ ràng. Chỉ cho phép dùng Google Fonts (`Manrope`, `DM Mono`) và Icons qua CDN.
- **Không dùng CSS inline:** Tuyệt đối không viết thẻ `<style>` inline trong file HTML. Toàn bộ CSS phải được tổ chức tách biệt tại thư mục `css/` (`reset.css`, `variables.css`, `style.css`).
- **Responsive Design:** Giao diện phải hiển thị tối ưu trên cả Desktop và Mobile (sử dụng CSS Flexbox & CSS Grid, chuẩn Dark Theme Fintech).

## 2. Quy chuẩn Code (Coding Standards)
- **HTML5:** Sử dụng các thẻ ngữ nghĩa chuẩn (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<nav>`). Bắt buộc dùng đúng `type="number"` và `type="date"` cho các ô nhập liệu kê khai.
- **CSS3:** Sử dụng biến CSS (`:root` trong `variables.css`) để quản lý bảng màu, typography, shadow, bo góc. Đặt tên class theo chuẩn BEM hoặc rõ nghĩa (ví dụ: `.scholarship-card`, `.tuition-table__checkbox`, `.subpage-nav`).
- **JavaScript:** Tách biệt hoàn toàn file JS, không viết inline JS trong HTML. Sử dụng `addEventListener('change', ...)` và `addEventListener('input', ...)` cho các sự kiện tính toán thời gian thực.
- **Định dạng tiền tệ:** Luôn format tiền tệ chuẩn Việt Nam (`1.000.000 VNĐ` hoặc `1.000.000 ₫`) bằng font số đơn không gian `DM Mono`.

## 3. Quy tắc làm việc & Quản trị Git
- **Đọc kỹ tài liệu:** Luôn kiểm tra `docs/PRD.md` và `docs/LOGIC.md` trước khi viết hoặc sửa code.
- **Tiến độ dự án:** Sau khi hoàn thành mỗi tính năng, tự động cập nhật đánh dấu `[x]` vào file `TASKS.md`.
- **Ngôn ngữ Git commit:** Bắt buộc 100% các commit message phải viết bằng **Tiếng Việt**, chuẩn format Conventional Commits (ví dụ: `feat(giao-dien): ...`, `fix(logic): ...`, `style(ui): ...`), phản ánh đúng chức năng hoàn thành của từng thành viên.
- **Xác nhận trước khi Push:** Trước khi thực hiện lệnh commit và push lên GitHub, luôn liệt kê tóm tắt các file đã sửa và hỏi người dùng xác nhận thông điệp commit bằng Tiếng Việt.
- **Nhật ký kỹ thuật:** Cập nhật nhật ký kỹ thuật đầy đủ vào file `prompt.log` sau mỗi giai đoạn triển khai.

---

## 4. Cấu trúc thư mục chuẩn của dự án
```text
FinancialHub/
├── index.html                  # Cổng Portal tích hợp chính
├── pages/                      # Các phân hệ giao diện con
│   ├── tuition.html            # Bảng kê khai học phí (HTML5 Inputs)
│   ├── scholarship.html        # Tra cứu học bổng (CSS3 Cards)
│   ├── calculator.html         # Bảng tính công nợ realtime & Ví sinh viên
│   └── dashboard.html          # Dashboard tổng hợp thông tin sinh viên
├── css/
│   ├── reset.css               # Reset CSS mặc định trình duyệt
│   ├── variables.css           # Design Tokens: Màu sắc, font chữ, shadow
│   └── style.css               # Toàn bộ CSS giao diện BEM & Subpages
├── js/
│   ├── data.js                 # Dữ liệu môn học, học bổng & cấu hình ví
│   ├── logic.js                # Các hàm thuần túy tính toán học phí & học bổng
│   ├── main.js                 # Controller sự kiện DOM trang chính
│   ├── tuition.js              # Controller phân hệ kê khai học phí
│   ├── scholarship.js          # Controller phân hệ tra cứu học bổng
│   ├── calculator.js           # Controller phân hệ tính công nợ
│   └── dashboard.js            # Controller phân hệ dashboard
├── docs/                       # Tài liệu đặc tả kỹ thuật dự án
│   ├── PRD.md                  # Bản đặc tả yêu cầu sản phẩm
│   ├── LOGIC.md                # Đặc tả kiến trúc dữ liệu và giải thuật
│   └── AI_RULES.md             # Quy tắc coding chuẩn và phối hợp Git
├── .github/workflows/
│   └── deploy.yml              # Tự động triển khai lên GitHub Pages
├── README.md                   # Giới thiệu đồ án & hướng dẫn chạy thử
├── TASKS.md                    # Bảng theo dõi tiến độ công việc
└── prompt.log                  # Nhật ký Prompt Engineering đồ án
```
