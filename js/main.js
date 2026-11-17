/**
 * ==============================================================================
 * FINANCIAL HUB - DOM CONTROLLER & EVENT LISTENERS
 * File: js/main.js
 * Quản lý vòng đời DOM, bắt các sự kiện change, input, click; kết nối data và logic
 * ==============================================================================
 */

// Biến lưu trữ trạng thái thanh toán công nợ hiện hành
let currentDebtAmount = 0;
let isTuitionSettled = false;

/**
 * Quản lý số dư Ví Điện Tử trong LocalStorage
 */
function readWalletBalance() {
  const stored = localStorage.getItem(WALLET_CONFIG.storageKey);
  if (stored === null) {
    localStorage.setItem(WALLET_CONFIG.storageKey, String(WALLET_CONFIG.initialBalance));
    return WALLET_CONFIG.initialBalance;
  }
  const parsed = parseFloat(stored);
  return isNaN(parsed) ? WALLET_CONFIG.initialBalance : parsed;
}

function saveWalletBalance(amount) {
  localStorage.setItem(WALLET_CONFIG.storageKey, String(amount));
  refreshWalletUI();
}

function refreshWalletUI() {
  const current = readWalletBalance();
  const formatted = formatVND(current);

  const elHeaderBalance = document.getElementById('wallet-header-balance');
  const elModalBalance = document.getElementById('wallet-modal-current');

  if (elHeaderBalance) elHeaderBalance.textContent = formatted;
  if (elModalBalance) elModalBalance.textContent = formatted;
}

/**
 * Hiển thị thông báo Toast
 */
function displayToast(msg, isError = false) {
  let toast = document.getElementById('app-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'app-toast';
    toast.className = 'hub-toast';
    document.body.appendChild(toast);
  }

  toast.textContent = msg;
  toast.className = `hub-toast hub-toast--visible ${isError ? 'hub-toast--error' : ''}`;

  setTimeout(() => {
    toast.classList.remove('hub-toast--visible');
  }, 3500);
}

/**
 * Hiệu ứng nhịp đập khi giá trị số tiền thay đổi
 */
function triggerPulse(el) {
  if (!el) return;
  el.classList.remove('value-pulse');
  void el.offsetWidth; // Force reflow
  el.classList.add('value-pulse');
}

/**
 * Khởi tạo bảng danh sách môn học từ COURSES_DATA
 */
function renderCoursesTable() {
  const tbody = document.getElementById('tuition-course-list');
  if (!tbody) return;

  tbody.innerHTML = '';
  COURSES_DATA.forEach(course => {
    const tr = document.createElement('tr');
    tr.className = `tuition-table__row ${course.defaultChecked ? 'tuition-table__row--selected' : ''}`;
    tr.id = `course-row-${course.id}`;

    tr.innerHTML = `
      <td class="tuition-table__cell" style="text-align: center; width: 44px;">
        <input 
          type="checkbox" 
          class="tuition-table__checkbox course-checkbox" 
          data-id="${course.id}"
          data-credits="${course.credits}" 
          data-price="${course.price}"
          ${course.defaultChecked ? 'checked' : ''}
          aria-label="Chọn môn ${course.name}"
        >
      </td>
      <td class="tuition-table__cell">
        <div class="tuition-table__course-title">${course.name}</div>
        <div class="tuition-table__course-meta">${course.subText}</div>
      </td>
      <td class="tuition-table__cell tuition-table__credits">${course.credits}</td>
      <td class="tuition-table__cell tuition-table__price">${formatVND(course.price)}</td>
    `;

    tbody.appendChild(tr);
  });
}

/**
 * Khởi tạo lưới thẻ học bổng từ SCHOLARSHIP_TIERS_DATA
 */
function renderScholarshipCards() {
  const container = document.getElementById('scholarship-cards-container');
  if (!container) return;

  container.innerHTML = '';
  SCHOLARSHIP_TIERS_DATA.forEach(tier => {
    const card = document.createElement('article');
    card.className = `scholarship-card ${tier.cardClass}`;
    card.dataset.tier = tier.id;
    card.dataset.sampleGpa = tier.sampleGpa;
    card.dataset.sampleDrl = tier.sampleDrl;
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');

    card.innerHTML = `
      <span class="scholarship-card__tag">${tier.tag}</span>
      <h3 class="scholarship-card__name">${tier.name}</h3>
      <p class="scholarship-card__condition">${tier.conditionText}</p>
      <span class="scholarship-card__discount">${tier.discountText}</span>
    `;

    // Click vào card để thử điểm mẫu
    card.addEventListener('click', () => {
      const gpaInput = document.getElementById('declaration-gpa');
      const drlInput = document.getElementById('declaration-drl');
      if (gpaInput) gpaInput.value = tier.sampleGpa;
      if (drlInput) drlInput.value = tier.sampleDrl;
      isTuitionSettled = false;
      refreshFinancialSummary();
      displayToast(`Đã áp dụng mẫu điểm: GPA ${tier.sampleGpa} - ĐRL ${tier.sampleDrl}`);
    });

    container.appendChild(card);
  });
}

/**
 * Đọc dữ liệu từ form và bảng, gọi logic tính toán và cập nhật giao diện
 */
function refreshFinancialSummary() {
  const checkboxes = document.querySelectorAll('.course-checkbox');
  const gpaInput = document.getElementById('declaration-gpa');
  const drlInput = document.getElementById('declaration-drl');

  const selectedCourses = [];
  checkboxes.forEach(cb => {
    const row = document.getElementById(`course-row-${cb.dataset.id}`);
    if (cb.checked) {
      selectedCourses.push({
        id: cb.dataset.id,
        credits: parseInt(cb.dataset.credits, 10) || 0,
        price: parseFloat(cb.dataset.price) || 0
      });
      if (row) row.classList.add('tuition-table__row--selected');
    } else {
      if (row) row.classList.remove('tuition-table__row--selected');
    }
  });

  const gpa = parseLocaleNumber(gpaInput ? gpaInput.value : 0);
  const drl = parseLocaleNumber(drlInput ? drlInput.value : 90);

  // Gọi hàm logic
  const summary = calculateTuitionSummary(selectedCourses, gpa, drl);

  // Nếu đã thanh toán qua ví, công nợ bằng 0
  if (isTuitionSettled) {
    summary.remainingDebt = 0;
  }
  currentDebtAmount = summary.remainingDebt;

  // Cập nhật trạng thái Active trên các thẻ Cards học bổng
  const cards = document.querySelectorAll('.scholarship-card');
  cards.forEach(card => {
    if (card.dataset.tier === summary.scholarshipTier.id && summary.scholarshipTier.id !== 'tier-none') {
      card.classList.add('scholarship-card--active');
    } else {
      card.classList.remove('scholarship-card--active');
    }
  });

  // Cập nhật DOM các ô tóm tắt
  const elCount = document.getElementById('summary-course-count');
  const elCredits = document.getElementById('summary-total-credits');
  const elTuition = document.getElementById('summary-total-tuition');
  const elBadge = document.getElementById('summary-scholarship-badge');
  const elRate = document.getElementById('summary-scholarship-rate');
  const elDiscount = document.getElementById('summary-discount-amount');
  const elDebt = document.getElementById('summary-remaining-debt');

  if (elCount) elCount.textContent = `${summary.courseCount} môn`;
  if (elCredits) elCredits.textContent = `${summary.totalCredits} tín chỉ`;

  if (elTuition) {
    elTuition.textContent = formatVND(summary.totalTuition);
    triggerPulse(elTuition);
  }

  if (elBadge) {
    elBadge.textContent = summary.scholarshipTier.name;
    elBadge.className = `summary-item__badge ${summary.scholarshipTier.badgeClass}`;
  }

  if (elRate) {
    elRate.textContent = `${Math.round(summary.discountRate * 100)}%`;
  }

  if (elDiscount) {
    elDiscount.textContent = formatVND(summary.discountAmount);
    triggerPulse(elDiscount);
  }

  if (elDebt) {
    elDebt.textContent = formatVND(summary.remainingDebt);
    triggerPulse(elDebt);
    if (summary.remainingDebt === 0) {
      elDebt.classList.add('summary-debt__amount--zero');
    } else {
      elDebt.classList.remove('summary-debt__amount--zero');
    }
  }

  // Cập nhật checkbox "Chọn tất cả"
  const selectAll = document.getElementById('select-all-courses');
  if (selectAll && checkboxes.length > 0) {
    selectAll.checked = summary.courseCount === checkboxes.length;
    selectAll.indeterminate = summary.courseCount > 0 && summary.courseCount < checkboxes.length;
  }
}

/**
 * Gắn các Event Listeners chính của ứng dụng
 */
function setupEventListeners() {
  // 1. Bắt sự kiện change trên checkbox môn học
  const tbody = document.getElementById('tuition-course-list');
  if (tbody) {
    tbody.addEventListener('change', (e) => {
      if (e.target.classList.contains('course-checkbox')) {
        isTuitionSettled = false;
        refreshFinancialSummary();
      }
    });
  }

  // 2. Bắt sự kiện change trên checkbox "Chọn tất cả"
  const selectAll = document.getElementById('select-all-courses');
  if (selectAll) {
    selectAll.addEventListener('change', (e) => {
      const isChecked = e.target.checked;
      const checkboxes = document.querySelectorAll('.course-checkbox');
      checkboxes.forEach(cb => { cb.checked = isChecked; });
      isTuitionSettled = false;
      refreshFinancialSummary();
    });
  }

  // 3. Bắt sự kiện input & change trên ô nhập GPA và ĐRL
  const gpaInput = document.getElementById('declaration-gpa');
  const drlInput = document.getElementById('declaration-drl');

  if (gpaInput) {
    gpaInput.addEventListener('input', () => {
      isTuitionSettled = false;
      refreshFinancialSummary();
    });
    gpaInput.addEventListener('change', () => {
      isTuitionSettled = false;
      refreshFinancialSummary();
    });
  }

  if (drlInput) {
    drlInput.addEventListener('input', () => {
      isTuitionSettled = false;
      refreshFinancialSummary();
    });
    drlInput.addEventListener('change', () => {
      isTuitionSettled = false;
      refreshFinancialSummary();
    });
  }

  // 4. Modal Ví điện tử sinh viên - Thanh toán học phí
  const modal = document.getElementById('wallet-payment-modal');
  const btnOpenModal = document.getElementById('btn-open-payment-modal');
  const btnCloseModal = document.getElementById('btn-close-modal');
  const btnConfirmPay = document.getElementById('btn-confirm-payment');

  // Lắng nghe chỉnh sửa thông tin sinh viên và lưu vào localStorage
  const studentCodeInput = document.getElementById('student-code');
  const studentNameInput = document.getElementById('student-fullname');

  if (studentCodeInput) {
    studentCodeInput.addEventListener('input', () => {
      localStorage.setItem('fh_student_code', studentCodeInput.value.trim());
    });
  }

  if (studentNameInput) {
    studentNameInput.addEventListener('input', () => {
      localStorage.setItem('fh_student_name', studentNameInput.value.trim());
    });
  }

  if (btnOpenModal && modal) {
    btnOpenModal.addEventListener('click', () => {
      if (currentDebtAmount <= 0) {
        displayToast('🎉 Bạn hiện không có công nợ học phí cần thanh toán (Công nợ: 0 VNĐ)!');
        return;
      }

      // Đồng bộ thông tin sinh viên mới nhất vào Modal
      const studentName = (document.getElementById('student-fullname')?.value || 'Nguyễn Hữu Thanh Trường').trim();
      const studentCode = (document.getElementById('student-code')?.value || '125001054').trim();
      const modalStudentInfo = document.getElementById('modal-student-info');
      if (modalStudentInfo) {
        modalStudentInfo.textContent = `${studentName} (${studentCode})`;
      }

      const wallet = readWalletBalance();
      const after = wallet - currentDebtAmount;

      const elPay = document.getElementById('wallet-modal-debt');
      const elAfter = document.getElementById('wallet-modal-after');

      if (elPay) elPay.textContent = formatVND(currentDebtAmount);
      if (elAfter) {
        elAfter.textContent = formatVND(Math.max(0, after));
        elAfter.style.color = after < 0 ? 'var(--color-danger)' : 'var(--color-lime)';
      }

      modal.classList.add('is-open');
    });
  }

  if (btnCloseModal && modal) {
    btnCloseModal.addEventListener('click', () => {
      modal.classList.remove('is-open');
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('is-open');
    });
  }

  if (btnConfirmPay && modal) {
    btnConfirmPay.addEventListener('click', () => {
      const wallet = readWalletBalance();
      if (wallet < currentDebtAmount) {
        displayToast('⚠️ Số dư ví không đủ thanh toán. Vui lòng nạp thêm tiền!', true);
        return;
      }

      // Lưu lại số tiền thực tế cần thanh toán trước khi reset về 0
      const paidAmount = currentDebtAmount;
      const newBalance = wallet - paidAmount;
      saveWalletBalance(newBalance);
      isTuitionSettled = true;

      refreshFinancialSummary();
      modal.classList.remove('is-open');
      displayToast(`✅ Thanh toán thành công ${formatVND(paidAmount)} qua Ví sinh viên!`);
    });
  }

  // 5. Modal Nạp tiền nhanh vào Ví Sinh Viên
  const depositModal = document.getElementById('wallet-deposit-modal');
  const btnOpenDeposit = document.getElementById('btn-open-deposit-modal');
  const btnCloseDeposit = document.getElementById('btn-close-deposit-modal');
  const btnConfirmDeposit = document.getElementById('btn-confirm-deposit');
  const depositInput = document.getElementById('deposit-amount-input');
  const depositChips = document.querySelectorAll('.deposit-chip-btn');

  if (btnOpenDeposit && depositModal) {
    btnOpenDeposit.addEventListener('click', () => {
      if (depositInput) depositInput.value = '';
      depositModal.classList.add('is-open');
      setTimeout(() => depositInput?.focus(), 150);
    });
  }

  if (btnCloseDeposit && depositModal) {
    btnCloseDeposit.addEventListener('click', () => {
      depositModal.classList.remove('is-open');
    });
  }

  if (depositModal) {
    depositModal.addEventListener('click', (e) => {
      if (e.target === depositModal) depositModal.classList.remove('is-open');
    });
  }

  // Chọn nhanh các mệnh giá (chips) - cộng dồn số tiền
  depositChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const addAmount = parseInt(chip.dataset.amount, 10) || 0;
      const currentVal = parseInt(depositInput.value, 10) || 0;
      depositInput.value = currentVal + addAmount;
      triggerPulse(depositInput);
    });
  });

  // Xác nhận nạp tiền vào ví
  if (btnConfirmDeposit && depositModal) {
    btnConfirmDeposit.addEventListener('click', () => {
      const amount = parseInt(depositInput.value, 10);
      if (!amount || isNaN(amount) || amount < 10000) {
        displayToast('⚠️ Số tiền nạp tối thiểu là 10.000 VNĐ!', true);
        return;
      }

      const currentBalance = readWalletBalance();
      const updatedBalance = currentBalance + amount;
      saveWalletBalance(updatedBalance);

      const elHeaderBalance = document.getElementById('wallet-header-balance');
      if (elHeaderBalance) triggerPulse(elHeaderBalance);

      depositModal.classList.remove('is-open');
      displayToast(`🎉 Nạp thành công ${formatVND(amount)} vào Ví Sinh Viên!`);
    });
  }
}

/**
 * Khởi chạy toàn bộ hệ thống
 */
function initFinancialHubApp() {
  // Khôi phục thông tin sinh viên từ localStorage nếu đã lưu trước đó
  const savedCode = localStorage.getItem('fh_student_code');
  const savedName = localStorage.getItem('fh_student_name');
  const codeEl = document.getElementById('student-code');
  const nameEl = document.getElementById('student-fullname');

  if (savedCode && codeEl) codeEl.value = savedCode;
  if (savedName && nameEl) nameEl.value = savedName;

  renderCoursesTable();
  renderScholarshipCards();
  refreshWalletUI();
  setupEventListeners();
  refreshFinancialSummary();
}

// Chạy khi tài liệu HTML sẵn sàng
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFinancialHubApp);
} else {
  initFinancialHubApp();
}
