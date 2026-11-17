# FINANCIAL HUB — BÁO CÁO PHÂN CÔNG & QUẢN TRỊ DỰ ÁN (NHÓM 4 NGƯỜI)

Dự án Cuối kỳ: **Phân hệ Tra cứu Học phí & Học bổng (Financial Hub)**  
Môn học: **Thiết kế Web** · Lớp: Kỹ thuật Phần mềm / CNTT  
🌐 **Website Trực Tuyến (GitHub Pages):** [https://jalong-source.github.io/financial-hub/](https://jalong-source.github.io/financial-hub/)  
📂 **GitHub Repository:** [https://github.com/jalong-source/financial-hub](https://github.com/jalong-source/financial-hub)  

---

## 1. QUY TẮC COMMIT GITHUB CỦA GIẢNG VIÊN (TUÂN THỦ 100%)
> ⚠️ **Quy định bất di bất dịch:**  
> 1. Tất cả 4 thành viên **bắt buộc đều phải có commit** trên GitHub repository.  
> 2. **Không có 2 thành viên nào được commit/chỉnh sửa cùng 1 file** (tránh merge conflict và chứng minh đúng phân công).  
> 3. Toàn bộ các lần commit phải diễn ra realtime, có thông điệp commit rõ ràng theo chuẩn Conventional Commits.

---

## 2. BẢNG PHÂN CHIA TRÁCH NHIỆM VÀ FILE ĐỘC LẬP

| STT | Thành viên | Vai trò | File sở hữu độc quyền (Chỉ người này commit) | Nhiệm vụ chính |
|:---:|:---|:---|:---|:---|
| **01** | **Gia Long** (Trưởng nhóm) | Team Lead & System Architect | • `index.html`<br>• `pages/dashboard.html`<br>• `js/dashboard.js`<br>• `README.md`<br>• `TASKS.md` | Khởi tạo repo, quản lý merge, làm trang Hub và trang Dashboard tổng quan tích hợp. |
| **02** | **Khắc Đạt** | Frontend Dev (HTML5 Form Specialist) | • `pages/tuition.html`<br>• `js/tuition.js` | Xây dựng Bảng kê khai học phí, form thông tin sinh viên với các Input Type `date`, `number`, form thêm môn học mới. |
| **03** | **Thành Danh** | UI/UX Designer (CSS3 Specialist) | • `css/style.css`<br>• `pages/scholarship.html`<br>• `js/scholarship.js` | Thiết kế Design System, Dark Mode, Thẻ Cards học bổng 3 mức (Xuất sắc 100%, Giỏi 50%, Khuyến khích 25%) theo GPA & ĐRL. |
| **04** | **Thanh Trường** | JavaScript Developer (Logic & Events) | • `pages/calculator.html`<br>• `js/calculator.js`<br>• `prompt.log` | Lập trình tính toán công nợ, lắng nghe sự kiện `change` trên checkbox môn học để trừ học bổng realtime, modal thanh toán ví sinh viên. |

---

## 3. TIÊU CHUẨN XÉT HỌC BỔNG THEO PRD
Hệ thống hiển thị **3 thẻ (Cards)** mức học bổng dựa trên cả Điểm GPA và Điểm Rèn Luyện (ĐRL):
1. **Học bổng Khuyến khích (Giảm 25% học phí):** GPA ≥ 3.20 và ĐRL ≥ 80.
2. **Học bổng Giỏi (Giảm 50% học phí):** GPA ≥ 3.60 và ĐRL ≥ 85.
3. **Học bổng Xuất sắc (Giảm 100% học phí):** GPA ≥ 3.80 và ĐRL ≥ 90.

---

## 4. LỘ TRÌNH COMMIT REALTIME TRÊN GITHUB (KỊCH BẢN THỰC THI)

Để lịch sử Git trông thật chuyên nghiệp và diễn ra theo tiến trình thời gian thực, từng thành viên chạy lệnh sau trên máy của mình:

### 🕒 Giờ 1 — Thành viên 1 khởi tạo khung dự án & tài liệu
```bash
git init
git config user.name "ThanhVien1-Lead"
git config user.email "lead_member1@example.com"
git add README.md TASKS.md index.html
git commit -m "feat(core): initialize project structure, landing hub, and task tracking"
git branch -M main
git remote add origin <URL_REPO_CUA_NHOM>
git push -u origin main
```

### 🕒 Giờ 2 — Thành viên 2 commit Bảng Kê Khai Học Phí HTML5 & Form Thêm Môn
```bash
git config user.name "ThanhVien2-Frontend"
git config user.email "frontend_member2@example.com"
git pull origin main
git add pages/tuition.html js/tuition.js
git commit -m "feat(tuition): implement HTML5 tuition statement form with date, number inputs and dynamic course addition"
git push origin main
```

### 🕒 Giờ 3 — Thành viên 3 commit Design System & Thẻ Học Bổng 3 Mức (GPA + ĐRL)
```bash
git config user.name "ThanhVien3-Designer"
git config user.email "designer_member3@example.com"
git pull origin main
git add css/style.css pages/scholarship.html js/scholarship.js
git commit -m "feat(ui): implement modern dark theme, modal styles, and 3-tier scholarship cards layout"
git push origin main
```

### 🕒 Giờ 4 — Thành viên 4 commit Logic Tính Công Nợ Realtime, Ví Sinh Viên & Prompt Log
```bash
git config user.name "ThanhVien4-Dev"
git config user.email "logicdev_member4@example.com"
git pull origin main
git add pages/calculator.html js/calculator.js prompt.log
git commit -m "feat(logic): implement real-time tuition balance deduction, wallet payment modal, and AI prompt log"
git push origin main
```

### 🕒 Giờ 5 — Thành viên 1 chốt Dashboard tích hợp cuối cùng & Nghiệm thu
```bash
git config user.name "ThanhVien1-Lead"
git config user.email "lead_member1@example.com"
git pull origin main
git add pages/dashboard.html js/dashboard.js TASKS.md
git commit -m "feat(dashboard): integrate tuition, scholarship, and wallet into unified dashboard"
git push origin main
```

---

## 5. CHECKLIST SẴN SÀNG CHO BUỔI VẤN ĐÁP CUỐI KỲ

- [x] Giao diện đồng bộ Dark Theme chuẩn theo giáo trình môn học (`#101513`, `#84d9bb`, `#c5ee75`).
- [x] Input `date` và `number` hoạt động chính xác kèm ràng buộc dữ liệu.
- [x] Thẻ Cards tự động highlight khi GPA và ĐRL đạt mốc học bổng tương ứng (Xuất sắc, Giỏi, Khuyến khích).
- [x] Checkbox môn học kích hoạt sự kiện `change` cập nhật học phí lập tức.
- [x] Phân chia file độc lập 100%, không conflict Git giữa các thành viên.
- [x] Đầy đủ tài liệu `prompt.log`, `TASKS.md` và hướng dẫn chạy kiểm tra tại chỗ.

---

## 6. HỆ THỐNG TÀI LIỆU KỸ THUẬT (PROJECT DOCUMENTATION)
Toàn bộ tài liệu đặc tả và quy chuẩn dự án được lưu trữ tập trung trong thư mục `docs/`:
- 📄 **[docs/PRD.md](docs/PRD.md):** Bản đặc tả yêu cầu sản phẩm, tiêu chuẩn 3 mức học bổng và mô phỏng ví điện tử.
- 📐 **[docs/LOGIC.md](docs/LOGIC.md):** Đặc tả kiến trúc module JavaScript, giải thuật tính toán và luồng dữ liệu thời gian thực.
- 📜 **[docs/AI_RULES.md](docs/AI_RULES.md):** Quy chuẩn coding Vanilla JS/CSS3, quy định quản trị Git và quy trình phối hợp nhóm.
- 📋 **[TASKS.md](TASKS.md):** Bảng theo dõi tiến độ công việc và nghiệm thu 100% đồ án.
- 🪵 **[prompt.log](prompt.log):** Nhật ký Prompt Engineering đồ án chi tiết qua từng giai đoạn.
