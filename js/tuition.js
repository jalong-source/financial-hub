/**
 * FINANCIAL HUB - TUITION.JS
 * Xử lý logic bảng kê khai học phí, định dạng tiền tệ VNĐ và thêm môn học động
 */

document.addEventListener('DOMContentLoaded', () => {
  initTuitionCalculation();
  initAddCourseHandler();
});

const formatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND'
});

function initTuitionCalculation() {
  const table = document.getElementById('tuition-table');
  const rateInput = document.getElementById('tuition-rate');
  const extraFeeInput = document.getElementById('extra-fee');
  const totalCreditsEl = document.getElementById('total-credits-display');
  const subtotalTuitionEl = document.getElementById('subtotal-tuition-display');
  const extraFeeEl = document.getElementById('extra-fee-display');
  const grandTotalEl = document.getElementById('grand-total-display');

  if (!table) return;

  function recalculate() {
    const rate = parseFloat(rateInput.value) || 0;
    const extraFee = parseFloat(extraFeeInput.value) || 0;

    let totalCredits = 0;
    let tuitionSubtotal = 0;

    const rows = table.querySelectorAll('tbody tr.course-row');
    rows.forEach(row => {
      const checkbox = row.querySelector('.course-check');
      const credits = parseInt(checkbox.dataset.credits) || 0;
      const rateEl = row.querySelector('.item-rate');
      const subtotalEl = row.querySelector('.row-subtotal');

      if (rateEl) rateEl.textContent = formatter.format(rate);

      if (checkbox.checked) {
        totalCredits += credits;
        const rowAmount = credits * rate;
        tuitionSubtotal += rowAmount;
        if (subtotalEl) subtotalEl.textContent = formatter.format(rowAmount);
        row.style.opacity = '1';
      } else {
        if (subtotalEl) subtotalEl.textContent = formatter.format(0);
        row.style.opacity = '0.45';
      }
    });

    const grandTotal = tuitionSubtotal + extraFee;

    if (totalCreditsEl) totalCreditsEl.textContent = `${totalCredits} Tín chỉ`;
    if (subtotalTuitionEl) subtotalTuitionEl.textContent = formatter.format(tuitionSubtotal);
    if (extraFeeEl) extraFeeEl.textContent = formatter.format(extraFee);
    if (grandTotalEl) grandTotalEl.textContent = formatter.format(grandTotal);
  }

  // Lắng nghe thay đổi trên checkbox và input đơn giá
  table.addEventListener('change', (e) => {
    if (e.target.classList.contains('course-check')) {
      recalculate();
    }
  });

  if (rateInput) rateInput.addEventListener('input', recalculate);
  if (extraFeeInput) extraFeeInput.addEventListener('input', recalculate);

  // Tính lần đầu
  recalculate();
}

function initAddCourseHandler() {
  const form = document.getElementById('add-course-form');
  const tbody = document.getElementById('tuition-tbody');
  const rateInput = document.getElementById('tuition-rate');

  if (!form || !tbody) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const code = document.getElementById('new-course-code').value.trim();
    const name = document.getElementById('new-course-name').value.trim();
    const credits = parseInt(document.getElementById('new-course-credits').value) || 3;
    const deadline = document.getElementById('new-course-deadline').value;
    const rate = parseFloat(rateInput.value) || 450000;
    const subtotal = credits * rate;

    const newRow = document.createElement('tr');
    newRow.className = 'course-row';
    newRow.dataset.courseId = code;
    newRow.dataset.credits = credits;

    newRow.innerHTML = `
      <td>
        <label class="custom-check">
          <input type="checkbox" class="course-check" checked data-credits="${credits}" aria-label="Chọn ${name}">
        </label>
      </td>
      <td class="mono">${code}</td>
      <td><strong>${name}</strong></td>
      <td class="mono credit-count">${credits}</td>
      <td class="mono item-rate">${formatter.format(rate)}</td>
      <td class="mono">
        <input type="date" class="form-control mono inline-date" value="${deadline}">
      </td>
      <td class="mono row-subtotal">${formatter.format(subtotal)}</td>
    `;

    tbody.appendChild(newRow);
    form.reset();
    document.getElementById('new-course-credits').value = '3';

    // Kích hoạt tính lại học phí
    const event = new Event('change', { bubbles: true });
    newRow.querySelector('.course-check').dispatchEvent(event);

    alert(`Đã thêm thành công học phần "${name}" vào bảng kê khai!`);
  });
}
