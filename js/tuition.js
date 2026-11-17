// tuition.js - Thành viên 2 (Frontend Dev) phụ trách độc quyền
// Bảng kê khai học phí & Form thêm môn học HTML5 theo PRD.md

document.addEventListener('DOMContentLoaded', () => {
  const creditPriceInput = document.getElementById('credit-price');
  const extraFeeInput = document.getElementById('extra-fee');
  const courseTbody = document.getElementById('course-tbody');
  const totalCreditsEl = document.getElementById('total-credits');
  const totalTuitionEl = document.getElementById('total-tuition');
  const grandTotalEl = document.getElementById('grand-total');
  const summaryDetailEl = document.getElementById('summary-detail');
  const addCourseForm = document.getElementById('add-course-form');

  // Hàm định dạng tiền tệ chuẩn Việt Nam (1.000.000 VNĐ)
  function formatVND(amount) {
    return amount.toLocaleString('vi-VN') + ' VNĐ';
  }

  // Hàm tính toán và cập nhật toàn bộ bảng học phí
  function updateTuition() {
    const defaultPrice = parseFloat(creditPriceInput.value) || 0;
    const extraFee = parseFloat(extraFeeInput.value) || 0;

    let selectedCredits = 0;
    let selectedTuition = 0;

    const rows = courseTbody.querySelectorAll('tr');
    rows.forEach(row => {
      const cb = row.querySelector('.course-cb');
      if (!cb) return;

      const credits = parseInt(cb.dataset.credits, 10) || 0;
      // Nếu môn có đơn giá riêng thì ưu tiên, nếu không lấy đơn giá chuẩn
      const unitPrice = parseFloat(cb.dataset.price) || defaultPrice;
      const rowCost = credits * unitPrice;

      const unitPriceCell = row.querySelector('.unit-price');
      const costCell = row.querySelector('.course-cost');

      if (unitPriceCell) unitPriceCell.textContent = formatVND(unitPrice);
      if (costCell) costCell.textContent = formatVND(rowCost);

      if (cb.checked) {
        selectedCredits += credits;
        selectedTuition += rowCost;
        row.style.opacity = '1';
      } else {
        row.style.opacity = '0.45';
      }
    });

    const grandTotal = selectedTuition + extraFee;

    totalCreditsEl.textContent = `${selectedCredits} TC`;
    totalTuitionEl.textContent = formatVND(selectedTuition);
    grandTotalEl.textContent = formatVND(grandTotal);

    summaryDetailEl.textContent = `Học phí môn chọn (${selectedCredits} tín chỉ): ${formatVND(selectedTuition)} + Phụ phí: ${formatVND(extraFee)}`;
  }

  // 1. Lắng nghe sự kiện change trên checkbox (bằng Event Delegation)
  courseTbody.addEventListener('change', (e) => {
    if (e.target && e.target.classList.contains('course-cb')) {
      updateTuition();
    }
  });

  // 2. Lắng nghe sự kiện click xóa dòng môn học
  courseTbody.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('btn-del-row')) {
      const row = e.target.closest('tr');
      if (row) {
        row.remove();
        updateTuition();
      }
    }
  });

  // 3. Lắng nghe thay đổi đơn giá chuẩn hoặc phụ phí
  creditPriceInput.addEventListener('input', updateTuition);
  extraFeeInput.addEventListener('input', updateTuition);

  // 4. Form thêm học phần giả lập mới (Yêu cầu đặc biệt PRD Khu vực 3)
  if (addCourseForm) {
    addCourseForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const codeInput = document.getElementById('new-course-code');
      const nameInput = document.getElementById('new-course-name');
      const creditsInput = document.getElementById('new-course-credits');
      const priceInput = document.getElementById('new-course-price');
      const deadlineInput = document.getElementById('new-course-deadline');

      const code = codeInput.value.trim().toUpperCase();
      const name = nameInput.value.trim();
      const credits = parseInt(creditsInput.value, 10) || 3;
      const customPrice = priceInput.value ? parseFloat(priceInput.value) : '';
      const deadline = deadlineInput.value;

      // Định dạng ngày hiển thị dd/mm/yyyy
      let formattedDate = deadline;
      if (deadline) {
        const parts = deadline.split('-');
        if (parts.length === 3) formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
      }

      // Tạo thẻ dòng tr mới
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="text-align: center;"><input type="checkbox" class="course-cb" data-credits="${credits}" data-price="${customPrice}" checked></td>
        <td><code>${code}</code></td>
        <td>${name}</td>
        <td style="text-align: center;">${credits}</td>
        <td class="money unit-price">—</td>
        <td class="money course-cost">—</td>
        <td style="font-family: var(--mono); font-size: 0.8rem;">${formattedDate}</td>
        <td style="text-align: center;"><button type="button" class="btn-del-row" title="Xóa môn">×</button></td>
      `;

      courseTbody.appendChild(tr);

      // Reset form sau khi thêm
      addCourseForm.reset();
      creditsInput.value = '3';
      deadlineInput.value = '2027-01-20';

      // Tính lại học phí ngay
      updateTuition();
    });
  }

  // Khởi chạy tính toán ban đầu
  updateTuition();
});
