/**
 * ==============================================================================
 * PHÂN HỆ: TRA CỨU HỌC PHÍ & HỌC BỔNG (FINANCIAL HUB)
 * THÀNH VIÊN 4: Xử Lý Logic JavaScript Realtime & Ví Điện Tử Sinh Viên
 * File: js/calculator.js
 * Tác giả: Nguyễn Hữu Thanh Trường (MSSV: 125001054)
 * 
 * Nghiệp vụ chính:
 * 1. Bắt sự kiện 'change' trên checkbox môn học để tính học phí gốc và tín chỉ thời gian thực.
 * 2. Lắng nghe 'input' và 'change' trên GPA & ĐRL để tự động xét duyệt 3 mức học bổng PRD:
 *    - Xuất sắc (Giảm 100%): GPA ≥ 3.80 & ĐRL ≥ 90
 *    - Giỏi (Giảm 50%): GPA ≥ 3.60 & ĐRL ≥ 85
 *    - Khuyến khích (Giảm 25%): GPA ≥ 3.20 & ĐRL ≥ 80
 * 3. Kích hoạt hiệu ứng Active trên các CSS3 Cards tương ứng.
 * 4. Tính toán số tiền được miễn giảm và công nợ còn lại sau học bổng.
 * 5. Tích hợp Modal thanh toán qua Ví điện tử sinh viên (giả lập), cập nhật số dư ví.
 * 6. Chuẩn hóa hiển thị tiền tệ VNĐ với Intl.NumberFormat('vi-VN').
 * ==============================================================================
 */

// 1. Cấu hình bảng học bổng theo PRD đồ án
const SCHOLARSHIP_TIERS = [
  {
    id: 'tier-excellent',
    name: 'Học bổng Xuất sắc',
    minGpa: 3.80,
    minDrl: 90,
    discountRate: 1.0, // Miễn 100%
    badgeText: 'Miễn 100%',
    badgeClass: 'badge-excellent'
  },
  {
    id: 'tier-good',
    name: 'Học bổng Giỏi',
    minGpa: 3.60,
    minDrl: 85,
    discountRate: 0.5, // Miễn 50%
    badgeText: 'Giảm 50%',
    badgeClass: 'badge-good'
  },
  {
    id: 'tier-fair',
    name: 'Học bổng Khuyến khích',
    minGpa: 3.20,
    minDrl: 80,
    discountRate: 0.25, // Miễn 25%
    badgeText: 'Giảm 25%',
    badgeClass: 'badge-fair'
  },
  {
    id: 'tier-none',
    name: 'Không đạt học bổng',
    minGpa: 0,
    minDrl: 0,
    discountRate: 0.0, // 0%
    badgeText: 'Không giảm trừ',
    badgeClass: 'badge-none'
  }
];

// 2. Trình định dạng tiền tệ VNĐ chuẩn Quốc tế
const vndFormatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  maximumFractionDigits: 0
});

function formatVND(amount) {
  const valid = isNaN(amount) ? 0 : Math.max(0, amount);
  return vndFormatter.format(valid);
}

// 3. Quản lý trạng thái Ví Sinh Viên (Lưu trong LocalStorage)
const WALLET_STORAGE_KEY = 'financial_hub_student_wallet';
const INITIAL_WALLET_BALANCE = 5500000; // 5.500.000 VNĐ

function getWalletBalance() {
  const stored = localStorage.getItem(WALLET_STORAGE_KEY);
  if (stored === null) {
    localStorage.setItem(WALLET_STORAGE_KEY, String(INITIAL_WALLET_BALANCE));
    return INITIAL_WALLET_BALANCE;
  }
  const parsed = parseFloat(stored);
  return isNaN(parsed) ? INITIAL_WALLET_BALANCE : parsed;
}

function setWalletBalance(newBalance) {
  localStorage.setItem(WALLET_STORAGE_KEY, String(newBalance));
  updateWalletDisplay();
}

function updateWalletDisplay() {
  const currentBalance = getWalletBalance();
  const formatted = formatVND(currentBalance);
  
  const elHeaderBalance = document.getElementById('header-wallet-balance');
  const elHubBalance = document.getElementById('hub-wallet-balance');
  const elModalBalance = document.getElementById('modal-wallet-balance');

  if (elHeaderBalance) elHeaderBalance.textContent = formatted;
  if (elHubBalance) elHubBalance.textContent = formatted;
  if (elModalBalance) elModalBalance.textContent = formatted;
}

// 4. Hiển thị thông báo Toast Toast Notification
function showToast(message, isError = false) {
  let toast = document.getElementById('toast-msg');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-msg';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.style.borderColor = isError ? 'var(--danger, #ff6b6b)' : 'var(--mint, #84d9bb)';
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

// 5. Đối soát học bổng theo GPA và ĐRL
function evaluateScholarship(gpa, drl) {
  // Chuẩn hóa điểm
  const validGpa = isNaN(gpa) ? 0 : gpa;
  const validDrl = isNaN(drl) ? 0 : drl;

  // Lần lượt kiểm tra các mức từ cao xuống thấp
  for (const tier of SCHOLARSHIP_TIERS) {
    if (tier.id === 'tier-none') return tier;
    if (validGpa >= tier.minGpa && validDrl >= tier.minDrl) {
      return tier;
    }
  }

  return SCHOLARSHIP_TIERS[SCHOLARSHIP_TIERS.length - 1];
}

// 6. Cập nhật trạng thái Active trên thẻ CSS Cards
function updateScholarshipCards(activeTierId) {
  const cards = document.querySelectorAll('.scholarship-card');
  cards.forEach(card => {
    const cardTier = card.dataset.tier;
    if (cardTier === activeTierId && activeTierId !== 'tier-none') {
      card.classList.add('active');
      card.setAttribute('aria-selected', 'true');
    } else {
      card.classList.remove('active');
      card.setAttribute('aria-selected', 'false');
    }
  });
}

// 7. Hiệu ứng rung nhẹ khi giá trị thay đổi
function pulseElement(element) {
  if (!element) return;
  element.classList.remove('value-updated');
  void element.offsetWidth; // Force Reflow
  element.classList.add('value-updated');
}

// Biến toàn cục lưu công nợ hiện tại phục vụ thanh toán ví
let currentCalculatedDebt = 0;
let isTuitionPaid = false;

// 8. Hàm tính toán và cập nhật công nợ học phí Realtime
function calculateTuition() {
  const subjectCheckboxes = document.querySelectorAll('.subject-checkbox');
  const gpaInput = document.getElementById('gpa-input');
  const drlInput = document.getElementById('drl-input');

  let totalTuition = 0;
  let totalCredits = 0;
  let selectedCount = 0;

  // Duyệt qua từng checkbox môn học
  subjectCheckboxes.forEach(checkbox => {
    const row = checkbox.closest('tr') || checkbox.closest('.subject-item');
    if (checkbox.checked) {
      const price = parseFloat(checkbox.dataset.price || checkbox.value) || 0;
      const credits = parseInt(checkbox.dataset.credits, 10) || 0;

      totalTuition += price;
      totalCredits += credits;
      selectedCount += 1;

      if (row) {
        row.classList.add('selected');
        row.classList.add('selected-row');
      }
    } else {
      if (row) {
        row.classList.remove('selected');
        row.classList.remove('selected-row');
      }
    }
  });

  // Lấy GPA và ĐRL (hỗ trợ cả người dùng nhập dấu phẩy "3,85")
  let gpa = 0;
  if (gpaInput) {
    const cleanGpa = String(gpaInput.value || '').trim().replace(',', '.');
    gpa = parseFloat(cleanGpa) || 0;
  }

  let drl = 0;
  if (drlInput) {
    drl = parseFloat(drlInput.value) || 0;
  } else {
    // Nếu giao diện không có ô ĐRL, mặc định cho 90 để không cản trở học bổng
    drl = 90;
  }

  // Xét mức học bổng
  const tier = evaluateScholarship(gpa, drl);

  // Tính số tiền giảm và công nợ còn lại
  const discountAmount = Math.round(totalTuition * tier.discountRate);
  let remainingDebt = Math.max(0, totalTuition - discountAmount);

  if (isTuitionPaid) {
    remainingDebt = 0;
  }
  currentCalculatedDebt = remainingDebt;

  // Kích hoạt Card học bổng
  updateScholarshipCards(tier.id);

  // Cập nhật DOM
  const elTotalTuition = document.getElementById('total-tuition');
  const elDiscountAmount = document.getElementById('scholarship-discount');
  const elRemainingDebt = document.getElementById('remaining-debt');
  const elSelectedCount = document.getElementById('selected-count');
  const elTotalCredits = document.getElementById('total-credits');
  const elScholarshipName = document.getElementById('scholarship-name');
  const elScholarshipRate = document.getElementById('scholarship-rate');

  if (elTotalTuition) {
    elTotalTuition.textContent = formatVND(totalTuition);
    pulseElement(elTotalTuition);
  }

  if (elDiscountAmount) {
    elDiscountAmount.textContent = formatVND(discountAmount);
    pulseElement(elDiscountAmount);
  }

  if (elRemainingDebt) {
    elRemainingDebt.textContent = formatVND(remainingDebt);
    pulseElement(elRemainingDebt);
    if (remainingDebt === 0) {
      elRemainingDebt.classList.add('zero-debt');
    } else {
      elRemainingDebt.classList.remove('zero-debt');
    }
  }

  if (elSelectedCount) {
    elSelectedCount.textContent = `${selectedCount} môn`;
  }

  if (elTotalCredits) {
    elTotalCredits.textContent = `${totalCredits} tín chỉ`;
  }

  if (elScholarshipName) {
    elScholarshipName.textContent = tier.name;
    elScholarshipName.className = `scholarship-badge badge-discount ${tier.badgeClass}`;
  }

  if (elScholarshipRate) {
    elScholarshipRate.textContent = `${Math.round(tier.discountRate * 100)}%`;
  }

  // Cập nhật trạng thái "Chọn tất cả"
  const selectAll = document.getElementById('select-all');
  if (selectAll && subjectCheckboxes.length > 0) {
    selectAll.checked = selectedCount === subjectCheckboxes.length;
    selectAll.indeterminate = selectedCount > 0 && selectedCount < subjectCheckboxes.length;
  }
}

// 9. Quản lý Modal Thanh Toán Ví Điện Tử
function setupWalletModal() {
  const modal = document.getElementById('wallet-modal');
  const btnOpen = document.getElementById('btn-open-wallet');
  const btnClose = document.getElementById('btn-close-modal');
  const btnConfirm = document.getElementById('btn-confirm-pay');
  const modalPayAmount = document.getElementById('modal-pay-amount');
  const modalRemaining = document.getElementById('modal-remaining-balance');

  if (!modal || !btnOpen) return;

  // Mở modal
  btnOpen.addEventListener('click', () => {
    if (currentCalculatedDebt <= 0) {
      showToast('🎉 Bạn hiện không có công nợ học phí cần thanh toán (Công nợ: 0 ₫)!');
      return;
    }

    const currentWallet = getWalletBalance();
    const afterBalance = currentWallet - currentCalculatedDebt;

    if (modalPayAmount) modalPayAmount.textContent = formatVND(currentCalculatedDebt);
    if (modalRemaining) {
      modalRemaining.textContent = formatVND(Math.max(0, afterBalance));
      if (afterBalance < 0) {
        modalRemaining.style.color = 'var(--danger, #ff6b6b)';
      } else {
        modalRemaining.style.color = 'var(--lime, #c5ee75)';
      }
    }

    updateWalletDisplay();
    modal.classList.add('open');
  });

  // Đóng modal
  if (btnClose) {
    btnClose.addEventListener('click', () => {
      modal.classList.remove('open');
    });
  }

  // Đóng khi click ngoài backdrop
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('open');
  });

  // Xác nhận thanh toán
  if (btnConfirm) {
    btnConfirm.addEventListener('click', () => {
      const currentWallet = getWalletBalance();

      if (currentWallet < currentCalculatedDebt) {
        showToast('⚠️ Số dư ví không đủ để thanh toán. Vui lòng nạp thêm tiền!', true);
        return;
      }

      // Trừ tiền ví
      const newWalletBalance = currentWallet - currentCalculatedDebt;
      setWalletBalance(newWalletBalance);

      // Đánh dấu đã thanh toán thành công
      isTuitionPaid = true;
      calculateTuition();

      modal.classList.remove('open');
      showToast(`✅ Đã thanh toán thành công ${formatVND(currentCalculatedDebt)} qua Ví sinh viên!`);
    });
  }
}

// 10. Khởi tạo toàn bộ tương tác khi trang tải
function initCalculatorModule() {
  const subjectCheckboxes = document.querySelectorAll('.subject-checkbox');
  const gpaInput = document.getElementById('gpa-input');
  const drlInput = document.getElementById('drl-input');
  const selectAll = document.getElementById('select-all');

  // Lắng nghe sự kiện 'change' trên từng môn học
  subjectCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      isTuitionPaid = false; // Reset trạng thái thanh toán nếu đổi môn
      calculateTuition();
    });
  });

  // Lắng nghe GPA
  if (gpaInput) {
    gpaInput.addEventListener('input', () => {
      isTuitionPaid = false;
      calculateTuition();
    });
    gpaInput.addEventListener('change', () => {
      isTuitionPaid = false;
      calculateTuition();
    });
  }

  // Lắng nghe ĐRL
  if (drlInput) {
    drlInput.addEventListener('input', () => {
      isTuitionPaid = false;
      calculateTuition();
    });
    drlInput.addEventListener('change', () => {
      isTuitionPaid = false;
      calculateTuition();
    });
  }

  // Checkbox chọn tất cả
  if (selectAll) {
    selectAll.addEventListener('change', (e) => {
      isTuitionPaid = false;
      const checked = e.target.checked;
      subjectCheckboxes.forEach(cb => { cb.checked = checked; });
      calculateTuition();
    });
  }

  // Click vào Card học bổng để áp dụng điểm mẫu
  const cards = document.querySelectorAll('.scholarship-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const sampleGpa = card.dataset.sampleGpa;
      const sampleDrl = card.dataset.sampleDrl;

      if (sampleGpa && gpaInput) gpaInput.value = sampleGpa;
      if (sampleDrl && drlInput) drlInput.value = sampleDrl;

      isTuitionPaid = false;
      calculateTuition();
    });
  });

  // Cập nhật số dư ví ban đầu
  updateWalletDisplay();

  // Cấu hình Modal Ví
  setupWalletModal();

  // Chạy tính toán lần đầu
  calculateTuition();
}

// Tự động khởi chạy
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCalculatorModule);
} else {
  initCalculatorModule();
}
