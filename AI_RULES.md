# AI Coding Rules - Financial Hub

## 1. Tech Stack & Ràng buộc tuyệt đối
- **Ngôn ngữ:** Chỉ sử dụng HTML5, CSS3 và JavaScript thuần (Vanilla JS - ES6+).
- **Cấm:** Không sử dụng bất kỳ framework/thư viện bên ngoài nào (React, Vue, Bootstrap, Tailwind CSS, jQuery) trừ khi được yêu cầu rõ ràng. Có thể dùng Google Fonts và FontAwesome/Lucide icons qua CDN.
- **Responsive:** Giao diện phải hiển thị tốt trên cả Desktop và Mobile (sử dụng CSS Flexbox & CSS Grid).

## 2. Quy chuẩn Code (Coding Standards)
- **HTML5:** Sử dụng các thẻ ngữ nghĩa (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`). Bắt buộc dùng đúng `type="number"` và `type="date"` cho các ô nhập liệu kê khai.
- **CSS3:** Sử dụng biến CSS (`:root`) để quản lý bảng màu. Đặt tên class theo chuẩn BEM hoặc rõ nghĩa (ví dụ: `.scholarship-card`, `.tuition-table__checkbox`).
- **JavaScript:** Tách biệt hoàn toàn file JS, không viết inline JS trong HTML. Sử dụng `addEventListener('change', ...)` cho các sự kiện tính toán. Định dạng tiền tệ chuẩn Việt Nam (`1.000.000 VNĐ`).

## 3. Quy tắc làm việc
- Luôn kiểm tra file `PRD.md` và `LOGIC.md` trước khi viết code.
- Sau khi hoàn thành mỗi tính năng, tự động đánh dấu `[x]` vào file `TASKS.md`.

---

# ARCHITECTURE & LOGIC - Financial Hub

## 1. Cấu trúc thư mục dự án
```text
financial-hub/
├── index.html          # Trang giao diện chính
├── css/
│   ├── reset.css       # Reset CSS mặc định trình duyệt
│   ├── variables.css   # Khai báo màu sắc, font chữ, shadow
│   └── style.css       # CSS giao diện chính (Cards, Table, Modal)
├── js/
│   ├── data.js         # Dữ liệu mẫu danh sách môn học & quy định học bổng
│   ├── logic.js        # Các hàm tính toán học phí, xét học bổng, format tiền
│   └── main.js         # Xử lý sự kiện DOM (change, input, submit, click)
└── docs/               # Chứa các file .md quản lý dự án
```
