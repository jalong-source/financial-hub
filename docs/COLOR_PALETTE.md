# BẢNG TÔNG MÀU & QUY CHUẨN THIẾT KẾ PRIORITY BANKING
## Phân hệ: Tra Cứu Học Phí & Học Bổng Sinh Viên — Hạng Ưu Tiên

Tài liệu quy chuẩn tông màu và ngôn ngữ thiết kế **Private Banking / Priority Banking** ("Thẻ đen viền vàng") được áp dụng bắt buộc cho giao diện ứng dụng.

---

## 1. Tỷ Lệ Màu 60 – 30 – 10 (Quy Tắc Vàng)
- **60% Nền tảng (Dominant):** Nền đen sâu thẳm `#0A0A0A` (Dark mode/Hero/Sidebar) hoặc Trắng ngà `#FAFAF7` (Light mode content).
- **30% Khối cấu trúc (Secondary):** Thẻ thông tin `#141414` (Dark) / `#FFFFFF` viền `#ECE8DC` (Light), bề mặt xám kim loại trung tính.
- **10% Điểm nhấn Kim hoàn (Accent):** Vàng kim loại `Gold Gradient` độc quyền – **tuyệt đối chỉ dùng làm điểm nhấn**, không dùng tràn lan.

---

## 2. Bảng Mã Màu Chi Tiết (Design Tokens)

### 2.1 Bảng màu Tối (Dark Palette - Mặc định cho Sidebar, Thẻ Ưu Tiên & Dark Theme)
| Token | Mã HEX | Mục đích sử dụng |
|---|---|---|
| `--color-black-900` | `#0A0A0A` | Nền chính của ứng dụng, Sidebar cố định, Thẻ đen Priority |
| `--color-black-800` | `#141414` | Nền Card bề mặt trên nền đen, Modal, Dropdown |
| `--color-black-700` | `#1F1F1F` | Viền ngăn cách, đường kẻ phân chia các khối |
| `--color-text-dark-primary` | `#F5F5F5` | Chữ chính trên nền đen (độ tương phản 16.1:1, chuẩn AAA) |
| `--color-text-dark-secondary` | `#A3A3A3` | Chữ phụ, nhãn phụ, ngày giờ, số serial mờ |

### 2.2 Bảng màu Vàng Kim Loại (Metallic Gold Accent)
> [!IMPORTANT]
> Không sử dụng vàng chói phẳng (flat bright yellow). Sử dụng ánh kim loại đa chiều:
- **Gold 500:** `#C9A227` (Màu vàng đậm làm bóng đổ/viền sâu)
- **Gold 400:** `#D4AF37` (Màu vàng chuẩn Royal Gold, icon, viền thẻ)
- **Gold 300:** `#E6C766` (Màu vàng sáng bắt sáng, text tiêu điểm)
- **Gold Metallic Gradient:**  
  `linear-gradient(135deg, #8A6D1D 0%, #D4AF37 40%, #F3DF9A 55%, #C9A227 100%)`
- **Gold Subtle Border:** `rgba(212, 175, 55, 0.25)`

### 2.3 Bảng màu Sáng (Light Content Palette)
| Token | Mã HEX | Mục đích sử dụng |
|---|---|---|
| `--color-light-bg` | `#FAFAF7` | Nền trang ngà cao cấp (Ivory warm paper) |
| `--color-light-card` | `#FFFFFF` | Nền thẻ nổi trên trang sáng |
| `--color-light-border` | `#ECE8DC` | Viền thẻ sáng tinh tế (ánh vàng cát) |
| `--color-text-light-primary` | `#111111` | Chữ chính trên nền sáng |
| `--color-text-light-secondary` | `#6B6B6B` | Chữ chú thích, ghi chú |

### 2.4 Bảng màu Trạng Thái Nghiệp Vụ (Semantic Status Colors)
Tất cả trạng thái đều mang sắc thái sang trọng, trầm ấm (muted luxury), **bắt buộc luôn đi kèm icon nét mảnh và nhãn chữ**:

| Trạng thái | Mã chữ | Mã nền | Viền / Điểm nhấn | Ý nghĩa |
|---|---|---|---|---|
| **Đã thanh toán** | `#1F6B3A` | `#E7F3EA` | `rgba(31, 107, 58, 0.2)` | Đã hoàn tất nghĩa vụ học phí |
| **Còn nợ** | `#9B1C1C` | `#FBE9E9` | `rgba(155, 28, 28, 0.2)` | Khoản thu cần thanh toán |
| **Sắp đến hạn** | `#8A5A00` | `#FFF3D6` | `rgba(138, 90, 0, 0.25)` | Hạn nộp còn dưới 7 ngày |
| **Học bổng / Miễn giảm** | `#6B5410` | `#FBF3D5` | `#D4AF37` (Viền vàng) | **Đặc quyền cao cấp nhất** |

> [!WARNING]
> Tuyệt đối **KHÔNG** sử dụng xanh dương, tím, hồng neon hay các màu rực rỡ ngoài danh mục trên nhằm duy trì tính độc bản của thương hiệu Priority Banking.

---

## 3. Quy Chuẩn Kiểu Chữ (Typography)
- **Font Tiêu đề & Số tiền lớn:** `"Playfair Display", Georgia, "Times New Roman", serif`
  - Đẳng cấp châu Âu cổ điển, độ dày `600` và `700`.
  - Số tiền sử dụng `tabular-nums` căn lề phải chuẩn mực ngân hàng quốc tế.
- **Font Thân bài & Giao diện:** `"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
  - Hiện đại, rõ ràng, tối ưu kích thước từ 12px đến 16px.

---

## 4. Ngôn Ngữ Thành Phần (Component Aesthetics)
1. **Student Priority Card:**
   - Mặt thẻ: Nền `#0D0D0D`, dập vân Guilloche hoa văn chìm `rgba(212,175,55,0.06)`.
   - Chip thanh toán EMV màu vàng đồng viền vàng.
   - Logo trường & Monogram dạng huy hiệu hoàng gia.
   - Họ tên dập nổi chữ in hoa: `NGUYỄN VĂN AN`.
   - Mã sinh viên tách nhóm 4 số: `2200 1234`.
   - Viền thẻ: 1.5px metallic gold gradient.
2. **Bo góc:** `16px` cho card/panel lớn; `999px` (dạng viên thuốc - pill) cho badge trạng thái và nút hành động.
3. **Đổ bóng & Ánh sáng:** 
   - Trên nền sáng: `0 8px 24px rgba(0, 0, 0, 0.04)`.
   - Trên nền tối: Không dùng bóng mờ nhòe; thay bằng đường viền vàng siêu mảnh `1px rgba(212, 175, 55, 0.25)`.
4. **Icons:** Line icon dạng SVG vector trực tiếp, stroke 1.5px, không dùng Emoji.
