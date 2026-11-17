/**
 * FINANCIAL HUB - CALCULATOR.JS
 * Lập trình logic tính toán công nợ thời gian thực (realtime)
 * Bắt sự kiện 'change' trên checkbox môn học, trừ mức học bổng và thanh toán ví sinh viên
 */

document.addEventListener('DOMContentLoaded', () => {
  initDebtCalculator();
});

const vndFormatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND'
});

function initDebtCalculator() {
  const table = document.getElementById('calc-table');
  const levelSelect = document.getElementById('select-scholarship-level');
  const gpaInput = document.getElementById('calc-gpa-input');
  const drlInput = document.getElementById('calc-drl-input');

  const grossTuitionEl = document.getElementById('calc-gross-tuition');
  const creditsCountEl = document.getElementById('calc-credits-count');
  const rateEl = document.getElementById('calc-scholarship-rate');
  const scholarshipNameEl = document.getElementById('calc-scholarship-name');
  const discountAmountEl = document.getElementById('calc-discount-amount');
  const finalDebtEl = document.getElementById('calc-final-debt');
  const btnToggleAll = document.getElementById('btn-toggle-all');

  // Ví sinh viên & Modal
  let walletBalance = 5500000;
  const walletBalanceEl = document.getElementById('calc-wallet-balance');
  const btnOpenModal = document.getElementById('btn-open-pay-modal');
  const payModal = document.getElementById('pay-modal');
  const btnCloseModal = document.getElementById('btn-close-pay-modal');
  const btnCancelPay = document.getElementById('btn-cancel-pay');
  const btnConfirmPay = document.getElementById('btn-confirm-pay');

  let currentDebt = 0;

  function calculateRealtimeDebt() {
    let grossTuition = 0;
    let selectedCredits = 0;

    const checkboxes = table.querySelectorAll('.course-checkbox');
    checkboxes.forEach(cb => {
      const row = cb.closest('tr');
      if (cb.checked) {
        grossTuition += parseFloat(cb.dataset.fee) || 0;
        selectedCredits += parseInt(cb.dataset.credits) || 0;
        if (row) row.style.opacity = '1';
      } else {
        if (row) row.style.opacity = '0.45';
      }
    });

    // Mức học bổng
    const discountRate = parseFloat(levelSelect.value) || 0;
    const discountAmount = grossTuition * discountRate;
    currentDebt = grossTuition - discountAmount;

    // Cập nhật DOM tức thời
    if (grossTuitionEl) grossTuitionEl.textContent = vndFormatter.format(grossTuition);
    if (creditsCountEl) creditsCountEl.textContent = `${selectedCredits} tín chỉ đã chọn`;
    if (rateEl) rateEl.textContent = `-${Math.round(discountRate * 100)}%`;
    if (discountAmountEl) discountAmountEl.textContent = vndFormatter.format(discountAmount);
    if (finalDebtEl) finalDebtEl.textContent = vndFormatter.format(currentDebt);

    // Cập nhật tên mức học bổng
    if (scholarshipNameEl) {
      if (discountRate === 1.0) scholarshipNameEl.textContent = 'Học bổng Xuất sắc (Miễn 100%)';
      else if (discountRate === 0.5) scholarshipNameEl.textContent = 'Học bổng Giỏi (Giảm 50%)';
      else if (discountRate === 0.25) scholarshipNameEl.textContent = 'Học bổng Khuyến khích (Giảm 25%)';
      else scholarshipNameEl.textContent = 'Không có học bổng (0%)';
    }
  }

  // 1. Lắng nghe sự kiện CHANGE trên các checkbox môn học
  table.addEventListener('change', (e) => {
    if (e.target.classList.contains('course-checkbox')) {
      calculateRealtimeDebt();
    }
  });

  // 2. Lắng nghe thay đổi mức học bổng từ dropdown
  if (levelSelect) {
    levelSelect.addEventListener('change', calculateRealtimeDebt);
  }

  // 3. Lắng nghe thay đổi điểm GPA/ĐRL tự động suy ra mức học bổng
  function syncFromScores() {
    const gpa = parseFloat(gpaInput.value) || 0;
    const drl = parseInt(drlInput.value) || 0;

    if (gpa >= 3.8 && drl >= 90) {
      levelSelect.value = '1.0';
    } else if (gpa >= 3.6 && drl >= 85) {
      levelSelect.value = '0.5';
    } else if (gpa >= 3.2 && drl >= 80) {
      levelSelect.value = '0.25';
    } else {
      levelSelect.value = '0.0';
    }
    calculateRealtimeDebt();
  }

  if (gpaInput) gpaInput.addEventListener('input', syncFromScores);
  if (drlInput) drlInput.addEventListener('input', syncFromScores);

  // 4. Nút Toggle All
  if (btnToggleAll) {
    let allChecked = true;
    btnToggleAll.addEventListener('click', () => {
      allChecked = !allChecked;
      const checkboxes = table.querySelectorAll('.course-checkbox');
      checkboxes.forEach(cb => cb.checked = allChecked);
      btnToggleAll.textContent = allChecked ? 'Bỏ chọn tất cả' : 'Chọn tất cả';
      calculateRealtimeDebt();
    });
  }

  // 5. Xử lý Modal thanh toán ví sinh viên
  if (btnOpenModal && payModal) {
    btnOpenModal.addEventListener('click', () => {
      if (currentDebt <= 0) {
        alert('🎉 Bạn không có công nợ cần thanh toán (học phí đã được miễn giảm 100% hoặc chưa chọn môn học)!');
        return;
      }

      document.getElementById('modal-debt-amount').textContent = vndFormatter.format(currentDebt);
      document.getElementById('modal-current-balance').textContent = vndFormatter.format(walletBalance);
      
      const afterBalance = walletBalance - currentDebt;
      const afterEl = document.getElementById('modal-after-balance');
      if (afterBalance >= 0) {
        afterEl.textContent = vndFormatter.format(afterBalance);
        afterEl.style.color = 'var(--lime-accent)';
        btnConfirmPay.disabled = false;
        btnConfirmPay.textContent = 'Xác Nhận Trừ Ví';
      } else {
        afterEl.textContent = 'Số dư ví không đủ thanh toán';
        afterEl.style.color = 'var(--danger)';
        btnConfirmPay.disabled = true;
        btnConfirmPay.textContent = 'Số dư không đủ';
      }

      payModal.classList.add('open');
    });

    const closeModal = () => payModal.classList.remove('open');
    if (btnCloseModal) btnCloseModal.addEventListener('click', closeModal);
    if (btnCancelPay) btnCancelPay.addEventListener('click', closeModal);

    // Xác nhận trừ ví
    if (btnConfirmPay) {
      btnConfirmPay.addEventListener('click', () => {
        if (walletBalance >= currentDebt) {
          walletBalance -= currentDebt;
          walletBalanceEl.textContent = vndFormatter.format(walletBalance);
          closeModal();
          alert(`✅ Thanh toán thành công số tiền ${vndFormatter.format(currentDebt)} từ Ví sinh viên!\nCông nợ của bạn đã được xóa.`);

          // Đặt lại nợ = 0
          finalDebtEl.textContent = vndFormatter.format(0);
          finalDebtEl.style.color = 'var(--lime-accent)';
        }
      });
    }
  }

  // Tính lần đầu
  calculateRealtimeDebt();
}
